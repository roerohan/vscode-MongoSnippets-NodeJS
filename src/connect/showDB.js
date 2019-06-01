const mongoose = require('mongoose');

function mongoConnect(dbname){
    mongoose.Promise = global.Promise;
    mongoose.connect(dbname, {
        useNewUrlParser: true,
        useCreateIndex: true,
    })
    .catch(err => {
        console.log('MongoDB connection error:' + err);
    });
}

function listAllCollections(dbname) {
    return new Promise((resolve, reject) => {
        mongoConnect(dbname);
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
        mongoConnect(dbname);

        //Get the default connection
        var db = mongoose.connection;
        db.once('open', function () {

            db.db.collection(collectionName, (err, collection) => {
                if (err) reject(err);
                collection.find({}).toArray((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                    mongoose.disconnect();
                })
            });
        
        });
        db.on('error', (err)=>{
            reject('MongoDB connection error:' + err);
        });
    });
}

module.exports = {
    listAllCollections,
    listDocs,
    mongoConnect
}