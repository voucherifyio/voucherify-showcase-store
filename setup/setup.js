require('dotenv').config();
const _flatten = require('lodash.flatten');
const voucherify = require('voucherify')({
	applicationId: process.env.REACT_APP_BACKEND_APP_ID,
	clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
	apiUrl: Boolean(process.env.REACT_APP_API_ENDPOINT)
		? process.env.REACT_APP_API_ENDPOINT
		: 'https://api.voucherify.io',
});
const { campaigns, vouchers, products, segments } = require('./data');

const setupSegments = () => {
	const segmentCreationPromises = segments.map((segment) => {
		const thisSegment = voucherify.segments.create(segment);
		return thisSegment
			.then((seg) => {
				const needsId = segments.find((s) => s.name === segment.name);
				needsId.voucherifyId = seg.id;
				return seg;
			})
			.catch((error) =>
				console.log(
					`[ERROR] There was an error creating segment ${segment.name}`,
					error
				)
			);
	});
	return Promise.all(segmentCreationPromises)
		.then(() => console.log('[SUCCESS] All segments setup'))
		.catch((error) =>
			console.log('[ERROR] There was an error creating segments', error)
		);
};

const setupCampaigns = () => {
	const campaignPromises = campaigns.map((campaign) => {
		if (campaign.name === 'Let it snow') {
			campaign.voucher.discount.unit_type = products.find(
				(p) => p.name === campaign.metadata.assigned_unit_type
			).voucherifyId;
		}

		thisCampaign = voucherify.campaigns.create(campaign);

		return thisCampaign
			.then((camp) => {
				const needsId = campaigns.find((c) => c.name === camp.name);
				needsId.voucherifyId = camp.id;

				if (camp.campaign_type === 'PROMOTION') {
					return camp.promotion.tiers.forEach((tier) => {
						let needsPromoId = campaigns.find((c) => c.name === camp.name);
						needsPromoId = needsPromoId.promotion.tiers.find(
							(t) => t.name === tier.name
						);
						needsPromoId.voucherifyId = tier.id;
					});
				} else if (
					camp.campaign_type === 'LOYALTY_PROGRAM' &&
					camp.name === 'Loyalty Campaign'
				) {
					const earningRules = [
						{
							event: 'customer.segment.entered',
							loyalty: {
								points: 100,
								type: 'FIXED',
							},
							source: {
								banner: 'Enter Loyal Customers Segment',
							},
							segment: {
								id: segments.find((s) => s.name === 'Loyal Customers')
									.voucherifyId,
							},
						},
						{
							event: 'order.paid',
							loyalty: {
								type: 'PROPORTIONAL',
								order: {
									amount: {
										every: 1000,
										points: 1,
									},
								},
							},
							source: { banner: 'Earn loyalty points' },
						},
					];
					try {
						earningRules.map((earningRule) => {
							return voucherify.loyalties.createEarningRule(camp.id, [
								earningRule,
							]);
						});
					} catch (error) {
						console.log(
							`[ERROR] There was an error creating earning rule ${earningRule.source.banner}`,
							error
						);
					}
				}
			})
			.catch((error) =>
				console.log(
					`[ERROR] There was an error creating campaign ${campaign.name}`,
					error
				)
			);
	});
	return Promise.all(campaignPromises)
		.then(() => console.log('[SUCCESS] All campaigns setup'))
		.catch((error) =>
			console.log('[ERROR] There was an error creating campaigns', error)
		);
};

