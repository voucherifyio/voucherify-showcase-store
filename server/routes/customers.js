const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('/:id').get(async (req, res) => {
	const id = req.params.id;
	try {
		const customer = await voucherify.customers.get(id);
		res.json(customer);
	} catch (e) {
		console.error(`[Customer][Error] - ${e}`);
		res.status(500).end();
	}
});

router.route('/update').post(async (req, res) => {
	const id = req.body.id;
	const email = req.body.email;

	try {
		const customer = await voucherify.customers.update({
			id,
			email,
		});
		console.log(customer);
		res.json(customer);
	} catch (e) {
		console.error(`[Customer][Update][Error] - ${e}`);
		res.status(500).end();
	}
});

router.route('/all').post(async (req, res) => {
	const publishedCodes = req.body.publishedCodes;
	try {
		const customers = await Promise.all(
			publishedCodes.map((customer) => {
				customerId = customer.currentCustomer;
				return voucherify.customers.get(customerId);
			})
		);
		res.json(customers);
	} catch (e) {
		console.error(`[Customer][All][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
