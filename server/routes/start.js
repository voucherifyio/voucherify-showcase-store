const router = require('express').Router();
const voucherifyClient = require('voucherify');
const data = require('../../setup/data');
const _find = require('lodash.find');
const faker = require('faker');
const voucherify = voucherifyClient({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});
const storeCustomers = data.customers;

const allCampigns = async () => {
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
	return (
		campaigns
			// TODO: fix campaign name
			// .filter(
			// (campaign) =>
			// campaign.name !== 'Referral Campaign Tier 1 - Reward' &&
			// campaign.name !== 'Referral Campaign Tier 2 - Reward'
			// )
			.map((campaign) => campaign.name)
			.map((campaign) =>
				voucherify.distributions.publications.create(
					Object.assign(params, { campaign })
				)
			)
	);
}
router.route('/newSession').get(async (req, res) => {
	req.session.destroy();
	req.session = null;
	return res.status(200).end();
});

router.route('/').get(async (req, res) => {
	const campaigns = await allCampigns();

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

				customer.source_id = `${req.session.id}${customer.metadata.demostore_id}`;
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
			status: 'FULFILLED',
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

// router.route('/newcustomers').get(async (req, res) => {
// 	const campaigns = await allCampigns();

// 	try {
// 		const nextCustomers = [];

// 		for (let i = 0; i < 3; i++) {
// 			const fakeFirstName = faker.name.firstName();
// 			const fakeLastName = faker.name.lastName();

// 			const nextCustomer = {
// 				source_id: `${req.session.id}referralCustomer${i + 1}`,
// 				name: `${fakeFirstName} ${fakeLastName}`,
// 				metadata: {
// 					firstName: fakeFirstName,
// 					demostore_id: `referralCustomer${i + 1}`,
// 					description: 'New customer for referral campaign purposes',
// 					title: `Referral Friend ${i + 1}`,
// 				},
// 				address: {
// 					city: faker.address.city(),
// 					state: faker.address.state(),
// 					line_1: faker.address.streetName(),
// 					country: faker.address.country(),
// 					postal_code: faker.address.zipCode('## ###'),
// 				},
// 			};
// 			nextCustomers.push(nextCustomer);
// 		}

// 		const createdNextCustomers = await Promise.all(
// 			nextCustomers.map((customer) => {
// 				return voucherify.customers.create(customer);
// 			})
// 		);

// 		const createdNextCoupons = await Promise.all(
// 			createdNextCustomers.map(async (customer) => {
// 				const coupons = await Promise.all(
// 					publishCouponsForCustomer(customer.source_id, campaigns)
// 				).catch((e) => console.error(`[Publishing coupons][Error] - ${e}`));

// 				// Assing validation rules for voucher "Happy Birthday"
// 				const customerCoupons = coupons.filter(
// 					(coupon) => coupon.voucher.name === 'Happy Birthday'
// 				);

// 				const uniqueCoupon = customerCoupons.find(
// 					(coupon) => coupon.tracking_id === customer.source_id
// 				);

// 				if (typeof uniqueCoupon !== 'undefined') {
// 					const individualValRule = customer.metadata.individual_val_rule;

// 					const validationRulesList = await voucherify.validationRules.list();

// 					const customerValidationRuleId = validationRulesList.data.find(
// 						(ValidationRule) => ValidationRule.name === individualValRule
// 					).id;

// 					const assignment = { voucher: uniqueCoupon.voucher.code };
// 					await voucherify.validationRules.createAssignment(
// 						customerValidationRuleId,
// 						assignment
// 					);
// 				}
// 				return {
// 					currentCustomer: customer.id,
// 					campaigns: coupons.map((coupon) => coupon.voucher),
// 				};
// 			})
// 		);

// 		return res.json({
// 			session: req.session.id,
// 			coupons: createdNextCoupons,
// 		});
// 	} catch (e) {
// 		console.error(`[Session][Error] - ${e}`);
// 		return res.status(500).end();
// 	}
// });

module.exports = router;
