const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
  apiUrl: Boolean(process.env.REACT_APP_API_ENDPOINT)
		? process.env.REACT_APP_API_ENDPOINT
		: 'https://api.voucherify.io',
});

router.route('/create').post(async (req, res) => {
  try {
    const order = await voucherify.orders.create(req.body);
    return res.json(order);
  } catch (e) {
    console.error(`[Order][Error] - ${e}`);
    res.status(500).end();
  }
});

module.exports = router;
