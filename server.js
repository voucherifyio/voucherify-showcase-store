require('dotenv').config();
const _ = require('lodash');
const path = require('path');
const express = require('express');
const cors = require('cors');
const voucherifyClient = require('voucherify');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const enforce = require('express-sslify');

const voucherifyData = require('./setup/voucherifyData');
const storeCustomers = voucherifyData.customers;
const campaigns = voucherifyData.campaigns.filter(
  (campaign) => campaign.campaign_type !== 'PROMOTION'
);

const redisClient = redis.createClient(process.env.REDIS_URL);
if (process.env.NODE_ENV !== 'development') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 3600 * 24 * 30 },
  }),
  cors({
    credentials: true,
    origin: process.env.REACT_APP_URL,
  })
);

const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
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

app.get('/init', async (request, response) => {
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
    // Create new customers if this is a new session
    const createdCustomers = await Promise.all(
      storeCustomers.map((customer) => {
        customer.source_id = `${request.session.id}${customer.metadata.demostore_id}`;
        return voucherify.customers.create(customer);
      })
    );
    // We're setting up dummy order for one of the customers
    const dummyOrderCustomer = _.find(storeCustomers, {
      source_id: `${request.session.id}lewismarshall`,
    });
    await voucherify.orders.create({
      source_id: 'hot_beans_dummyorder',
      items: [
        {
          quantity: 1,
          price: 30000,
          amount: 30000,
        },
      ],
      amount: 30000,
      customer: dummyOrderCustomer,
      status: 'FULFILLED',
    });

    const createdCoupons = await Promise.all(
      createdCustomers.map(async (customer) => {
        const coupons = await Promise.all(
          publishCouponsForCustomer(customer.source_id)
        ).catch((e) => console.error(`[Publishing coupons][Error] - ${e}`));

        // Assing validation rules for voucher "Welcome wave 5% off"
        const customerCoupons = coupons.filter(
          (coupon) =>
            coupon.voucher.metadata.demostoreName === 'Welcome wave 5% off'
        );

        const uniqueCoupon = customerCoupons.find(
          (coupon) => coupon.tracking_id === customer.source_id
        );
        if (typeof uniqueCoupon !== 'undefined') {
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
          selectedCustomer: customer.source_id,
          campaigns: coupons.map((coupon) => coupon.voucher),
        };
      })
    );

    return response.json({
      session: request.session.id,
      coupons: createdCoupons,
    });
  } catch (e) {
    console.error(`[Init][Error] - ${e}`);
    return response.status(500).end();
  }
});

app.get('/customers/:sessionId', async (request, response) => {
  const sessionId = request.params.sessionId;

  try {
    const customers = await Promise.all(
      storeCustomers.map(async (customer) => {
        customerId = `${sessionId}${customer.metadata.demostore_id}`;
        return voucherify.customers.get(customerId);
      })
    );
    response.json(customers);
  } catch (e) {
    console.error(`[Customers][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get('/customer/:source_id', async (request, response) => {
  const sourceId = request.params.source_id;
  try {
    const customer = await voucherify.customers.get(sourceId);
    response.json(customer);
  } catch (e) {
    console.error(`[Customer][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get('/redemptions/:source_id', async (request, response) => {
  const sourceId = request.params.source_id;
  try {
    const redemptionLists = await voucherify.redemptions.list({
      customer: sourceId,
    });
    response.json(redemptionLists);
  } catch (e) {
    console.error(`[Redemptions][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get('/vouchers', async (request, response) => {
  try {
    const allStandaloneVouchers = await voucherify.vouchers.list({
      category: 'STANDALONE',
    });
    const vouchers = allStandaloneVouchers.vouchers.filter((voucher) =>
      voucher.metadata.hasOwnProperty('demostoreName')
    );
    return response.json(vouchers);
  } catch (e) {
    console.error(`[Vouchers][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get('/campaigns', async (request, response) => {
  try {
    const allCampaigns = await voucherify.campaigns.list();
    // Filter out campaigns not created by setup.js and filter out Cart Level Promotion
    const campaigns = allCampaigns.campaigns.filter(
      (campaign) => campaign.metadata.hasOwnProperty('demostoreName')
    );
    return response.json(campaigns);
  } catch (e) {
    console.error(`[Campaigns][Error] - ${e}`);
    response.status(500).end();
  }
});

app.post('/qualifications', async (request, response) => {
  try {
    const { customer, amount, items, metadata } = request.body;
    
    const qtPayload = {
      customer,
      order: {
        amount,
        items,
      },
      metadata,
    };

    const examinedVouchers = await voucherify.vouchers.qualifications.examine(
      qtPayload
    );
    const examinedCampaigns = await voucherify.campaigns.qualifications.examine(
      qtPayload
    );
    const examinedCampaignsPromotion = await voucherify.promotions.validate(
      qtPayload
    );

    let qualifications = examinedCampaigns.data
      .concat(examinedVouchers.data)
      .concat(examinedCampaignsPromotion.promotions)
      .filter((qlt) => qlt.hasOwnProperty('metadata'));

    qualifications = qualifications.filter((qlt) =>
      qlt.metadata.hasOwnProperty('demostoreName')
    );

    return response.json(qualifications);
  } catch (e) {
    console.error(`[Qualification][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get('/products', async (request, response) => {
  try {
    const allProducts = await voucherify.products.list();
    // Filter out default Voucherify products
    const products = allProducts.products.filter(
      (product) =>
        product.name !== 'Shipping' &&
        product.name !== 'Watchflix' &&
        product.name !== 'Apple iPhone 8'
    );
    return response.json(products);
  } catch (e) {
    console.error(`[Products][Error] - ${e}`);
    response.status(500).end();
  }
});

app.get('/promotions/:campaignId', async (request, response) => {
  const campaignId = request.params.campaignId;
  try {
    const campaignPromotionTiers = await voucherify.promotions.tiers.list(
      campaignId
    );
    response.json(campaignPromotionTiers);
  } catch (e) {
    console.error(`[Promotions][Error] - ${e}`);
    response.status(500).end();
  }
});

app.post('/order', async (request, response) => {
  try {
    const order = await voucherify.orders.create(request.body);
    return response.json(order);
  } catch (e) {
    console.error(`[Order][Error] - ${e}`);
    response.status(500).end();
  }
});

app.post('/redeem', async (request, response) => {
  const { code, promotionId } = request.body;
  try {
    if (code) {
      const redemption = await voucherify.redemptions.redeem(
        code,
        request.body
      );
      return response.json(redemption);
    } else {
      const redemption = await voucherify.promotions.tiers.redeem(
        promotionId,
        request.body
      );
      return response.json(redemption);
    }
  } catch (e) {
    console.error(`[Redeem][Error] - ${e}`);
    response.status(500).end();
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
} else {
  app.get('/*', (request, response) => {
    response.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
}

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`[Server][Port] ${listener.address().port}`);
});
