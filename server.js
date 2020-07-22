require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const voucherifyClient = require("voucherify");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const redis = require("redis");
const voucherifyData = require("./setup/voucherifyData");
const campaigns = voucherifyData.campaigns;
const versionNumber = voucherifyData.versionNumber;
const RedisStore = require("connect-redis")(session);

const redisClient = redis.createClient(process.env.REDIS_URL);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
  }),
  cors({
    credentials: true,
    origin: "http://localhost:3001", // REACT_APP_API_URL
  })
);

let storeCustomers = require("./src/storeCustomers.json");

const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APPLICATION_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_CLIENT_SECRET_KEY,
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

app.get("/init", async (request, response) => {
  const createdCouponsList = [];

  if (request.session.views) {
    console.log(`[Re-visit] ${request.session.id} - ${request.session.views}`);
    ++request.session.views;
  } else {
    request.session.views = 1;
    console.log(`[New-visit] ${request.session.id}`);

    //Create new customers if this is a new session
    const createdCustomers = await Promise.all(
      storeCustomers.map(async (customer) => {
        let customerID = `${request.session.id}${customer.metadata.demostore_id}`;
        customer.source_id = customerID;
        let createdCustomer = voucherify.customers.create(customer);

        //We're setting up dummy order for one of the customers
        if (customer.source_id === `${request.session.id}danielwieszcz`) {
          const dummyOrderPayload = {
            source_id: "hot_beans_dummyorder",
            items: [
              {
                quantity: 1,
                price: 30000,
                amount: 30000,
              },
            ],
            amount: 30000,
            customer: {
              source_id: customer.source_id,
              name: customer.name,
              email: customer.email,
              metadata: {
                country: customer.metadata.country,
                gender: customer.metadata.gender,
                demostore_id: customer.metadata.demostore_id,
                customerValidationRuleName:
                  customer.metadata.customerValidationRuleName,
              },
              address: {
                city: customer.address.city,
                state: customer.address.state,
                line_1: customer.address.line_1,
                country: customer.address.country,
                postal_code: customer.address.postal_code,
              },
            },
            status: "FULFILLED",
          };

          await voucherify.orders.create(dummyOrderPayload);
        }
        return createdCustomer;
      })
    );

    for await (const createdCustomer of createdCustomers) {
      try {
        const customerCoupons = [];
        const createdCoupons = Promise.all(
          publishForCustomer(createdCustomer.source_id)
        ).catch((e) => console.error(`[Publishing coupons][Error] - ${e}`));
        let coupons = await createdCoupons;
        //Assing validation rules for voucher "Welcome wave 5% off"
        coupons.forEach((coupon) => {
          if (coupon.voucher.metadata.demostoreName === "Welcome wave 5% off") {
            customerCoupons.push(coupon);
          }
        });

        let uniqueCoupon = customerCoupons.find(
          (coupon) => coupon.tracking_id === createdCustomer.source_id
        );
        if (typeof uniqueCoupon !== "undefined") {
          let customerValidationRuleName =
            createdCustomer.metadata.customerValidationRuleName;

          let ValidationRulesList = await voucherify.validationRules.list();

          let customerValidationRuleId = ValidationRulesList.data.find(
            (ValidationRule) =>
              ValidationRule.name === customerValidationRuleName
          ).id;

          let assignment = { voucher: uniqueCoupon.voucher.code };
          await voucherify.validationRules.createAssignment(
            customerValidationRuleId,
            assignment
          );
        }
        createdCouponsList.push({
          customer: createdCustomer.source_id,
          campaigns: coupons.map((coupon) => coupon.voucher),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
  return response.json({
    session: request.session.id,
    coupons: createdCouponsList,
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
    response.json(await redemptionLists);
  } catch (e) {
    console.error(`[Fetching redemptions][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get("/vouchers", async (request, response) => {
  try {
    const standaloneVouchersList = await voucherify.vouchers.list({
      category: "STANDALONE",
    });
    const vouchers = standaloneVouchersList.vouchers.filter(
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

    //Filter out default Voucherify products

    const products = productsList.products.filter(
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
    console.log(e);
  }
});

app.post("/redeem", async (request, response) => {
  const { code } = request.body;
  try {
    const redemption = await voucherify.redemptions.redeem(code, request.body);
    return response.json(redemption);
  } catch (e) {
    console.log(e);
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
