import mongoose from "mongoose";
const Schema=mongoose.Schema;



const TagSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    name2:{
        type:String,
        required:true,
    },
    status:{
        type:Number,
        default:1,
    }

})


export default mongoose.model("Blogtag",TagSchema)