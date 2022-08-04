const db = require('../models')
const Uom = db.dbSchema.Uom

exports.findAll = (req, res)=>{
    Uom.find()
    .then((result) => {
        res.send({"uom": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving menus."
        })
    })
}

exports.findOne = (req, res)=>{
    const id = req.params.id

    Uom.findById(id)
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

    Uom.findByIdAndUpdate(id, req.body)
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

    Uom.findByIdAndRemove(id)
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
    const uom = new Uom({
        code: req.body.code,
        desc: req.body.desc,
    })
    Uom.create(uom)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while create posts."
        })
    })
}