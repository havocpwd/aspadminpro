module.exports = (app) => {
    const orderdetail = require('../controllers/orderdetail.controllers')
    const router = require('express').Router()

    router.post('/', orderdetail.create)
    router.put('/:id', orderdetail.update)
    router.delete('/:id', orderdetail.delete)

    app.use('/api/orderdetail', router)
}