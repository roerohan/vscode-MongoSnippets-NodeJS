import mongoose from 'mongoose';

export default async function mongoConnect(dbName: string) {
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

export async function listAllCollections(dbName: string) {
    await mongoConnect(dbName);
    const collectionNames = (await mongoose.connection.db.listCollections().toArray()).map((collection) => collection.name);
    await mongoose.disconnect();
    return collectionNames;
}

export async function listDocs(dbName: string, collectionName: string) {
    await mongoConnect(dbName);
    const collection = mongoose.connection.db.collection(collectionName);
    const docs = await collection.find({}).toArray();
    await mongoose.disconnect();
    return docs;
}
