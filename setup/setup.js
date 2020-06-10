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

//Run setupProducts only once!

// const setupProducts = () => {
// const products = voucherifyData.products;
//   const productCreationPromises = products.map(async (product) => {
//     const thisProduct = await voucherify.products
//       .create({
//         name: product.title,
//         source_id: product.id,
//         price: product.price * 100,
//         metadata: {
//           info: product.info,
//           company: product.company,
//           imgUrl: product.imgUrl,
//           inCart: product.inCart,
//           count: product.count,
//           total: product.total,
//         },
//       })
//       .then(
//         (prod) => {
//           console.log(`Product ${product.title} has been succesfully created`);
//           const needsId = products.find(
//             (p) => p.id === parseInt(prod.source_id, 10)
//           );
//           needsId.voucherifyId = prod.id;
//         },
//         (problem) =>
//           console.log(
//             `There was a problem creating product ${product.title}`,
//             JSON.stringify(problem, null, 2)
//           )
//       );
//     return thisProduct;
//   });

//   return Promise.all(productCreationPromises).then(
//     (resp) => console.log("ALL PRODUCTS SETUP") || resp
//   );
// };

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
  const ruleAssigmentPromises = campaigns.map(async (campaign) => {
    try {
      campaign = await voucherify.campaigns.get(campaign.name);
      for (
        let i = 0;
        i < campaign.metadata.demostoreAssignedValRules.length;
        i++
      ) {
        const thisPromise = await voucherify.validationRules.createAssignment(
          campaign.metadata.demostoreAssignedValRules[i],
          { campaign: campaign.id }
        );
        return thisPromise;
      }
    } catch (e) {
      console.log(e);
    }
  });
  return Promise.all(ruleAssigmentPromises).then(
    (resp) => console.log("ALL VALIDATION RULES SETUP") || resp
  );
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
// setupProducts();
setupCampaigns().then(setupValidationRules);
