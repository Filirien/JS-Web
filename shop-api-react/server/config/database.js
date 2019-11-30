const mongoose = require('mongoose')
const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Comment = require('../models/Comment')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db)
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }

    console.log('DB ready!')

    User.seedAdminUser()
    Category.seedCategories()
    Product.seedProducts()
    Comment.seedComments()
  })

  db.on('error', err => console.log(`Database error: ${err}`))
}
