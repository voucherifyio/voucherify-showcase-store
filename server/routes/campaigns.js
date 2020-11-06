const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('*').get(async (req, res) => {
	try {
		const allCampaigns = await voucherify.campaigns.list();
		// Filter out campaigns not created by setup.js
		const campaigns = allCampaigns.campaigns.filter(
			(campaign) =>
				campaign.name !== 'Referral Reward - 15% Discount' &&
				campaign.name !== 'Predefined Gift Cards' &&
				campaign.campaign_type !== 'GIFT_VOUCHERS'
		);
		return res.json(campaigns);
	} catch (e) {
		console.error(`[Campaigns][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
