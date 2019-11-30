const mongoose = require('mongoose');

const productsArr = require('../data/seed-data').productsArr;

let productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: new Date(Date.now()) },
  categoryName: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  description: { type: String, required: true },
  additionalInformation: { type: Array, default: [] }
});

let Product = mongoose.model('Product', productSchema);

module.exports = Product
module.exports.seedProducts = () => {
  Product.find({}).then(products => {
    if (products.length > 0) return;

    for (const item of productsArr) {
      Product.create(item);
    }

    console.log('Products generated :)');
  })
}
