import mongoose from "mongoose";


export  const dbconect= mongoose.connect('mongodb://127.0.0.1:27017/myappbook').then(()=>{
      console.log("connected to database");
}).catch(err=> console.log('err in db'+err))