module.exports = (app) => {
    const menus = require('../controllers/menu.controllers')
    const router = require('express').Router()

    router.get('/', menus.findAll)
    router.get('/:id', menus.findOne)
    router.post('/', menus.create)
    router.put('/:id', menus.update)
    router.delete('/:id', menus.delete)

    app.use('/api/menus', router)
}