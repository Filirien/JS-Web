const mongoose = require('mongoose')

const commentsArr = require('../data/seed-data').commentsArr

let commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  productId: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: new Date(Date.now()) }
})

let Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
module.exports.seedComments = () => {
  Comment.find({}).then(comments => {
    if (comments.length > 0) return

    for (const comment of commentsArr) {
      Comment.create(comment)
    }

    console.log('Comments generated :)')
  })
}
