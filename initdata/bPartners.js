const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
})

const partnerSchema = new mongoose.Schema({
    first_name: {
        type:String,
        required: true,
    },
    last_name: {
        type:String,
        required: true,
    },
    email : {
        type: String,
        minLength: 8,
        lowercase: true,
    },
    phone: String,
    type: {
        type: String,
        default: "Customer"
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    address: addressSchema,
})

module.exports = mongoose.model("partners", partnerSchema)

