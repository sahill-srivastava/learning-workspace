import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbInstance = process.env.DB_NAME;

console.log(uri)
console.log(dbInstance)

const client = new MongoClient(uri)

const db = client.db(dbInstance);


// ----------------------------------------

export const connectDatabase = async () => {
    try {

        await client.connect();

        console.log("Mongodb connected")

    } catch (err) {
        console.log(err)
    }
}


export const createCollection =  (collectionName) => {

    try {

        return db.collection(collectionName)

    } catch (err) {
        console.log(err)
    }

    
}






