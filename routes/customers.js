const express = require('express')
const router = express.Router()
const { Customer, validate } = require('../models/customers')

router.get('/', async (req, res) => {
    const result = await Customer.find().sort('name')
    res.send(result)
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    })

    customer = await customer.save()
    res.send(customer)
})

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    let customer = await Customer.findByIdAndUpdate(
        req.params.id, {
        $set: {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }

    }, { new: true })

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
    res.send(customer)
})

router.get('/:id', async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id)
        if (!customer) return res.status(404).send('The customer with the given ID was not found.');
        res.send(customer)
    } catch (err) {
        console.error('Error finding genre:', err);
        res.status(500).send('An error occurred while finding the customer.');
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let customer = await Customer.findByIdAndDelete(req.params.id)
        if (!customer) return res.status(404).send('The customer with the given ID was not found.');
        res.send(customer)
    } catch (err) {
        console.error('Error deleting genre:', err);
        res.status(500).send('An error occurred while deleting the customer.');
    }
})

module.exports = router;