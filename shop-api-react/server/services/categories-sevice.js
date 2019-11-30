const Category = require('mongoose').model('Category')

async function allCategories () {
  let categories = await Category.find({})
  return categories
}

function create (category) {
  return Category.create(category)
}

module.exports = {
  allCategories,
  create
}
