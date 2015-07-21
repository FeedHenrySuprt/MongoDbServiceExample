/*
 Inserts an object (document) into a collection in MongoDB
 @param params.insert an object to insert into your database
 @param params.collection the collection to insert it into
 */
 
var DB = null;
var MongoClient = require('mongodb').MongoClient;
//  Could not locate any valid servers in initial seed list
// https://csc-t-f5cwcv4zkjaruihb4m4quwfk-dev.ac.gen.ric.feedhenry.com/cloud/mongodb?collection=blah&insert=%7B%22name%22%3A%22brian%22%7D
 MongoClient.connect(process.env.FH_MONGODB_CONN_URL, function(err, db) {
  if (err) throw err;
  DB = db;
})

exports.mongodb = function(params, cb) {
  var collection = DB.collection(params.collection);
  collection.insert(JSON.parse(params.insert), function(err, docs) {
    return cb(null, docs);
  });
};