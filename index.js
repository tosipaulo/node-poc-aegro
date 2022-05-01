require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

const farmRoute = require('./routes/farm');
app.use('/api/farm', farmRoute);

const chunkRoute = require('./routes/chunk');
app.use('/api/chunk', chunkRoute);


mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.818ir.mongodb.net/dbaegro?retryWrites=true&w=majority`
)
.then(() => {
    app.listen(3200, () => console.log('::: server started port 3200 :::'))
})
.catch(err => console.error(err));
