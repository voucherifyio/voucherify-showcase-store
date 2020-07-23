require("dotenv").config();
const _ = require("lodash");
const path = require("path");
const express = require("express");
const cors = require("cors");
const Voucherify = require("voucherify");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);

const storeCustomers = require("./src/storeCustomers.json");
const voucherifyData = require("./setup/voucherifyData");
const campaigns = voucherifyData.campaigns;
const versionNumber = voucherifyData.versionNumber;

const redisClient = redis.createClient(process.env.REDIS_URL);
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: "keyboard cat", // TODO let's put it as an env variable
  resave: true,
  saveUninitialized: false,
}));

app.use(cors({
  credentials: true,
  origin: "http://localhost:3001", // REACT_APP_API_URL
}));

const voucherify = Voucherify({
  applicationId: process.env.REACT_APP_BACKEND_APPLICATION_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_CLIENT_SECRET_KEY,
});

function publishCouponsForCustomer(id) {
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

app.get("/init", async (request, response) => {
  if (request.session.views) {
    console.log(`[Re-visit] ${request.session.id} - ${request.session.views}`);
    ++request.session.views;
    
    return response.json({
      session: request.session.id,
      coupons: [],
    });
  }

  request.session.views = 1;
  console.log(`[New-visit] ${request.session.id}`);

  try {
    //Create new customers if this is a new session
    const createdCustomers = await Promise.all(
      storeCustomers.map((customer) => {
        customer.source_id = `${request.session.id}${customer.metadata.demostore_id}`;
        return voucherify.customers.create(customer);
      })
    );

    //We're setting up dummy order for one of the customers
    const daniel = _.find(storeCustomers, { source_id: `${request.session.id}danielwieszcz` });
    await voucherify.orders.create({
      source_id: "hot_beans_dummyorder",
      items: [
        {
          quantity: 1,
          price: 30000,
          amount: 30000,
        },
      ],
      amount: 30000,
      customer: daniel, // TODO will it work?
      status: "FULFILLED",
    });

    const createdCoupons = await Promise.all(createdCustomers.map(async customer => {
      const coupons = await Promise.all(
        publishCouponsForCustomer(customer.source_id)
      ); // .catch((e) => console.error(`[Publishing coupons][Error] - ${e}`)); // TODO what's the reason for silencing this error?
      
      //Assing validation rules for voucher "Welcome wave 5% off"
      const customerCoupons = coupons.filter((coupon) => coupon.voucher.metadata.demostoreName === "Welcome wave 5% off");

      const uniqueCoupon = customerCoupons.find(
        (coupon) => coupon.tracking_id === customer.source_id
      );
      if (typeof uniqueCoupon !== "undefined") {
        const customerValidationRuleName =
          customer.metadata.customerValidationRuleName;

        const validationRulesList = await voucherify.validationRules.list();

        const customerValidationRuleId = validationRulesList.data.find(
          (ValidationRule) =>
            ValidationRule.name === customerValidationRuleName
        ).id;

        const assignment = { voucher: uniqueCoupon.voucher.code };
        await voucherify.validationRules.createAssignment(
          customerValidationRuleId,
          assignment
        );
      }
      return {
        customer: customer.source_id,
        campaigns: coupons.map((coupon) => coupon.voucher),
      };
    }));

    return response.json({
      session: request.session.id,
      coupons: createdCoupons,
    });
  } catch (e) {
    console.error(`[Init][Error] - ${e}`)
    return response.status(500).end();
  }
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.get("/customer/:source_id", async (request, response) => {
  const source_id = request.params.source_id;
  try {
    const customer = await voucherify.customers.get(source_id);
    response.json(customer);
  } catch (e) {
    console.error(`[Fetching customers][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get("/redemptions/:source_id", async (request, response) => {
  const source_id = request.params.source_id;
  try {
    const redemptionLists = await voucherify.redemptions.list({
      customer: source_id,
    });
    response.json(redemptionLists);
  } catch (e) {
    console.error(`[Fetching redemptions][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get("/vouchers", async (request, response) => {
  try {
    const allStandaloneVouchers = await voucherify.vouchers.list({
      category: "STANDALONE",
    });
    const vouchers = allStandaloneVouchers.vouchers.filter(
      (voucher) => voucher.metadata.demostoreVersion === versionNumber
    );
    return response.json(vouchers);
  } catch (e) {
    console.error(`[Fetching vouchers][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get("/campaigns", async (request, response) => {
  try {
    const allCampaigns = await voucherify.campaigns.list();
    const campaigns = allCampaigns.campaigns.filter(
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
    const allProducts = await voucherify.products.list();

    //Filter out default Voucherify products
    const products = allProducts.products.filter(
      (product) =>
        product.name !== "Shipping" &&
        product.name !== "Watchflix" &&
        product.name !== "Apple iPhone 8"
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
    console.error(`[Create order][Error] - ${e}`);
    response.status(500).end();
  }
});

app.post("/redeem", async (request, response) => {
  const { code } = request.body;
  try {
    const redemption = await voucherify.redemptions.redeem(code, request.body);
    return response.json(redemption);
  } catch (e) {
    console.error(`[Redeem][Error] - ${e}`);
    response.status(500).end();
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("/*", (request, response) => {
    response.sendFile(path.join(__dirname, "build", "index.html"));
  });
} else {
  app.get("/*", (request, response) => {
    response.sendFile(path.join(__dirname, "public", "index.html"));
  });
}

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your server is listening on port ${listener.address().port}`);
});
