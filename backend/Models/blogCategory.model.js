
import mongoose from "mongoose";
const Schema =mongoose.Schema;

const BlogCatSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
        default:1
    }
})


export default mongoose.model("blogCat",BlogCatSchema)
