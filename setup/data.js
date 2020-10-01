exports.customers = [
  {
    source_id: 'alicemorgan',
    name: 'Alice Morgan',
    metadata: {
      firstName: 'Alice',
      country: 'UK',
      demostore_id: 'alicemorgan',
      individual_val_rule: 'Individual Coupon Alice Morgan',
      description:
        'A new customer who just logged into the Hot Beans shop for the very first time.',
      title: 'New Customer',
      avatar:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/customers/AliceMorgan.png',
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
    metadata: {
      firstName: 'Lewis',
      country: 'USA',
      demostore_id: 'lewismarshall',
      individual_val_rule: 'Individual Coupon Lewis Marshall',
      description: 'He already spent $300 in Hot Beans store',
      title: 'Hot Beans Fan',
      avatar:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/customers/LewisMarshall.png',
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
    metadata: {
      firstName: 'John',
      country: 'PL',
      demostore_id: 'johndorian',
      individual_val_rule: 'Individual Coupon John Dorian',
      description: 'He can take part in special campaign for foreign customers',
      title: 'Foreign Customer',
      avatar:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/customers/JohnDorian.png',
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
    category: 'Public',
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
    category: 'Public',
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
    category: 'Public',
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
        'Make an order and enjoy a 5% discount. Available only for new customers.',
      redemption_steps:
        'Customer Segment: Customers without any previous purchases',
      order: 1,
      carousel_banner_background_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner1.jpg',
    },
  },
  {
    name: 'Individual Coupon',
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
        'Individual Coupon Lewis Marshall; Individual Coupon Alice Morgan; Individual Coupon John Dorian',
      description:
        'Special coupon - each customer has unique code for his use only.',
      redemption_steps: 'Customer: Current customer',
      order: 1,
      carousel_banner_background_url:
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
        'Purchase Fika and Sumatra blend from Johan & Nyström to get Sumatra blend for free.',
      redemption_steps:
        'Cart contains: 1x Johan & Nyström - Fika, 1x Johan & Nyström - Sumatra',
      order: 1,
      promotion_product: '1x Johan & Nyström - Sumatra',
      demostore_product_info: 'Johan & Nyström - Sumatra',
      carousel_banner_background_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner4.jpg',
      carousel_banner_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/image1.jpg',
    },
  },
  {
    name: '5% off for Illy Arabica',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { percent_off: 5, type: 'PERCENT' },
    },
    metadata: {
      assigned_val_rules: '5% off for Illy Arabica',
      demostore_product_info: 'Illy Arabica Guatemala',
      description:
        'Make an order above 50$ and have Illy Arabica Guatemala in your cart to get a 5% discount on your order.',
      redemption_steps:
        'Cart value: > $50; Cart contains: Illy Arabica Guatemala',
      order: 2,
      carousel_banner_background_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner5.jpg',
      carousel_banner_url:
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
        'Get a double-pack of Bourbon by Johan & Nyström to get a 15$ off your order.',
      redemption_steps: 'Cart contains: 2x Johan & Nyström - Bourbon',
      order: 3,
      demostore_product_info: 'Johan & Nyström - Bourbon',
      carousel_banner_background_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner6.jpg',
      carousel_banner_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/image2.jpg',
    },
  },
  {
    name: 'Join our newsletter and get 5% discount',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { amount_off: 500, type: 'AMOUNT' },
    },
    metadata: {
      description:
        'Unite coffee lovers of the world. Join our newsletter to get an extra 5% discount on all orders.',
      redemption_steps: 'Customers action: Subscribed to newsletter',
      order: 3,
      assigned_val_rules: '',
      autoPublish: false,
      carousel_banner_background_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner5.jpg',
    },
  },
  {
    name: 'Special Deal for Poles',
    type: 'AUTO_UPDATE',
    voucher: {
      type: 'DISCOUNT_VOUCHER',
      discount: { percent_off: 13, type: 'PERCENT' },
    },
    metadata: {
      assigned_val_rules: 'Special Deal for Poles',
      description:
        'If your location is Poland, enjoy a 13% discount available only for our Polish customers.',
      redemption_steps: 'Customers segment: Customers from Poland',
      order: 5,
      carousel_banner_background_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner2.jpg',
    },
  },
  {
    name: 'Buy more, save more',
    campaign_type: 'PROMOTION',
    metadata: {
      assigned_val_rules: 'Final Tier - $10 off; First Tier - $3 off',
      description:
        'Make an order below 30$ and get a 3$ off your order. Enjoy a 10$ discount if your order exceeds 30$.',
      carousel_banner_background_url:
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
            promotion_name: 'Buy more, save more',
            promotion_tier_name: 'Final Tier - $10 off',
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
            promotion_name: 'Buy more, save more',
            promotion_tier_name: 'First Tier - $3 off',
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
        'Enjoy a 50% discount on Hard Beans Brazil blend. Simply add Hard Beans Brazil and Caravan by Johan & Nyström to your cart. Get one pack of Hard Beans completely for free if your order of Hard Beans Brazil and Johan & Nyström Caravan exceeds 100$.',
      assigned_val_rules:
        'Final Tier - 100% off for Hard Beans; First Tier - 50% off for Hard Beans',
      carousel_banner_background_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/banner7.jpg',
      carousel_banner_url:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/carousel/image3.jpg',
      demostore_product_info: 'Hard Beans - Brazil',
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
            promotion_product: '1x Hard Beans - Brazil',
            redemption_steps:
              'Cart contains: Johan & Nyström - Caravan, Hard Beans - Brazil; Cart value: > $100',
            order: 1,
            promotion_name: 'Get Hard Beans for free',
            promotion_tier_name: 'Final Tier - 100% off for Hard Beans',
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
            promotion_product: '1x Hard Beans - Brazil',
            redemption_steps:
              'Cart contains: Johan & Nyström - Caravan, Hard Beans - Brazil',
            order: 2,
            promotion_name: 'Get Hard Beans for free',
            promotion_tier_name: 'First Tier - 50% off for Hard Beans',
            qualification_name: 'First Tier - Get Hard Beans for free',
          },
        },
      ],
    },
  },
];

