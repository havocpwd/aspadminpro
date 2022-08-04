const db = require('../models')
const mongoose = require('mongoose')
const Order = db.dbSchema.Order
const OrderDetail = db.dbSchema.OrderDetail

exports.getOrdersReports = async (req, res)=>{
    var queryParameters = req.query;
    const start = new Date(queryParameters.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(queryParameters.end);
    end.setHours(23, 59, 59, 999);
    await Order.aggregate([
        {
            $match : { dateIssued : { $gt: start, $lt: end } }
        },
        {
            $lookup: {
                from: 'partners',
                localField: 'partners',
                foreignField: '_id',
                as: 'partners'
            },
        },
        {
            $unwind: "$partners"
        },
        {
            $lookup: {
                from: 'payments',
                localField: 'payments',
                foreignField: '_id',
                as: 'payments'
            },
        },
        {
            $unwind: "$payments"
        },
        {
            $lookup: {
                from: 'orderdetails',
                localField: 'orderdetails',
                foreignField: '_id',
                as: 'orderdetails'
            },
        },
        {
            $unwind: "$orderdetails"
        },
        {
            $group:{
                _id: '$_id',
                orderNo: {$first: '$orderNo'},
                dateIssued: {$first: '$dateIssued'},
                partners: {$first: '$partners'},
                deliverTo: {$first: '$deliverTo'},
                deliveryFee: {$first: '$deliveryFee'},
                discount: {$first: '$discount'},
                note: {$first:'$note'},
                payments: {$first: '$payments'},
                grandTotal: {$first: '$total'},
                cogsTotal: {
                    $sum: '$orderdetails.cogsTotal'
                },
                orderDetailTotal: {
                    $sum: '$orderdetails.total'
                }
            }
        },
        {   
            $project:{
                _id : 1,
                orderNo : 1,
                dateIssued : 1,
                partners: { $concat: [ "$partners.first_name", " ", "$partners.last_name" ] },
                deliverTo:1,
                deliveryFee: 1,
                discount:1,
                note:1,
                payments: '$payments.desc',
                grandTotal:1,
                cogsTotal:1,
                orderDetailTotal:1
            } 
        }
    ])
    .then((result) => { 
        res.send({"orders": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving orders."
        })
    })
}

exports.getOrdersByPartners = async (req,res) => {
    var queryParameters = req.query;
    const start = new Date(queryParameters.start);
    start.setHours(0, 0, 0, 0);
    const end = new Date(queryParameters.end);
    end.setHours(23, 59, 59, 999);
    console.log(queryParameters.id)
    await Order.aggregate([
        {
            $match : { dateIssued : { $gt: start, $lt: end } }
        },
        {
            $lookup: {
                from: 'partners',
                localField: 'partners',
                foreignField: '_id',
                as: 'partners'
            },
        },
        {
            $unwind: "$partners"
        },
        {
            $match : { "partners._id" : mongoose.Types.ObjectId(queryParameters.id) }
        },
        {
            $lookup: {
                from: 'payments',
                localField: 'payments',
                foreignField: '_id',
                as: 'payments'
            },
        },
        {
            $unwind: "$payments"
        },
        {
            $lookup: {
                from: 'orderdetails',
                localField: 'orderdetails',
                foreignField: '_id',
                as: 'orderdetails',
                pipeline: [{
                    $lookup: {
                        from: 'products',
                        localField: 'products',
                        foreignField: '_id',
                        as: 'products'
                    }
                }]
            },
        }
    ])
    .then((result) => { 
        res.send({"orders": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving orders."
        })
    })
}
