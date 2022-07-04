const config = require('./config')
const mongoose = require('mongoose');
mongoose.connect(config.get('database'), {useNewUrlParser: true, useUnifiedTopology: true});

const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

// Database Name
const dbName = 'webchatdb2.0';

mongoClient.connect(function(err, client){
  if(err){
    return console.log(err);
  }
  const db = client.db(dbName);
  client.close();
})