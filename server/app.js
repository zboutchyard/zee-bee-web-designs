var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();
var https = require('https');
const { google } = require('googleapis');
var app = express();
const axios = require('axios');

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
        // origin: 'https://zeebeewebdesigns.com',
        origin: 'http://localhost:4200',
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

// app.get('/getReviews', async (req, res) => {
//     try {
//         const apiKey = process.env.GAPIKEY;

//         const client = await google.auth.getClient({
//             // Specify the necessary authentication options based on your setup
//             credentials: {
//                 apiKey,
//             },
//             scopes: ['https://www.googleapis.com/auth/business.manage'],
//         });

//         const response = await google
//             .mybusiness('v4')
//             .accounts.locations.reviews.list({
//                 // Specify the necessary parameters for the API request
//                 parent: 'accounts/{accountId}/locations/{locationId}',
//                 accountId: process.env.GACCOUNT_ID,
//                 locationId: process.env.LOC_ID,
//                 auth: client,
//             });

//         const reviews = response.data.reviews;
//         res.json(reviews);
//     } catch (error) {
//         console.error('Error occurred:', error);
//         res.status(500).json({
//             error: 'An error occurred while fetching reviews',
//         });
//     }
// });
app.get('/getReviews', async (req, res) => {
    try {
        const auth = await google.auth.getClient({
            scopes: ['https://www.googleapis.com/auth/business.manage'],
        });

        const apiKey = process.env.GAPIKEY;
        const locationId = process.env.LOC_ID;

        const accessToken = await auth.getAccessToken();

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${locationId}&key=${apiKey}`;
        const response = await axios.get(url);
        console.log('object', response.data);

        const reviews = response.data.result.reviews;
        res.json(reviews);
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({
            error: 'An error occurred while fetching reviews',
        });
    }
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
