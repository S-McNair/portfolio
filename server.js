require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var profile = require('./profile');

const sgMail = require('@sendgrid/mail');

const sendGridApiKey = process.env.SENDGRID_API_KEY;
console.log(sendGridApiKey);
sgMail.setApiKey(sendGridApiKey);

const app = express();

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

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/resume', (rep, res) => {
  res.render('resume');
});

app.get('/projects', (rep, res) => {
  res.render('projects');
});

app.post('/thanks', (req, res) => {
  res.render('thanks', { contact: req.body })
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'shane.mcnair@gmail.com',
    from: req.body.email,
    subject: req.body.lastName + ',' + ' ' + req.body.firstName,
    text: req.body.message,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
});

app.listen(process.env.PORT || 8080, () => {
  console.log('listening at http://localhost:8080')
});