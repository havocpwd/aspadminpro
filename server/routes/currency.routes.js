module.exports = (app) => {
    const currencies = require('../controllers/currency.controllers ')
    const router = require('express').Router()

    router.get('/', currencies.findAll)
    router.get('/:id', currencies.findOne)
    router.post('/', currencies.create)
    router.put('/:id', currencies.update)
    router.delete('/:id', currencies.delete)

    app.use('/api/currencies', router)
}