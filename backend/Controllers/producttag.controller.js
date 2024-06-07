import productTagModel from "../Models/product.Tag.model";
import productModel from "../Models/product.model";

export const addTag=async(req,res)=>{
    try {
        const { name,name2, title, image } = req.body;
        const cate = await productTagModel.create({
          name: name,
          name2:name2,
          title: title,
          image: image,
        });
        if (cate) {
          return res.status(201).json({
            message: "Category added successfully",
            data: cate,
            success: true,
          });
        }
        return res.status(409).json({
          message: "Unable to add Category",
          success: false,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          message: err.message,
        });
      }
}

export const getAllTag=async(req,res)=>{
    try{
   const cate=await productTagModel.find()
   if(cate){
    return res.status(201).json({
        count:cate.length,
        data: cate,
        message: "fetched successfully",
        success: true,
      });
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


export const getTag=async(req,res)=>{
  try{
const tag_id=req.params.tag_id
const cate=await productTagModel.findOne({_id:tag_id})
if(cate){
    return res.status(200).json({
        data: cate,
        message:"category found",
        success:true,
    })
}
return res.status(404).json({
    message:"category not found" ,
})
  }catch(err){
   return res.status(500).json({
    message : err.message ,
    success:false,
   })
  }
}


export const UpdateTag=async(req,res)=>{
  try{
    const tag_id=req.params.tag_id;
    const {name,name2,title}=req.body
    const updatecat=await productTagModel.updateOne({_id:tag_id},{$set:{
        name:name,
        name2:name2,
        title:title,
    },
  }
)
if(updatecat){
    return res.status(201).json({
        data:updatecat,
        message:'category Updated',
        success: true,
    })
}
return res.status(404).json({
    message: "Category Not Found!",

  });
  }catch(err){
    return res.status(400).json({
        message: err.message,
        success: false,
      });
  }
}


export const deleteTag=async(req,res)=>{
 try{
   const tag_id=req.params.tag_id
   const delCat = await productTagModel.deleteOne({_id:tag_id})
   if(delCat){
    return res.status(200).json({
        data:delCat,
        message:"Delete Successfully",
    })
   }
   return res.status(404).json({
    message:"category Not found"
   })
 }catch(err){
    return res.status(500).json({
        message: err.message,
        success: false,
      });
 }
}


export const getTagByid=async(req,res)=>{
  try{
    let TagID = req.params.tag_id;
    let product = await  productModel.
    find({Tag: TagID }).populate('Tag');
    if (product) {
      return res.status(201).json({
        count: product.length,
        data: product,
        message: "Tag fetched successfully",
        filepath: "http://localhost:8001/uploads/product",
      })
    }
    return res.status(500).json({
      message: "bad req",
    })
  }catch(err){
return res.status(400).json({
  message: err.message,
})
  }
}