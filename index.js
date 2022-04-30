const express = require('express');
const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);

app.use(express.json());

app.get('/api/farms', (req, res) => {
    res.json({message: 'oi'})
})

app.listen(3200, () => '::: server started port 3200 :::')