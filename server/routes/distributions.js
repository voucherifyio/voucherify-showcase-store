const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('/publications/create').post(async (req, res) => {
  try {
    const { customer, campaign } = req.body;
    const publishedVoucher = await voucherify.distributions.publications.create(
      Object.assign({ customer, campaign })
    );
    return res.json(publishedVoucher);
  } catch (e) {
    console.error(`[Distributions][Error] - ${e}`);
    res.status(500).end();
  }
});

module.exports = router;
