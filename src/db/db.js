require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const mongoose = require('mongoose')

async function connectToDb(params) {
try{
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Database is connected ")
}catch(error){
    console.log("Error in connecting Database",error)
}
    
}

module.exports=connectToDb