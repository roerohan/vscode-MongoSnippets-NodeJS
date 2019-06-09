const mongoose = require('mongoose');
const mongoConnect = require('./showDB').mongoConnect;

function find(dbname, collectionName, filter) {
    return new Promise( (resolve, reject) => {
        mongoConnect(dbname);

        //Get the default connection
        var db = mongoose.connection;
        db.once('open', function () {
            db.db.collection(collectionName, (err, collection) => {
                if (err) reject(err);
                collection.find(filter).toArray((err, data) => {
                    if (err) reject(err);
                    resolve(data);
                    mongoose.disconnect();
                });
            });
        
        });
        db.on('error', (err)=>{
            reject('MongoDB connection error:' + err);
        });
    });
}

module.exports = {
    find
}