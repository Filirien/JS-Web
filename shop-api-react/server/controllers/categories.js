const services = require('../services')

module.exports = {
  allCategories: async (req, res) => {
    res.json(await services.categories.allCategories())
  },
  create: async (req, res) => {
    let category = req.body
    try {
      await services.categories.create(category)
    } catch (err) {
     return res.json(err)
    }
    res.json({ message: 'Category created!' })
  }
}
