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
		const { currentCustomer, campaign } = req.body;
		const publishedVoucher = await voucherify.distributions.publications.create(
			{
				customer: {
					id: currentCustomer.id,
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

router.route('/list/:referrerId').get(async (req, res) => {
	const referrerId = req.params.referrerId;
	try {
		const allPublications = await voucherify.distributions.publications.list({
			filters: {
				junction: 'AND',
				customer_id: {
					conditions: {
						$is: referrerId,
					},
				},
			},
		});

		return res.json(allPublications.publications);
	} catch (e) {
		console.error(`[Distributions][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
