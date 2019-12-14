// creating test module for email. taking it out of app.js

var configEnv = require('../envMods/envConfig')

console.log(configEnv)

const nodemailer = require("nodemailer");

exports.sendEmail  = function test1() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: configEnv.email,
      pass: configEnv.pword
    }
  });
    
  var mailOptions = {
    from: configEnv.email,
    to: 'jakcooper22@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
    
  transporter.sendMail(mailOptions, function(error, info){
    if (error) throw error;
    
    console.log('Email sent: ' + info.response);
    
  });    
}

// module.exports

