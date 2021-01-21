const router = require('express').Router();
const voucherifyClient = require('voucherify');
const data = require('../../setup/data');
const _find = require('lodash.find');
const faker = require('faker');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
	apiUrl: Boolean(process.env.REACT_APP_API_ENDPOINT)
		? process.env.REACT_APP_API_ENDPOINT
		: 'https://api.voucherify.io',
});

const storeCustomers = data.customers;

const getCampaigns = async () => {
	try {
		const allCampaigns = await voucherify.campaigns.list();
		// Filter out campaigns not created by setup.js
		let campaigns = allCampaigns.campaigns.filter(
			(campaign) =>
				campaign.name !== 'Referral Reward - 15% Discount' &&
				campaign.name !== 'Predefined Gift Cards'
		);

		campaigns = campaigns.filter(
			(campaign) =>
				campaign.campaign_type !== 'PROMOTION' &&
				campaign.metadata.auto_publish !== false
		);
		return campaigns;
	} catch (e) {
		console.error(`[All Campaigns][Error] - ${e}`);
	}
};

function publishCouponsForCustomer(sourceId, campaigns) {
	const params = {
		customer: {
			source_id: sourceId,
		},
	};

	// We're not publishing coupons for Reward Campaigns - Those coupons will be published by Reward Logic
	return campaigns
		.map((campaign) => campaign.name)
		.map((campaign) =>
			voucherify.distributions.publications.create(
				Object.assign(params, { campaign })
			)
		);
}
router.route('/newSession').get(async (req, res) => {
	req.session.destroy();
	req.session = null;
	return res.status(200).end();
});

router.route('/').get(async (req, res) => {
	const campaigns = await getCampaigns();

	if (req.session.views) {
		console.log(`[Session][Re-visit] ${req.session.id} - ${req.session.views}`);
		++req.session.views;

		return res.json({
			session: req.session.id,
			coupons: [],
		});
	}
	req.session.views = 1;
	console.log(`[Session][New-visit] ${req.session.id}`);

	try {
		// Create new customers if this is a new session
		const createdCustomers = await Promise.all(
			storeCustomers.map((customer) => {
				// Here let's fake the names and source_id
				const fakeFirstName = faker.name.firstName();
				const fakeLastName = faker.name.lastName();

				customer.source_id = `${fakeFirstName}@fakemail.com`;
				customer.name = `${fakeFirstName} ${fakeLastName}`;
				customer.metadata.firstName = fakeFirstName;

				return voucherify.customers.create(customer);
			})
		);
		// We're setting up dummy order for one of the customers
		const dummyOrderCustomer = _find(storeCustomers, {
			source_id: `${req.session.id}customer2`,
		});
		await voucherify.orders.create({
			source_id: 'hot_beans_dummyorder',
			items: [
				{
					quantity: 1,
					price: 30000,
					amount: 30000,
				},
			],
			amount: 30000,
			customer: dummyOrderCustomer,
			status: 'PAID',
		});

		const createdCoupons = await Promise.all(
			createdCustomers.map(async (customer) => {
				const coupons = await Promise.all(
					publishCouponsForCustomer(customer.source_id, campaigns)
				).catch((e) => console.error(`[Publishing coupons][Error] - ${e}`));

				// Assing validation rules for voucher "Happy Birthday"
				const customerCoupons = coupons.filter(
					(coupon) => coupon.voucher.name === 'Happy Birthday'
				);

				const uniqueCoupon = customerCoupons.find(
					(coupon) => coupon.tracking_id === customer.source_id
				);
				if (typeof uniqueCoupon !== 'undefined') {
					const individualValRule = customer.metadata.individual_val_rule;

					const validationRulesList = await voucherify.validationRules.list();

					const customerValidationRuleId = validationRulesList.data.find(
						(ValidationRule) => ValidationRule.name === individualValRule
					).id;

					const assignment = { voucher: uniqueCoupon.voucher.code };
					await voucherify.validationRules.createAssignment(
						customerValidationRuleId,
						assignment
					);
				}
				return {
					currentCustomer: customer.id,
					campaigns: coupons.map((coupon) => coupon.voucher),
				};
			})
		);

		return res.json({
			session: req.session.id,
			coupons: createdCoupons,
		});
	} catch (e) {
		console.error(`[Session][Error] - ${e}`);
		return res.status(500).end();
	}
});

module.exports = router;
