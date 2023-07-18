const mongoose = require ('mongoose')
mongoose.connect(process.env.Mongo_url, {dbName: process.env.DB_name})
.then(
    ()=>{
        console.log("mogodb connected")
    }
)
.catch((err)=>{console.log(err.message)});
mongoose.connection.on(
    'connected',()=>{
        console.log('mongoose connected to db')
    }
)
mongoose.connection.on(
    'error',(err)=>{
        console.log(err.message)
    }
)
mongoose.connection.on(
    'disconnected',()=>{
        console.log('mongoose connection is disconnected')
    }
)
process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})