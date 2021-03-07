require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./controllers/user.controller'));

// parse application/json
app.use(bodyParser.json());
console.log(process.env.URLDB);

mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

app.listen(process.env.PORT, () => console.log('listen in port ' + process.env.PORT));