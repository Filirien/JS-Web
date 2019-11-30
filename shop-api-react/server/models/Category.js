const mongoose = require('mongoose')

const categoriesArr = require('../data/seed-data').categoriesArr

let categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
})

let Category = mongoose.model('Category', categorySchema)

module.exports = Category
module.exports.seedCategories = () => {
    Category.find({}).then(categories => {
        if (categories.length > 0) return

        for (const item of categoriesArr) {
            Category.create(item)
        }

        console.log('Categories generated :)')
    })
}