const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const AuthRouter = express.Router();

const UserModel = require('../models/user.model');

AuthRouter.post('/login', (req, res) => {
    const { username, password } = req.body;

    UserModel.findOne({ username }, (err, userFound) => {
        if(err) res.status(500).json({ success: 0, error: err })
        else if(!userFound) res.status(404).json({ success: 0, error: "No such user!" })
        else {
            if(bcrypt.compareSync(password, userFound.password)) {
                req.session.user = { userId: userFound._id };
                res.json({ success: 1, message: "Login successfully!" });
            } else res.status(401).json({ success: 0, error: "Wrong password!" });
        }
    });
});

AuthRouter.delete('/logout', (req, res) => {
    req.session.destroy();
    res.send({ success: 1, message: "Logout successfully!" });
});

module.exports = AuthRouter;