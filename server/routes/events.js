const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('/create').post(async (req, res) => {
	try {
		const { eventName, currentCustomer } = req.body;
		const event = await voucherify.events.create(eventName, {
			customer: currentCustomer,
		});
		return res.json(event);
	} catch (e) {
		console.error(`[Order][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
