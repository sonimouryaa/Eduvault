import express from 'express'
import { Adduser, DeleteUser, UpdateUser, getUser, getUsers, login, signUp } from '../Controllers/user.controller'


const router=express.Router()

router.post("/add-user",Adduser)
router.get("/get-user/:userid",getUser)
router.get("/get-users",getUsers)
router.put("/update-user",UpdateUser)
router.delete("/delete-user",DeleteUser)
router.post("/sign-up",signUp)
router.post("/login",login)





export default router