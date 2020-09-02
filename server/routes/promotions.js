const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('/:campaignId').get(async (request, response) => {
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

module.exports = router;
