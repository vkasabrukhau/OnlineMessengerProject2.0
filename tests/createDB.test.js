const { MongoClient } = require('mongodb');
const test = require('assert');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const mongoClient = new MongoClient(url, {useNewUrlParser: true, useUnifiedTopology: true});

// Database Name
const dbName = 'webchatdb2.0';
it("Connection to the database", function(done){
  mongoClient.connect(function(err, client){
    test.strictEqual(null, err);
    const db = client.db(dbName);
    client.close();
    done();
  })
})