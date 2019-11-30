const services = require('../services')

module.exports = {
  getAllProductsByCategory: async (req, res) => {
    let category = req.params.categoryName
    res.json(await services.products.getAllProductsByCategory(category))
  },
  getProductById: async (req, res) => {
    let productId = req.params.productId
    res.json(await services.products.getProductById(productId))
  },
  getNewProducts: async (req, res) => {
    res.json(await services.products.getNewProducts())
  },
  getAllProductsByArrayOfIds: async (req, res) => {
    let array = req.params.array.split(',')
    res.json(await services.products.getAllProductsByArrayOfIds(array))
  },
  createProduct: async (req, res) => {
    let product = req.body
    await services.products.createProduct(product)
    res.json({ message: 'Product created!' })
  },
  updateProduct: async (req, res) => {
    let product = req.body
    let productId = product._id
    await services.products.updateProduct(productId, product)
    res.json({ message: 'Product updated!' })
  }
}
