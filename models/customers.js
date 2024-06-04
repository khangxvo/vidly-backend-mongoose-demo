/**
 * This module is responsible for defining customers and validate them
 */

const mongoose = require('mongoose')
const Joi = require('joi')

const customerScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 50
    },
    isGold: {
        type: Boolean,
        require: true
    },
    phone: {
        type: Number,
        require: true
    }
})

const Customer = mongoose.model("Customer", customerScheme)

function validateCustomer(Customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().integer().min(10000).max(99999).required()
    })

    return Joi.validate(Customer, schema)
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
