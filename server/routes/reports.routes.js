module.exports = (app) => {
    const report = require('../controllers/report.controllers')
    const router = require('express').Router()

    router.get('/orders', report.getOrdersReports)
    router.get('/customers',report.getOrdersByPartners)

    app.use('/api/reports', router)
}