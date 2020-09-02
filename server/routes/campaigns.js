const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('*').get(async (request, response) => {
  try {
    const allCampaigns = await voucherify.campaigns.list();
    // Filter out campaigns not created by setup.js and filter out Cart Level Promotion
    const campaigns = allCampaigns.campaigns.filter((campaign) =>
      campaign.metadata.hasOwnProperty('demostoreName')
    );
    return response.json(campaigns);
  } catch (e) {
    console.error(`[Campaigns][Error] - ${e}`);
    response.status(500).end();
  }
});

module.exports = router;
