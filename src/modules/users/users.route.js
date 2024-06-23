
import { Router } from "express";
import { careateUser, deleteuser, getUser, getUserbyid, updateUser } from "./user.controler.js";

const userRoute= Router()

userRoute.post('/adduser',careateUser)
userRoute.get('/user',getUser)
userRoute.route('/user/:id').get(getUserbyid).patch(updateUser).delete(deleteuser)

export default userRoute