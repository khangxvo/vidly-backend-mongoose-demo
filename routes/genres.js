const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genres')

router.get('/', async (req, res) => {
    const result = await Genre.find().sort('name')
    res.send(result);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });

    const result = await genre.save();
    res.send(result);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(
        req.params.id, {
        $set: {
            name: req.body.name
        }
    }, { new: true }
    );

    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre)
});

router.delete('/:id', async (req, res) => {
    // const genre = await Genre.findByIdAndDelete(
    //     req.params.id
    // );
    // if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    // res.send(genre);

    try {
        const genre = await Genre.findByIdAndDelete(req.params.id);

        if (!genre) {
            return res.status(404).send('The genre with the given ID was not found.');
        }

        res.send(genre);
    } catch (error) {
        console.error('Error deleting genre:', error);
        res.status(500).send('An error occurred while deleting the genre.');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const genre = Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('The genre with the given ID was not found.');
        res.send(genre)
    } catch (err) {
        console.error('Error finding genre:', err);
        res.status(500).send('An error occurred while finding the genre.');
    }

});



module.exports = router;