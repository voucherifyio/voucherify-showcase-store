require("dotenv").config();
const voucherifyData = require("./voucherifyData");
const voucherify = require("voucherify")({
  applicationId: process.env.REACT_APP_APPLICATION_ID,
  clientSecretKey: process.env.REACT_APP_CLIENT_SECRET_KEY,
});
const fs = require("fs");
const dataDir = "./.data";
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

let campaigns = voucherifyData.campaigns;
let vouchers = voucherifyData.vouchers;
let products = voucherifyData.products;
let segments = voucherifyData.segments;

const setupCampaigns = () => {
  const campaignPromises = campaigns.map((campaign) => {
    const thisCampaign = voucherify.campaigns.create(campaign);

    thisCampaign.then(
      (camp) => {
        const needsId = campaigns.find((c) => c.name === camp.name);
        needsId.voucherifyId = camp.id;
        console.log(
          `Campaign ${needsId.name} - ${needsId.voucherifyId} created`
        );
      },
      (problem) =>
        console.log(
          `There was a problem creating product ${campaign.name}`,
          JSON.stringify(problem, null, 2)
        )
    );
    return thisCampaign;
  });

  return Promise.all(campaignPromises)
    .then((resp) => console.log("ALL CAMPAIGNS SETUP") || resp)
    .then(
      (r) =>
        fs.writeFile(
          "./.data/createdCampaigns.json",
          JSON.stringify(
            r.map((sr) => sr),
            null,
            2
          ),
          () => {}
        ) || r
    )
    .then(() => console.log("SAVED"));
};

const setupVouchers = () => {
  const voucherPromises = vouchers.map((voucher) => {
    const thisVoucher = voucherify.vouchers.create(voucher);

    thisVoucher.then(
      (vouch) => {
        const needsId = vouchers.find((v) => v.code === vouch.code);
        needsId.voucherifyId = vouch.id;
        console.log(
          `Voucher ${needsId.code} - ${needsId.voucherifyId} created`
        );
      },
      (problem) =>
        console.log(
          `There was a problem creating voucher ${voucher.code}`,
          JSON.stringify(problem, null, 2)
        )
    );
    return thisVoucher;
  });

  return Promise.all(voucherPromises)
    .then((resp) => console.log("ALL VOUCHERS SETUP") || resp)
    .then(
      (r) =>
        fs.writeFile(
          "./.data/createdVouchers.json",
          JSON.stringify(
            r.map((sr) => sr),
            null,
            2
          ),
          () => {}
        ) || r
    )
    .then(() => console.log("SAVED"));
};

const setupProducts = () => {
  const productCreationPromises = products.map((product) => {
    const thisProduct = voucherify.products.create({
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
    });
    thisProduct.then(
      (prod) => {
        const needsId = products.find((p) => p.source_id === prod.source_id);
        needsId.voucherifyId = prod.id;
        console.log(
          `Product ${needsId.name} - ${needsId.voucherifyId} created`
        );
      },
      (problem) =>
        console.log(
          `There was a problem creating product ${product.name}`,
          JSON.stringify(problem, null, 2)
        )
    );
    return thisProduct;
  });
  return Promise.all(productCreationPromises)
    .then((resp) => console.log("ALL PRODUCTS SETUP") || resp)
    .then(
      (r) =>
        fs.writeFile(
          "./.data/createdProducts.json",
          JSON.stringify(
            r.map((sr) => sr),
            null,
            2
          ),
          () => {}
        ) || r
    )
    .then(() => console.log("SAVED"));
};

const setupCustomerSegments = () => {
  const segmentCreationPromises = segments.map((segment) => {
    const thisSegment = voucherify.segments
      .create(segment)
      .then((seg) => {
        const needsId = segments.find((s) => s.name === segment.name);
        needsId.voucherifyId = seg.id;
        console.log(
          `Segment ${needsId.name} - ${needsId.voucherifyId} created`
        );

        return seg;
      })
      .catch((problem) =>
        console.log(
          `PROBLEM SETTING SEGMENT ${segment.name}`,
          JSON.stringify(problem, null, 2)
        )
      );

    return thisSegment;
  });

  return Promise.all(segmentCreationPromises)
    .then((resp) => console.log("ALL SEGMENTS SETUP") || resp)
    .then(
      (r) =>
        fs.writeFile(
          "./.data/createdSegments.json",
          JSON.stringify(
            r.map((sr) => sr),
            null,
            2
          ),
          () => {}
        ) || r
    )
    .then(() => console.log("SAVED"))
    .catch((e) => console.log(e));
};

