const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('/publications/create').post(async (req, res) => {
  try {
    const { currentCustomer, campaign } = req.body;
    const publishedVoucher = await voucherify.distributions.publications.create(
      {
        customer: {
          source_id: currentCustomer.source_id,
        },
        campaign,
      }
    );
    return res.json(publishedVoucher.voucher);
  } catch (e) {
    console.error(`[Distributions][Error] - ${e}`);
    res.status(500).end();
  }
});

module.exports = router;
