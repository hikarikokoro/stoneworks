require('dotenv').config('.env');
const express = require('express');
const bodyParser = require('body-parser');
const email = require('./email');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//Set the base path to the angular-test dist folder
app.use(express.static(path.join(__dirname, 'dist')));

//Any routes will be redirected to the angular app
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.post('/api/email/contact', async (req, res, next) => {
    try {
        await email.sendEmail(req.body);
        res.json();
    } catch (err) {
        next(err);
    }
});
app.post('/api/email/register-form', async (req, res, next) => {
    try {
        await email.sendEmailFromRegisterForm(req.body);
        res.json();
    } catch (err) {
        next(err);
    }
});
//Starting server on port 8081 or defaults to 3000
app.listen(port, () => {
    console.log('Server started!');
    console.log(port);
});
