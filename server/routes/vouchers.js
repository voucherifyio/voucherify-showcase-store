const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});
router.route('*').get(async (req, res) => {
  try {
    const allPublicVouchers = await voucherify.vouchers.list({
      category: 'Public',
    });
    const vouchers = allPublicVouchers.vouchers.filter((voucher) =>
      voucher.metadata.hasOwnProperty('demostoreName')
    );
    return res.json(vouchers);
  } catch (e) {
    console.error(`[Vouchers][Error] - ${e}`);
    res.status(500).end();
  }
});

module.exports = router;
