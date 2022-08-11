module.exports = (app) => {
    const visitor = require('../controllers/visitor.controllers')
    const router = require('express').Router()

    router.get('/', visitor.findAll)
    router.get('/:id', visitor.findOne)
    router.post('/', visitor.create)
    router.put('/:id', visitor.update)
    router.delete('/:id', visitor.delete)

    app.use('/api/visitor', router)
}