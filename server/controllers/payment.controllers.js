const db = require('../models')
const Payment = db.dbSchema.Payment

exports.findAll = (req, res)=>{
    Payment.find()
    .then((result) => {
        res.send({"payments": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving menus."
        })
    })
}

exports.findOne = (req, res)=>{
    const id = req.params.id

    Payment.findById(id)
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

    Payment.findByIdAndUpdate(id, req.body)
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

    Payment.findByIdAndRemove(id)
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
    const payment = new Payment({
        desc: req.body.desc,
        type: req.body.type,
        duedate: req.body.duedate,
        default: req.body.default,
    })
    Payment.create(payment)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while create posts."
        })
    })
}