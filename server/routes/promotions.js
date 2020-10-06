const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('/:campaignId').get(async (req, res) => {
  const campaignId = req.params.campaignId;
  try {
    const campaignPromotionTiers = await voucherify.promotions.tiers.list(
      campaignId
    );
    res.json(campaignPromotionTiers);
  } catch (e) {
    console.error(`[Promotions][Error] - ${e}`);
    res.status(500).end();
  }
});

module.exports = router;
