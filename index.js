const genres = require('./routes/genres');
const customers = require('./routes/customers')
const express = require('express');
const app = express();
const mongoose = require('mongoose')

mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to DB..."))
    .catch(err => console.log(err))

app.use(express.json());
app.use('/api/customers', customers)
app.use('/api/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));