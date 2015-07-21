/*
 Inserts an object (document) into a collection in MongoDB
 @param params.insert an object to insert into your database
 @param params.collection the collection to insert it into
 */
exports.mongodb = function(params, cb) {
  var MongoClient = require('mongodb').MongoClient,
    user = process.env.MONGODB_USER,
    password = process.env.MONGODB_PASSWORD,
    upString = (typeof user === 'string' && typeof password === 'string') ? user + ":" + password : "",
    database = process.env.MONGODB_DATABASE,
    host = process.env.MONGODB_HOST;

  MongoClient.connect('mongodb://' + upString + '@' + host + '/' + database, function(err, db) {
    if (err) return cb(err);

    var collection = db.collection(params.collection);
    collection.insert(params.insert, function(err, docs) {
      db.close();
      return cb(null, docs);
    });
  })
};