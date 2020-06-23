require("dotenv").config();
const voucherifyData = require("./voucherifyData");
const voucherify = require("voucherify")({
  applicationId: process.env.APPLICATION_ID,
  clientSecretKey: process.env.CLIENT_SECRET_KEY,
});
const fs = require("fs");
const dataDir = "./.data";
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const setupCampaigns = () => {
  const campaigns = voucherifyData.campaigns;
  const campaignPromises = campaigns.map((campaign) => {
    const thisCampaign = voucherify.campaigns.create(campaign);

    thisCampaign.then(
      () =>
        console.log(`Campaign ${campaign.name} has been succesfully set up`),
      (problem) =>
        console.log(
          `There was a problem setting up ${campaign.name}`,
          JSON.stringify(problem, null, 2)
        )
    );

    return thisCampaign;
  });

  return Promise.all(campaignPromises).then(
    (resp) => console.log("ALL CAMPAIGNS SETUP") || resp
  );
};

const setupVouchers = () => {
  const vouchers = voucherifyData.vouchers;
  const voucherPromises = vouchers.map((voucher) => {
    const thisVoucher = voucherify.vouchers.create(voucher);

    thisVoucher.then(
      () => console.log(`Voucher ${voucher.code} has been succesfully set up`),
      (problem) =>
        console.log(
          `There was a problem setting up ${voucher.code}`,
          JSON.stringify(problem, null, 2)
        )
    );

    return thisVoucher;
  });

  return Promise.all(voucherPromises).then(
    (resp) => console.log("ALL VOUCHERS SETUP") || resp
  );
};

const listProducts = async () => {
  try {
    const productList = await voucherify.products.list();
    console.log(productList)
  } catch (e) {
    console.log(e)
  }
}

const deleteProducts = async () => {
  try {
    const productsList = await voucherify.products.list();
    for (let i = 0; i < productsList.products.length; i++) {
      await voucherify.products
        .delete(productsList.products[i].id, { force: true })
        .then(
          (resp) => {
            console.log("Removed product");
          },
          (problem) =>
            console.log(
              `There was a problem removing product ${productsList.products[i].id}`,
              JSON.stringify(problem, null, 2)
            )
        );
    }
  } catch (e) {
    console.log(e);
  }
};

//Run setupProducts only once!

const setupProducts = () => {
  const products = voucherifyData.products;
  const productCreationPromises = products.map(async (product) => {
    const thisProduct = await voucherify.products
      .create({
        name: product.name,
        source_id: product.source_id,
        price: product.price,
        image_url: product.metadata.imgUrl,
        metadata: {
          demostore: product.metadata.demostore,
          demostoreOrder: product.metadata.demostoreOrder,
          company: product.metadata.company,
          categories: product.metadata.categories.join(),
          info: product.metadata.info,
          weight: product.metadata.weight,
          slug: product.metadata.slug,
          sku: product.metadata.sku,
          inCart: false,
          count: 0,
          total: 0,
        },
      })
      .then(
        (prod) => {
          voucherify.products.createSku(prod.id, {
            id: product.metadata.sku,
            source_id: product.metadata.sku,
            sku: product.name,
            price: product.price,
          });
        },
        (problem) =>
          console.log(
            `There was a problem creating product ${product.name}`,
            JSON.stringify(problem, null, 2)
          )
      );
    return thisProduct;
  });

  return Promise.all(productCreationPromises).then(
    (resp) => console.log("ALL PRODUCTS SETUP") || resp
  );
};

// const setupCustomerSegments = () => {
// const segments = voucherifyData.segments
//   const promises = segments.map((segment) => {
//     const thisPromise = request({
//       uri: `https://api.voucherify.io/v1/segments`,
//       method: "POST",
//       body: segment,
//       headers: {
//         "Content-Type": "application/json",
//         "X-App-Id": process.env.APPLICATION_ID,
//         "X-App-Token": process.env.CLIENT_SECRET_KEY,
//       },
//       json: true,
//     });

//     thisPromise.then(
//       (resp) => {
//         console.log(`Customer segment ${segment.name} has been setup`);

//         const needsId = segments.find((s) => s.name === segment.name);
//         needsId.voucherifyId = resp.id;

//         return resp;
//       },
//       (problem) =>
//         console.log(
//           `PROBLEM SETTING SEGMENT ${segment.name}`,
//           JSON.stringify(problem, null, 2)
//         )
//     );

//     return thisPromise;
//   });

//   return Promise.all(promises)
//     .then((resp) => console.log("ALL SEGMENTS SETUP") || resp)
//     .then(
//       (r) =>
//         fs.writeFile(
//           "./.data/segments.json",
//           JSON.stringify(
//             r.map((sr) => sr.id),
//             null,
//             2
//           ),
//           () => {}
//         ) || r
//     );
// };

const setupValidationRules = () => {
  //This code checks added Validation Rules ID's for each campaign in voucherifyData and assigns this rule to the campaign
  const campaigns = voucherifyData.campaigns;
  const vouchers = voucherifyData.vouchers;
  const campaignsRuleAssigmentPromises = campaigns.map(async (campaign) => {
    try {
      campaign = await voucherify.campaigns.get(campaign.name);
      if (campaign.metadata.demostoreAssignedValRules) {
        let demostoreValRules = campaign.metadata.demostoreAssignedValRules.split(
          ";"
        );
        for (let i = 0; i < demostoreValRules.length; i++) {
          const thisPromise = await voucherify.validationRules.createAssignment(
            demostoreValRules[i],
            { campaign: campaign.id }
          );
          return thisPromise;
        }
      }
    } catch (e) {
      console.log(e);
    }
  });

  const vouchersRuleAssigmentPromises = vouchers.map(async (voucher) => {
    try {
      voucher = await voucherify.vouchers.get(voucher.code);
      if (voucher.metadata.demostoreAssignedValRules) {
        let demostoreValRules = voucher.metadata.demostoreAssignedValRules.split(
          ";"
        );
        for (let i = 0; i < demostoreValRules.length; i++) {
          const thisPromise = await voucherify.validationRules.createAssignment(
            demostoreValRules[i],
            { voucher: voucher.id }
          );
          return thisPromise;
        }
      }
    } catch (e) {
      console.log(e);
    }
  });

  return Promise.all(
    campaignsRuleAssigmentPromises,
    vouchersRuleAssigmentPromises
  ).then((resp) => console.log("ALL VALIDATION RULES SETUP") || resp);
};
//   const ruleCreationPromises = rules.map(async (rule) => {
//     const thisPromise = voucherify.validationRules.create(rule);
//     let campaign = await voucherify.campaigns.get(rule.name);

//     thisPromise
//       .then(
//         async (resp) =>
//           await voucherify.validationRules.createAssignment(resp.id, {
//             campaign: campaign.id,
//           }),
//         (problem) => console.log(JSON.stringify(problem, null, 2))
//       )
//       .catch((e) => console.log(e));

//     return thisPromise;
//   });

//   return Promise.all(ruleCreationPromises).then(
//     (resp) => console.log("ALL VALIDATION RULES SETUP") || resp
//   );
// };

// setupCustomerSegments()
// deleteProducts().then(setupProducts) // You need to setup Validation rules in dashboard!
setupCampaigns().then(setupVouchers).then(setupValidationRules);
