const versionNumber = 8;

exports.versionNumber = versionNumber

exports.campaigns = [
  {
    name: `More than $50 in cart and Samsung S7 #${versionNumber}`,
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { percent_off: 5, type: "PERCENT" },
    },
    metadata: {
      demostoreAssignedValRules: ["val_l6k6T16xpQYN"],
      demostoreVersion: versionNumber,
      demostoreDescription:
        "Total cart value must be greater than $50 and you must have a Samsung S7 in it",
      demostoreSteps: {
        step1: "Total cart value must be greater than $50",
        step2: "You must have Samsung S7 in your cart",
      },
    },
  },
  {
    name: `Cart includes 2 of Samsung S7 #${versionNumber}`,
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { amount_off: 500, type: "AMOUNT" },
    },
    metadata: {
      demostoreAssignedValRules: ["val_phBbhUNtDFHj"],
      demostoreVersion: versionNumber,
      demostoreDescription: "You must have 2 of Samsung S7 in cart",
      demostoreSteps: {
        step1: "Add 2 of Samsung S7 to cart",
      },
    },
  },
];

// exports.segments = [
//   {
//     type: "auto-update",
//     name: "Germany",
//     filter: {
//       "address.country": {
//         conditions: {
//           $is: ["Germany"],
//         },
//       },
//     },
//   },
// ];

exports.products = [
  {
    id: 12,
    title: "Google Pixel",
    img: "img/product-1.png",
    imgUrl:
      "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/1.png",
    price: 10,
    company: "GOOGLE",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 22,
    title: "Samsung S7",
    img: "img/product-2.png",
    imgUrl:
      "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/2.png",
    price: 16,
    company: "SAMSUNG",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 32,
    title: "HTC 10",
    img: "img/product-3.png",
    imgUrl: "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/3.png",
    price: 8,
    company: "htc",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 42,
    title: "HTC 10s",
    img: "img/product-4.png",
    imgUrl: "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/4.png",
    price: 18,
    company: "htc",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 52,
    title: "HTC Desire 626s",
    img: "img/product-5.png",
    imgUrl: "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/5.png",
    price: 24,
    company: "htc",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 62,
    title: "iPhone 3G",
    img: "img/product-6.png",
    imgUrl: "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/6.png",
    price: 17,
    company: "apple",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 72,
    title: "iPhone 7",
    img: "img/product-7.png",
    imgUrl: "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/7.png",
    price: 30,
    company: "apple",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
  {
    id: 82,
    title: "iPhone",
    img: "img/product-8.png",
    imgUrl: "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/8.png",
    price: 2,
    company: "apple",
    info:
      "Lorem ipsum dolor amet offal butcher quinoa sustainable gastropub, echo park actually green juice sriracha paleo. Brooklyn sriracha semiotics, DIY coloring book mixtape craft beer sartorial hella blue bottle. Tote bag wolf authentic try-hard put a bird on it mumblecore. Unicorn lumbersexual master cleanse blog hella VHS, vaporware sartorial church-key cardigan single-origin coffee lo-fi organic asymmetrical. Taxidermy semiotics celiac stumptown scenester normcore, ethical helvetica photo booth gentrify.",
    inCart: false,
    count: 0,
    total: 0,
  },
];
