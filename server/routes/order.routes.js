module.exports = (app) => {
    const order = require('../controllers/order.controllers')
    const router = require('express').Router()

    router.get('/', order.findAll)
    router.get('/:id', order.findOne)
    router.post('/', order.create)
    router.put('/:id', order.update)
    router.delete('/:id', order.delete)

    app.use('/api/orders', router)
}