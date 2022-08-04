const mongoose = require("mongoose")

const subItemSchema = new mongoose.Schema({
    to: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
})

const menuSchema = new mongoose.Schema({
    to: String,
    label: String,
    icon: String,
    active: {
        type: Boolean,
        default: false
    },
    subItems: {
        type: [subItemSchema],
        default: undefined,
    },
})

module.exports = mongoose.model("menus", menuSchema)

