module.exports = (app) => {
    const uom = require('../controllers/uom.controllers')
    const router = require('express').Router()

    router.get('/', uom.findAll)
    router.get('/:id', uom.findOne)
    router.post('/', uom.create)
    router.put('/:id', uom.update)
    router.delete('/:id', uom.delete)

    app.use('/api/uom', router)
}