const db = require('../models')
const Order = db.dbSchema.Order
const OrderDetail = db.dbSchema.OrderDetail

exports.findAll = (req, res)=>{
    if(Object.keys(req.query).length === 0 && req.query.constructor === Object){
        Order.find({orderType:"PurchaseOrder"}).populate([
            {path: 'partners'},
            {path: 'payments',select: 'desc'},
            {path: 'orderdetails',
                populate: {
                    path: 'products',
                    select: ['keyname','desc'],
                    populate: [
                        {path: 'uoms', select: 'code'},
                        {path: 'categories',select: 'desc'}
                    ]
                }
                }
            ]).sort({ 'dateIssued' : -1})
        .then((result) => { 
            res.send({"orders": result})
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error while retrieving orders."
            })
        })
    }else{
        var queryParameters = req.query;
        const start = new Date(queryParameters.start);
        start.setHours(0, 0, 0, 0);
        const end = new Date(queryParameters.end);
        end.setHours(23, 59, 59, 999);
        Order.find({dateIssued:{$gte:start,$lte:end}, orderType:"PurchaseOrder"}).populate([
            {path: 'partners'},
            {path: 'payments',select: 'desc'},
            {path: 'orderdetails',
                populate: {
                    path: 'products',
                    select: ['keyname','desc'],
                    populate: [
                        {path: 'uoms', select: 'code'},
                        {path: 'categories',select: 'desc'}
                    ]
                }
                }
            ]).sort({ 'dateIssued' : -1})
        .then((result) => { 
            res.send({"orders": result})
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message || "Some error while retrieving orders."
            })
        })
    }
}

exports.findOne = (req, res)=>{
    const id = req.params.id
    Order.findById(id).populate([
        {path: 'partners'},
        {path: 'payments'},
        {path: 'orderdetails',
            populate: {
                path: 'products',
                select: ['keyname','desc'],
                populate: [
                    {path: 'uoms', select: 'code'},
                    {path: 'categories',select: 'desc'}
                ]
            }
            }
        ])
    .then((result) => {
        res.send({"order": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving orders."
        })
    })
}

exports.delete = (req, res)=>{
    const id = req.params.id

    Order.findByIdAndRemove(id)
    .then((result) => {
        if(!result){
            res.status(404).send({
                message: "Order not found"
            })
        }
        res.send({
            message: "Order was Delete"
        })
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while deleting post."
        })
    })
}

const createOrder = function(order) {
    return Order.create(order).then(doc => {
      return doc;
    });
  };

const createOrderDet = function(orderId, datadetailBody) {
    const orderdetail=[];
    for (i = 0; i < datadetailBody.length; i++) {
        orderdetail.push(
            {
                orders: orderId,
                products: datadetailBody[i].productId,
                shortDesc: datadetailBody[i].shortDesc,
                qtyOrdered: datadetailBody[i].qtyOrdered,
                cogs: datadetailBody[i].cogs,
                cogsTotal: datadetailBody[i].qtyOrdered * datadetailBody[i].cogs,
                unitPrice: datadetailBody[i].sales_price,
                total: datadetailBody[i].qtyOrdered * datadetailBody[i].sales_price,
            }
        );
    }
    return OrderDetail.insertMany(orderdetail).then(doc => {
    const detailId =[];
    for(let i=0;i<doc.length;i++){
        detailId.push(doc[i].id);
    }
    return Order.updateMany(
        {_id: orderId},
        {$push: {orderdetails: detailId}},
        { new: true, useFindAndModify: false }
        )
    });
  };

exports.create = async (req,res) => {
    const data = new Order({
        orderType: "PurchaseOrder",
        orderNo: req.body.orderNo,
        dateIssued: req.body.dateIssued,
        partners: req.body.partners,
        deliverTo: req.body.deliverTo,
        deliveryFee: req.body.deliveryFee,
        discount: req.body.discount,
        note: req.body.note,
        payments: req.body.payments,
        docStatus: req.body.docStatus,
        total: req.body.total,
    });
    const datadetailBody = req.body.orderdetails;
    
    var order = await createOrder(data);
    order = await createOrderDet(order._id,datadetailBody);
}

exports.update = async (req, res)=>{
    const id = req.params.id
    const data = new Order({
        orderNo: req.body.orderNo,
        dateIssued: req.body.dateIssued,
        partners: req.body.partners,
        deliverTo: req.body.deliverTo,
        deliveryFee: req.body.deliveryFee,
        discount: req.body.discount,
        note: req.body.note,
        payments: req.body.payments,
        docStatus: req.body.docStatus,
        total: req.body.total,
    });
    let doc = await Order.findOne({_id:id});
    doc.dateIssued = req.body.dateIssued
    doc.partners = req.body.partners
    doc.deliverTo= req.body.deliverTo
    doc.deliveryFee= req.body.deliveryFee
    doc.discount= req.body.discount
    doc.note= req.body.note
    doc.payments= req.body.payments
    doc.total = req.body.total
    await doc.save()
    .then((result) => {
        if(!result){
            res.status(404).send({
                message: "Order not found"
            })
        }
        res.send({
            message: "Order was Update"
        })
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while deleting post."
        })
    })
}