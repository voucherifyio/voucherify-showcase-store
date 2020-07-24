require('dotenv').config();
const { campaigns, vouchers, products, segments } = require('./voucherifyData');
const voucherify = require('voucherify')({
  applicationId: process.env.REACT_APP_BACKEND_APPLICATION_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_CLIENT_SECRET_KEY,
});
const fs = require('fs');
const dataDir = './.data';
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const setupCampaigns = () => {
  const campaignPromises = campaigns.map((campaign) => {
    const thisCampaign = voucherify.campaigns.create(campaign);
    thisCampaign.then(
      (camp) => {
        const needsId = campaigns.find((c) => c.name === camp.name);
        needsId.voucherifyId = camp.id;
        console.log(
          `[SUCCESS] Campaign created ${needsId.name}`
        );
      })
      .catch((error) =>
        console.log(
          `[ERROR] There was a error creating campaign ${campaign.name}`, error
        )
      );
    return thisCampaign;
  });

  return Promise.all(campaignPromises)
    .then(
      (response) =>
        fs.writeFile(
          './.data/createdCampaigns.json',
          JSON.stringify(
            response.map((element) => element),
          ),
          (error) => {
            if (error) throw error;
            console.log('[SUCCESS] All campaigns setup');
          }) || response
    ).catch((error) => console.log('[ERROR] There was a error creating campaigns', error));
};

const setupVouchers = () => {
  const voucherPromises = vouchers.map((voucher) => {
    const thisVoucher = voucherify.vouchers.create(voucher);
    thisVoucher.then(
      (vouch) => {
        const needsId = vouchers.find((v) => v.code === vouch.code);
        needsId.voucherifyId = vouch.id;
        console.log(
          `[SUCCESS] Voucher created ${needsId.code}`
        );
      },
      (error) =>
        console.log(
          `[ERROR] There was a error creating voucher ${voucher.code}`, error
        )
    );
    return thisVoucher;
  });

  return Promise.all(voucherPromises)
    .then(
      (response) =>
        fs.writeFile(
          './.data/createdVouchers.json',
          JSON.stringify(
            response.map((element) => element)
          ),
          (error) => {
            if (error) throw error;
            console.log('[SUCCESS] All vouchers setup');
          }) || response      
    ).catch((error) => console.log('[ERROR] There was a error creating vouchers', error));
};

const setupProducts = () => {
  const productCreationPromises = products.map((product) => {
    const thisProduct = voucherify.products.create({
      name: product.name,
      source_id: product.source_id,
      price: product.price,
      image_url: product.metadata.imgUrl,
      metadata: {
        demostoreOrder: product.metadata.demostoreOrder,
        company: product.metadata.company,
        categories: product.metadata.categories.join(),
        info: product.metadata.info,
        weight: product.metadata.weight,
        slug: product.metadata.slug,
        sku: product.metadata.sku,
      },
    });
    thisProduct.then(
      (prod) => {
        const needsId = products.find((p) => p.source_id === prod.source_id);
        needsId.voucherifyId = prod.id;
        console.log(
          `[SUCCESS] Product created ${needsId.name}`
        );
      })
      .catch((error) =>
        console.log(
          `[ERROR] There was a error creating product ${product.name}`, error
        )
      );
    return thisProduct;
  });
  return Promise.all(productCreationPromises)
    .then(
      (response) =>
        fs.writeFile(
          './.data/createdProducts.json',
          JSON.stringify(
            response.map((element) => element),
          ),
          (error) => {
            if (error) throw error;
            console.log('[SUCCESS] All products setup');
          }) || response
    ).catch((error) => console.log('[ERROR] There was a error creating products', error));
};

