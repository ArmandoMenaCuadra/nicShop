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
  to: 'amc54@hotmail.com',                   // List of recipients
  subject: 'Productos Nicaraguenses compra',    // Subject line
  text: 'Un usuario ha intentado comprar un producto en la web. Podrias recibir un pedido dentro de poco' // Plain text body
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

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Boot up!');
});