var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();
var mongoose = require('mongoose');
path = require('path');


mongoose.connect(process.env.CONNECTION_STRING||'mongodb://localhost/gab');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('node_modules'));




var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    // host: "smtp.gmail.com",
    auth: {
        user: "Shannon.gabriel22@gmail.com",
        pass: "boubies2017"
    }
});


app.get('/',function(req,res){
    res.sendfile('https://shannon-gabriel.herokuapp.com/sendmail.html');
});
app.get('/sendmail',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
});
// res.end("sent");
});




app.listen(process.env.PORT || '8080');
