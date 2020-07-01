const versionNumber = 110;

exports.versionNumber = versionNumber;

exports.vouchers = [
  {
    code: `BLCKFRDY#${versionNumber}`,
    object: "voucher",
    type: "DISCOUNT_VOUCHER",
    category: "STANDALONE",
    discount: { type: "AMOUNT", amount_off: 1000 },
    metadata: {
      demostoreName: `Black Friday Coupon`,
      demostoreAssignedValRules: "val_voD2pK2M8biX",
      demostoreVersion: versionNumber,
      demostoreDescription: "Global coupon",
      demostoreSteps: "Only one redemption per customer",
      demostoreOrder: 1,
      demostoreCategory: "VOUCHER",
    },
  },
  {
    code: `50%OFF#${versionNumber}`,
    object: "voucher",
    type: "DISCOUNT_VOUCHER",
    category: "STANDALONE",
    discount: { type: "PERCENT", percent_off: 50 },
    metadata: {
      demostoreName: `50%OFF`,
      demostoreAssignedValRules: "",
      demostoreVersion: versionNumber,
      demostoreDescription: "Global coupon",
      demostoreSteps: "",
      demostoreOrder: 3,
      demostoreCategory: "VOUCHER",
    },
  },
];

exports.campaigns = [
  {
    name: `Welcome wave 5% off #${versionNumber}`,
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { percent_off: 5, type: "PERCENT" },
    },
    metadata: {
      demostoreName: "Welcome wave 5% off",
      demostoreAssignedValRules: "",
      demostoreVersion: versionNumber,
      demostoreDescription: "Only current customer can validate the coupon",
      demostoreSteps: "Customer: Current customer",
      demostoreOrder: 1,
      demostoreCategory: "CAMPAIGN",
    },
  },
  {
    name: `Buy One - Get One #${versionNumber}`,
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { percent_off: 100, type: "PERCENT" },
    },
    metadata: {
      demostoreName: "Buy One - Get One",
      demostoreAssignedValRules: "val_qIRy7h0VKyge",
      demostoreVersion: versionNumber,
      demostoreDescription: "Add to items to cart to use this coupon",
      demostoreSteps:
        "Cart contains: 1x Johan & Nyström - Fika, 1x Johan & Nyström - Sumatra Gayo Mountain Fairtrade 500g",
      demostoreOrder: 1,
      demostoreBOGO: "1x Johan & Nyström - Sumatra Gayo Mountain Fairtrade 500g",
      demostoreCategory: "CAMPAIGN",
    },
  },
  {
    name: `5% off for Illy Arabica Selection - Guatemala #${versionNumber}`,
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { percent_off: 5, type: "PERCENT" },
    },
    metadata: {
      demostoreName: "5% off for Illy Arabica Selection - Guatemala",
      demostoreAssignedValRules: "val_l6k6T16xpQYN",
      demostoreVersion: versionNumber,
      demostoreDescription:
        "Total cart value must be greater than $50 and you must have a Illy Arabica Selection - Guatemala in it",
      demostoreSteps:
        "Cart value: > $50;Cart contains: Illy Arabica Selection - Guatemala",
      demostoreOrder: 2,
      demostoreCategory: "CAMPAIGN",
    },
  },
  {
    name: `$15 off for Johan & Nystrom - Bourbon Jungle double-pack #${versionNumber}`,
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { amount_off: 1500, type: "AMOUNT" },
    },
    metadata: {
      demostoreName:
        "$15 off for Johan & Nystrom - Bourbon Jungle double-pack",
      demostoreAssignedValRules: "val_phBbhUNtDFHj",
      demostoreVersion: versionNumber,
      demostoreDescription:
        "You must have 2 of Johan & Nyström - Bourbon Jungle in cart",
      demostoreSteps: "Cart contains: 2x Johan & Nyström - Bourbon Jungle",
      demostoreOrder: 3,
      demostoreCategory: "CAMPAIGN",
    },
  },
  {
    name: `13% off - Local promotion (Poland) #${versionNumber}`,
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { percent_off: 13, type: "PERCENT" },
    },
    metadata: {
      demostoreName: "Only for Polish customers",
      demostoreAssignedValRules: "val_AHvj4CKkJmJq",
      demostoreVersion: versionNumber,
      demostoreDescription: "Only for Polish customers",
      demostoreSteps: "Customers segment: Customers from Poland",
      demostoreOrder: 5,
      demostoreCategory: "CAMPAIGN",
    },
  },
];

exports.segments = [
  {
    type: "auto-update",
    name: "Poland",
    filter: {
      "address.country": {
        conditions: {
          $is: ["Poland"],
        },
      },
    },
  },
];

