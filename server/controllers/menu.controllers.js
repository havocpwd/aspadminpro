const db = require('../models')
const Menu = db.menus

exports.findAll = (req, res)=>{
    Menu.find()
    .then((result) => {
        res.send({"menus": result})
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message || "Some error while retrieving menus."
        })
    })
}

exports.findOne = (req, res)=>{
    const id = req.params.id

    Menu.findById(id)
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

    Menu.findByIdAndUpdate(id, req.body)
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

    Menu.findByIdAndRemove(id)
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
    const menu = new Menu({
        route: req.body.route,
        label: req.body.title,
        icon: req.body.icon,
    })

    menu.save(menu)
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.status(409).send({
            message: error.message || "Some error while create posts."
        })
    })
}