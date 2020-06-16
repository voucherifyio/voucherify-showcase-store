require("dotenv").config();
const express = require("express");
const cors = require("cors");
const voucherifyClient = require("voucherify");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const voucherifyData = require("./setup/voucherifyData");
const campaigns = voucherifyData.campaigns;
const versionNumber = voucherifyData.versionNumber;

let storeCustomers = require("./src/storeCustomers.json");

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3001", // REACT_APP_API_URL
    })
  );
}

const voucherify = voucherifyClient({
  applicationId: process.env.APPLICATION_ID,
  clientSecretKey: process.env.CLIENT_SECRET_KEY,
});

function publishForCustomer(id) {
  const params = {
    customer: {
      source_id: id,
    },
  };
  return campaigns
    .map((campaign) => campaign.name)
    .map((campaign) =>
      voucherify.distributions.publications.create(
        Object.assign(params, { campaign })
      )
    );
}

app.use(bodyParser.json());
app.use(
  session({
    store: new SQLiteStore({ dir: ".data" }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // month
  })
);

app.get("/init", async (request, response) => {
  if (request.session.views) {
    console.log(`[Re-visit] ${request.session.id} - ${request.session.views}`);
    request.session.views++;
  } else {
    request.session.views = 1;
    console.log(`[New-visit] ${request.session.id}`);
    //Create new customers if this is a new session
    const createdCustomers = await Promise.all(
      storeCustomers.map((customer) => {
        let customerID = `${request.session.id}${customer.metadata.demostore_id}`;
        customer.source_id = customerID;
        let createdCustomer = voucherify.customers.create(customer);
        return createdCustomer;
      })
    );

    request.session.createdCouponsList = [];
    for (let i = 0; i < createdCustomers.length; i++) {
      const createdCoupons = Promise.all(
        publishForCustomer(createdCustomers[i].source_id)
      ).catch((e) => console.error(`[Publishing coupons][Error] - ${e}`));

      let coupons = await createdCoupons;

      request.session.createdCouponsList.push({
        customer: createdCustomers[i].source_id,
        campaings: coupons.map((coupon) => coupon.voucher),
      });
    }
  }

  response.json({
    session: request.session.id,
    coupons: request.session.createdCouponsList,
  });
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/customer/:source_id", async (request, response) => {
  let source_id = request.params.source_id;
  try {
    const customer = await voucherify.customers.get(source_id);
    response.json(await customer);
  } catch (e) {
    console.error(`[Fetching customers][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get("/redemptions/:source_id", async (request, response) => {
  let source_id = request.params.source_id;
  try {
    const redemptionLists = await voucherify.redemptions.list({
      customer: source_id,
    });
    response.json(await redemptionLists.redemptions);
  } catch (e) {
    console.error(`[Fetching redemptions][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get("/campaigns", async (request, response) => {
  try {
    const campaignsList = await voucherify.campaigns.list();

    const campaigns = campaignsList.campaigns.filter(
      (campaign) => campaign.metadata.demostoreVersion === versionNumber
    );

    return response.json(campaigns);
  } catch (e) {
    console.error(`[Fetching campaigns][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get("/products", async (request, response) => {
  try {
    const productsList = await voucherify.products.list();

    //Filter out 'Shipping" - default Voucherify product

    const products = productsList.products.filter(
      (product) => product.name !== "Shipping"
    );

    return response.json(products);
  } catch (e) {
    console.error(`[Fetching products][Error] - ${e}`);
    response.status(500).end();
  }
});

app.post("/order", async (request, response) => {
  try {
    const order = await voucherify.orders.create(request.body);
    return response.json(order);
  } catch (e) {
    console.log(e);
  }
});

app.get("/store", (request, response) => {
  return response.json({ test: "Test" });
});

app.get("/details/*", (request, response) => {
  return response.json({ test: "Test" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your server is listening on port ${listener.address().port}`);
});
