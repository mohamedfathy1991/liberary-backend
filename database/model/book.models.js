import { Schema,model } from "mongoose";

const Bookschema= new Schema({
      title:{
            require:true,
            type:String
      },
 
      content:{
            require:true,
            type:String,
      },
      author:{
            type:Schema.Types.ObjectId,
            ref:'User'
      },
      publishdate:{
            type: Date,
            default:Date.now()
      }
})
export const Book=  model('Book',Bookschema)