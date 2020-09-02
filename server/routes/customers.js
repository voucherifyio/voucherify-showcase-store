const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});const storeCustomers = require('../../setup/voucherifyData').customers;

router.route('/:source_id').get(async (request, response) => {
  const sourceId = request.params.source_id;
  try {
    const customer = await voucherify.customers.get(sourceId);
    response.json(customer);
  } catch (e) {
    console.error(`[Customer][Error] - ${e}`);
    response.status(500).end();
  }
});

router.route('/all/:session_id').get(async (request, response) => {
  const sessionId = request.params.session_id;
  try {
    const customers = await Promise.all(
      storeCustomers.map((customer) => {
        customerId = `${sessionId}${customer.metadata.demostore_id}`;
        return voucherify.customers.get(customerId);
      })
    );
    response.json(customers);
  } catch (e) {
    console.error(`[Customer][All][Error] - ${e}`);
    response.status(500).end();
  }
});

module.exports = router;
