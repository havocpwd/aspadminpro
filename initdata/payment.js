const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
    desc: String,
    type: String,
    duedate: Number,
    default: {
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model("payments", paymentSchema)

