const Product = require('mongoose').model('Product')

async function createProduct (product) {
  let newProduct = await Product.create(product)
  return newProduct
}

async function getAllProductsByCategory (category) {
  let products = await Product.find({ categoryName: category })
  return products
}

async function getProductById (productId) {
  let product = await Product.findById(productId)
  return product
}

async function getNewProducts () {
  let products = await Product.find({}).sort('-date').limit(3)
  return products
}

async function getAllProductsByArrayOfIds (array) {
  let products = await Product.find({ '_id': { $in: array } })
  return products
}

async function updateProduct (productId, newProduct) {
  await Product.findById(productId, (err, product) => {
    if (err) {
      console.log(err)
    }
    product.name = newProduct.name
    product.price = newProduct.price
    product.img = newProduct.img
    product.description = newProduct.description
    product.additionalInformation = newProduct.additionalInformation

    product.save((err) => {
      if (err) {
        console.log(err)
      }
    })
  })
}

module.exports = {
  getAllProductsByCategory,
  getProductById,
  getNewProducts,
  getAllProductsByArrayOfIds,
  createProduct,
  updateProduct
}
