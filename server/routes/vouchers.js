const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});
router.route('*').get(async (req, res) => {
	try {
		const vouchers = await voucherify.vouchers.list({
			category: 'Hot Beans',
		});
		return res.json(vouchers.vouchers);
	} catch (e) {
		console.error(`[Vouchers][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
