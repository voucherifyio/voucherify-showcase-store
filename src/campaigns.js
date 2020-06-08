module.exports = [
  {
    name: "More-than-$90-in-Cart-and-Pixel",
    type: "AUTO_UPDATE",
    voucher: {
      type: "DISCOUNT_VOUCHER",
      discount: { percent_off: 5, type: "PERCENT" },
    },
    metadata: {
      demostore: true,
      demostore_description: "Your cart must be valued $90 or more",
      demostore_steps: {
        step1: "Your cart must be valued $88 or more",
        step2: "You must have Pixel phone in your cart"
      }
    }
  },
];
