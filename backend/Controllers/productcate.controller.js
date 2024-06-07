import productCategoryModel from "../Models/product.category.model";
import productModel from "../Models/product.model";

export const addCategory=async(req,res)=>{
    try {
        const { name, title, image,products } = req.body;
        const cate = await productCategoryModel.create({
          name: name,
          title: title,
          image: image,
          products: products
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

export const getAllCategories=async(req,res)=>{
    try{
   const cate=await productCategoryModel.find()
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

export const getCatByid=async(req,res)=>{
  try{
    let categoryID = req.params.category_id;
    let product = await productModel.find({ category: categoryID }).populate('category');
    if (product) {
      return res.status(201).json({
        count: product.length,
        data: product,
        message: "category fetched successfully",
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


export const getCategory=async(req,res)=>{
  try{
const cat_id=req.params.cat_id
const cate=await productCategoryModel.findOne({_id:cat_id})
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


export const Updatecate=async(req,res)=>{
  try{
    const cat_id=req.params.cat_id;
    const {name,title,products}=req.body
    const updatecat=await productCategoryModel.updateOne({_id:cat_id},{$set:{
        name:name,
        title:title,
        products:products,
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


export const deletecate=async(req,res)=>{
 try{
   const cat_id=req.params.cat_id
   const delCat = await productCategoryModel.deleteOne({_id:cat_id})
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
