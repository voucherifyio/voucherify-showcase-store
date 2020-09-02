const router = require('express').Router();
const voucherifyClient = require('voucherify');
const voucherify = voucherifyClient({
  applicationId: process.env.REACT_APP_BACKEND_APP_ID,
  clientSecretKey: process.env.REACT_APP_BACKEND_KEY,
});
router.route('*').get(async (request, response) => {
  try {
    console.log('products')
    const allProducts = await voucherify.products.list();
    // Filter out default Voucherify products
    const products = allProducts.products.filter(
      (product) =>
        product.name !== 'Shipping' &&
        product.name !== 'Watchflix' &&
        product.name !== 'Apple iPhone 8'
    );
    return response.json(products);
  } catch (e) {
    console.error(`[Products][Error] - ${e}`);
    response.status(500).end();
  }
});

module.exports = router;
