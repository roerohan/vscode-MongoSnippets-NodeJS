const mongoose = require('mongoose');

function listAllCollections(dbname) {
    return new Promise((resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connect(dbname, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        //Get the default connection
        var db = mongoose.connection;
        db.on('open', function () {
            mongoose.connection.db.listCollections().toArray(function (err, names) {
                if (err) reject("Unexpected Error Occured");
                var promises = [];
                names.forEach(name => {
                    promises.push(new Promise (resolve => {
                        resolve(name['name']);
                    }));
                });
                Promise.all(promises).then(names => {
                    resolve(names);
                    mongoose.disconnect();
                });
            });
        });
        //Bind connection to error event (to get notification of connection errors)
        db.on('error', (err)=>{
            reject('MongoDB connection error:' + err);
        });
    });
}

function listDocs (dbname, collectionName) {
    return new Promise( (resolve, reject) => {
        mongoose.Promise = global.Promise;
        mongoose.connect(dbname, {
            useNewUrlParser: true,
            useCreateIndex: true,
        });

        //Get the default connection
        var db = mongoose.connection;
        db.once('open', function () {

            db.db.collection(collectionName, function(err, collection){
                collection.find({}).toArray(function(err, data){
                    resolve(data); // it will print your collection data
                    mongoose.disconnect();
                })
            });
        
        });
        db.on('error', (err)=>{
            reject('MongoDB connection error:' + err);
        });
    })
}

module.exports = {
    listAllCollections,
    listDocs
}