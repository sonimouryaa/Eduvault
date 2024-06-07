import mongoose from "mongoose";
import CourseCategoryModel from "./CourseCategory.model";

const Schema=mongoose.Schema;

const CourseSchema=new Schema({
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true,
},
thumbnail:{
type:String,
default:null,
},
category:{
type:Schema.Types.ObjectId,
require:true,
ref:CourseCategoryModel,
},
form:{
    type:Number,
    require:true,
},
time:{
    type:String,
    require:true,
},
student:{
type:Number,
require:true,
},
rating:{
    type:String,
    required:true,
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


export default mongoose.model("Course",CourseSchema)