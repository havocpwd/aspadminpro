module.exports = (app) => {
    const Category = require('../controllers/category.controllers')
    const router = require('express').Router()

    router.get('/', Category.findAll)
    router.get('/:id', Category.findOne)
    router.post('/', Category.create)
    router.put('/:id', Category.update)
    router.delete('/:id', Category.delete)

    app.use('/api/categories', router)
}