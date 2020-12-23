/* eslint-disable */
exports.customers = [
	{
		metadata: {
			demostore_id: 'customer1',
			individual_val_rule: 'Happy Birthday Customer 1',
			description:
				'A new customer who just logged into the Hot Beans shop for the very first time.',
			title: 'New Customer',
			avatar:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/customers/AliceMorgan.jpg',
			isSnow: false,
			isCold: false,
		},
		address: {
			city: 'London',
			state: 'Greater London',
			line_1: '10 Downing Street',
			country: 'England',
			postal_code: 'E1 7AA',
		},
	},
	{
		metadata: {
			demostore_id: 'customer2',
			individual_val_rule: 'Happy Birthday Customer 2',
			description: 'He already spent $300 in Hot Beans store',
			title: 'Hot Beans Fan',
			avatar:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/customers/LewisMarshall.jpg',
			isSnow: false,
			isCold: false,
		},
		address: {
			city: 'Los Angeles',
			state: 'California',
			line_1: '4302  Norman Street',
			country: 'USA',
			postal_code: '90015',
		},
	},
	{
		metadata: {
			demostore_id: 'customer3',
			individual_val_rule: 'Happy Birthday Customer 3',
			description: 'He can take part in special partnership campaign',
			title: 'Partner Customer',
			avatar:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/customers/JohnDorian.jpg',
			isSnow: false,
			isCold: false,
		},
		address: {
			city: 'Warsaw',
			state: 'Masovian Voivodeship',
			line_1: 'Wspólna 2/24',
			country: 'Poland',
			postal_code: '01-002',
		},
	},
	{
		metadata: {
			demostore_id: 'referralCustomer1',
			description: 'Customer for referral campaign purposes',
			title: 'Referral Friend #1',
			isSnow: false,
			isCold: false,
		},
		address: {
			city: 'München',
			state: 'Freistaat Bayern',
			line_1: 'Rosenstrasse 44',
			country: 'Germany',
			postal_code: '81337',
		},
	},
	{
		metadata: {
			demostore_id: 'referralCustomer2',
			description: 'Customer for referral campaign purposes',
			title: 'Referral Friend #2',
			isSnow: false,
			isCold: false,
		},
		address: {
			city: 'Airdrie',
			state: 'North Lanarkshire',
			line_1: '22 Asfordby Rd',
			country: 'Scotland',
			postal_code: 'ML6 1YN',
		},
	},
	{
		metadata: {
			demostore_id: 'referralCustomer3',
			description: 'Customer for referral campaign purposes',
			title: 'Referral Friend #3',
			isSnow: false,
			isCold: false,
		},
		address: {
			city: 'Tulsa',
			state: 'Oklahoma',
			line_1: '4882  Henry Ford Avenue',
			country: 'United States',
			postal_code: '74119',
		},
	},
];

exports.vouchers = [
	{
		code: 'BLCKFRDY',
		object: 'voucher',
		type: 'DISCOUNT_VOUCHER',
		category: 'Hot Beans',
		discount: { type: 'AMOUNT', amount_off: 1000 },
		metadata: {
			name: 'Black Friday Coupon',
			assigned_val_rules: 'Black Friday Coupon',
			description: 'Global coupon',
			redemption_steps: 'Only one redemption per customer',
			order: 2,
		},
	},
	{
		code: '50%OFF',
		object: 'voucher',
		type: 'DISCOUNT_VOUCHER',
		category: 'Hot Beans',
		discount: { type: 'PERCENT', percent_off: 50 },
		metadata: {
			name: '50% Off',
			assigned_val_rules: '',
			description: 'Global coupon',
			redemption_steps: '',
			order: 3,
		},
	},
	{
		code: 'UPTO100',
		object: 'voucher',
		type: 'DISCOUNT_VOUCHER',
		category: 'Hot Beans',
		discount: { type: 'PERCENT', percent_off: 50, amount_limit: 10000 },
		metadata: {
			name: 'Discount up to $100',
			assigned_val_rules: '',
			description: 'Global coupon',
			redemption_steps: '',
			order: 4,
		},
	},
	{
		code: '15%VISA',
		object: 'voucher',
		type: 'DISCOUNT_VOUCHER',
		category: 'Hot Beans',
		discount: { type: 'PERCENT', percent_off: 15 },
		metadata: {
			name: 'Visa Voucher',
			assigned_val_rules: 'Visa Voucher',
			description: 'Global coupon',
			redemption_steps: 'Cart value: > $100; Payment method: Visa',
			order: 1,
		},
	},
];

