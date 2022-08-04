module.exports = (app) => {
    const product = require('../controllers/product.controllers')
    const router = require('express').Router()

    router.get('/', product.findAll)
    router.get('/:id', product.findOne)
    router.post('/', product.create)
    router.put('/:id', product.update)
    router.delete('/:id', product.delete)

    app.use('/api/products', router)
}