exports.segments = [
  {
    type: 'auto-update',
    name: 'Special Deal for Poles',
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
];

exports.products = [
  {
    name: 'Illy Arabica Guatemala',
    source_id: '11',
    price: 830,
    metadata: {
      order: 1,
      company: 'Illy',
      categories: ['Coffee', 'Whole Bean', 'Single Origin'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Arabica+Selection+-+Guatemala.jpg',
      info:
        "Illy Arabica is a new line of single origin coffee from Illy's roaster. The beans from Guatemala is characterized by a complex flavour with the delicate hints of caramel, chocolate and honey. In Guatemala, Coffee is grown on the fertile soil high in the mountains. Suitable temperatures are the result of the hot air current from Mexico. That, along with farmers' care, results in the beans with intense aroma, complex flavour and pleasant sweetness.",
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
    name: 'Nivona CafeRomatica 759',
    source_id: '13',
    price: 71400,
    metadata: {
      order: 3,
      company: 'Nivona',
      categories: ['Coffee Machines'],
      imgUrl:
        'https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Nivona+CafeRomatica+759.jpg',
      info:
        'Nivona CafeRomatica 759 is the perfect machine for all those how like their life and their coffee clear, strong and uncomplicated. This model satisfies admirers of clean lines with its matt black front and a new quieter grinder.',
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
    name: 'Illy Espresso Decaffeinato',
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
        'Hario Cafe Press Slim is a typical French Press made in Japan. Capacity: 240 ml. Colour: black Small and handy, used to brew 2 cups of tea or coffee. Just pour hot water over ground coffee, press the brew and, in a few minutes, you can enjoy your favourite coffee! How to prepare coffee with French Press? You can find the answer in our Knowledge Base: French Press.',
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
        "Size: V60-01 Colour: white Material: plastic Would you like to get started with alternative methods of coffee brewing, but don't know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.",
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
        "Size: V60-01 Colour: red Material: plastic Would you like to get started with alternative methods of coffee brewing, but don't know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.",
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
        "Size: V60-01 Colour: transparent Material: plastic Would you like to get started with alternative methods of coffee brewing, but don't know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.",
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
        'A special version of paper filters from Hario - each one is cut in the original shape of a bird! Their conical shape allows for comfortable brewing. The package contains 20 pieces of natural disposable filters, which are a great solution for Hario V60-02.',
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
        '100 Hario filters designed for conical coffee drippers. Hario Drip brews amazing coffee but only when you use a suitable filter. This is the most standard version of filters which allow for very good water flow. Size: fits Hario V60-02',
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