const setupRewards = async () => {
	const rewards = [
		{
			name: 'Referral Reward Tier 1 - Voucher 5%',
			parameters: {
				campaign: {
					id: campaigns.find(
						(c) => c.name === 'Referral Reward Tier 1 - Voucher 5%'
					).voucherifyId,
				},
			},
		},
		{
			name: 'Referral Reward Tier 2 - Voucher 10%',
			parameters: {
				campaign: {
					id: campaigns.find(
						(c) => c.name === 'Referral Reward Tier 2 - Voucher 10%'
					).voucherifyId,
				},
			},
		},
		{
			name: 'Loyalty Reward - Voucher',
			parameters: {
				campaign: {
					id: campaigns.find((c) => c.name === 'Loyalty Reward - Voucher')
						.voucherifyId,
				},
			},
		},
		{
			name: 'Loyalty Reward - Pay by Points',
			type: 'COIN',
			parameters: {
				coin: {
					exchange_ratio: 0.5,
				},
			},
		},
		{
			name: 'Loyalty Reward - Free coffee',
			parameters: {
				product: {
					id: products.find((p) => p.name === 'Hard Beans - Brazil')
						.voucherifyId,
				},
			},
			redeemed: null,
			stock: '1',
			type: 'MATERIAL',
		},
	];

	const rewardsPromises = rewards.map((reward) => {
		const thisReward = voucherify.rewards.create(reward);
		return thisReward
			.then((rew) => {
				const needsId = rewards.find((r) => r.name === rew.name);
				needsId.voucherifyId = rew.id;
			})
			.catch((error) =>
				console.log(
					`[ERROR] There was an error creating reward ${reward.name}`,
					error
				)
			);
	});

	const loyaltyCampaignsRewardAssigmentsPromises = () => {
		const assignmentsPerLoyaltyCampaign = campaigns.map((campaign) => {
			if (campaign.campaign_type === 'LOYALTY_PROGRAM') {
				const demostoreRewards = campaign.metadata.assigned_rewards.split('; ');
				const demostoreRewardsPoints = campaign.metadata.assigned_rewards_points.split(
					'; '
				);

				demostoreRewards.map((demostoreReward, index) => {
					const needsId = rewards.find(
						(reward) => reward.name === demostoreReward
					).voucherifyId;
					const campId = campaign.voucherifyId;

					let loyaltyCampaignsRewardsAssigment;
					if (demostoreRewardsPoints[index] !== 'null') {
						loyaltyCampaignsRewardsAssigment = voucherify.loyalties.createRewardAssignments(
							campId,
							[
								{
									reward: needsId,
									parameters: {
										loyalty: {
											points: parseInt(demostoreRewardsPoints[index], 10),
										},
									},
								},
							]
						);
					} else if (demostoreRewardsPoints[index] === 'null') {
						loyaltyCampaignsRewardsAssigment = voucherify.loyalties.createRewardAssignments(
							campId,
							[
								{
									reward: needsId,
								},
							]
						);
					}
				});
			}
		});
		return _flatten(assignmentsPerLoyaltyCampaign);
	};

	try {
		await Promise.all(rewardsPromises);
		await Promise.all(loyaltyCampaignsRewardAssigmentsPromises());
		console.log('[SUCCESS] All rewards & reward assigments setup');
	} catch (error) {
		console.log(
			'[ERROR] There was an error creating rewards & reward assigments ',
			error
		);
	}
};

const setupVouchers = () => {
	const voucherPromises = vouchers.map((voucher) => {
		const thisVoucher = voucherify.vouchers.create(voucher);
		return thisVoucher.then(
			(vouch) => {
				const needsId = vouchers.find((v) => v.code === vouch.code);
				needsId.voucherifyId = vouch.id;
			},
			(error) =>
				console.log(
					`[ERROR] There was an error creating voucher ${voucher.code}`,
					error
				)
		);
	});

	return Promise.all(voucherPromises)
		.then(() => console.log('[SUCCESS] All vouchers setup'))
		.catch((error) =>
			console.log('[ERROR] There was an error creating vouchers', error)
		);
};

