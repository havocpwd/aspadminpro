const db = require('../models')
const Visitor = db.dbSchema.Visitor

exports.findAll = (req, res)=>{
    Visitor.find()
    .then((result) => {
        res.send({"visitor": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving menus."
        })
    })
}

exports.findOne = (req, res)=>{
    const ip = req.params.id
    Visitor.findOne({ipAddress: ip})
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
    Visitor.findByIdAndUpdate(id, {dateAccess: Date.now()})
    .then((result) => {
        if(!result){
            res.status(404).send({
                message: "visitor not found"
            })
        }
        res.send({
            message: "dateAccess updated"
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

    Visitor.findByIdAndRemove(id)
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
    const visitor = new Visitor({
        ipAddress: req.body.ipAddress,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        dateAccess: Date.now()
    })
    Visitor.create(visitor)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while create posts."
        })
    })
}