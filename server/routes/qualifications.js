const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('*').post(async (req, res) => {
  try {
    const { customer, amount, items, metadata } = req.body;
    const qtPayload = {
      customer,
      order: {
        amount,
        items,
      },
      metadata,
    };
    const examinedVouchers = await voucherify.vouchers.qualifications.examine(
      qtPayload
    );
    const examinedCampaigns = await voucherify.campaigns.qualifications.examine(
      qtPayload
    );
    const examinedCampaignsPromotion = await voucherify.promotions.validate(
      qtPayload
    );
    let qualifications = examinedCampaigns.data
      .concat(examinedVouchers.data)
      .concat(examinedCampaignsPromotion.promotions)
      .filter((qlt) => qlt.hasOwnProperty('metadata'));

    qualifications = qualifications.filter((qlt) =>
      qlt.metadata.hasOwnProperty('demostoreName')
    );

    return res.json(qualifications);
  } catch (e) {
    console.error(`[Qualification][Error] - ${e}`);
    res.status(500).end();
  }
});

module.exports = router;
