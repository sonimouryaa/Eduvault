import multer from "multer"
import CourseCategoryModel from "../Models/CourseCategory.model"
import fs from 'fs'
import path from "path"
import mongoose from "mongoose"
import courseModel from "../Models/course.model"
export const addCourseCat=async(req,res)=>{
   try{
  const {name}=req.body
  const newCat=await CourseCategoryModel.create({
    name:name,
})
if(newCat){
    return res.status(200).json({
        message:"Course Category Added Successfully",
        data:newCat,
        success:true,
    })
}
return res.status(409).json({
    message: "Unable to add Category",
    success: false,
  });

   }catch(err){
    console.log(err);
    return res.status(500).json({
      message: err.message,
    });
   } 
}

export const getCourseCat=async(req,res)=>{
    try{
        const courseCat=await CourseCategoryModel.find()
        if(courseCat){
            return res.status(200).json({
                count:courseCat.length,
                data:courseCat,
                success:true,
                message:"fetching all category"
            })
        }
        return res.status(500).json({
            message: "bad req",
            success: false,
          });
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false,
          });
    }
}


const storage=multer.diskStorage({
    destination:function (req,file,cb){
        if(fs.existsSync('./uploads/course')){
            cb(null,'./uploads/course')

        }else{
            fs.mkdirSync("./uploads/course")
            cb(null,'./uploads/course')

        }
    },
    filename:function(req,file,cb){
        const orgName=file.originalname
        const ext=path.parse(orgName).ext
        const name=path.parse(orgName).name
        const fullname=name+"-"+Date.now()+""+Math.round(Math.random()*9)+ext
        cb(null,fullname)
    },
})

const upload=multer({storage:storage})

export const addCourse=async(req,res)=>{
try{

        const dataWithFile = upload.single("avatar");
    
        dataWithFile(req, res, async function (err) {
          if (err)
            return res.status(400).json({ message: err.message, success: false });
          console.log(req.body);
          console.log(req.file);
        
    
          let img = null;
          if (req.file) {
            img = req.file.filename;
          }
    


    const {title,category,description,form,time,student,rating}=req.body
const addCat=await courseModel.create({
    title:title,
    category:category,
    description:description,
    form:form,
    time:time,
    rating:rating,
    student:student,
    thumbnail:img,

})
addCat.save()
if(addCat){
    return res.status(200).json({
        message:"Course Added Successfully",
        success:true,
        data:addCat,
        filepath:"http://localhost:8001/uploads/course"
    })
}
return res.status(400).json({
    message: "Bad request",
    success: false,
  });

});

}catch(err){
    return res.status(500).json({
        message: err.message,
        success: false,
      });
}
}

export const GetCourse=async(req,res)=>{
try{
const courseid=req.params.courseid
if(!mongoose.Types.ObjectId.isValid(courseid)){
    return res.status(400).json({
        message: "Invalid course ID",
        success: false,
    })
}
const coursedata = await courseModel.findOne({_id:courseid}).populate("category")
if(coursedata){
    return res.status(200).json({
    data:coursedata,
        message:"Course Found Successfully",
        success:true,
        filepath:"http://localhost:8001/uploads/course"


    })
}
return res.status(400).json({
    message: "Course not found",
    success: false,
})
}catch(err){
    return res.status(500).json({
        message: err.message,
        success: false,
      });
}
}

export const getAllCourse=async(req,res)=>{
 try{
const {page,limit,search}=req.query
const skipno=limit*(page-1)

const totalCourses = await courseModel.countDocuments();
   const course =await courseModel.find().limit(Number(limit)).skip(Number(skipno)).populate("category")
   if(course){
    return res.status(200).json({
        count:course.length,
        data:course,
        totalCourses: totalCourses,
        message:"Course Found Successfully",
        success:true,
        filepath:"http://localhost:8001/uploads/course"

    })
   }
   return res.status(400).json({
    message: "Course not found",
    success: false,
   })

 }catch(err){
    return res.status(500).json({
        message: err.message,
        success: false,
      });
 }
}

export const UpdateCourse=async(req,res)=>{
 try{
    const dataWithFile=upload.single("avatar")
     dataWithFile(req,res,async function(err){
        if(err)
            return res.status(400).json({message:err.message,success:false})

    })
const courseid=req.params.courseid
const existingcourse=await courseModel.findOne({_id:courseid})
let img=existingcourse.thumbnail;
if(req.file){
    img=req.file.filename;
    if(fs.existsSync("./uploads/course/"+existingcourse.thumbnail)){
        fs.unlinkSync("./uploads/course/"+existingcourse.thumbnail)
    }
}

const {title,category,description,form,time,student,rating}=req.body
const courseData=await courseModel.updateOne(

    {_id:courseid},
    {
        $set: {
            title:title,
            category:category,
            description:description,
            form:form,
            time:time,
            student:student,
            rating:rating,
thumbnail:img

        },
    }
)
if(courseData.acknowledged){
    return res.status(200).json({
        data:courseData,
        message:"Course Updated Successfully",
        success:true,

    })

}
return res.status(404).json({
    message: "No Such course Found",
  });



 }catch(err){
    return res.status(500).json({
        message: err.message,
        success: false,
      });
 }
}

export const DeleteCourse=async(req,res)=>{
  try{

    const courseid=req.params.courseid
    const existingcourse=await courseModel.findOne({_id:courseid})
    const delcourse=await courseModel.deleteOne({_id:courseid})
if(delcourse.acknowledged){
    if(fs.existsSync("./uploads/course/"+existingcourse.thumbnail)){
        fs.unlinkSync("./uploads/course/"+existingcourse.thumbnail)
    }

    return res.status(200).json({
        message:"Course Deleted Successfully",
        success:true,
    })
}else{
    return res.status(404).json({
        message:"course not found"
    })
}

  }catch(err){
    return res.status(500).json({
        message: err.message,
        success: false,
      });
  }
}