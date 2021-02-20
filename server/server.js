require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

app.get('/user', (req, res) => {
    res.json('get user');
});

app.post('/user', (req, res) => {
    let body = req.body;

    if (body.name === undefined) {
        res.status(400).json({
            ok: false,
            message: 'name is required',
        });
    } else {
        res.json({
            user: body
        });
    }

});

app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id,
        message: 'put user'
    });
});

app.delete('/user', (req, res) => {
    res.json('delete user');
});

app.listen(process.env.PORT, () => console.log('listen in port ' + process.env.PORT));