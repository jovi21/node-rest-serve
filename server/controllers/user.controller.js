const express = require('express');

const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');

const _ = require('underscore');


const app = express();

app.get('/user', (req, res) => {
    let from = req.query.fromPage || 0;
    let limit = req.query.limit || 5;
    from = Number(from);
    limit = Number(limit);
    userModel.find({ state: true }, 'name email role state google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    OK: false,
                    message: err,
                });
            }
            userModel.countDocuments({ state: true }, (err, conteo) => {
                res.json({
                    OK: true,
                    users,
                    total: conteo,
                })
            })
        });
});

app.post('/user', (req, res) => {
    let body = req.body;

    let userData = new userModel({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        rol: body.rol,
    });

    userData.save((err, response) => {
        if (err) {
            return res.status(400).json({
                OK: false,
                message: err,
            });
        }
        // response.password = null; 
        res.json({
            OK: true,
            user: response,
        });
    });
});


app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);

    userModel.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                OK: false,
                message: err,
            });
        }
        res.json({
            OK: true,
            user: userDB,
        });
    });
});

app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    let changeState = {
        state: false,
    };
    userModel.findByIdAndUpdate(id, changeState, { new: true }, (err, userRes) => {
        if (err) {
            return res.status(400).json({
                OK: false,
                message: err,
            });
        };
        if (userRes === null) {
            return res.status(400).json({
                OK: false,
                message: 'USER NOT FOUND',
            });
        }
        res.json({
            OK: true,
            user: userRes
        });
    })
});

module.exports = app;