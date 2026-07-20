const { MongoClient } = require('mongodb');

// Connection URL
const url =
  "mongodb://sahil682002_db_user:1UptXTu9facd8TgB@ac-zwdsgva-shard-00-00.fvk5f8i.mongodb.net:27017,ac-zwdsgva-shard-00-01.fvk5f8i.mongodb.net:27017,ac-zwdsgva-shard-00-02.fvk5f8i.mongodb.net:27017/?ssl=true&replicaSet=atlas-gcjt4m-shard-0&authSource=admin&appName=NamasteNode";

// Create MongoDB Client
const client = new MongoClient(url);

// Database Name
const dbName = "HelloWorld";

async function main() {
  // Connect to MongoDB
  await client.connect();
  console.log("✅ Connected successfully to server");

  // Get Database
  const db = client.db(dbName);

  // Get Collection
  const collection = db.collection("User");

  // Your MongoDB operations go here...
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(async () => {
    await client.close();
  });