const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect("mongodb://sahil682002_db_user:1UptXTu9facd8TgB@ac-zwdsgva-shard-00-00.fvk5f8i.mongodb.net:27017,ac-zwdsgva-shard-00-01.fvk5f8i.mongodb.net:27017,ac-zwdsgva-shard-00-02.fvk5f8i.mongodb.net:27017/devTinder?ssl=true&replicaSet=atlas-gcjt4m-shard-0&authSource=admin&appName=NamasteNode")
}


module.exports =  connectDB;
