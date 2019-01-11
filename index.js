var express = require('express');
const mongoose = require('mongoose');
var app = express();
const router = require('./api/routes/cryptorecord');
const Cryptos = require('./api/model/record');


app.listen(5000);
console.log("listen at 5000");
app.use("/record",router);


mongoose.connect('mongodb://localhost/crypto' ,{ useMongoClient: true });
mongoose.Promise = global.Promise;




