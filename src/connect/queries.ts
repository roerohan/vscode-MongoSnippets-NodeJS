import mongoose from 'mongoose';

import mongoConnect from './showDB';

export default function find(
    dbname: string,
    collectionName: string,
    filter: object,
): Promise<object> {
    return new Promise((resolve, reject) => {
        mongoConnect(dbname);

        const db = mongoose.connection;
        db.once('open', () => {
            db.db.collection(collectionName, (err: Error, collection: mongoose.Collection) => {
                if (err) reject(err);
                collection.find(filter).toArray((error: Error, data) => {
                    if (error) reject(error);
                    resolve(data);
                    mongoose.disconnect();
                });
            });
        });

        db.on('error', (err) => {
            if (err) reject(err);
        });
    });
}