exports.campaigns = [
	{
		name: 'Loyalty Campaign',
		metadata: {
			auto_publish: false,
			assigned_rewards:
				'Loyalty Reward - Voucher; Loyalty Reward - Pay by Points; Loyalty Reward - Free coffee',
			assigned_rewards_points: '100; null; 150',
			redemption_steps:
				'Enter Program: Make first purchase or after signup for newsletter!',
			earning_rules:
				"Entering Segment 'Loyal Customers' (at least one purchase): 100 points; Newsletter signup: 80 points; Product purchase: 1 point for every $10 spent",
			rewards:
				'Reward 1: Discount Voucher 10%; Reward 2: Pay by points - 1 point = $0.50; Reward 3: Hard Beans - Brazil',
			tiers:
				'Name: Newbie; Points: 100 - 150 | Name: Aspiring coffee maniac; Points: 151 - 200; Earning rule changes: Newsletter singup for 100 points; Reward changes: Discount voucher for 50 points | Name: Coffe prodigy; Points: +201; Reward changes: Discount voucher for 10 points, Free coffee for 10 points',
			description:
				'You will join our Loyalty Program after your first purchase! Exchange loyalty points for discounts (apply the loyalty card code in the checkout), use points to pay for your order, or get a free coffee through your customer cockpit.',
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner6.jpg',
		},
		type: 'AUTO_UPDATE',
		auto_join: true,
		voucher: {
			type: 'LOYALTY_CARD',
			loyalty_card: {
				points: 0,
			},
			code_config: {
				pattern: 'HOT-BEANS-#######',
			},
		},
		vouchers_count: 0,
		campaign_type: 'LOYALTY_PROGRAM',
		join_once: false,
	},
	{
		name: 'Gift Cards Campaign',
		type: 'AUTO_UPDATE',
		voucher: {
			type: 'GIFT_VOUCHERS',
			gift: {
				amount: 10000,
			},
			redemption: {
				quantity: null,
			},
		},
		metadata: {
			assigned_val_rules: 'Gift Cards Campaign - Validation Rule',
			redemption_steps: 'Cart value: > $50',
			description: 'Use your gift card to buy some amazing coffee!',
		},
	},
	{
		name: 'Referral Campaign',
		type: 'AUTO_UPDATE',
		campaign_type: 'REFERRAL_PROGRAM',
		referral_program: {
			conversion_event_type: 'redemption',
		},
		voucher: {
			is_referral_code: true,
			discount: {
				type: 'AMOUNT',
				amount_off: 1000,
			},
			redemption: {
				quantity: null,
			},
		},
		metadata: {
			assigned_val_rules: 'Referral Campaign - Validation Rule',
			redemption_steps:
				'First reward: 1 referred customer; Final reward: 3 referred customers',
			description:
				"Share your referral code with three of your friends! For one	referral you will get voucher with 5% discount, for three it's 10%. New customers only!",
		},
	},
	{
		name: 'Loyalty Reward - Voucher',
		type: 'AUTO_UPDATE',
		metadata: {
			auto_publish: false,
		},
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: {
				percent_off: 10,
				type: 'PERCENT',
			},
			redemption: {
				quantity: 1,
			},
		},
	},
	{
		name: 'Referral Reward Tier 1 - Voucher 5%',
		type: 'AUTO_UPDATE',
		metadata: {
			auto_publish: false,
			redemption_steps: 'Cart value: > $50',
			assigned_val_rules: 'Referral Reward Tier 1 & 2 - Validation Rule',
		},
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: {
				percent_off: 5,
				type: 'PERCENT',
			},
			redemption: {
				quantity: 1,
			},
		},
	},
	{
		name: 'Referral Reward Tier 2 - Voucher 10%',
		type: 'AUTO_UPDATE',
		metadata: {
			redemption_steps: 'Cart value: > $50',
			auto_publish: false,
			assigned_val_rules: 'Referral Reward Tier 1 & 2 - Validation Rule',
		},
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: {
				percent_off: 10,
				type: 'PERCENT',
			},
			redemption: {
				quantity: 1,
			},
		},
	},
	{
		name: 'Get 5% off your first purchase',
		type: 'AUTO_UPDATE',
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { percent_off: 5, type: 'PERCENT' },
			redemption: {
				quantity: 1,
			},
		},
		metadata: {
			assigned_val_rules: 'Get 5% off your first purchase',
			description:
				'Make an order and enjoy a 5% discount. Avaliable only for new customers.',
			redemption_steps:
				'Customer Segment: Customers without any previous purchases',
			order: 1,
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner1.jpg',
		},
	},
	{
		name: 'Happy Birthday',
		type: 'AUTO_UPDATE',
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { percent_off: 5, type: 'PERCENT' },
			redemption: {
				quantity: 1,
			},
		},
		metadata: {
			assigned_val_rules:
				'Happy Birthday Customer 2; Happy Birthday Customer 1; Happy Birthday Customer 3',
			description:
				'Special coupon - each customer has unique code for his/her use only.',
			redemption_steps: 'Customer: Current customer',
			order: 1,
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner4.jpg',
		},
	},
	{
		name: 'Buy Two, Get Three',
		type: 'AUTO_UPDATE',
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { percent_off: 100, type: 'PERCENT' },
		},
		metadata: {
			assigned_val_rules: 'Buy Two, Get Three',
			description:
				'Add 1x Johan & Nyström - Fika and 2x Johan & Nyström - Sumatra blend to get one 1x Johan & Nyström - Sumatra blend for free.',
			redemption_steps:
				'Cart contains: 1x Johan & Nyström - Fika, 2x Johan & Nyström - Sumatra',
			order: 1,
			discount_suffix: '1x Johan & Nyström - Sumatra',
			promotion_product: 'Johan & Nyström - Sumatra',
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner4.jpg',
			img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/image1.jpg',
		},
	},
	{
		name: '5% off for Illy - Arabica',
		type: 'AUTO_UPDATE',
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { percent_off: 5, type: 'PERCENT' },
		},
		metadata: {
			assigned_val_rules: '5% off for Illy - Arabica',
			promotion_product: 'Illy - Arabica',
			description:
				'Make an order above $50 and have Illy - Arabica in your cart to get a 5% discount on your order.',
			redemption_steps: 'Cart value: > $50; Cart contains: Illy - Arabica',
			order: 2,
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner5.jpg',
			img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/image4.jpg',
		},
	},
	{
		name: 'Double Trouble',
		type: 'AUTO_UPDATE',
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { amount_off: 1500, type: 'AMOUNT' },
		},
		metadata: {
			assigned_val_rules: 'Double Trouble',
			description:
				'Get a double-pack of Johan & Nyström - Bourbon to get a $15 off your order.',
			redemption_steps: 'Cart contains: 2x Johan & Nyström - Bourbon',
			order: 3,
			promotion_product: 'Johan & Nyström - Bourbon',
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner6.jpg',
			img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/image2.jpg',
		},
	},
	{
		name: 'Join our newsletter and get $5 discount',
		type: 'AUTO_UPDATE',
		join_once: true,
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { amount_off: 500, type: 'AMOUNT' },
			redemption: { quantity: 1 },
		},
		metadata: {
			description:
				'Unite coffee lovers of the world. Join our newsletter to get an extra $5 discount on your next order.',
			redemption_steps: 'Customers action: Subscribed to newsletter',
			order: 3,
			assigned_val_rules: '',
			auto_publish: false,
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner5.jpg',
		},
	},
	{
		name: 'Partnership Campaign',
		type: 'AUTO_UPDATE',
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { percent_off: 13, type: 'PERCENT' },
		},
		metadata: {
			assigned_val_rules: 'Partnership Campaign',
			description:
				'If your location is Poland, enjoy a 13% discount avaliable only for our Polish customers.',
			redemption_steps: 'Customers segment: Customers from Poland',
			order: 5,
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner2.jpg',
		},
	},
	{
		name: 'Buy more, save more',
		campaign_type: 'PROMOTION',
		metadata: {
			assigned_val_rules: 'Final Tier - $10 off; First Tier - $3 off',
			description:
				'Make an order above $30 and get a $3 off your order. Enjoy a $10 discount if your order exceeds $100.',
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner3.jpg',
		},
		promotion: {
			tiers: [
				{
					name: 'Final Tier - $10 off',
					banner: 'Congratulations, you get $10 off!',
					action: {
						discount: {
							type: 'AMOUNT',
							amount_off: 1000,
						},
					},
					metadata: {
						qualification_name: 'Final Tier - Buy more, save more',
						redemption_steps: 'Cart value: > $100',
						order: 1,
					},
				},
				{
					name: 'First Tier - $3 off',
					banner:
						'Congratulations, you get $3 off! Add more items for bigger discount!',
					action: {
						discount: {
							type: 'AMOUNT',
							amount_off: 300,
						},
					},
					metadata: {
						redemption_steps: 'Cart value: > $30',
						order: 2,
						qualification_name: 'First Tier - Buy more, save more',
					},
				},
			],
		},
	},
	{
		name: 'Get Hard Beans for free',
		campaign_type: 'PROMOTION',
		metadata: {
			description:
				'Enjoy a 50% discount on Hard Beans - Brazil blend. Simply add Hard Beans - Brazil and Johan & Nyström - Caravan to your cart. Get one pack of Hard Beans - Brazil completely for free if your order of Hard Beans - Brazil and Johan & Nyström - Caravan exceeds $100.',
			assigned_val_rules:
				'Final Tier - 100% off for Hard Beans; First Tier - 50% off for Hard Beans',
			carousel_banner_img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner7.jpg',
			img_url:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/image3.jpg',
			promotion_product: 'Hard Beans - Brazil',
		},
		promotion: {
			tiers: [
				{
					name: 'Final Tier - 100% off for Hard Beans',
					banner: 'Congratulations, you get Hard Beans - Brazil for free',
					action: {
						discount: { percent_off: 100, type: 'PERCENT' },
					},
					metadata: {
						discount_suffix: '1x Hard Beans - Brazil',
						redemption_steps:
							'Cart contains: Johan & Nyström - Caravan, Hard Beans - Brazil; Cart value: > $100',
						order: 1,
						qualification_name: 'Final Tier - Get Hard Beans for free',
					},
				},
				{
					name: 'First Tier - 50% off for Hard Beans',
					banner:
						'Congratulations, you get Hard Beans - Brazil for 50%. Add more items to get it for free!',
					action: {
						discount: { percent_off: 50, type: 'PERCENT' },
					},
					metadata: {
						discount_suffix: '1x Hard Beans - Brazil',
						redemption_steps:
							'Cart contains: Johan & Nyström - Caravan, Hard Beans - Brazil',
						order: 2,
						qualification_name: 'First Tier - Get Hard Beans for free',
					},
				},
			],
		},
	},
	{
		name: 'Let it snow 1',
		auto_join: false,
		campaign_type: 'DISCOUNT_COUPONS',
		join_once: true,
		metadata: {
			description:
				'If it is snowing in your location, you will get a 10% discount voucher valid if your order is above 50$',
			assigned_val_rules: 'Let it snow 1',
			redemption_steps: 'Cart value: > $50',
			auto_publish: false,
		},
		voucher: {
			type: 'DISCOUNT_VOUCHER',
			discount: { percent_off: 10, type: 'PERCENT' },
		},
		type: 'AUTO_UPDATE',
	},
	{
		name: 'Let it snow 2',
		auto_join: false,
		join_once: true,
		metadata: {
			description:
				'If it is snowing and the temperature is below -15C in your location, you will get a 40$ gift card, valid if your order is above 100$.',
			assigned_val_rules: 'Let it snow 2',
			redemption_steps: 'Cart value: > $100',
			auto_publish: false,
		},
		voucher: {
			type: 'GIFT_VOUCHER',
			gift: {
				amount: 4000,
			},
			redemption: {
				quantity: null,
			},
		},
		type: 'AUTO_UPDATE',
	},
];

