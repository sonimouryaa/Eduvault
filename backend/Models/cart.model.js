import mongoose from "mongoose";
import productModel from "./product.model";
import userModel from "./user.model";
const Schema=mongoose.Schema;

const cartSchema=new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
ref:userModel,

        
    },
    productID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:productModel,
    },
    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    image:{
        type:String,
        default:null,
    },
    created_at:{
        type:Date,
        default:Date.now(),
    }
})

export default mongoose.model("Cart",cartSchema)