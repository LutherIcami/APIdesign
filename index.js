const express= require ("express")
require('dotenv').config();
require('./helpers/init_mongodb')
const cors= require('cors')
const app =express();
app.use(express.json());
app.use(cors({

    origin:(origin,callback)=>{

    if(!origin|| allowedOrigins.includes(origin)){

        callback(null,true)
    }else{
        callback(new Error('Not Allowed by cors'))
    }
    }
}));
const studentRoutes =require('./routes/student.routes')
const authRoutes=require('./routes/auth.route')

app.use('/auth',authRoutes)
app.use('/student',studentRoutes);
app.use((req,res,next)=>{
    const err =new Error("not found"); 
    err.status=404; 
    next(err)
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status ||500,
            message: err.message
        }
    })
})
app.listen(process.env.port||5000);
