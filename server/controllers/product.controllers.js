const db = require('../models')
const Product = db.dbSchema.Product

exports.findAll = (req, res)=>{
    Product.find().populate('uoms').populate('categories')
    .then((result) => {
        res.send({"products": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving menus."
        })
    })
}

exports.findOne = (req, res)=>{
    const id = req.params.id

    Product.findById(id)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving menus."
        })
    })
}

exports.update = (req, res)=>{
    const id = req.params.id

    Product.findByIdAndUpdate(id, req.body)
    .then((result) => {
        if(!result){
            res.status(404).send({
                message: "Post not found"
            })
        }
        res.send({
            message: "Post was updated"
        })
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while updating post."
        })
    })
}

exports.delete = (req, res)=>{
    const id = req.params.id

    Product.findByIdAndRemove(id)
    .then((result) => {
        if(!result){
            res.status(404).send({
                message: "Post not found"
            })
        }
        res.send({
            message: "Post was Delete"
        })
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while deleting post."
        })
    })
}

exports.create = (req,res) => {
    const product = new Product({
        keyname: req.body.keyname,
        desc: req.body.desc,
        uoms: req.body.uomId,
        categories: req.body.categoryId,
        purchase_price: req.body.purchase_price,
        sales_price: req.body.sales_price,
    })
    Product.create(product)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while create posts."
        })
    })
}