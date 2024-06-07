import mongoose from "mongoose";
const Schema =mongoose.Schema;

const productTagSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    name2:{
        type:String,
        required:false,
    },
    title:{
        type:String,
        default:null,
    },
  
    status:{
        type:Number,
        default:1,
    },
    created_at:{
        type:Date,
        default:Date.now(),
    },




})

export default mongoose.model("productTag",productTagSchema)