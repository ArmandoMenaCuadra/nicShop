var express = require('express');
const nodemailer = require('nodemailer');

var app = express();

let transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
     user: 'nicaragua.products.prem@gmail.com',
     pass: process.env.NICPASS
  }
});

const message = {
  from: 'nicaragua.products.prem@gmail.com', // Sender address
  to: 'durancdr96@gmail.com',                // List of recipients
  subject: 'Design Your Model S | Tesla',    // Subject line
  text: 'Have the most fun you can in a car. Get your Tesla today!' // Plain text body
};

function sendMail()
{
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/src/html/index.html');
});

app.get('/buy', function (req, res) {
  sendMail()
  res.sendFile(__dirname + '/src/html/index-buy.html');
});

app.use(express.static(__dirname + '/'));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});