const setupValidationRules = async () => {
  const rules = [
    {
      name: "Buy One - Get One",
      error: { message: "Check campaing rules" },
      rules: {
        "1": {
          name: "product.id",
          error: {
            message:
              "Cart must contain Johan & Nyström - Fika and Johan & Nyström - Sumatra Gayo Mountain Fairtrade 500g",
          },
          rules: {},
          conditions: {
            $is: [
              {
                id: products.find((p) => p.name === "Johan & Nyström - Fika")
                  .voucherifyId,
              },
            ],
          },
        },
        "2": {
          name: "product.id",
          error: {
            message:
              "Cart must contain Johan & Nyström - Fika and Johan & Nyström - Sumatra Gayo Mountain Fairtrade 500g",
          },
          rules: {
            "1": {
              name: "product.discount_applicable",
              rules: {},
              conditions: { $is: [true] },
            },
            logic: "1",
          },
          conditions: {
            $is: [
              {
                id: products.find((p) => p.name === "Johan & Nyström - Sumatra")
                  .voucherifyId,
              },
            ],
          },
        },
        logic: "(1 and 2)",
      },
    },
    {
      name: "Black Friday Coupon",
      error: { message: "Customer can redeem this voucher only once" },
      rules: {
        "1": {
          name: "redemption.count.per_customer",
          error: { message: "Customer can redeem this voucher only once" },
          rules: {},
          conditions: { $less_than_or_equal: [1] },
        },
        logic: "1",
      },
    },
    {
      name: "Welcome wave 5% off Daniel Wieszcz",
      error: { message: "Only Daniel Wieszcz can use this coupon" },
      rules: {
        "1": {
          name: "customer.metadata",
          error: { message: "Only Daniel Wieszcz can use this coupon" },
          rules: {},
          property: "demostore_id",
          conditions: { $is: ["danielwieszcz"] },
        },
        logic: "1",
      },
    },
    {
      name: "Welcome wave 5% off Alice Morgan",
      error: { message: "Only Alice Morgan can use this coupon" },
      rules: {
        "1": {
          name: "customer.metadata",
          error: { message: "Only Alice Morgan can use this coupon" },
          rules: {},
          property: "demostore_id",
          conditions: { $is: ["alicemorgan"] },
        },
        logic: "1",
      },
    },
    {
      name: "Welcome wave 5% off JD",
      error: { message: "Only JD can validate this coupon" },
      rules: {
        "1": {
          name: "customer.metadata",
          error: { message: "Only JD can validate this coupon" },
          rules: {},
          property: "demostore_id",
          conditions: { $is: ["jd"] },
        },
        logic: "1",
      },
    },
    {
      name: "Without Nivona CafeRomatica 759",
      error: { message: "Check campaign rules" },
      rules: {
        "1": {
          name: "product.id",
          error: {
            message: "Your cart can't include Nivona CafeRomatica 759",
          },
          rules: {},
          conditions: {
            $is_not: [
              {
                id: products.find((p) => p.name === "Nivona CafeRomatica 759")
                  .voucherifyId,
              },
            ],
          },
        },
        logic: "1",
      },
    },
    {
      name: "$15 off for Johan & Nystrom - Bourbon double-pack",
      error: { message: "Check the campaign rules" },
      rules: {
        "1": {
          name: "product.id",
          error: {
            message: "You must add 2 or more Johan & Nyström - Bourbon",
          },
          rules: {
            "1": {
              name: "product.quantity",
              rules: {},
              conditions: { $more_than_or_equal: [2] },
            },
            logic: "1",
          },
          conditions: {
            $is: [
              {
                id: products.find((p) => p.name === "Johan & Nyström - Bourbon")
                  .voucherifyId,
              },
            ],
          },
        },
        logic: "1",
      },
    },
    {
      name: "5% off for Illy Arabica - Guatemala",
      error: { message: "Check the campaign rules" },
      rules: {
        "1": {
          name: "product.id",
          error: {
            message: "You have to add Illy Arabica - Guatemala to your cart",
          },
          rules: {},
          conditions: {
            $is: [
              {
                id: products.find((p) => p.name === "Illy Arabica - Guatemala")
                  .voucherifyId,
              },
            ],
          },
        },
        "2": {
          name: "order.amount",
          error: { message: "Total cart value must be more than $50" },
          rules: {},
          conditions: { $more_than: [5000] },
        },
        logic: "(1) and (2)",
      },
    },
    {
      name: "13% off - Local promotion",
      error: { message: "Check campaign rules" },
      rules: {
        "1": {
          name: "customer.segment",
          error: { message: "Customer must be from Poland" },
          rules: {},
          conditions: {
            $is: [
              segments.find((s) => s.name === "13% off - Local promotion")
                .voucherifyId,
            ],
          },
        },
        logic: "1",
      },
    },
  ];
  const ruleCreationPromises = rules.map(async (rule) => {
    const thisRule = await voucherify.validationRules
      .create(rule)
      .then((rul) => {
        const needsId = rules.find((r) => r.name === rule.name);
        needsId.voucherifyId = rul.id;
        console.log(
          `Validation rule  ${needsId.name} - ${needsId.voucherifyId} created`
        );

        return rul;
      })
      .catch((e) => console.log(e));

    return thisRule;
  });

  const campaignsRuleAssigmentPromises = () =>
    campaigns.map(async (campaign) => {
      if (
        campaign.metadata.demostoreAssignedValRules &&
        campaign.metadata.demostoreName !== "Welcome wave 5% off"
      ) {
        let demostoreValRules = campaign.metadata.demostoreAssignedValRules.split(
          "; "
        );

        demostoreValRules.forEach(async (demostoreValRule) => {
          console.log(demostoreValRule);
          const campaignAssigment = await voucherify.validationRules
            .createAssignment(
              rules.find((r) => r.name === demostoreValRule).voucherifyId,
              {
                campaign: campaign.voucherifyId,
              }
            )
            .then((assigment) => {
              console.log(`Assigment ${assigment.id} created`);

              return assigment;
            })
            .catch((e) => console.log(e));

          return campaignAssigment;
        });
      }
    });

  const vouchersRuleAssigmentPromises = () =>
    vouchers.map(async (voucher) => {
      if (voucher.metadata.demostoreAssignedValRules) {
        let demostoreValRules = voucher.metadata.demostoreAssignedValRules.split(
          "; "
        );
        demostoreValRules.forEach(async (demostoreValRule) => {
          console.log(demostoreValRule);
          const voucherAssigment = await voucherify.validationRules
            .createAssignment(
              rules.find((r) => r.name === demostoreValRule).voucherifyId,
              {
                voucher: voucher.code,
              }
            )
            .then((assigment) => {
              console.log(`Assigment ${assigment.id} created`);

              return assigment;
            })
            .catch((e) => console.log(e));

          return voucherAssigment;
        });
      }
    });

  Promise.all(ruleCreationPromises)
    .then((resp) => console.log("ALL VALIDATION RULES SETUP") || resp)
    .then(
      (r) =>
        fs.writeFile(
          "./.data/createdValidationRules.json",
          JSON.stringify(
            r.map((sr) => sr),
            null,
            2
          ),
          () => {}
        ) || r
    )
    .then(() => console.log("SAVED"))
    .then(() => console.log("========= FIRST PART FINISHED ========="))
    .then(() => campaignsRuleAssigmentPromises())
    .then(() => vouchersRuleAssigmentPromises())
    .then(() => console.log("========= SECOND PART FINISHED ========="))
    .catch((e) => console.log(e));

  return console.log("SETUP FINISHED");
};

setupCampaigns()
  .then(setupProducts)
  .then(setupVouchers)
  .then(setupCustomerSegments)
  .then(setupValidationRules);
