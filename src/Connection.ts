import { MongoClient } from 'mongodb'

const url = 'mongodb://localhost:27017'

const options = {
    bufferMaxEntries: 0,
    reconnectTries: 5000,
    useNewUrlParser: true
}

const newLocal = 'citiesdb';
export const db = MongoClient.connect(url, options).then(db => db.db(newLocal))

