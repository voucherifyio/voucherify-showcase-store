const router = require('express').Router();
const { ContactSupportOutlined } = require('@material-ui/icons');
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
	apiUrl: Boolean(process.env.REACT_APP_API_ENDPOINT)
		? process.env.REACT_APP_API_ENDPOINT
		: 'https://api.voucherify.io',
});
router.route('/').get(async (req, res) => {
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

router.route('/:voucherId').get(async (req, res) => {
	const voucherId = req.params.voucherId;
	try {
		const voucher = await voucherify.vouchers.get(voucherId);
		return res.json(voucher);
	} catch (e) {
		console.error(`[Voucher][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
