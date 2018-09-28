const express = require('express');
const UserRouter = express.Router();

const UserModel = require('../models/user.model');

//CRUD

UserRouter.post('/', (req, res) => {
    console.log(req.body)
    const { username, password, name, avatar, gender } = req.body || {};

    UserModel.create(
        { username, password, name, avatar, gender },
        // { password: 0 },
        (err, userCreated) => {
            if(err) res.status(500).json({ success: 0, error: err })
            else res.status(201).json({ success: 1, user: userCreated });
        });
});

UserRouter.get('/', (req, res) => {
    UserModel.find({}, {  }, (err, users) => {
        if(err) res.status(500).json({ success: 0, error: err })
        else res.json({ success: 1, users: users });
    });
});

UserRouter.put('/:id', (req, res) => {
    const { password, name, avatar, gender } = req.body || {};
    const userId = req.params.id;

    UserModel.findById(
        userId,
        (err, userFound) => {
            if(err) res.status(500).json({ success: 0, error: err })
            else if(!userFound) res.status(404).json({ success: 0, error: "No such user!" })
            else {
                const userChange = { password, name, avatar, gender };
                for(key in userChange) {
                    if(userChange[key])
                        userFound[key] = userChange[key];
                }

                userFound.save((err, userUpdated) => {
                    if(err) res.status(500).json({ success: 0, error: err })
                    else res.send({ success: 1, user: userUpdated });
                })
            };
        });
})

// BTVN update + delete + get user by id

// UserRouter.get('/:id', ...) -> get user by id

module.exports = UserRouter;