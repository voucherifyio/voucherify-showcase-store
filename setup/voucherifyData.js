exports.customers = [
  {
    source_id: 'alicemorgan',
    name: 'Alice Morgan',
    email: 'alice@morgan.io',
    metadata: {
      country: 'UK',
      gender: 'F',
      demostore_id: 'alicemorgan',
      customerValidationRuleName: 'Welcome wave 5% off Alice Morgan',
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
    source_id: 'lewismarshall',
    name: 'Lewis Marshall',
    email: 'lewis_marshall@gmail.com',
    metadata: {
      country: 'USA',
      gender: 'M',
      demostore_id: 'lewismarshall',
      customerValidationRuleName: 'Welcome wave 5% off Lewis Marshall',
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
    source_id: 'johndorian',
    name: 'John Dorian',
    email: 'john_d@scrubs.net',
    metadata: {
      country: 'PL',
      gender: 'M',
      demostore_id: 'johndorian',
      customerValidationRuleName: 'Welcome wave 5% off John Dorian',
    },
    address: {
      city: 'Warsaw',
      state: 'Masovian Voivodeship',
      line_1: 'Wspólna 2/24',
      country: 'Poland',
      postal_code: '01-002',
    },
  },
];

exports.vouchers = [
  {
    code: 'BLCKFRDY',
    object: 'voucher',
    type: 'DISCOUNT_VOUCHER',
    category: 'Public',
    discount: { type: 'AMOUNT', amount_off: 1000 },
    metadata: {
      demostoreName: 'Black Friday Coupon',
      demostoreAssignedValRules: 'Black Friday Coupon',
      demostoreDescription: 'Global coupon',
      demostoreSteps: 'Only one redemption per customer',
      demostoreOrder: 2,
    },
  },
  {
    code: '50%OFF',
    object: 'voucher',
    type: 'DISCOUNT_VOUCHER',
    category: 'Public',
    discount: { type: 'PERCENT', percent_off: 50 },
    metadata: {
      demostoreName: '50%OFF',
      demostoreAssignedValRules: '',
      demostoreDescription: 'Global coupon',
      demostoreSteps: '',
      demostoreOrder: 3,
    },
  },
  {
    code: 'UPTO100',
    object: 'voucher',
    type: 'DISCOUNT_VOUCHER',
    category: 'Public',
    discount: { type: 'PERCENT', percent_off: 50, amount_limit: 10000 },
    metadata: {
      demostoreName: 'UPTO100',
      demostoreAssignedValRules: '',
      demostoreDescription: 'Global coupon',
      demostoreSteps: '',
      demostoreOrder: 4,
    },
  },
  {
    code: '15%VISA',
    object: 'voucher',
    type: 'DISCOUNT_VOUCHER',
    category: 'Public',
    discount: { type: 'PERCENT', percent_off: 15 },
    metadata: {
      demostoreName: 'Visa Voucher',
      demostoreAssignedValRules: 'Visa Voucher',
      demostoreDescription: 'Global coupon',
      demostoreSteps: 'Cart value: > $100;Payment method: Visa',
      demostoreOrder: 1,
    },
  },
];

exports.campaigns = [
  {
    name: 'Welcome wave 5% off',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { percent_off: 5, type: 'PERCENT' },
      redemption: {
        quantity: 1,
      },
    },
    metadata: {
      demostoreName: 'Welcome wave 5% off',
      demostoreAssignedValRules:
        'Welcome wave 5% off Lewis Marshall;Welcome wave 5% off Alice Morgan;Welcome wave 5% off John Dorian',
      demostoreDescription:
        'Only current customer can validate the coupon. Redeemable only once',
      demostoreSteps: 'Customer: Current customer',
      demostoreOrder: 1,
    },
  },
  {
    name: 'BOGO Campaign',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { percent_off: 100, type: 'PERCENT' },
    },
    metadata: {
      demostoreName: 'BOGO Campaign',
      demostoreAssignedValRules: 'BOGO Campaign',
      demostoreDescription: 'Add to items to cart to use this coupon',
      demostoreSteps:
        'Cart contains: 1x Johan & Nyström - Fika, 1x Johan & Nyström - Sumatra',
      demostoreOrder: 1,
      demostoreBOGO: '1x Johan & Nyström - Sumatra',
    },
  },
  {
    name: '5% off for Illy Arabica - Guatemala',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { percent_off: 5, type: 'PERCENT' },
    },
    metadata: {
      demostoreName: '5% off for Illy Arabica - Guatemala',
      demostoreAssignedValRules: '5% off for Illy Arabica - Guatemala',
      demostoreDescription:
        'Total cart value must be greater than $50 and you must have a Illy Arabica - Guatemala in it',
      demostoreSteps:
        'Cart value: > $50;Cart contains: Illy Arabica - Guatemala',
      demostoreOrder: 2,
    },
  },
  {
    name: '$15 off for Johan & Nystrom - Bourbon double-pack',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { amount_off: 1500, type: 'AMOUNT' },
    },
    metadata: {
      demostoreName: '$15 off for Johan & Nystrom - Bourbon double-pack',
      demostoreAssignedValRules:
        '$15 off for Johan & Nystrom - Bourbon double-pack',
      demostoreDescription:
        'You must have 2 of Johan & Nyström - Bourbon in cart',
      demostoreSteps: 'Cart contains: 2x Johan & Nyström - Bourbon',
      demostoreOrder: 3,
    },
  },
  {
    name: '13% off - Local promotion',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { percent_off: 13, type: 'PERCENT' },
    },
    metadata: {
      demostoreName: '13% off - Local promotion',
      demostoreAssignedValRules: '13% off - Local promotion',
      demostoreDescription: 'Only for Polish customers',
      demostoreSteps: 'Customers segment: Customers from Poland',
      demostoreOrder: 5,
    },
  },
  {
    name: 'Tiered Discount',
    campaign_type: 'PROMOTION',
    metadata: {
      demostoreAssignedValRules: 'Final Tier - $10 off;First Tier - $3 off',
      demostoreName: 'Tiered Discount',
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
            demostoreName: 'Final Tier - $10 off',
            demostoreTierName: 'Final Tier - $10 off',
            demostoreSteps: 'Cart value: > $100',
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
            demostoreName: 'First Tier - $3 off',
            demostoreTierName: 'First Tier - $3 off',
            demostoreSteps: 'Cart value: > $30',
          },
        },
      ],
    },
  },
  {
    name: 'BOGO Discount',
    campaign_type: 'PROMOTION',
    metadata: {
      demostoreAssignedValRules:
        'Final Tier - 100% off for Hard Beans - Brazil;First Tier - 50% off Hard Beans - Brazil',
      demostoreName: 'BOGO Discount',
    },
    promotion: {
      tiers: [
        {
          name: 'Final Tier - 100% off for Hard Beans - Brazil',
          banner: 'Congratulations, you get Hard Beans - Brazil for free',
          action: {
            discount: { percent_off: 100, type: 'PERCENT' },
          },
          metadata: {
            demostoreName: 'Final Tier - 100% off for Hard Beans - Brazil',
            demostoreTierName: 'Final Tier - 100% off for Hard Beans - Brazil',
            demostoreSteps:
              'Cart contains: Johan & Nyström - Caravan, Hard Beans - Brazil;Cart value: > $100',
          },
        },
        {
          name: 'First Tier - 50% off Hard Beans - Brazil',
          banner:
            'Congratulations, you get Hard Beans - Brazil for 50%. Add more items to get it for free!',
          action: {
            discount: { percent_off: 50, type: 'PERCENT' },
          },
          metadata: {
            demostoreName: 'First Tier - 50% off Hard Beans - Brazil',
            demostoreTierName: 'First Tier - 50% off Hard Beans - Brazil',
            demostoreSteps:
              'Cart contains: Johan & Nyström - Caravan, Hard Beans - Brazil',
          },
        },
      ],
    },
  },
];

