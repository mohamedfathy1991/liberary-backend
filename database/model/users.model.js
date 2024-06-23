import { Schema,SchemaType,model } from "mongoose";

const userschema= new Schema({
      name:{
            type:String,
         index:true,
      },
      
      bio:{
            type:String,
      },
      bithdate:{
            type:Date,
      },
      books:[{
            type:Schema.Types.ObjectId,
            ref:'Book'
             
      }]
})


const User=  model('User',userschema)

export {User}