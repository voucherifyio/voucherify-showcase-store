const router = require('express').Router();

router.route('*').post(async (req, res) => {
	try {
		req.app.io.emit('new-message', req.body);
		return res.status(200).end();
	} catch (e) {
		console.error(`[Webhooks][Error] - ${e}`);
		res.status(500).end();
	}
});

module.exports = router;
