require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 3200;

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200    
}

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());
app.use(cors(corsOptions));

const farmRoute = require('./routes/farm');
app.use('/api/farm', farmRoute);

const chunkRoute = require('./routes/chunk');
app.use('/api/chunk', chunkRoute);


mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.818ir.mongodb.net/dbaegro?retryWrites=true&w=majority`
)
.then(() => {
    app.listen(PORT, () => console.log(`::: server started port ${PORT} :::`))
})
.catch(err => console.error(err));
