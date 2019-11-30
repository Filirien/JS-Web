const express = require('express')
const controllers = require('../controllers')

const apiRouter = express.Router()

module.exports = (app) => {
  apiRouter.route('/')
    .get((req, res) => {
      res.json('Connected to My Api!')
    })

  apiRouter.route('/users')
    .get(controllers.users.allUsers)
    .put(controllers.users.update)

  apiRouter.route('/users/register')
    .post(controllers.users.register)

  apiRouter.route('/users/login')
    .post(controllers.users.login)

  apiRouter.route('/users/logout')
    .post(controllers.users.logout)

  apiRouter.route('/categories')
    .get(controllers.categories.allCategories)

  apiRouter.route('/comments')
    .post(controllers.comments.createComment)
    .put(controllers.comments.updateComment)

  apiRouter.route('/comments/:productId')
    .get(controllers.comments.getCommentsByProductId)

  apiRouter.route('/comments/commentId=:commentId')
    .delete(controllers.comments.deleteComment)

  apiRouter.route('/categories')
    .post(controllers.categories.create)

  apiRouter.route('/products')
    .put(controllers.products.updateProduct)
    .post(controllers.products.createProduct)

  apiRouter.route('/products/new')
    .get(controllers.products.getNewProducts)

  apiRouter.route('/products/array=:array')
    .get(controllers.products.getAllProductsByArrayOfIds)

  apiRouter.route('/products/category=:categoryName')
    .get(controllers.products.getAllProductsByCategory)

  apiRouter.route('/products/product=:productId')
    .get(controllers.products.getProductById)

  apiRouter.route('*')
    .get((req, res) => res.json('Invalid url. Make sure you have written the correct url and try again'))

  app.use('/api', apiRouter)
}
