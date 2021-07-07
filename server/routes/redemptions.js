const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
	apiUrl: Boolean(process.env.REACT_APP_API_ENDPOINT)
		? process.env.REACT_APP_API_ENDPOINT
		: 'https://api.voucherify.io',
});

router.route('/redeem').post(async (req, res) => {
	const { code, promotionId } = req.body;
	try {
		if (code) {
			const redemption = await voucherify.redemptions.redeem(code, req.body);
			return res.json(redemption);
		} else {
			const redemption = await voucherify.promotions.tiers.redeem(
				promotionId,
				req.body
			);
			return res.json(redemption);
		}
	} catch (e) {
		console.error(`[Redeem][Error] - ${e}`);
		res.status(500).end();
	}
});

router.route('/:id').get(async (req, res) => {
	const customerId = req.params.id;
	try {
		const redemptionLists = await voucherify.redemptions.list({
			customer: customerId,
		});
		res.json(redemptionLists);
	} catch (e) {
		console.error(`[Redemptions][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
