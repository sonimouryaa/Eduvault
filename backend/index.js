import express from "express"
import mongoose from "mongoose";
import userRouter from './Routers/user.router';
import productRouter from './Routers/product.router'
import productcateRouter from './Routers/productcate.router'
import producttag from './Routers/producttag.router'
import cartRouter from './Routers/cart.router'
import wishlistRouter from './Routers/wishlist.router'
import BlogRouter from './Routers/blog.router'
import CourseRouter from './Routers/course.router'
import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
const app = express();
const PORT= process.env.PORT || 8002
 // body  parser for data read
app.use(express.json());

// serving static files
app.use("/uploads",express.static("uploads"))

//cross origin
// var corsOptions={
//     origin:["http://localhost:3000/","http://localhost:8002/"],
//     optionsSuccessStatus:200
// }


app.use(cors())


mongoose.connect(process.env.DB_PATH+"/project1")
.then(()=>console.log( "Connected to MongoDB"))

app.listen(PORT,()=>{
    console.log(`server is running on the port: `+PORT)
})

app.use("/user",userRouter)
app.use("/product",productRouter)
app.use("/prodcate",productcateRouter)
app.use("/producttag",producttag)
app.use("/cart",cartRouter)
app.use("/wishlist",wishlistRouter)
app.use("/blog",BlogRouter)
app.use("/course",CourseRouter)
