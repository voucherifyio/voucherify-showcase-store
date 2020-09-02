const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherifyData = require('../../setup/voucherifyData');
const _find = require('lodash.find');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});
const storeCustomers = voucherifyData.customers;

// We need to filter out Promotion campaigns and campaings without published coupons
const campaigns = voucherifyData.campaigns.filter(
  (campaign) =>
    campaign.campaign_type !== 'PROMOTION' &&
    campaign.metadata.demostoreDoNotPublish !== true
);

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

router.route('*').get(async (req, res) => {
  if (req.session.views) {
    console.log(`[Session][Re-visit] ${req.session.id} - ${req.session.views}`);
    ++req.session.views;

    return res.json({
      session: req.session.id,
      coupons: [],
    });
  }

  req.session.views = 1;
  console.log(`[Session][New-visit] ${req.session.id}`);

  try {
    // Create new customers if this is a new session
    const createdCustomers = await Promise.all(
      storeCustomers.map((customer) => {
        customer.source_id = `${req.session.id}${customer.metadata.demostore_id}`;
        return voucherify.customers.create(customer);
      })
    );
    // We're setting up dummy order for one of the customers
    const dummyOrderCustomer = _find(storeCustomers, {
      source_id: `${req.session.id}lewismarshall`,
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
          currentCustomer: customer.source_id,
          campaigns: coupons.map((coupon) => coupon.voucher),
        };
      })
    );

    return res.json({
      session: req.session.id,
      coupons: createdCoupons,
    });
  } catch (e) {
    console.error(`[Session][Error] - ${e}`);
    return res.status(500).end();
  }
});

module.exports = router;