exports.products = [
  {
    name: "Illy Arabica Selection - Guatemala",
    source_id: "11",
    price: 830,
    metadata: {
      demostore: "moltin",
      demostoreOrder: 1,
      company: "Illy",
      categories: ["Coffee", "Whole Bean", "Single Origin"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Arabica+Selection+-+Guatemala.jpg",
      info:
        "Illy Arabica Selection is a new line of single origin coffee from Illy's roaster. The beans from Guatemala is characterized by a complex flavour with the delicate hints of caramel, chocolate and honey.\n\nIn Guatemala, Coffee is grown on the fertile soil high in the mountains. Suitable temperatures are the result of the hot air current from Mexico. That, along with farmers' care, results in the beans with intense aroma, complex flavour and pleasant sweetness.",
      weight: 250,
      slug: "8003753970073",
      sku: "8003753970073",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Johan & Nyström - Bourbon Jungle",
    source_id: "12",
    price: 1750,
    metadata: {
      demostore: "moltin",
      demostoreOrder: 2,
      company: "Johan & Nyström",
      categories: ["Coffee", "Whole Bean"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Bourbon+Jungle.jpg",
      info:
        "Background for this blend comes from the longing for a real dark roasting of high-quality coffee beans. Although the beans are dark roasted, they keep their clear and intense aroma. This coffee has a smoky flavour with a slight hint of sweetness and loads of fruit notes.\nThanks to the experience in the dark roasting of coffee, the beans still retain most of their aromas. Its aftertaste is clear and remains for a long time. This coffee is perfect for a Dripper, French Press, Moka coffee maker and the traditional espresso brewing method.\n\nThis edition consists of:\n- Brazil Primavera\n- El Salvador Menendez 84+\n- Burundi Aahore Blend\n- Burundi Long Miles Gaharo EX\n\nBrand:\tJohan & Nyström\nPackage:\t500 g\nWhole bean / Ground Coffee:\tWhole bean\nArabica / Robusta:\t100% Arabica\nRoast level:\tdark\nBrewing method:\tPour over and espresso",
      weight: 0,
      slug: "7350045060389",
      sku: "7350045060389",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Nivona CafeRomatica 759",
    source_id: "13",
    price: 71400,
    metadata: {
      demostore: "moltin",
      demostoreOrder: 3,
      company: "Nivona",
      categories: ["Coffee Machines"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Nivona+CafeRomatica+759.jpg",
      info:
        "Nivona CafeRomatica 759 is the perfect machine for all those how like their life and their coffee clear, strong and uncomplicated. This model satisfies admirers of clean lines with its matt black front and a new quieter grinder.\n\nFeatures:\nNEW: Quiet grinder\nNEW: Aroma Balance System with three aroma profiles\nMY COFFEE - a memorable, individual coffee recipe at the touch of a button\nWater tank with 2,2 l capacity\nLive programming of all recipes\nLow noise, hardened steel conical grinder\nRemovable brewing unit for easy and hygienic cleaning\nCoffee temperature adjustable in 3 stages\nCoffee strength adjustable in 3 stages\nECO mode and zero watt energy-saving off switch\nAutomatic rinse system for milk frother\nHygienic care programmes for cleaning, descaling and rinsing at the touch of a button\nStatistics function and maintenance monitoring\nAutomatic level monitoring for water\nGrind size individually adjustable\nUp to 14 cm height-adjustable coffee outlet\nCup stand\n15 bar pump pressure\nHot water for tea\nExtra coffee powder compartment\nAroma protection lid\nIncluding CLARIS fresh water filter, cleaning tablets, milk hose and measuring spoon\nTimeless design: matt black and chrome trim",
      weight: 0,
      slug: "4260083467596",
      sku: "4260083467596",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Johan & Nyström - Fika",
    source_id: "14",
    price: 1300,
    metadata: {
      demostore: "moltin",
      demostoreOrder: 4,
      company: "Johan & Nyström",
      categories: ["Coffee", "Whole Bean"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Fika.jpg",
      info:
        "Fika is an important part of Swedish culture which means a tea or coffee break. This coffee was created to cultivate this tradition. This is full-bodied, perfectly balanced coffee with delicate hints of cocoa. Have a coffee break!\n",
      weight: 500,
      slug: "7350045060433",
      sku: "7350045060433",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Johan & Nyström - Sumatra Gayo Mountain",
    source_id: "15",
    price: 1900,
    metadata: {
      demostore: "moltin",
      company: "Johan & Nyström",
      categories: ["Whole Bean", "Coffee", "Fairtrade"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Sumatra+Gayo+Mountain+Fairtrade+500g.jpg",
      info:
        "Sumatra Gayo Mountain comes from the province of Ache located in the northern part of Sumatra. This is dark roasted coffee with the intense aroma of spices and fresh figs. Its rich, well-balanced flavour will satisfy even the most demanding palate.\n\nThis coffee comes from Koptan Gayo Megah Bersiri cooperative, which currently has 545 members. The cooperative started to operate in January 2012 and, as soon as in November of the same year, it received the full status of an organic coffee producer and Fair Trade certificate.",
      weight: 500,
      slug: "857354768463",
      sku: "857354768463",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Johan & Nyström - Caravan",
    source_id: "16",
    price: 1750,
    metadata: {
      demostore: "moltin",
      company: "Johan & Nyström",
      categories: ["Coffee", "Whole Bean"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Caravan.jpg",
      info:
        "We have created a blend of beans from some of the world's top countries producing coffee. To create classic dark-roasted coffee, we combined the softness of Mogiana from Brazil, the consistency of Lintung from Sumatra and the freshness of Ethiopia and Colombia. Caravan is a blend created for dark-roasted coffee lovers. Strong, with well-defined aroma and long lasting flavour.",
      weight: 500,
      slug: "7350045061225",
      sku: "7350045061225",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Johan & Nyström - Urban Juice",
    source_id: "17",
    price: 1800,
    metadata: {
      demostore: "moltin",
      company: "Johan & Nyström",
      categories: ["Coffee", "Whole Bean"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Urban+Juice.jpg",
      info:
        "Background for this blend comes from the longing for a real dark roasting of high-quality coffee beans. Although the beans are dark roasted, they keep their clear and intense aroma. This coffee has full sweetness of cacao, a note of walnuts and slight bitterness.\nThanks to the experience in the dark roasting of coffee, the beans still retain most of their aromas. Its aftertaste is clear and remains for a long time. This coffee is perfect for a Dripper, French Press, Moka coffee maker and the traditional espresso brewing method.",
      weight: 500,
      slug: "7350045064356",
      sku: "7350045064356",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hard Beans - Brazil Samambaia",
    source_id: "18",
    price: 3000,
    metadata: {
      demostore: "moltin",
      company: "Hard Beans",
      categories: ["Coffee", "Whole Bean"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hard+Beans+-+Brazil+Samambaia+Espresso+1kg.jpg",
      info:
        "Speciality coffee beans from Brazil, roasted by Hard Beans from Poland. Medium roast, perfect for espresso machines and moka pots. You can expect hints of nougat, nuts and red apples.\n\nCountry: Brazil\nRegion: Sul de Minas\nProcess: Pulped natural\nVariety: Yellow Bourbon\nAltitude: 1200 m a.s.l.",
      weight: 1000,
      slug: "756576756756",
      sku: "756576756756",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Johan & Nyström - Buena Vista",
    source_id: "19",
    price: 1900,
    metadata: {
      demostore: "moltin",
      company: "Johan & Nyström",
      categories: ["Coffee", "Whole Bean", "Fairtrade"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Buena+Vista+Fairtrade.jpg",
      info:
        "Buena Vista is Fair Trade coffee. It contains 100% organic and certified coffee beans. This healthy blend tastes best when brewed using French Press or filter coffee maker.",
      weight: 500,
      slug: "7350045060808",
      sku: "7350045060808",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Johan & Nyström - Espresso Fairtrade",
    source_id: "20",
    price: 1900,
    metadata: {
      demostore: "moltin",
      company: "Johan & Nyström",
      categories: ["Coffee", "Whole Bean", "Fairtrade"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Espresso+Fairtrade.jpg",
      info:
        "The blend consists of coffee beans from Ethiopia, Sumatra, and Nicaragua. Together they create a flavourful espresso with loads of chocolate and sweet fruit. The Ethiopian coffee brings delicate and fruity notes, while the Sumatran and Nicaraguan beans provide some heavier sweet hints. Not only loaded with flavour, but also prepared ethically!\n\n\nThese coffee beans come from cooperatives that are certified by the Fair Trade Organisation. The farms are completely organic and FTO ensures that the coffee growers receive a fair price and thus support for funding long-term, sustainable plantations.",
      weight: 500,
      slug: "7350045060815",
      sku: "7350045060815",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Illy Espresso Decaffeinato - ground coffee",
    source_id: "21",
    price: 760,
    metadata: {
      demostore: "moltin",
      company: "Illy",
      categories: ["Coffee", "Ground", "Decaffeinated"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Espresso+Decaffeinato+-+Decaffeinated+ground+coffee.jpg",
      info:
        "Illy espresso is coffee with thick chestnut crema. Its taste offers many flavours such as nuts, fruit and pleasant wood notes.\n\nAccording to the Illy's roaster, caffeine content in the blend is less than 0.05%, which makes it very gentle on your stomach so you can drink it without having to worry in case of any medical contraindications for drinking of traditional coffee.",
      weight: 250,
      slug: "8003753900490",
      sku: "8003753900490",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Illy Espresso Decaffeinato - coffee beans",
    source_id: "22",
    price: 760,
    metadata: {
      demostore: "moltin",
      company: "Illy",
      categories: ["Coffee", "Whole Bean", "Decaffeinated"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Espresso+Decaffeinato+-+Decaffeinated+coffee+beans.jpg",
      info:
        "According to the Illy's roaster, caffeine content in the blend is less than 0.05%, which makes it very gentle on your stomach so you can drink it without having to worry in case of any medical contraindications for drinking of traditional coffee.\n\nIlly espresso is coffee with thick chestnut crema. Its taste offers many flavours such as nuts, fruit and pleasant wood notes.",
      weight: 250,
      slug: "8003753900551",
      sku: "8003753900551",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hario Cafe Press Slim S Black",
    source_id: "23",
    price: 3000,
    metadata: {
      demostore: "moltin",
      company: "Hario",
      categories: ["Coffee Machines"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+Cafe+Press+Slim+S+Transparent+Black.jpg",
      info:
        "Hario Cafe Press Slim is a typical French Press made in Japan. Capacity: 240 ml. Colour: black\nSmall and handy, used to brew 2 cups of tea or coffee. Just pour hot water over ground coffee, press the brew and, in a few minutes, you can enjoy your favourite coffee! How to prepare coffee with French Press? You can find the answer in our Knowledge Base: French Press.",
      weight: 0,
      slug: "4977642153608",
      sku: "4977642153608",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hario Cafe Press Slim S Red",
    source_id: "24",
    price: 3000,
    metadata: {
      demostore: "moltin",
      company: "Hario",
      categories: ["Coffee Machines"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+Cafe+Press+Slim+S+Red.jpg",
      info:
        "Hario Cafe Press Slim is a typical French Press, red version, made in Japan. Capacity: 240 ml Colour: red.\nSmall and handy, used to brew 2 cups of tea or coffee. Just pour hot water over ground coffee, press the brew and, in a few minutes, you can enjoy your favourite coffee! How to prepare coffee with French Press? You can find the answer in our Knowledge Base: French Press.",
      weight: 0,
      slug: "4977642153615",
      sku: "4977642153615",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hario V60-01 Plastic Dripper White",
    source_id: "25",
    price: 520,
    metadata: {
      demostore: "moltin",
      company: "Hario",
      categories: ["Coffee Machines", "Accessories"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60-01+Plastic+Dripper+White.jpg",
      info:
        'Size: V60-01\nColour: white\nMaterial: plastic\n\nWould you like to get started with alternative methods of coffee brewing, but don\'t know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.\n\nThe plastic version is the least expensive choice among V-60 drippers. Still, it is not any worse from other versions in terms of taste sensations. In addition, its plastic body provides durability and comfort if you want to use Hario V-60 when travelling. Its conical form and special grooves on the inside of the dripper provide excellent water flow. To prepare delicious coffee you need freshly ground coffee of high quality, a filter, your favourite cup or server and scales. Put the filter in the dripper and put it on the vessel that you use for serving coffee. The infusion process takes only 3 - 4 minutes.\n\nAnother advantage of this method is extremely easy maintenance. After use, simply remove the filter and wash the dripper in running water or in a dishwasher.\n\nThe translation of Hario is "the King of Glass," which perfectly reflects the achievements of the company. The brand was founded in 1921 and ever since it has been producing the highest quality products made of glass, ceramics and metal. The production process takes place in Japan along with the best environmental sustainability.',
      weight: 0,
      slug: "4977642724204",
      sku: "4977642724204",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hario V60-01 Plastic Dripper Red",
    source_id: "26",
    price: 520,
    metadata: {
      demostore: "moltin",
      company: "Hario",
      categories: ["Coffee Machines", "Accessories"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60-01+Plastic+Dripper+Red.jpg",
      info:
        'Size: V60-01\nColour: red\nMaterial: plastic\n\nWould you like to get started with alternative methods of coffee brewing, but don\'t know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.\n\nThe plastic version is the least expensive choice among V-60 drippers. Still, it is not any worse from other versions in terms of taste sensations. In addition, its plastic body provides durability and comfort if you want to use Hario V-60 when travelling. Its conical form and special grooves on the inside of the dripper provide excellent water flow. To prepare delicious coffee you need freshly ground coffee of high quality, a filter, your favourite cup or server and scales. Put the filter in the dripper and put it on the vessel that you use for serving coffee. The infusion process takes only 3 - 4 minutes.\n\nAnother advantage of this method is extremely easy maintenance. After use, simply remove the filter and wash the dripper in running water or in a dishwasher.\n\nThe translation of Hario is "the King of Glass," which perfectly reflects the achievements of the company. The brand was founded in 1921 and ever since it has been producing the highest quality products made of glass, ceramics and metal. The production process takes place in Japan along with the best environmental sustainability.',
      weight: 0,
      slug: "4977642724228",
      sku: "4977642724228",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hario V60 Plastic Dripper 01 clear",
    source_id: "27",
    price: 520,
    metadata: {
      demostore: "moltin",
      company: "Hario",
      categories: ["Coffee Machines", "Accessories"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60+Plastic+Dripper+01+clear.jpg",
      info:
        'Size: V60-01 Colour: transparent Material: plastic\n\nWould you like to get started with alternative methods of coffee brewing, but don\'t know what to choose? Hario V-60 Dripper is just for you! This Japanese gadget allows you to make the most of your coffee in a simple and effective way. The filter method is great fun and allows for experimenting with coffee. Surprise your friends with rich taste and aroma of coffee, and the technique of its preparation! Hario V60-01 allows you to brew 200 - 360 ml of coffee at a time, which is enough for a big mug or two smaller portions.\n\nThe plastic version is the least expensive choice among V-60 drippers. Still, it is not any worse from other versions in terms of taste sensations. In addition, its plastic body provides durability and comfort if you want to use Hario V-60 when travelling. Its conical form and special grooves on the inside of the dripper provide excellent water flow. To prepare delicious coffee you need freshly ground coffee of high quality, a filter, your favourite cup or server and scales. Put the filter in the dripper and put it on the vessel that you use for serving coffee. The infusion process takes only 3 - 4 minutes.\n\nAnother advantage of this method is extremely easy maintenance. After use, simply remove the filter and wash the dripper in running water or in a dishwasher.\n\nThe translation of Hario is "the King of Glass," which perfectly reflects the achievements of the company. The brand was founded in 1921 and ever since it has been producing the highest quality products made of glass, ceramics and metal. The production process takes place in Japan along with the best environmental sustainability.',
      weight: 0,
      slug: "4977642723016",
      sku: "4977642723016",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hario Love Dori - Loveripper",
    source_id: "28",
    price: 450,
    metadata: {
      demostore: "moltin",
      company: "Hario",
      categories: ["Accessories"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+Love+Dori+-+Loveripper+-+paper+filters+for+V60-02+dripper.jpg",
      info:
        "A special version of paper filters from Hario - each one is cut in the original shape of a bird! Their conical shape allows for comfortable brewing.\nThe package contains 20 pieces of natural disposable filters, which are a great solution for Hario V60-02.",
      weight: 0,
      slug: "4977642726314",
      sku: "4977642726314",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Hario V60-02 paper filters",
    source_id: "29",
    price: 570,
    metadata: {
      demostore: "moltin",
      company: "Hario",
      categories: ["Accessories"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hario+V60-02+paper+filters.jpg",
      info:
        "100 Hario filters designed for conical coffee drippers.\nHario Drip brews amazing coffee but only when you use a suitable filter. This is the most standard version of filters which allow for very good water flow. Size: fits Hario V60-02",
      weight: 0,
      slug: "4977642723320",
      sku: "4977642723320",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  {
    name: "Glowbeans - The Gabi Master A",
    source_id: "30",
    price: 790,
    metadata: {
      demostore: "moltin",
      company: "Glowbeans",
      categories: ["Accessories"],
      imgUrl:
        "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Glowbeans+-+The+Gabi+Master+A+-+White+Paper+Filters+100+pcs.jpg",
      info:
        "100 white, wave paper filters with flat bottom for Glowbeans The Gabi Master A coffee brewer.",
      weight: 0,
      slug: "8809539890029",
      sku: "8809539890029",
      inCart: false,
      count: 0,
      total: 0,
    },
  },
  // {
  //   name: "Glowbeans - The Gabi Master A - Brown Paper Filters 100 pcs",
  //   source_id: "3ab52b02-5ef4-4521-8825-d6e032d4186b",
  //   price: 790,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Glowbeans",
  //     categories: ["Accessories"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Glowbeans+-+The+Gabi+Master+A+-+Brown+Paper+Filters+100+pcs.jpg",
  //     info:
  //       "100 brown, wave paper filters with flat bottom for Glowbeans The Gabi Master A coffee brewer.",
  //     weight: 0,
  //     slug: "8809539890012",
  //     sku: "8809539890012",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Glowbeans - The Gabi Master A Coffee Dripper",
  //   source_id: "0c168aca-87db-4fdb-88bf-32004986717c",
  //   price: 3300,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Glowbeans",
  //     categories: ["Coffee Machines"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Glowbeans+-+The+Gabi+Master+A+Coffee+Dripper.jpg",
  //     info:
  //       "The Gabi Master A is an innovative, easy to use, and giving great results coffee dripper.\n\nThe most unique feature of The Gabi is its showerhead-like waterspout. The water flows through 16 holes, rinsing ground coffee evenly, which results in a more regular extraction. The brewer consists of 4 light, solid parts made of plastic: water container, spout, dripper, and saucer.\n\nBrewing is simple. Place the dripper with a paper filter on a cup and rinse the filter with hot water. Discard water, pour 15g of medium-ground coffee into the filter, connect all the elements, and pour 150ml of hot water into the water container. That's all you really have to do!\nThe water flows slowly into the spout element and slowly drips into the dripper. After about 3 minutes, 150ml of flavourful brew is ready! This brewing method eliminates the problem of proper water distribution from kettle and gives highly repetitive results.\n\nThe brewer is packed in a well-designed plastic box.",
  //     weight: 0,
  //     slug: "8809539890005",
  //     sku: "8809539890005",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "AeroPress Coffee Maker",
  //   source_id: "5ae67a44-807a-4cca-a440-8190e1914766",
  //   price: 3300,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "AeroPress",
  //     categories: ["Coffee Machines"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/AeroPress+Coffee+Maker.jpg",
  //     info:
  //       "AeroPress is an incredibly versatile gadget that will meet the expectations of both beginners and advanced coffee lovers. This product combines the advantages of French Press, filter method and a traditional coffee maker, which makes preparation of your aromatic coffee really simple and quick.\nIn addition, the device allows you to explore the limitless flavours of coffee by experimenting with brewing time, water temperature and fine or coarse ground beans.\n\nUsing this method, you get up to 250ml of coffee at once and the whole process takes only a few minutes. Aeropress is unique with its small size and light weight, so you can brew your coffee just anywhere. Another advantage is that the device is made of a durable material that is easy to maintain.\n\nCurrently, AeroPress is considered one of the most interesting alternative coffee brewing methods. All over the world there are championships crowned with World AeroPress Championships.\n\nPackage content: Aeropress, 350 paper filters, coffee stirrer, coffee scoop, filter holder.",
  //     weight: 0,
  //     slug: "123456123789",
  //     sku: "123456123789",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "AeroPress Go Coffee Maker",
  //   source_id: "b56fe876-3c72-4ea2-b24c-2158cd004531",
  //   price: 3550,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "AeroPress",
  //     categories: ["Coffee Machines"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/AeroPress+Go+Coffee+Maker.jpg",
  //     info:
  //       "AeroPress Go is the new version of the coffee maker which has stolen the hearts of coffee lovers around the world. It was created as a response to the demand for an even more compact brewer. The device fits into a mug and alows you to make a cup of perfect black coffee anytime and anywhere - when travelling, on a hike or in the office.\n\nThis product combines the advantages of French Press, filter method and a traditional coffee maker, which makes the preparation of your aromatic coffee really simple and quick. In addition, the device allows you to explore the limitless flavours of coffee by experimenting with brewing time, water temperature and fine or coarse ground beans. You can brew up to 237 ml of coffee at a time.\n\nAeroPress Go is one of the most compact coffee makers in the world:\nAeroPress Go: 12cm x 9cm x 9cm\nAeroPress Go with whole set closed in a cup with the lid: 14cm x 10cm x 10 cm\n\nThe set includes: Aeropress, 350 paper filters, coffee stirrer, coffee scoop, filter holder (for 20 filters), cup and lid.\n\nPerfect gift for a coffee enthusiast who loves to travel!",
  //     weight: 0,
  //     slug: "789534789435",
  //     sku: "789534789435",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Nivona CafeRomatica 779",
  //   source_id: "579d6b6c-73b0-4565-b865-9396fdcd0ae5",
  //   price: 76200,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Nivona",
  //     categories: ["Coffee Machines"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Nivona+CafeRomatica+779.jpg",
  //     info:
  //       "Nivona CafeRomatica 759 is the perfect machine for all those how like their life and their coffee clear, strong and uncomplicated. This model satisfies admirers of clean lines with its matt black front and a new quieter grinder\n\nFeatures:\nNEW: Especially quiet grinder\nNEW: Aroma Balance System with three aroma profiles\nMY COFFEE - a memorable, individual coffee recipe at the touch of a button\nWater tank with 2,2 l capacity\nLive programming of all recipes\nLow noise, hardened steel conical grinder\nRemovable brewing unit for easy and hygienic cleaning\nCoffee temperature adjustable in 3 stages\nCoffee strength adjustable in 3 stages\nECO mode and zero watt energy-saving off switch\nAutomatic rinse system for milk frother\nHygienic care programmes for cleaning, descaling and rinsing at the touch of a button\nStatistics function and maintenance monitoring\nAutomatic level monitoring for water\nDegree of grinding individually adjustable\nUp to 14 cm height-adjustable coffee outlet\nCup stand\n15 bar pump pressure\nHot water for tea\nExtra coffee powder compartment\nAroma protection lid\nIncluding CLARIS fresh water filter, cleaning tablets, milk hose and measuring spoon\nTimeless design: matt black and chrome trim",
  //     weight: 0,
  //     slug: "4260083467794",
  //     sku: "4260083467794",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Melitta Aromafresh Black - Filter Coffee Machine with Grinder",
  //   source_id: "0996b3f3-060f-414c-954f-43c026b702b7",
  //   price: 14300,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Melitta",
  //     categories: ["Coffee Machines"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Melitta+Aromafresh+Black+-+Filter+Coffee+Machine+with+Grinder.jpg",
  //     info:
  //       "Melitta Aromafresh is a modern filter coffee brewer with an integrated grinder. It allows you to brew up to 1.35 litres of coffee, you can adjust the grinding, and set the timer to brew coffee at the desired time.",
  //     weight: 0,
  //     slug: "4006508217311",
  //     sku: "4006508217311",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Melitta Aroma Elegance DeLuxe - Filter Coffee Machine",
  //   source_id: "fc15f1ad-4e31-484e-a3ad-1aee7a1a9ebc",
  //   price: 10700,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Melitta",
  //     categories: ["Coffee Machines"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Melitta+Aroma+Elegance+DeLuxe+-+Filter+Coffee+Machine.jpg",
  //     info:
  //       "Melitta Aroma Elegance Deluxe is a modern filter coffee brewer. Easy to use, efficient and practical - perfect for home use and offices.\n\nThanks to the practical timer feature you can wake up to the smell of fresh coffee. Aroma Premium Technology gives you excellent filter coffee.",
  //     weight: 0,
  //     slug: "40065082095",
  //     sku: "40065082095",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Eureka Mignon Brew Pro White - Automatic Grinder",
  //   source_id: "5a6f1fa0-9c3a-4e82-adbc-000f4feb66f8",
  //   price: 48200,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Eureka",
  //     categories: ["Grinders", "Electronic Grinders"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Eureka+Mignon+Brew+Pro+White+-+Automatic+Grinder.jpg",
  //     info:
  //       "Eureka Mignon is an automatic grinder for household use. Brew Pro version is dedicated specifically for pour-over brewing methods (V60, Chemex, AeroPress, Filter coffee machines). Designed for skilled and demanding baristas.\n\nThe grinder is compact, equipped with a touch screen, and features a touch screen.\n\nUse\n\nAn intuitive touch screen makes every operation extremely easy. You can quickly set the dose, program two doses, and grind coffee continuously. \n\nGrinding\n\nMignon Filtro is dedicated for pour-over brewing methods. To set the coarseness, simply turn the micrometric regulation knob. Although it is stepless, it has a scale on it, which makes the whole process much easier. The grinding is precise and consistent. The most significant element here is the 55mm hardened steel burr. The outcome is about 1.9 - 2.5g/s.\n\nHow it's built\n\nMignon is also well-designed and well-fitted. It is available in a wide range of colourways. The body is made of metal, which makes it durable. A transparent, plastic hopper may hold up to 300g of beans.\n\nAdditional features:\n- 260 Watt / 1350 RPM engine.\n- ACE System reducing clumping and electrostatics.\n- Silent Technology - compared to the previous version, the grinder is more silent.\n- Made in Italy.",
  //     weight: 0,
  //     slug: "8054301159051",
  //     sku: "8054301159051",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Eureka Mignon Brew Pro Matte Black - Automatic Grinder",
  //   source_id: "b1cafb35-098b-4a05-8c5b-aaf1998e5c19",
  //   price: 48200,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Eureka",
  //     categories: ["Grinders", "Electronic Grinders"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Eureka+Mignon+Brew+Pro+Matte+Black+-+Automatic+Grinder.jpg",
  //     info:
  //       "Eureka Mignon is an automatic grinder for household use. Brew Pro version is dedicated specifically for pour-over brewing methods (V60, Chemex, AeroPress, Filter coffee machines). Designed for skilled and demanding baristas.\n\nThe grinder is compact, equipped with a touch screen, and features a touch screen.\n\nUse\n\nAn intuitive touch screen makes every operation extremely easy. You can quickly set the dose, program two doses, and grind coffee continuously. \n\nGrinding\n\nMignon Filtro is dedicated for pour-over brewing methods. To set the coarseness, simply turn the micrometric regulation knob. Although it is stepless, it has a scale on it, which makes the whole process much easier. The grinding is precise and consistent. The most significant element here is the 55mm hardened steel burr. The outcome is about 1.9 - 2.5g/s.\n\nHow it's built\n\nMignon is also well-designed and well-fitted. It is available in a wide range of colourways. The body is made of metal, which makes it durable. A transparent, plastic hopper may hold up to 300g of beans.\n\nAdditional features:\n- 260 Watt / 1350 RPM engine.\n- ACE System reducing clumping and electrostatics.\n- Silent Technology - compared to the previous version, the grinder is more silent.\n- Made in Italy.",
  //     weight: 0,
  //     slug: "8054301158665",
  //     sku: "8054301158665",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Zassenhaus Bogota grinder",
  //   source_id: "a0afaf3f-dc39-4663-94bb-87922ab305a9",
  //   price: 5800,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Zassenhaus",
  //     categories: ["Grinders", "Hand Grinders"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Zassenhaus+Bogota+grinder.jpg",
  //     info:
  //       "Zassenhaus Bogota grinder with ceramic burrs, made of wood and steel. It allows for precision grinding for multiple methods of coffee brewing.\nThe device for lovers of traditional hand grinders. The body is made of elegant beech wood and steel. The grinder is equipped with durable ceramic burrs. Simple grinding adjustment. Closed hopper prevents accidental spillage of the beans ground.",
  //     weight: 0,
  //     slug: "11212121212121",
  //     sku: "11212121212121",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Zassenhaus Brasilia Grinder - dark stained",
  //   source_id: "4868fd69-4718-4f2b-b110-89755247321d",
  //   price: 8100,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Zassenhaus",
  //     categories: ["Grinders", "Hand Grinders"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Zassenhaus+Brasilia+Grinder+-+dark+stained.jpg",
  //     info:
  //       "Classic wooden coffee grinder from Zassenhaus. Stainless steel burrs and grind adjustment allow you to grind coffee beans for various brewing methods. Recommended especially for pour-over brewing methods, such as drippers, Chemex, AeroPress, and French Press.\n\nBurr\n\nThe grinder is equipped with durable steel burrs. Stepless grinding adjustment by means of a knob located under the handle. Changing the coarseness is quick and easy.\n\nDesign\n\nThe device for lovers of traditional grinders. Its body is made entirely of wood painted dark brown. The grounds are poured into a convenient drawer. The bean container may hold up to 50g of coffee.",
  //     weight: 0,
  //     slug: "4006528040012",
  //     sku: "4006528040012",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Zassenhaus Caracas grinder",
  //   source_id: "4127c209-735b-40f9-9f9c-5d5a6a75c630",
  //   price: 4650,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Zassenhaus",
  //     categories: ["Grinders"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Zassenhaus+Caracas+grinder.jpg",
  //     info:
  //       "Zassenhaus Caracas is a hand grinder with ceramic burrs with steel and acrylic body. It allows for precision grinding for multiple methods of coffee brewing.\nThe device in silver, with an ergonomic design for comfortable grinding. The body is made of steel and plastic. Ceramic burrs provide long-term work and precision grinding.",
  //     weight: 0,
  //     slug: "4006528041101",
  //     sku: "4006528041101",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Zassenhaus Brasilia grinder - Nature",
  //   source_id: "6e307944-dc5a-4d1d-9f1d-6c7b42eb4a46",
  //   price: 8500,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Zassenhaus",
  //     categories: ["Grinders", "Hand Grinders"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Zassenhaus+Brasilia+grinder+-+Nature.jpg",
  //     info:
  //       "Classic wooden grinder from Zassenhaus, with steel burrs. It allows for precision grinding of beans in a very simple way.\nThe device for lovers of traditional grinders. Its body is made entirely of bright-coloured wood. The grounds are poured into a convenient drawer. The grinder is equipped with durable steel burrs. Stepless grinding adjustment by means of a knob located under the handle.\n",
  //     weight: 0,
  //     slug: "4006528040005",
  //     sku: "4006528040005",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Zassenhaus Buenos Aires Grinder",
  //   source_id: "488ba936-3de0-4047-b837-9b804f3ceba9",
  //   price: 3400,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Zassenhaus",
  //     categories: ["Grinders"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Zassenhaus+Buenos+Aires+Grinder.jpg",
  //     info:
  //       "Zassenhaus Buenos Aires is a hand grinder with ceramic burrs with plastic, steel, and glass body. Recommended especially for pour-over brewing methods, moka pot, and French Press.\n\nThe device in black, with an ergonomic design for comfortable grinding. The capacity of the bean holder is 15g.\n\nCeramic burrs are hard, provid precision in grinding, and do not get warm. Adjusting gringing coarseness is easy, with use of a knob under the burrs. ",
  //     weight: 0,
  //     slug: "4006528040000",
  //     sku: "4006528040000",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "KeepCup Original Element 340ml",
  //   source_id: "151fe2dd-1df6-4989-bb1d-17107e6ab366",
  //   price: 1150,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "KeepCup",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/KeepCup+Original+Element+340ml.jpg",
  //     info:
  //       "Using KeepCup you affect the environment less every day. An interesting fact is that to create a single KeepCup you need the amount of material that would have been used to produce 20 disposable cups. All over the world, every minute, about a million disposable cups get to the landfill. Unlike KeepCup, many of them cannot be recycled. Solve this problem - choose KeepCup!\n\nThe cups (without the lid) are dishwasher-safe and microwave-safe.",
  //     weight: 0,
  //     slug: "9343243006004",
  //     sku: "9343243006004",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "KeepCup Original Doppio 340ml",
  //   source_id: "f568c539-1a81-4a68-ad5c-24bf4cfd6c15",
  //   price: 1150,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "KeepCup",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/KeepCup+Original+Doppio+340ml.jpg",
  //     info:
  //       "Using KeepCup you affect the environment less every day. An interesting fact is that to create a single KeepCup you need the amount of material that would have been used to produce 20 disposable cups. All over the world, every minute, about a million disposable cups get to the landfill. Unlike KeepCup, many of them cannot be recycled. Solve this problem - choose KeepCup!\n\nThe cups (without the lid) are dishwasher-safe and microwave-safe.",
  //     weight: 0,
  //     slug: "9343243009609",
  //     sku: "9343243009609",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "KeepCup Brew Cork Sea Shepherd 340ml",
  //   source_id: "32835162-f2d5-4682-9999-7b617796d8da",
  //   price: 2250,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "KeepCup",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/KeepCup+Brew+Cork+Sea+Shepherd+340ml.jpg",
  //     info:
  //       "Using KeepCup you affect the environment less every day. An interesting fact is that to create a single KeepCup you need the amount of material that would have been used to produce 20 disposable cups. All over the world, every minute, about a million disposable cups get to the landfill. Unlike KeepCup, many of them cannot be recycled. Solve this problem - choose KeepCup!\n\nKeepCup with a cork band is neither dishwasher-safe nor microwave-safe.",
  //     weight: 0,
  //     slug: "9343243008525",
  //     sku: "9343243008525",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "KeepCup Brew Milk 340ml",
  //   source_id: "570b7839-642e-47e1-91df-9548ed181dfd",
  //   price: 1900,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "KeepCup",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/KeepCup+Brew+Milk+340ml.jpg",
  //     info:
  //       "Using KeepCup you affect the environment less every day. An interesting fact is that to create a single KeepCup you need the amount of material that would have been used to produce 20 disposable cups. All over the world, every minute, about a million disposable cups get to the landfill. Unlike KeepCup, many of them cannot be recycled. Solve this problem - choose KeepCup!\n\nThe cups are dishwasher-safe and microwave-safe (without the lid).",
  //     weight: 0,
  //     slug: "9343243008528",
  //     sku: "9343243008528",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Loveramics Bond - 300 ml Mug - Red",
  //   source_id: "97648bc5-4b81-47d7-b2a2-6e486bfd505e",
  //   price: 1050,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Loveramics",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Loveramics+Bond+-+300+ml+Mug+-+Red.jpg",
  //     info:
  //       "The mug combines modern design with traditional character. The thick walls and space for the air under the bottom allow for retaining perfect temperature of your coffee for a long time. The rounded shape of the bottom allows for the optimum development of flavour. The vessels are made of the top quality porcelain burned at 1300C .\n\nThe Bond series has been designed by Simon Stevens - a world-class designer and winner of many awards in the field of ceramic products. On a daily basis, Simon runs a design studio in London and cooperates with the greatest manufacturers of ceramics all over the world. His work has been exhibited in many prestigious places such as museums in London and Frankfurt.",
  //     weight: 0,
  //     slug: "54324563435",
  //     sku: "54324563435",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Loveramics Bond - 300 ml Mug - Mint",
  //   source_id: "0e617e07-e7cf-49cd-b07c-ae702b38da2f",
  //   price: 1050,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Loveramics",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Loveramics+Bond+-+300+ml+Mug+-+Mint.jpg",
  //     info:
  //       "The mug combines modern design with traditional character. The thick walls and space for the air under the bottom allow for retaining perfect temperature of your coffee for a long time. The rounded shape of the bottom allows for the optimum development of flavour. The vessels are made of the top quality porcelain burned at 1300C .\n\nThe Bond series has been designed by Simon Stevens - a world-class designer and winner of many awards in the field of ceramic products. On a daily basis, Simon runs a design studio in London and cooperates with the greatest manufacturers of ceramics all over the world. His work has been exhibited in many prestigious places such as museums in London and Frankfurt",
  //     weight: 0,
  //     slug: "54324563434",
  //     sku: "54324563434",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Loveramics Bond - 300 ml Mug - Brown",
  //   source_id: "214c41c7-febc-4199-b64e-dc636edb0a0f",
  //   price: 1050,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Loveramics",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Loveramics+Bond+-+300+ml+Mug+-+Brown.jpg",
  //     info:
  //       "The mug combines modern design with traditional character. The thick walls and space for the air under the bottom allow for retaining perfect temperature of your coffee for a long time. The rounded shape of the bottom allows for the optimum development of flavour. The vessels are made of the top quality porcelain burned at 1300oC\n\n.The Bond series has been designed by Simon Stevens - a world-class designer and winner of many awards in the field of ceramic products. On a daily basis, Simon runs a design studio in London and cooperates with the greatest manufacturers of ceramics all over the world. His work has been exhibited in many prestigious places such as museums in London and Frankfurt",
  //     weight: 0,
  //     slug: "54324563433",
  //     sku: "54324563433",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Loveramics Bond - 300 ml Mug - Yellow",
  //   source_id: "dc001545-d4e3-4740-811a-3289a2b0dbcb",
  //   price: 1050,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Loveramics",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Loveramics+Bond+-+300+ml+Mug+-+Yellow.jpg",
  //     info:
  //       "The mug combines modern design with traditional character. The thick walls and space for the air under the bottom allow for retaining perfect temperature of your coffee for a long time. The rounded shape of the bottom allows for the optimum development of flavour. The vessels are made of the top quality porcelain burned at 1300C.\n\nThe Bond series has been designed by Simon Stevens - a world-class designer and winner of many awards in the field of ceramic products. On a daily basis, Simon runs a design studio in London and cooperates with the greatest manufacturers of ceramics all over the world. His work has been exhibited in many prestigious places such as museums in London and Frankfurt.",
  //     weight: 0,
  //     slug: "54324563432",
  //     sku: "54324563432",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Loveramics Bond - 300 ml Mug - Black",
  //   source_id: "5760434e-aca3-42db-800f-2dfcb02f7cbc",
  //   price: 1050,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Loveramics",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Loveramics+Bond+-+300+ml+Mug+-+Black.jpg",
  //     info:
  //       "The mug combines modern design with traditional character. The thick walls and space for the air under the bottom allow for retaining perfect temperature of your coffee for a long time. The rounded shape of the bottom allows for the optimum development of flavour. The vessels are made of the top quality porcelain burned at 1300C .\n\nThe Bond series has been designed by Simon Stevens - a world-class designer and winner of many awards in the field of ceramic products. On a daily basis, Simon runs a design studio in London and cooperates with the greatest manufacturers of ceramics all over the world. His work has been exhibited in many prestigious places such as museums in London and Frankfurt.",
  //     weight: 0,
  //     slug: "54324563431",
  //     sku: "54324563431",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "KeepCup Brew Chai 340ml",
  //   source_id: "d9024789-8b63-4829-88ab-34e45ee54b4c",
  //   price: 1800,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "KeepCup",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/KeepCup+Brew+Chai+340ml.jpg",
  //     info:
  //       "KeepCup Brew is a series of reusable, ecological, colourful cups made of glass and plastic.\n\nCapacity 340 ml (12oz)\n\nColours:\n- Gray lid\n- White plug\n- Light gray band\n- Transparent cup\n\nKeepCups are reusable ecological cups which delight with their amazing design. They are lightweight, perfect to hold in your hand, made of glass and durable, non-toxic plastic. The unique design and diverse colour range make you stand out from the crowd. Decide what colour suits you and enjoy the taste of your tea or coffee in your favourite cup. KeepCup is perfect if you are often in a rush and drink coffee on the go. Remember that KeepCup is neither vacuum insulated nor leakproof - the idea of this Australian company was to create an ecological alternative for a paper cup.\n\nUsing KeepCup you affect the environment less every day. An interesting fact is that to create a single KeepCup you need the amount of material that would have been used to produce 20 disposable cups. All over the world, every minute, about a million disposable cups get to the landfill. Unlike KeepCup, many of them cannot be recycled. Solve this problem - choose KeepCup!\n\nThe cups (without the lid) are dishwasher-safe and microwave-safe.",
  //     weight: 0,
  //     slug: "9343243008527",
  //     sku: "9343243008527",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "KeepCup Brew Atom 340ml",
  //   source_id: "cd6d9987-5530-4533-af69-862de032f2de",
  //   price: 1800,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "KeepCup",
  //     categories: ["Accessories", "Cups"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/KeepCup+Brew+Atom+340ml.jpg",
  //     info:
  //       "KeepCup Brew is a series of reusable, ecological, colourful cups made of glass and plastic.\n\nCapacity: 340 ml (12oz)\n\nColours:\n- Turquoise lid\n- Yellow plug\n- Pink band\n- Transparent cup\n\nKeepCups are reusable ecological cups which delight with their amazing design. They are lightweight, perfect to hold in your hand, made of glass and durable, non-toxic plastic. The unique design and diverse colour range make you stand out from the crowd. Decide what colour suits you and enjoy the taste of your tea or coffee in your favourite cup. KeepCup is perfect if you are often in a rush and drink coffee on the go. Remember that KeepCup is neither vacuum insulated, nor leakproof - the idea of this Australian company was to create an ecological alternative for a paper cup.\n\nUsing KeepCup you affect the environment less every day. An interesting fact is that to create a single KeepCup you need the amount of material that would have been used to produce 20 disposable cups. All over the world, every minute, about a million disposable cups get to the landfill. Unlike KeepCup, many of them cannot be recycled. Solve this problem - choose KeepCup!\n\nThe cups (without the lid) are dishwasher-safe and microwave-safe.",
  //     weight: 0,
  //     slug: "9343243008526",
  //     sku: "9343243008526",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Coffeelab - Kenya Mitondo Kirinyaga AA",
  //   source_id: "e2505285-dd64-4da8-99cc-f6cef92ee663",
  //   price: 1200,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Coffeelab",
  //     categories: ["Coffee", "Whole Bean"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Coffeelab+-+Kenya+Mitondo+Kirinyaga+AA.jpg",
  //     info:
  //       "Speciality coffee from Kenya, roasted in Warsaw by Coffeelab. Light roast, perfect for filter coffee machines, drippers, Chemex, AeroPress, French Press, and other pour-over brewing methods. In the cup, you can expect hints of marcipan, caramel and citrus fruits..\n\n\nCountry: Kenya\nRegion: Mwirua, Ndia, Kirinyaga\nProcess: Washed\nVariety: Sl 28, Sl34, Riuru 11, Batian, K7\nAltitude: 1540 m a.s.l.",
  //     weight: 250,
  //     slug: "132645132645",
  //     sku: "132645132645",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Lavazza Top Class",
  //   source_id: "bb9ed511-3bd4-4b32-b47a-4db5f25f55a7",
  //   price: 1750,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Lavazza",
  //     categories: ["Coffee", "Whole Bean"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Lavazza+Top+Class.jpg",
  //     info:
  //       "Top-quality coffee, a blend of perfect proportions of Arabica beans with the addition of Robusta.\nThe country of origin is very important: Asian beans offer slight sweetness, Brazilian beans provide mildness, and the whole is enriched with the delicate aromas of coffee plants from Central America. Together they create excellent aroma which cannot be ignored. Coffee intended for exquisite cafes, ideal for hot espresso and hot or cold coffee drinks. Packaging: 1kg Description: coffee beans with low caffeine content.",
  //     weight: 1000,
  //     slug: "8000070020108",
  //     sku: "8000070020108",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Lavazza Gran Espresso",
  //   source_id: "dcff4c96-72fc-40df-9752-e82648870094",
  //   price: 1450,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Lavazza",
  //     categories: ["Coffee", "Whole Bean"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Lavazza+Gran+Espresso.jpg",
  //     info:
  //       'When someone means "short black", this is just Lavazza Grand Espresso - with the flavour of typical Italian espresso.\nA blend of the best Arabica beans from Central and South America combined with selected African and Asian Robusta, washed. Its features are strong sweet and intense flavour with a consistent crema. Coffee designed for places serving many espresso-based drinks: cappuccino, macchiato, latte, mocha, coretto, doppio, ristretto, con panna, ice coffee, caffe fredo, irish coffee. Packaging: 1kg Description: coffee beans with regular caffeine content.',
  //     weight: 1000,
  //     slug: "8000070021341",
  //     sku: "8000070021341",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Lavazza Qualita Oro",
  //   source_id: "ffb6d9e5-7ef4-4b4a-a738-2ab155e75d9e",
  //   price: 1450,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Lavazza",
  //     categories: ["Coffee", "Whole Bean"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Lavazza+Qualita+Oro.jpg",
  //     info:
  //       "Gold quality (Italian: Qualita oro) of this coffee comes from carefully selected Arabica beans imported from the best plantations of South and Central America and Africa.\nIt has characteristic natural intense and aromatic fragrance. Ideal breakfast coffee for a good start to the day. Packaging: 1kg Description: coffee beans with medium caffeine content.",
  //     weight: 1000,
  //     slug: "8000070020566",
  //     sku: "8000070020566",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Illy Moka - Ground coffee",
  //   source_id: "eee99539-e409-486e-99f2-34f9599dabdc",
  //   price: 760,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Illy",
  //     categories: ["Coffee", "Ground"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Moka+-+Ground+coffee.jpg",
  //     info:
  //       "Very aromatic with a full and delicious body - that is what Illy Moka is like, created and ground specially for the use in traditional coffee pots.\nGround slightly coarser than in the case of ground coffee for espresso, Illy moka offers better taste sensations when brewed in a moka. It is a sophisticated blend of Arabica beans with a smooth, rich and full of body. It makes a perfect start of your day!",
  //     weight: 250,
  //     slug: "8003753915050",
  //     sku: "8003753915050",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Illy Arabica Selection - Brazil",
  //   source_id: "88b183da-4596-438c-b427-cd5014928253",
  //   price: 830,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Illy",
  //     categories: ["Coffee", "Whole Bean", "Single Origin"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Illy+Arabica+Selection+-+Brazil.jpg",
  //     info:
  //       "Arabica Selection is a new line of single origin coffee from Illy. The beans from Brazil are characterized by an intense flavour with the hints of caramel. The coffee is aromatic and creamy.\n\n\nBrazil is the world leader in the production of Arabica. Coffea is grown mainly in the south-east part of the country, at high altitudes, in ideal climatic conditions.",
  //     weight: 250,
  //     slug: "8003753970042",
  //     sku: "8003753970042",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Hard Beans - Gorilla Blend Peru + Uganda Espresso 1kg",
  //   source_id: "86e6ff37-7073-4a52-b73c-bf8fb4673664",
  //   price: 2500,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Hard Beans",
  //     categories: ["Coffee", "Whole Bean"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hard+Beans+-+Gorilla+Blend+Peru+%2B+Uganda+Espresso+1kg.jpg",
  //     info:
  //       "Speciality coffee blend from Peru and Uganda, roasted by Hard Beans from Poland. Medium roast, perfect for espresso machines and moka pots. Sweet and complex, with the notes of walnuts, prunes, and caramel.\n\n\nCountry: Peru and Uganda\nRegion: Jaen, Cajamarca, Rwenzori Mountain Range\nProcess: washed, natural\nAltitude: 1600 - 2000 m a.s.l. and 900 - 1700 m a.s.l.\nVariety: Bourbon, Typica, SL28, SL14, Catimor",
  //     weight: 1000,
  //     slug: "7310045062060",
  //     sku: "7310045062060",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Hard Beans - El Salvador Las Palmas Los Pirineos",
  //   source_id: "9a3b13e8-cbd4-46c9-a75a-9bc7a4df026c",
  //   price: 1150,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Hard Beans",
  //     categories: ["Coffee", "Whole Bean", "Single Origin"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Hard+Beans+-+El+Salvador+Las+Palmas+Los+Pirineos.jpg",
  //     info:
  //       "Speciality coffee from El Salvador, roasted in Poland by Hard Beans. \n\nFilter coffee - light roasted, perfect for filter coffee machines, drippers, Chemex, AeroPress, French Press, and other pour-over brewing methods. In the cup, you can expect the notes of green apple, red currant, and hazelnut.\n\nCountry: El Salvador\nRegion: Usulutan\nAltitude: 1350 - 1500 m a.s.l.\nVariety: Bourbon\nProcess: Washed",
  //     weight: 250,
  //     slug: "7350045062060",
  //     sku: "7350045062060",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Johan & Nyström - Verde",
  //   source_id: "475368e1-c250-491c-81f7-4dedc891f478",
  //   price: 1650,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Johan & Nyström",
  //     categories: ["Coffee", "Whole Bean"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Verde.jpg",
  //     info:
  //       "Verde is full of flavour creamy coffee perfect for espresso. Its full body and balanced flavour make it also an excellent choice for white coffee. The blend includes 84% of Arabica and 16% of Robusta. The beans come exclusively from certified organic farms. Verde is a combination of tradition and modernity. Certainly it will appeal to the lovers of classic espresso, but it is slightly lighter roasted than Italian coffee.",
  //     weight: 500,
  //     slug: "116",
  //     sku: "7350045061065",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Johan & Nyström - Nicaragua Un Regalo de Dios",
  //   source_id: "e3a02c23-4476-40b5-8ee6-eb88182f287e",
  //   price: 1400,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Johan & Nyström",
  //     categories: ["Coffee", "Whole Bean", "Single Origin"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Nicaragua+Un+Regalo+de+Dios.jpg",
  //     info:
  //       "Speciality coffee from Nicaragua, roasted by Johan & Nyström roastery from Sweden. Light roast, perfect for filter coffee machines, drippers, Chemex, AeroPress, French Press, and other pour-over brewing methods. Delicate, fruity, and tea-like. The cup is filled with the flavour of sweet rose lemonade, and some acidity similar to red currants and lime zest.\n\n\nCountry: Nicaragua\nRegion: Nueva Segovia\nVariety: Pacamara\nProcess: Natural\nAltitude: 1700 m a.s.l.\n\nBrand:\tJohan & Nyström\nPackage:\t250 g\nCountry of origin:\tNicaragua\nWhole bean / Ground Coffee:\tWhole bean\nArabica / Robusta:\t100% Arabica\nProcess:\tNatural\nRoast level:\tlight\nBrewing method:\tPour over (Alternative brewing methods)\nShipping within:\t24 - 48 hours",
  //     weight: 250,
  //     slug: "7350045061060",
  //     sku: "7350045061060",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Johan & Nyström - Fika - Ground Coffee",
  //   source_id: "8ea96824-3b13-439f-905a-60b04d42fb20",
  //   price: 1300,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Johan & Nyström",
  //     categories: ["Coffee", "Ground"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Fika+-+Ground+Coffee.jpg",
  //     info:
  //       "Fika is an important part of Swedish culture which means a tea or coffee break.\n\nThis coffee was created to cultivate this tradition. Full-bodied, perfectly balanced coffee with delicate hints of cocoa.\n\nBrew it as an espresso or in a moka pot - perfect both solo and with milk.\n\nHave a coffee break!\n\nBrand:\tJohan & Nyström\nPackage:\t500 g\nWhole bean / Ground Coffee:\tGround\nArabica / Robusta:\t100% Arabica\nRoast level:\tmedium\nBrewing method:\tPour over and espresso\nShipping within:\t24 - 48 hours",
  //     weight: 500,
  //     slug: "7350045060457",
  //     sku: "7350045060457",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
  // {
  //   name: "Johan & Nyström - Espresso La Bomba",
  //   source_id: "18143ce2-0f04-4da8-955d-63b2f3a9526a",
  //   price: 1650,
  //   metadata: {
  //     demostore: "moltin",
  //     company: "Johan & Nyström",
  //     categories: ["Coffee", "Whole Bean"],
  //     imgUrl:
  //       "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/Johan+%26+Nyström+-+Espresso+La+Bomba.jpg",
  //     info:
  //       "If you have ever experienced espresso in one of the small coffee bars in southern Italy, especially in Naples, you know what it means to taste espresso. The presence of Robusta in our blend gives the coffee a strong character and an earthy taste, combined with a delicate hint of cocoa and long-lasting acidity.\nThe blend contains: - Uganda Robusta Kaweri Plantation - Brasilien Mogiana Coop - El Salvador Las Delicias Estate - Nicaragua Royal Brewing recommendation: Dose: 19 grams Temperature: 90 degrees Celsius Time: 22 - 27 seconds Quantity: 55 ml\n\nBrand:\tJohan & Nyström\nPackage:\t500 g\nWhole bean / Ground Coffee:\tWhole bean\nArabica / Robusta:\t60/40\nRoast level:\tmedium\nBrewing method:\tEspresso\nShipping within:\t24 - 48 hours",
  //     weight: 500,
  //     slug: "7350045060365",
  //     sku: "7350045060365",
  //     inCart: false,
  //     count: 0,
  //     total: 0,
  //   },
  // },
];
