// import { MongoClient } from 'mongodb'
const { MongoClient } = require('mongodb');

// Connection URL
const url = "mongodb+srv://sahil682002_db_user:1UptXTu9facd8TgB@namastenode.fvk5f8i.mongodb.net/"
const client = new MongoClient(url);

// Database Name
const dbName = 'HelloWorld';


async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());