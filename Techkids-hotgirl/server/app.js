const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

const apiRouter = require('./routers/apiRouter');

mongoose.connect('mongodb://localhost/tk-hotgirl', { useNewUrlParser: true }, (err) => {
    if(err) console.log(err)
    else console.log('Connect DB success!');
});

let app = express();

app.use(session({
    secret: 'roseisredskyisblue',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 7*24*60*60*1000
    }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req.session.user)
    console.log(req.sessionID)
    // req.session.destroy()
    res.send("Techkids hotgirl api.");
});

app.use('/api', apiRouter);

app.listen(6996, (err) => {
    if(err) console.log(err)
    else console.log('App started!');
})