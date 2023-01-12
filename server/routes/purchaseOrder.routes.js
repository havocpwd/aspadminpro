module.exports = (app) => {
    const purchaseOrder = require('../controllers/purchaseOrder.controllers')
    const router = require('express').Router()

    router.get('/', purchaseOrder.findAll)
    router.get('/:id', purchaseOrder.findOne)
    router.post('/', purchaseOrder.create)
    router.put('/:id', purchaseOrder.update)
    router.delete('/:id', purchaseOrder.delete)

    app.use('/api/purhcaseorders', router)
}