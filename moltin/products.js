const products = require("./products.json");
const categories = require("./categories.json");
const brands = require("./brands.json");
const fs = require("fs");
const data = [];

for (let i = 0; i < products.data.length; i++) {
  let productCategories = [];
  let productBrand = "";

  const productCat = products.data[i].relationships.categories.data;
  const productBra = products.data[i].relationships.brands.data;

  for (let j = 0; j < productCat.length; j++) {
    let category = categories.data.find((c) => c.id === productCat[j].id);
    productCategories.push(category.name);
  }

  for (let k = 0; k < productBra.length; k++) {
    let brand = brands.data.find((b) => b.id === productBra[k].id);
    productBrand = brand.name;
  }

  const baseURL =
    "https://vf-asset.s3-eu-west-1.amazonaws.com/demostore-hot-beans/products/";

  let productUrlName =
    products.data[i].name.replace(/&/g, "%26").split(" ").join("+") + ".jpg";

  const totalUrl = baseURL + productUrlName;

  let voucherifyPayload = {
    name: products.data[i].name,
    source_id: products.data[i].id,
    price: products.data[i].price[0].amount,
    metadata: {
      demostore: "moltin",
      company: productBrand,
      categories: productCategories,
      imgUrl: totalUrl,
      info: products.data[i].description,
      weight: products.data[i].weight.g,
      slug: products.data[i].slug,
      sku: products.data[i].sku,
      inCart: false,
      count: 0,
      total: 0,
    },
  };
  data.push(voucherifyPayload);
  let datajson = { data };
  datajson = JSON.stringify(datajson);
  // console.log(datajson);
  fs.writeFile("thing.json", datajson, function (err, result) {
    if (err) console.log("error", err);
  });
  // fs.writeFile("file.json", datajson);

  // console.log(data);
}
