const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});

router.route('/redeem').post(async (request, response) => {
  const { code, promotionId } = request.body;
  try {
    if (code) {
      const redemption = await voucherify.redemptions.redeem(
        code,
        request.body
      );
      return response.json(redemption);
    } else {
      const redemption = await voucherify.promotions.tiers.redeem(
        promotionId,
        request.body
      );
      return response.json(redemption);
    }
  } catch (e) {
    console.error(`[Redeem][Error] - ${e}`);
    response.status(500).end();
  }
});

router.route('/:source_id').get(async (request, response) => {
  const sourceId = request.params.source_id;
  try {
    const redemptionLists = await voucherify.redemptions.list({
      customer: sourceId,
    });
    response.json(redemptionLists);
  } catch (e) {
    console.error(`[Redemptions][Error] - ${e}`);
    response.status(500).end();
  }
});

module.exports = router;
