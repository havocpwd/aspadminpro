module.exports = (app) => {
    const payments = require('../controllers/payment.controllers')
    const router = require('express').Router()

    router.get('/', payments.findAll)
    router.get('/:id', payments.findOne)
    router.post('/', payments.create)
    router.put('/:id', payments.update)
    router.delete('/:id', payments.delete)

    app.use('/api/payments', router)
}