exports.segments = [
  {
    type: 'auto-update',
    name: '13% off - Local promotion',
    filter: {
      'address.country': {
        conditions: {
          $is: ['Poland'],
        },
      },
    },
  },
];

exports.products = [
  {
    name: 'Illy Arabica - Guatemala',
    source_id: '11',
    price: 830,
    metadata: {
      demostoreOrder: 1,
      company: 'Illy',
      categories: ['Coffee', 'Whole Bean', 'Single Origin'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Arabica+Selection+-+Guatemala.jpg',
      info:
        "Illy Arabica is a new line of single origin coffee from Illy's roaster. The beans from Guatemala is characterized by a complex flavour with the delicate hints of caramel, chocolate and honey.\n\nIn Guatemala, Coffee is grown on the fertile soil high in the mountains. Suitable temperatures are the result of the hot air current from Mexico. That, along with farmers' care, results in the beans with intense aroma, complex flavour and pleasant sweetness.",
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
      demostoreOrder: 2,
      company: 'Johan & Nyström',
      categories: ['Coffee', 'Whole Bean'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Bourbon+Jungle.jpg',
      info:
        'Background for this blend comes from the longing for a real dark roasting of high-quality coffee beans. Although the beans are dark roasted, they keep their clear and intense aroma. This coffee has a smoky flavour with a slight hint of sweetness and loads of fruit notes.\nThanks to the experience in the dark roasting of coffee, the beans still retain most of their aromas. Its aftertaste is clear and remains for a long time. This coffee is perfect for a Dripper, French Press, Moka coffee maker and the traditional espresso brewing method.\n\nThis edition consists of:\n- Brazil Primavera\n- El Salvador Menendez 84+\n- Burundi Aahore Blend\n- Burundi Long Miles Gaharo EX\n\nBrand:\tJohan & Nyström\nPackage:\t500 g\nWhole bean / Ground Coffee:\tWhole bean\nArabica / Robusta:\t100% Arabica\nRoast level:\tdark\nBrewing method:\tPour over and espresso',
      weight: 0,
      slug: '7350045060389',
      sku: '7350045060389',
    },
  },
  {
    name: 'Nivona CafeRomatica 759',
    source_id: '13',
    price: 71400,
    metadata: {
      demostoreOrder: 3,
      company: 'Nivona',
      categories: ['Coffee Machines'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Nivona+CafeRomatica+759.jpg',
      info:
        'Nivona CafeRomatica 759 is the perfect machine for all those how like their life and their coffee clear, strong and uncomplicated. This model satisfies admirers of clean lines with its matt black front and a new quieter grinder.\n\nFeatures:\nNEW: Quiet grinder\nNEW: Aroma Balance System with three aroma profiles\nMY COFFEE - a memorable, individual coffee recipe at the touch of a button\nWater tank with 2,2 l capacity\nLive programming of all recipes\nLow noise, hardened steel conical grinder\nRemovable brewing unit for easy and hygienic cleaning\nCoffee temperature adjustable in 3 stages\nCoffee strength adjustable in 3 stages\nECO mode and zero watt energy-saving off switch\nAutomatic rinse system for milk frother\nHygienic care programmes for cleaning, descaling and rinsing at the touch of a button\nStatistics function and maintenance monitoring\nAutomatic level monitoring for water\nGrind size individually adjustable\nUp to 14 cm height-adjustable coffee outlet\nCup stand\n15 bar pump pressure\nHot water for tea\nExtra coffee powder compartment\nAroma protection lid\nIncluding CLARIS fresh water filter, cleaning tablets, milk hose and measuring spoon\nTimeless design: matt black and chrome trim',
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
      demostoreOrder: 4,
      company: 'Johan & Nyström',
      categories: ['Coffee', 'Whole Bean'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Fika.jpg',
      info:
        'Fika is an important part of Swedish culture which means a tea or coffee break. This coffee was created to cultivate this tradition. This is full-bodied, perfectly balanced coffee with delicate hints of cocoa. Have a coffee break!\n',
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
        'Sumatra comes from the province of Ache located in the northern part of Sumatra. This is dark roasted coffee with the intense aroma of spices and fresh figs. Its rich, well-balanced flavour will satisfy even the most demanding palate.\n\nThis coffee comes from Koptan Gayo Megah Bersiri cooperative, which currently has 545 members. The cooperative started to operate in January 2012 and, as soon as in November of the same year, it received the full status of an organic coffee producer and Fair Trade certificate.',
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
        'Background for this blend comes from the longing for a real dark roasting of high-quality coffee beans. Although the beans are dark roasted, they keep their clear and intense aroma. This coffee has full sweetness of cacao, a note of walnuts and slight bitterness.\nThanks to the experience in the dark roasting of coffee, the beans still retain most of their aromas. Its aftertaste is clear and remains for a long time. This coffee is perfect for a Dripper, French Press, Moka coffee maker and the traditional espresso brewing method.',
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
        'Speciality coffee beans from Brazil, roasted by Hard Beans from Poland. Medium roast, perfect for espresso machines and moka pots. You can expect hints of nougat, nuts and red apples.\n\nCountry: Brazil\nRegion: Sul de Minas\nProcess: Pulped natural\nVariety: Yellow Bourbon\nAltitude: 1200 m a.s.l.',
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
        'The blend consists of coffee beans from Ethiopia, Sumatra, and Nicaragua. Together they create a flavourful espresso with loads of chocolate and sweet fruit. The Ethiopian coffee brings delicate and fruity notes, while the Sumatran and Nicaraguan beans provide some heavier sweet hints. Not only loaded with flavour, but also prepared ethically!\n\n\nThese coffee beans come from cooperatives that are certified by the Fair Trade Organisation. The farms are completely organic and FTO ensures that the coffee growers receive a fair price and thus support for funding long-term, sustainable plantations.',
      weight: 500,
      slug: '7350045060815',
      sku: '7350045060815',
    },
  },
  {
    name: 'Illy Espresso Decaffeinato',
    source_id: '21',
    price: 760,
    metadata: {
      company: 'Illy',
      categories: ['Coffee', 'Ground', 'Decaffeinated'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Espresso+Decaffeinato+-+Decaffeinated+ground+coffee.jpg',
      info:
        "Illy espresso is coffee with thick chestnut crema. Its taste offers many flavours such as nuts, fruit and pleasant wood notes.\n\nAccording to the Illy's roaster, caffeine content in the blend is less than 0.05%, which makes it very gentle on your stomach so you can drink it without having to worry in case of any medical contraindications for drinking of traditional coffee.",
      weight: 250,
      slug: '8003753900490',
      sku: '8003753900490',
    },
  },
  {
    name: 'Hario Cafe Press Slim S',
    source_id: '23',
    price: 3000,
    metadata: {
      company: 'Hario',
      categories: ['Coffee Machines'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+Cafe+Press+Slim+S+Transparent+Black.jpg',
      info:
        'Hario Cafe Press Slim is a typical French Press made in Japan. Capacity: 240 ml. Colour: black\nSmall and handy, used to brew 2 cups of tea or coffee. Just pour hot water over ground coffee, press the brew and, in a few minutes, you can enjoy your favourite coffee! How to prepare coffee with French Press? You can find the answer in our Knowledge Base: French Press.',
      weight: 0,
      slug: '4977642153608',
      sku: '4977642153608',
    },
  },
  {
    name: 'Hario V60-01 Plastic Dripper',
    source_id: '25',
    price: 520,
    metadata: {
      company: 'Hario',
      categories: ['Coffee Machines', 'Accessories'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60-01+Plastic+Dripper+White.jpg',
      info:
        'Size: V60-01\nColour: white\nMaterial: plastic\n\nWould you like to get started with alternative methods of coffee brewing, but don\'t know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.\n\nThe plastic version is the least expensive choice among V-60 drippers. Still, it is not any worse from other versions in terms of taste sensations. In addition, its plastic body provides durability and comfort if you want to use Hario V-60 when travelling. Its conical form and special grooves on the inside of the dripper provide excellent water flow. To prepare delicious coffee you need freshly ground coffee of high quality, a filter, your favourite cup or server and scales. Put the filter in the dripper and put it on the vessel that you use for serving coffee. The infusion process takes only 3 - 4 minutes.\n\nAnother advantage of this method is extremely easy maintenance. After use, simply remove the filter and wash the dripper in running water or in a dishwasher.\n\nThe translation of Hario is "the King of Glass," which perfectly reflects the achievements of the company. The brand was founded in 1921 and ever since it has been producing the highest quality products made of glass, ceramics and metal. The production process takes place in Japan along with the best environmental sustainability.',
      weight: 0,
      slug: '4977642724204',
      sku: '4977642724204',
    },
  },
  {
    name: 'Hario V60-02 Plastic Dripper',
    source_id: '26',
    price: 520,
    metadata: {
      company: 'Hario',
      categories: ['Coffee Machines', 'Accessories'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60-01+Plastic+Dripper+Red.jpg',
      info:
        'Size: V60-01\nColour: red\nMaterial: plastic\n\nWould you like to get started with alternative methods of coffee brewing, but don\'t know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.\n\nThe plastic version is the least expensive choice among V-60 drippers. Still, it is not any worse from other versions in terms of taste sensations. In addition, its plastic body provides durability and comfort if you want to use Hario V-60 when travelling. Its conical form and special grooves on the inside of the dripper provide excellent water flow. To prepare delicious coffee you need freshly ground coffee of high quality, a filter, your favourite cup or server and scales. Put the filter in the dripper and put it on the vessel that you use for serving coffee. The infusion process takes only 3 - 4 minutes.\n\nAnother advantage of this method is extremely easy maintenance. After use, simply remove the filter and wash the dripper in running water or in a dishwasher.\n\nThe translation of Hario is "the King of Glass," which perfectly reflects the achievements of the company. The brand was founded in 1921 and ever since it has been producing the highest quality products made of glass, ceramics and metal. The production process takes place in Japan along with the best environmental sustainability.',
      weight: 0,
      slug: '4977642724228',
      sku: '4977642724228',
    },
  },
  {
    name: 'Hario V60 Plastic Dripper 01',
    source_id: '27',
    price: 520,
    metadata: {
      company: 'Hario',
      categories: ['Coffee Machines', 'Accessories'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60+Plastic+Dripper+01+clear.jpg',
      info:
        'Size: V60-01 Colour: transparent Material: plastic\n\nWould you like to get started with alternative methods of coffee brewing, but don\'t know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.\n\nThe plastic version is the least expensive choice among V-60 drippers. Still, it is not any worse from other versions in terms of taste sensations. In addition, its plastic body provides durability and comfort if you want to use Hario V-60 when travelling. Its conical form and special grooves on the inside of the dripper provide excellent water flow. To prepare delicious coffee you need freshly ground coffee of high quality, a filter, your favourite cup or server and scales. Put the filter in the dripper and put it on the vessel that you use for serving coffee. The infusion process takes only 3 - 4 minutes.\n\nAnother advantage of this method is extremely easy maintenance. After use, simply remove the filter and wash the dripper in running water or in a dishwasher.\n\nThe translation of Hario is "the King of Glass," which perfectly reflects the achievements of the company. The brand was founded in 1921 and ever since it has been producing the highest quality products made of glass, ceramics and metal. The production process takes place in Japan along with the best environmental sustainability.',
      weight: 0,
      slug: '4977642723016',
      sku: '4977642723016',
    },
  },
  {
    name: 'Hario Love Dori',
    source_id: '28',
    price: 450,
    metadata: {
      company: 'Hario',
      categories: ['Accessories'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+Love+Dori+-+Loveripper+-+paper+filters+for+V60-02+dripper.jpg',
      info:
        'A special version of paper filters from Hario - each one is cut in the original shape of a bird! Their conical shape allows for comfortable brewing.\nThe package contains 20 pieces of natural disposable filters, which are a great solution for Hario V60-02.',
      weight: 0,
      slug: '4977642726314',
      sku: '4977642726314',
    },
  },
  {
    name: 'Hario V60-02 filters',
    source_id: '29',
    price: 570,
    metadata: {
      company: 'Hario',
      categories: ['Accessories'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60-02+paper+filters.jpg',
      info:
        '100 Hario filters designed for conical coffee drippers.\nHario Drip brews amazing coffee but only when you use a suitable filter. This is the most standard version of filters which allow for very good water flow. Size: fits Hario V60-02',
      weight: 0,
      slug: '4977642723320',
      sku: '4977642723320',
    },
  },
  {
    name: 'Glowbeans',
    source_id: '30',
    price: 790,
    metadata: {
      company: 'Glowbeans',
      categories: ['Accessories'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Glowbeans+-+The+Gabi+Master+A+-+White+Paper+Filters+100+pcs.jpg',
      info:
        '100 white, wave paper filters with flat bottom for Glowbeans The Gabi Master A coffee brewer.',
      weight: 0,
      slug: '8809539890029',
      sku: '8809539890029',
    },
  },
];
