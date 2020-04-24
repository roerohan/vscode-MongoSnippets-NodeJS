import mongoose from "mongoose";
const mongoConnect = require('./showDB').mongoConnect;

export default function find(dbname: string, collectionName: string, filter: object) {
    return new Promise( (resolve, reject) => {
        mongoConnect(dbname);

        //Get the default connection
        const db = mongoose.connection;
        db.once('open', function () {
            db.db.collection(collectionName, (err: Error, collection: mongoose.Collection) => {
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
