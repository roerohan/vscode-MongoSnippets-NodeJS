const mongoose = require('mongoose');

async function mongoConnect(dbName) {
    mongoose.Promise = global.Promise;
    try {
        await mongoose.connect(dbName, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
        console.log('DB Connection Success');
    } catch (err) {
        console.log('Error in Mongo Connection');
    }
}

async function listAllCollections(dbName) {
    await mongoConnect(dbName);
    const collectionNames = (await mongoose.connection.db.listCollections().toArray()).map((collection) => collection.name);
    await mongoose.disconnect();
    return collectionNames;
}


function listDocsOld(dbName, collectionName) {
    return new Promise((resolve, reject) => {
        mongoConnect(dbName);

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
        db.on('error', (err) => {
            reject('MongoDB connection error:' + err);
        });
    });
}

async function listDocs(dbName, collectionName) {
    await mongoConnect(dbName);
    const collection = mongoose.connection.db.collection(collectionName);
    const docs = await collection.find({}).toArray();
    await mongoose.disconnect();
    return docs;
}

module.exports = {
    listAllCollections,
    listDocs,
    mongoConnect,
}