require('dotenv').config();
const express    = require('express');
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const profile    = require('./profile');

const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

// const sgMail = require('@sendgrid/mail');

// const sendGridApiKey = process.env.SENDGRID_API_KEY;
// console.log(sendGridApiKey);
// sgMail.setApiKey(sendGridApiKey);

const app = express();

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com", //replace with your email provider
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

app.post("/send", (req, res) => {
  //1.
  let form = new multiparty.Form();
  let data = {};
  form.parse(req, function (err, fields) {
    console.log(fields);
    Object.keys(fields).forEach(function (property) {
      data[property] = fields[property].toString();
    });

    //2. You can configure the object however you want
    const mail = {
      from: data.name,
      to: process.env.EMAIL,
      subject: data.subject,
      text: `${data.name} <${data.email}> \n${data.message}`,
    };

    //3.
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
      } else {
        res.status(200).send("Email successfully sent to recipient!");
      }
    });
  });
});


app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/profile', profile)
app.use(express.static("public"))

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const data = {
    person: {
      firstName: 'Shane',
      lastName: 'McNair',
    }
  }

  res.render('index', data);
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/resume', (rep, res) => {
  res.render('resume');
});

app.get('/home', (rep, res) => {
  res.render('home');
});

// app.post('/thanks', (req, res) => {
//   res.render('thanks', { contact: req.body })
//   const sgMail = require('@sendgrid/mail');
//   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   const msg = {
//     to: 'shane.mcnair@gmail.com',
//     from: req.body.email,
//     subject: req.body.lastName + ',' + ' ' + req.body.firstName,
//     text: req.body.message,
//     // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   };
//   sgMail.send(msg);
// });

app.listen(process.env.PORT || 8080, () => {
  console.log('listening at http://localhost:8080')
});