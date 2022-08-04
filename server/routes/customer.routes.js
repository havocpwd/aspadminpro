module.exports = (app) => {
    const partners = require('../controllers/partner.controllers')
    const router = require('express').Router()

    router.get('/', partners.getByTypeCustomer)
    router.get('/:id', partners.findOne)
    router.post('/', partners.create)
    router.put('/:id', partners.update)
    router.delete('/:id', partners.delete)

    app.use('/api/customers', router)
}