var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    cors({
        origin: 'https://zeebeewebdesigns.com',
    })
);

app.post('/sendEmail', (req, res) => {
    console.log('here is the req body', req.body);
    console.log('triggering node function');
    const requestData = JSON.parse(Object.keys(req.body)[0]);

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    let mailOptions = {
        from: requestData.recipient,
        to: process.env.EMAIL_USERNAME,
        subject: requestData.subject,
        text: requestData.content,
    };

    console.log('here is mail options', mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occured during email delivery', error);
        } else {
            console.log('Email Sent Successfully', info.response);
            console.log('here is the req body', req.body);
            res.send('Email Sent Successfully');
        }
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
