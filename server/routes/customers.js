const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});
const storeCustomers = require('../../setup/data').customers;

router.route('/:source_id').get(async (req, res) => {
  const sourceId = req.params.source_id;
  try {
    const customer = await voucherify.customers.get(sourceId);
    res.json(customer);
  } catch (e) {
    console.error(`[Customer][Error] - ${e}`);
    res.status(500).end();
  }
});

router.route('/:source_id').post(async (req, res) => {
  const source_id = req.params.source_id;
  const email = req.body.email;
  try {
    const customer = await voucherify.customers.update({
      source_id,
      email,
    });
    res.json(customer);
  } catch (e) {
    console.error(`[Customer][Update][Error] - ${e}`);
    res.status(500).end();
  }
});

router.route('/all/:session_id').get(async (req, res) => {
  const sessionId = req.params.session_id;
  try {
    const customers = await Promise.all(
      storeCustomers.map((customer) => {
        customerId = `${sessionId}${customer.metadata.demostore_id}`;
        return voucherify.customers.get(customerId);
      })
    );
    res.json(customers);
  } catch (e) {
    console.error(`[Customer][All][Error] - ${e}`);
    res.status(500).end();
  }
});

module.exports = router;
