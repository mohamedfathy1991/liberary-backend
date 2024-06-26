import { Book } from "../../../database/model/book.models.js"
import { User } from "../../../database/model/users.model.js"

export const CreateBook= async(req,res)=>{
      try{

            let book= await Book.create(req.body)
            await User.findByIdAndUpdate(req.body.author,{$push:{books:book._id}})
          
           
           res.json({message:"created",book})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err})
      }

}
export const getAllbook= async(req,res)=>{
      let author=req.query.author
      let title=req.query.title
      if(author || title) {
            searchUser(req,res)
            return

      }

       

      const page = parseInt(req.query.page) || 1 
      const limit = parseInt(req.query.limit) || 4
      try{
            let book= await Book.find().skip((page-1)*limit).limit(4).populate('author','-__v')
            
          
           res.json({ book})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
export const getOnebook= async(req,res)=>{
      try{
            let book= await Book.findById(req.params.id).populate('author','-__v')
           res.json( {book})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
export const updateBook= async(req,res)=>{
      try{
            let book= await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
           res.json({ message:"updated",book})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
export const deleteeBook= async(req,res)=>{
      try{
            let book= await Book.findByIdAndDelete(req.params.id)
            if (!book) return res.json({ message:"user not found"})

           res.json({ message:"deleted",book})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
   async function searchUser(req,res){
     try{
      let {title,author}=req.query
      let query={}
      if (author){
            let author1= await User.findOne({name:author})
            query.author=author1.id

      }
        
       console.log(query)
      // if(title) query.title = { $regex: title, $options: "i" }
      if(title) query.title = { $regex: title, $options: "i" }
      
      
      
     let book= await Book.find(query).populate('author')
      return res.json(book)

     }catch(err){
      return res.status(500).json({
            
            message:"err in server",
            err
      })
     }
}

