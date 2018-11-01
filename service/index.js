require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const client_port = process.env.CLIENT_PORT || 9001
const db_serv = process.env.DB_SERV || 'mongodb'
const db_hostname = process.env.DB_HOSTNAME || 'localhost'
const db_port = process.env.DB_PORT || '27017'
const db_name = process.env.DB_NAME || 'message_app'
const rateLimit = require("express-rate-limit");
const mongoose = require('mongoose');

const DBURL=`${db_serv}://${db_hostname}:${db_port}/${db_name}`
console.log(DBURL)
mongoose.Promise = Promise;
mongoose
  .connect(DBURL, { useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to Mongo on ${DBURL}`)
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 500 
});


app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
  }));
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.sendStatus(400);
  } else {
    res.sendStatus(500);
  }
});

app.listen(client_port, () => console.log(`Example app listening on port ${client_port}!`))


const messages = require('./routes/messages');
app.use('/messages', messages);