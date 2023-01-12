module.exports = (app) => {
    const report = require('../controllers/report.controllers')
    const router = require('express').Router()

    router.get('/orders', report.getOrdersReports)
    router.get('/purchaseorders', report.getPurchaseOrdersReports)
    router.get('/customersorders',report.getOrdersByPartners)
    router.get('/customerspurchaseorders',report.getPurchaseOrdersByPartners)

    app.use('/api/reports', router)
}