const setupProducts = () => {
	const productCreationPromises = products.map((product) => {
		const thisProduct = voucherify.products.create({
			name: product.name,
			source_id: product.source_id,
			price: product.price,
			image_url: product.metadata.imgUrl,
			metadata: {
				order: product.metadata.order,
				company: product.metadata.company,
				categories: product.metadata.categories.join(),
				info: product.metadata.info,
				weight: product.metadata.weight,
				slug: product.metadata.slug,
				sku: product.metadata.sku,
			},
		});
		return thisProduct
			.then((prod) => {
				const needsId = products.find((p) => p.source_id === prod.source_id);
				needsId.voucherifyId = prod.id;
			})
			.catch((error) =>
				console.log(
					`[ERROR] There was an error creating product ${product.name}`,
					error
				)
			);
	});
	return Promise.all(productCreationPromises)
		.then(() => console.log('[SUCCESS] Products setup'))
		.catch((error) =>
			console.log('[ERROR] There was an error creating products', error)
		);
};
const setupValidationRules = async () => {
	const rules = [
		{
			name: 'Buy Two, Get Three',
			error: { message: 'Check campaign rules' },
			rules: {
				1: {
					name: 'product.id',
					error: {
						message:
							'Cart must contain Johan & Nyström - Fika and Johan & Nyström - Sumatra',
					},
					rules: {},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Johan & Nyström - Fika')
									.voucherifyId,
							},
						],
					},
				},
				2: {
					name: 'product.id',
					error: {
						message:
							'Cart must contain Johan & Nyström - Fika and Johan & Nyström - Sumatra',
					},
					rules: {
						1: {
							name: 'product.quantity',
							rules: {},
							conditions: { $more_than_or_equal: [2] },
						},
						2: {
							name: 'product.discount_applicable',
							rules: {},
							conditions: { $is: [true] },
						},
						logic: '(1 and 2)',
					},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Johan & Nyström - Sumatra')
									.voucherifyId,
							},
						],
					},
				},
				logic: '(1 and 2)',
			},
		},
		{
			name: 'Black Friday Coupon',
			error: { message: 'Customer can redeem this voucher only once' },
			rules: {
				1: {
					name: 'redemption.count.per_customer',
					error: { message: 'Customer can redeem this voucher only once' },
					rules: {},
					conditions: { $less_than_or_equal: [1] },
				},
				logic: '1',
			},
		},
		{
			name: 'Visa Voucher',
			error: { message: 'Check the voucher rules' },
			rules: {
				1: {
					name: 'redemption.metadata',
					property: 'card',
					error: { message: 'Choose Visa Card as a payment method' },
					rules: {},
					conditions: { $is: ['Visa'] },
				},
				2: {
					name: 'order.amount',
					error: { message: 'Total cart value must be more than $100' },
					rules: {},
					conditions: { $more_than: [10000] },
				},
				logic: '(1) and (2)',
			},
		},
		{
			name: 'Happy Birthday Customer 2',
			rules: {
				1: {
					name: 'customer.metadata',
					rules: {},
					property: 'demostore_id',
					conditions: { $is: ['customer2'] },
				},
				logic: '1',
			},
		},
		{
			name: 'Happy Birthday Customer 1',
			rules: {
				1: {
					name: 'customer.metadata',
					rules: {},
					property: 'demostore_id',
					conditions: { $is: ['customer1'] },
				},
				logic: '1',
			},
		},
		{
			name: 'Happy Birthday Customer 3',
			rules: {
				1: {
					name: 'customer.metadata',
					rules: {},
					property: 'demostore_id',
					conditions: { $is: ['customer3'] },
				},
				logic: '1',
			},
		},
		{
			name: 'Double Trouble',
			error: { message: 'Check the campaign rules' },
			rules: {
				1: {
					name: 'product.id',
					error: {
						message: 'You must add 2 or more Johan & Nyström - Bourbon',
					},
					rules: {
						1: {
							name: 'product.quantity',
							rules: {},
							conditions: { $more_than_or_equal: [2] },
						},
						2: {
							name: 'product.discount_applicable',
							conditions: {
								$is: [true],
							},
							rules: {},
						},
						logic: '1 and 2',
					},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Johan & Nyström - Bourbon')
									.voucherifyId,
							},
						],
					},
				},
				logic: '1',
			},
		},
		{
			name: '5% off for Illy - Arabica',
			error: { message: 'Check the campaign rules' },
			rules: {
				1: {
					name: 'product.id',
					error: {
						message: 'You have to add Illy - Arabica to your cart',
					},
					rules: {},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Illy - Arabica')
									.voucherifyId,
							},
						],
					},
				},
				2: {
					name: 'order.amount',
					error: { message: 'Total cart value must be more than $50' },
					rules: {},
					conditions: { $more_than: [5000] },
				},
				logic: '(1) and (2)',
			},
		},
		{
			name: 'Gift Cards Campaign - Validation Rule',
			error: { message: 'Check campaign rules' },
			rules: {
				1: {
					name: 'order.amount',
					error: { message: 'Total cart value must be more than $50' },
					rules: {},
					conditions: {
						$more_than: [5000],
					},
				},
				logic: '1',
			},
		},
		{
			name: 'Referral Reward Tier 1 & 2 - Validation Rule',
			error: { message: 'Check campaign rules' },
			rules: {
				1: {
					name: 'order.amount',
					error: { message: 'Total cart value must be more than $50' },
					rules: {},
					conditions: {
						$more_than: [5000],
					},
				},
				logic: '1',
			},
		},
		{
			name: 'Let it snow',
			error: { message: 'Check campaign rules' },
			rules: {
				1: {
					name: 'order.amount',
					error: { message: 'Total cart value must be more than $50' },
					rules: {},
					conditions: {
						$more_than: [5000],
					},
				},
				2: {
					name: 'customer.segment',
					error: { message: 'Avaliable only for customers in "Snow" segment' },
					rules: {},
					conditions: {
						$is: [
							segments.find((s) => s.name === 'Snow').voucherifyId,
						],
					},
				},
				logic: '1',
			},
		},

		{
			name: 'Referral Campaign - Validation Rule',
			error: { message: 'Check campaign rules' },
			rules: {
				1: {
					name: 'campaign.redemptions.customers_count',
					error: { message: 'Only one redemption per customer in campaign' },
					rules: {},
					conditions: {
						$less_than_or_equal: [1],
					},
				},
				logic: '1',
			},
		},
		{
			name: 'Get 5% off your first purchase',
			error: { message: 'Check campaign rules' },
			rules: {
				1: {
					name: 'customer.segment',
					error: { message: 'Avaliable only for new customers' },
					rules: {},
					conditions: {
						$is: [
							segments.find((s) => s.name === 'New Customers').voucherifyId,
						],
					},
				},
				logic: '1',
			},
		},
		{
			name: 'Partnership Campaign',
			error: { message: 'Check campaign rules' },
			rules: {
				1: {
					name: 'customer.segment',
					error: { message: 'Customer must be from Poland' },
					rules: {},
					conditions: {
						$is: [
							segments.find((s) => s.name === 'Partnership Campaign')
								.voucherifyId,
						],
					},
				},
				logic: '1',
			},
		},
		{
			name: 'Final Tier - $10 off',
			error: { message: 'Check cart discount rules' },
			rules: {
				1: {
					name: 'order.amount',
					error: {
						message: 'Total cart value must be more than $100',
					},
					conditions: {
						$more_than: [10000],
					},
				},
				logic: '1',
			},
		},
		{
			name: 'First Tier - $3 off',
			error: { message: 'Check cart discount rules' },
			rules: {
				1: {
					name: 'order.amount',
					error: {
						message: 'Total cart value must be more than $30',
					},
					conditions: {
						$more_than: [3000],
					},
				},
				logic: '1',
			},
		},
		{
			name: 'Final Tier - 100% off for Hard Beans',
			error: { message: 'Check cart discount rules' },
			rules: {
				1: {
					name: 'product.id',
					error: {
						message: 'Cart must contain Johan & Nyström - Caravan',
					},
					rules: {},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Johan & Nyström - Caravan')
									.voucherifyId,
							},
						],
					},
				},
				2: {
					name: 'product.id',
					error: {
						message: 'Cart must contain Hard Beans - Brazil',
					},
					rules: {
						1: {
							name: 'product.discount_applicable',
							rules: {},
							conditions: { $is: [true] },
						},
						logic: '1',
					},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Hard Beans - Brazil')
									.voucherifyId,
							},
						],
					},
				},
				3: {
					name: 'order.amount',
					error: { message: 'Total cart value must be more than $100' },
					rules: {},
					conditions: { $more_than: [10000] },
				},
				logic: '((1) and (2)) and (3)',
			},
		},
		{
			name: 'First Tier - 50% off for Hard Beans',
			error: { message: 'Check cart discount rules' },
			rules: {
				1: {
					name: 'product.id',
					error: {
						message: 'Cart must contain Johan & Nyström - Caravan',
					},
					rules: {},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Johan & Nyström - Caravan')
									.voucherifyId,
							},
						],
					},
				},
				2: {
					name: 'product.id',
					error: {
						message: 'Cart must contain Hard Beans - Brazil',
					},
					rules: {
						1: {
							name: 'product.discount_applicable',
							rules: {},
							conditions: { $is: [true] },
						},
						logic: '1',
					},
					conditions: {
						$is: [
							{
								id: products.find((p) => p.name === 'Hard Beans - Brazil')
									.voucherifyId,
							},
						],
					},
				},
				logic: '(1) and (2)',
			},
		},
	];

	const ruleCreationPromises = rules.map((ruleDefinition) => {
		const validationRule = voucherify.validationRules.create(ruleDefinition);
		return validationRule
			.then((rule) => {
				const needsId = rules.find((res) => res.name === ruleDefinition.name);
				needsId.voucherifyId = rule.id;
				return rule;
			})
			.catch((error) =>
				console.log(
					`[ERROR] There was an error creating validation rule ${needsId.name}`,
					error
				)
			);
	});

	const campaignsRuleAssigmentPromises = () => {
		const assignmentsPerCampaign = campaigns.map((campaign) => {
			// We filter out campaign with indvidual coupons
			if (
				!campaign.metadata.assigned_val_rules ||
				campaign.name === 'Happy Birthday'
			) {
				return [];
			} else if (campaign.campaign_type === 'PROMOTION') {
				return campaign.promotion.tiers.map((tier) => {
					const needsId = rules.find((rule) => rule.name === tier.name)
						.voucherifyId;
					const validationRulesPromotionsAssigment = voucherify.validationRules.createAssignment(
						needsId,
						{ promotion_tier: tier.voucherifyId }
					);
					return validationRulesPromotionsAssigment.catch((error) =>
						console.log(
							`[ERROR] There was an error creating Promotion Tier assigment ${needsId}`,
							error
						)
					);
				});
			}
			const demostoreValRules = campaign.metadata.assigned_val_rules.split(
				'; '
			);
			return demostoreValRules.map((demostoreValRule) => {
				const needsId = rules.find((rule) => rule.name === demostoreValRule)
					.voucherifyId;
				const validationRulesCampaignsAssigment = voucherify.validationRules.createAssignment(
					needsId,
					{ campaign: campaign.voucherifyId }
				);
				return validationRulesCampaignsAssigment.catch((error) =>
					console.log(
						`[ERROR] There was an error creating campaign assigment ${needsId}`,
						error
					)
				);
			});
		});
		return _flatten(assignmentsPerCampaign);
	};

	const vouchersRuleAssigmentPromises = () => {
		const valRulesPerVoucher = vouchers.map((voucher) => {
			if (!voucher.metadata.assigned_val_rules) {
				return [];
			}
			const demostoreValRules = voucher.metadata.assigned_val_rules.split('; ');
			return demostoreValRules.map((demostoreValRule) => {
				const needsId = rules.find((rule) => rule.name === demostoreValRule)
					.voucherifyId;
				const validationRulesVouchersAssigment = voucherify.validationRules.createAssignment(
					needsId,
					{ voucher: voucher.code }
				);
				return validationRulesVouchersAssigment.catch((error) =>
					console.log(
						`[ERROR] There was an error creating voucher assigment ${needsId}`,
						error
					)
				);
			});
		});
		return _flatten(valRulesPerVoucher);
	};

	try {
		await Promise.all(ruleCreationPromises);
		console.log('[SUCCESS] All validation rules setup');
		await Promise.all(vouchersRuleAssigmentPromises());
		await Promise.all(campaignsRuleAssigmentPromises());
		console.log('[SUCCESS] All validation rule assignments created');
	} catch (error) {
		console.log('[ERROR] There was an error creating validation rules', error);
	}
};

setupSegments()
	.then(setupProducts)
	.then(setupCampaigns)
	.then(setupVouchers)
	.then(setupRewards)
	.then(setupValidationRules)
	.then(() => console.log('[SUCCESS] Setup finished'))
	.catch((error) =>
		console.log('[ERROR] There was an error creating project', error)
	);