exports.segments = [
	{
		type: 'auto-update',
		name: 'Partnership Campaign',
		filter: {
			'address.country': {
				conditions: {
					$is: ['Poland'],
				},
			},
		},
	},
	{
		type: 'auto-update',
		name: 'Get 5% off your first purchase',
		filter: {
			junction: 'and',
			'summary.orders.total_count': {
				conditions: {
					$is: [0],
				},
			},
		},
	},
	{
		type: 'auto-update',
		name: 'Loyal Customers',
		filter: {
			junction: 'and',
			'summary.orders.total_count': {
				conditions: {
					$is: [1],
				},
			},
		},
	},
	{
		type: 'auto-update',
		name: 'New customers',
		filter: {
			junction: 'and',
			'summary.orders.total_count': {
				conditions: {
					$is: [0],
				},
			},
		},
	},
	{
		type: 'auto-update',
		name: 'Let it snow 1',
		filter: {
			junction: 'and',
			'metadata.isSnow': {
				conditions: {
					$is: ['true'],
				},
			},
			'metadata.isCold': {
				conditions: {
					$is: ['false'],
				},
			},
		},
	},
	{
		type: 'auto-update',
		name: 'Let it snow 2',
		filter: {
			junction: 'and',
			'metadata.isSnow': {
				conditions: {
					$is: ['true'],
				},
			},
			'metadata.isCold': {
				conditions: {
					$is: ['true'],
				},
			},
		},
	},
];

