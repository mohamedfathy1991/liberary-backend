import { User } from "../../../database/model/users.model.js";


export const careateUser= async(req,res)=>{
      try{

            req.body.bithdate= new Date(req.body.bithdate)
            let user= await User.create(req.body)
          
            console.log(user)
           res.json("created")

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err})
      }

}
export const getUser= async(req,res)=>{
      let name=req.query.name
      let bio=req.query.bio
      if(name || bio) {
            searchUser(req,res)
            return

      }

       

      const page = parseInt(req.query.page) || 1 
      const limit = parseInt(req.query.limit) || 4
      try{
            let user= await User.find().skip((page-1)*limit).limit(4).populate('books','-__v')
            
          
            console.log(user)
           res.json({ user})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
export const getUserbyid= async(req,res)=>{
      try{
            let user= await User.findById(req.params.id).populate('books','-__v')
           res.json({ user})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
export const updateUser= async(req,res)=>{
      try{
            let user= await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
           res.json({ message:"updated",user})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
export const deleteuser= async(req,res)=>{
      try{
            let user= await User.findByIdAndDelete(req.params.id)
            if (!user) return res.json({ message:"user not found"})

           res.json({ message:"deleted",user})

      }catch(err){
            console.log(err);
            res.json({message:"err in server",err} )
      }

}
   async function searchUser(req,res){
     try{
      let {name,bio}=req.query
      let query={}
      if (name) query.name=name 
      if(bio) query.bio = { $regex: bio, $options: "i" }
      
      
      
     let user= await User.find(query)
      return res.json(user)

     }catch(err){
      return res.status(500).json({
            
            message:"err in server",
            err
      })
     }
}