const setupCustomerSegments = () => {
  const segmentCreationPromises = segments.map((segment) => {
    const thisSegment = voucherify.segments
      .create(segment)
      .then((seg) => {
        const needsId = segments.find((s) => s.name === segment.name);
        needsId.voucherifyId = seg.id;
        console.log(
          `[SUCCESS] Segment created ${needsId.name}`
        );
        return seg;
      })
      .catch((error) =>
        console.log(
          `[ERROR] There was a error creating segment ${segment.name}`, error
        )
      );
    return thisSegment;
  });

  return Promise.all(segmentCreationPromises)
    .then(
      (response) =>
        fs.writeFile(
          './.data/createdSegments.json',
          JSON.stringify(
            response.map((element) => element),
          ),
          (error) => {
            if (error) throw error;
            console.log('[SUCCESS] All segments setup');
          }) || response
    ).catch((error) => console.log('[ERROR] There was a error creating segments', error));
};

const setupValidationRules = async () => {
  const rules = [
    {
      name: 'Buy One - Get One',
      error: { message: 'Check campaign rules' },
      rules: {
        '1': {
          name: 'product.id',
          error: {
            message:
              'Cart must contain Johan & Nyström - Fika and Johan & Nyström - Sumatra Gayo Mountain Fairtrade 500g',
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
        '2': {
          name: 'product.id',
          error: {
            message:
              'Cart must contain Johan & Nyström - Fika and Johan & Nyström - Sumatra Gayo Mountain Fairtrade 500g',
          },
          rules: {
            '1': {
              name: 'product.discount_applicable',
              rules: {},
              conditions: { $is: [true] },
            },
            logic: '1',
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
        '1': {
          name: 'redemption.count.per_customer',
          error: { message: 'Customer can redeem this voucher only once' },
          rules: {},
          conditions: { $less_than_or_equal: [1] },
        },
        logic: '1',
      },
    },
    {
      name: 'Welcome wave 5% off Lewis Marshall',
      error: { message: 'Only Lewis Marshall can use this coupon' },
      rules: {
        '1': {
          name: 'customer.metadata',
          error: { message: 'Only Lewis Marshall can use this coupon' },
          rules: {},
          property: 'demostore_id',
          conditions: { $is: ['lewismarshall'] },
        },
        logic: '1',
      },
    },
    {
      name: 'Welcome wave 5% off Alice Morgan',
      error: { message: 'Only Alice Morgan can use this coupon' },
      rules: {
        '1': {
          name: 'customer.metadata',
          error: { message: 'Only Alice Morgan can use this coupon' },
          rules: {},
          property: 'demostore_id',
          conditions: { $is: ['alicemorgan'] },
        },
        logic: '1',
      },
    },
    {
      name: 'Welcome wave 5% off John Dorian',
      error: { message: 'Only John Dorian can validate this coupon' },
      rules: {
        '1': {
          name: 'customer.metadata',
          error: { message: 'Only John Dorian can validate this coupon' },
          rules: {},
          property: 'demostore_id',
          conditions: { $is: ['johndorian'] },
        },
        logic: '1',
      },
    },
    {
      name: 'Without Nivona CafeRomatica 759',
      error: { message: 'Check campaign rules' },
      rules: {
        '1': {
          name: 'product.id',
          error: {
            message: 'Your cart can\'t include Nivona CafeRomatica 759',
          },
          rules: {},
          conditions: {
            $is_not: [
              {
                id: products.find((p) => p.name === 'Nivona CafeRomatica 759')
                  .voucherifyId,
              },
            ],
          },
        },
        logic: '1',
      },
    },
    {
      name: '$15 off for Johan & Nystrom - Bourbon double-pack',
      error: { message: 'Check the campaign rules' },
      rules: {
        '1': {
          name: 'product.id',
          error: {
            message: 'You must add 2 or more Johan & Nyström - Bourbon',
          },
          rules: {
            '1': {
              name: 'product.quantity',
              rules: {},
              conditions: { $more_than_or_equal: [2] },
            },
            logic: '1',
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
      name: '5% off for Illy Arabica - Guatemala',
      error: { message: 'Check the campaign rules' },
      rules: {
        '1': {
          name: 'product.id',
          error: {
            message: 'You have to add Illy Arabica - Guatemala to your cart',
          },
          rules: {},
          conditions: {
            $is: [
              {
                id: products.find((p) => p.name === 'Illy Arabica - Guatemala')
                  .voucherifyId,
              },
            ],
          },
        },
        '2': {
          name: 'order.amount',
          error: { message: 'Total cart value must be more than $50' },
          rules: {},
          conditions: { $more_than: [5000] },
        },
        logic: '(1) and (2)',
      },
    },
    {
      name: '13% off - Local promotion',
      error: { message: 'Check campaign rules' },
      rules: {
        '1': {
          name: 'customer.segment',
          error: { message: 'Customer must be from Poland' },
          rules: {},
          conditions: {
            $is: [
              segments.find((s) => s.name === '13% off - Local promotion')
                .voucherifyId,
            ],
          },
        },
        logic: '1',
      },
    },
  ];
  const ruleCreationPromises = rules.map(async (rule) => {
    const thisRule = await voucherify.validationRules
      .create(rule)
      .then((rul) => {
        const needsId = rules.find((response) => response.name === rule.name);
        needsId.voucherifyId = rul.id;
        console.log(
          `[SUCCESS] Validation rule created ${needsId.name}`
        );
        return rul;
      })
      .catch((error) => console.log(`[ERROR] There was a error creating validation rule ${needsId.name}`, error));
    return thisRule;
  });

  const campaignsRuleAssigmentPromises = () =>
    campaigns.map(async (campaign) => {
      if (
        campaign.metadata.demostoreAssignedValRules &&
        campaign.metadata.demostoreName !== 'Welcome wave 5% off'
      ) {
        const demostoreValRules = campaign.metadata.demostoreAssignedValRules.split(
          '; '
        );
        demostoreValRules.forEach(async (demostoreValRule) => {
          const campaignAssigment = await voucherify.validationRules
            .createAssignment(
              rules.find((response) => response.name === demostoreValRule).voucherifyId,
              {
                campaign: campaign.voucherifyId,
              }
            )
            .then((assigment) => {
              console.log(`[SUCCESS] Campaign assigment created ${assigment.id}`);
              return assigment;
            })
            .catch((error) => console.log(`[ERROR] There was a error creating campaign assigment ${assigment.id}`, error));
          return campaignAssigment;
        });
      }
    });

  const vouchersRuleAssigmentPromises = () =>
    vouchers.map(async (voucher) => {
      if (voucher.metadata.demostoreAssignedValRules) {
        const demostoreValRules = voucher.metadata.demostoreAssignedValRules.split(
          '; '
        );
        demostoreValRules.forEach(async (demostoreValRule) => {
          const voucherAssigment = await voucherify.validationRules
            .createAssignment(
              rules.find((response) => response.name === demostoreValRule).voucherifyId,
              {
                voucher: voucher.code,
              }
            )
            .then((assigment) => {
              console.log(`[SUCCESS] Voucher assigment created ${assigment.id}`);
              return assigment;
            })
            .catch((error) => console.log(`[ERROR] There was a error creating voucher assigment ${assigment.id}`, error));
          return voucherAssigment;
        });
      }
    });

  Promise.all(ruleCreationPromises)
    .then(
      (response) =>
        fs.writeFile(
          './.data/createdValidationRules.json',
          JSON.stringify(
            response.map((element) => element),
          ),
          (error) => {
            if (error) throw error;
            console.log('[SUCCESS] All validation rules setup');
          }) || response
    ).then(() => campaignsRuleAssigmentPromises())
    .then(() => vouchersRuleAssigmentPromises())
    .catch((error) => console.log('[ERROR] There was a error creating validation rules', error));

  return console.log('[SUCCESS] Setup finished');
};

setupCampaigns()
  .then(setupProducts)
  .then(setupVouchers)
  .then(setupCustomerSegments)
  .then(setupValidationRules)
  .catch((error) => console.log('[ERROR] There was a error creating project', error))