exports.products = [
	{
		name: 'Illy - Arabica',
		source_id: '11',
		price: 830,
		metadata: {
			order: 1,
			company: 'Illy',
			categories: ['Coffee', 'Whole Bean', 'Single Origin'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Arabica+Selection+-+Guatemala.jpg',
			info:
				"Arabica is a new line of single origin coffee from Illy's roaster. The beans from Guatemala is characterized by a complex flavour with the delicate hints of caramel, chocolate and honey. In Guatemala, Coffee is grown on the fertile soil high in the mountains. Suitable temperatures are the result of the hot air current from Mexico. That, along with farmers' care, results in the beans with intense aroma, complex flavour and pleasant sweetness.",
			weight: 250,
			slug: '8003753970073',
			sku: '8003753970073',
		},
	},
	{
		name: 'Johan & Nyström - Bourbon',
		source_id: '12',
		price: 1750,
		metadata: {
			order: 2,
			company: 'Johan & Nyström',
			categories: ['Coffee', 'Whole Bean'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Bourbon+Jungle.jpg',
			info:
				'Background for this blend comes from the longing for a real dark roasting of high-quality coffee beans. Although the beans are dark roasted, they keep their clear and intense aroma. This coffee has a smoky flavour with a slight hint of sweetness and loads of fruit notes. Thanks to the experience in the dark roasting of coffee, the beans still retain most of their aromas. Its aftertaste is clear and remains for a long time. This coffee is perfect for a Dripper, French Press, Moka coffee maker and the traditional espresso brewing method.',
			weight: 0,
			slug: '7350045060389',
			sku: '7350045060389',
		},
	},
	{
		name: 'Nivona - CafeRomatica 759',
		source_id: '13',
		price: 71400,
		metadata: {
			order: 3,
			company: 'Nivona',
			categories: ['Coffee Machines'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Nivona+CafeRomatica+759.jpg',
			info:
				'CafeRomatica 759 is the perfect machine for all those how like their life and their coffee clear, strong and uncomplicated. This model satisfies admirers of clean lines with its matt black front and a new quieter grinder.',
			weight: 0,
			slug: '4260083467596',
			sku: '4260083467596',
		},
	},
	{
		name: 'Johan & Nyström - Fika',
		source_id: '14',
		price: 1300,
		metadata: {
			order: 4,
			company: 'Johan & Nyström',
			categories: ['Coffee', 'Whole Bean'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Fika.jpg',
			info:
				'Fika is an important part of Swedish culture which means a tea or coffee break. This coffee was created to cultivate this tradition. This is full-bodied, perfectly balanced coffee with delicate hints of cocoa. Have a coffee break! ',
			weight: 500,
			slug: '7350045060433',
			sku: '7350045060433',
		},
	},
	{
		name: 'Johan & Nyström - Sumatra',
		source_id: '15',
		price: 1900,
		metadata: {
			company: 'Johan & Nyström',
			categories: ['Whole Bean', 'Coffee', 'Fairtrade'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Sumatra+Gayo+Mountain+Fairtrade+500g.jpg',
			info:
				'Sumatra comes from the province of Ache located in the northern part of Sumatra. This is dark roasted coffee with the intense aroma of spices and fresh figs. Its rich, well-balanced flavour will satisfy even the most demanding palate.',
			weight: 500,
			slug: '857354768463',
			sku: '857354768463',
		},
	},
	{
		name: 'Johan & Nyström - Caravan',
		source_id: '16',
		price: 1750,
		metadata: {
			company: 'Johan & Nyström',
			categories: ['Coffee', 'Whole Bean'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Caravan.jpg',
			info:
				"We have created a blend of beans from some of the world's top countries producing coffee. To create classic dark-roasted coffee, we combined the softness of Mogiana from Brazil, the consistency of Lintung from Sumatra and the freshness of Ethiopia and Colombia. Caravan is a blend created for dark-roasted coffee lovers. Strong, with well-defined aroma and long lasting flavour.",
			weight: 500,
			slug: '7350045061225',
			sku: '7350045061225',
		},
	},
	{
		name: 'Johan & Nyström - Urban',
		source_id: '17',
		price: 1800,
		metadata: {
			company: 'Johan & Nyström',
			categories: ['Coffee', 'Whole Bean'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Urban+Juice.jpg',
			info:
				'Background for this blend comes from the longing for a real dark roasting of high-quality coffee beans. Although the beans are dark roasted, they keep their clear and intense aroma. This coffee has full sweetness of cacao, a note of walnuts and slight bitterness.',
			weight: 500,
			slug: '7350045064356',
			sku: '7350045064356',
		},
	},
	{
		name: 'Hard Beans - Brazil',
		source_id: '18',
		price: 3000,
		metadata: {
			company: 'Hard Beans',
			categories: ['Coffee', 'Whole Bean'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hard+Beans+-+Brazil+Samambaia+Espresso+1kg.jpg',
			info:
				'Speciality coffee beans from Brazil, roasted by Hard Beans from Poland. Medium roast, perfect for espresso machines and moka pots. You can expect hints of nougat, nuts and red apples. Country: Brazil Region: Sul de Minas Process: Pulped natural Variety: Yellow Bourbon Altitude: 1200 m a.s.l.',
			weight: 1000,
			slug: '756576756756',
			sku: '756576756756',
		},
	},
	{
		name: 'Johan & Nyström - Bueno',
		source_id: '19',
		price: 1900,
		metadata: {
			company: 'Johan & Nyström',
			categories: ['Coffee', 'Whole Bean', 'Fairtrade'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Buena+Vista+Fairtrade.jpg',
			info:
				'Bueno is Fair Trade coffee. It contains 100% organic and certified coffee beans. This healthy blend tastes best when brewed using French Press or filter coffee maker.',
			weight: 500,
			slug: '7350045060808',
			sku: '7350045060808',
		},
	},
	{
		name: 'Johan & Nyström - Espresso',
		source_id: '20',
		price: 1900,
		metadata: {
			company: 'Johan & Nyström',
			categories: ['Coffee', 'Whole Bean', 'Fairtrade'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Espresso+Fairtrade.jpg',
			info:
				'The blend consists of coffee beans from Ethiopia, Sumatra, and Nicaragua. Together they create a flavourful espresso with loads of chocolate and sweet fruit. The Ethiopian coffee brings delicate and fruity notes, while the Sumatran and Nicaraguan beans provide some heavier sweet hints. Not only loaded with flavour, but also prepared ethically!',
			weight: 500,
			slug: '7350045060815',
			sku: '7350045060815',
		},
	},
	{
		name: 'Illy - Decaffeinato',
		source_id: '21',
		price: 760,
		metadata: {
			company: 'Illy',
			categories: ['Coffee', 'Ground', 'Decaffeinated'],
			imgUrl:
				'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Espresso+Decaffeinato+-+Decaffeinated+ground+coffee.jpg',
			info:
				"Illy espresso is coffee with thick chestnut crema. Its taste offers many flavours such as nuts, fruit and pleasant wood notes. According to the Illy's roaster, caffeine content in the blend is less than 0.05%, which makes it very gentle on your stomach so you can drink it without having to worry in case of any medical contraindications for drinking of traditional coffee.",
			weight: 250,
			slug: '8003753900490',
			sku: '8003753900490',
		},
	},
];
