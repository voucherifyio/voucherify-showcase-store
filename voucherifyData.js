const testCartTotalAmount = 111;
const testProductId = 1
const testProductName = 'Pixel Phone'

exports.rules = [
  {
    name: `More-than-$${testCartTotalAmount}-in-Cart-and-${testProductName}`,
    rules: {
      1: {
        name: "order.amount",
        conditions: {
          $more_than: [`${testCartTotalAmount * 100}`],
        },
        error: {
          message: `Total cart value must be greater than $${testCartTotalAmount}`,
        },
      },
      2: {
        name: "product.id",
        conditions: {
          $is: [{ source_id: testProductId }],
        },
        error: {
          message: `You must have ${testProductName} Phone in your cart`,
        },
      },
      logic: "1 and 2",
    },
  },
];

exports.campaigns = [
    {
      name: `More-than-$${testCartTotalAmount}-in-Cart-and-${testProductName}`,
      type: "AUTO_UPDATE",
      voucher: {
        type: "DISCOUNT_VOUCHER",
        discount: { percent_off: 5, type: "PERCENT" },
      },
      metadata: {
        demostore: true,
        demostore_description: `Total cart value must be greater than $${testCartTotalAmount} and you must have a ${testProductName} in it`,
        demostore_steps: {
          step1: `Total cart value must be greater than $${testCartTotalAmount}`,
          step2: `You must have ${testProductName} in your cart`
        }
      }
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