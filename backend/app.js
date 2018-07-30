const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');
const RouterPost  = require('./routes/routes');
const RouterUser = require('./routes/user');
const http = require('http');
const axios = require('axios');
const request = require('request');
var cheerio = require("cheerio");
// Make a request for a user with a given ID

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use(bodyparser.json());
mongoose.connect('mongodb+srv://ikamaci:NL9o7JIJB9SbHCAg@cluster0-wraff.mongodb.net/test')
  .then(()=>{
    console.log("Connected to database");

  })
  .catch(()=>{
  console.log("Connection failed!!")
});

app.use('/posts', RouterPost);
app.use('/user', RouterUser);
var cheerio = require('cheerio');

request('https://eksisozluk.com/iyi-sanilan-balon-futbolcular--5728200?a=popular', function(err, resp, html) {
  if (!err){
    const $ = cheerio.load(html);
  //  console.log($('html').find('p').text().trim())

  }
});

module.exports = app;
//
