import multer from "multer";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import productModel from "../Models/product.model";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./uploads/product")) {
      cb(null, "./uploads/product");
    } else {
      fs.mkdirSync("./uploads/product");
      cb(null, "./uploads/product");
    }
  },
  filename: function (req, file, cb) {
    const orgName = file.originalname;
    const ext = path.parse(orgName).ext;
    const name = path.parse(orgName).name;
    const fullname =
      name + "-" + Date.now() + "" + Math.round(Math.random() * 1e9) + ext;

    cb(null, fullname);
  },
});
const upload = multer({ storage: storage });

export const Addproduct = async (req, res) => {
  try {
    const fileWithData = upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]);
    fileWithData(req, res, async function (err) {
      if (err)
        return res.status(400).json({
          Message: err.Message,
          success: false,
        });
      let img = null;
      let imgArr = [];

      if (req.files) {
        if (req.files["thumbnail"][0]) {
          console.log(req.files["thumbnail"][0]);

          img = req.files["thumbnail"][0].filename;
        }

        if (req.files["images"]) {
          imgArr = req.files["images"].map((file) => file.filename);
        }
      }
      // console.log(req.files["thumbnail"]);
      // console.log(req.files["images"]);

      const { title, description, price, quantity, category, Tag } = req.body;
      const saveData = await productModel.create({
        title: title,
        description: description,
        price: price,
        quantity: quantity,
        category: category,
        Tag: Tag,
        thumbnail: imgArr[0],
        images: imgArr,
      });
      // saveData.save()
      if (saveData) {
        return res.status(200).json({
          success: true,
          data: saveData,
          message: "Product added successfully",
          filepath: "http://localhost:8001/uploads/product",
        });
      }
      return res.status(400).json({
        message: "Bad request",
        success: false,
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

export const getproduct = async (req, res) => {
  try {
    const productid = req.params.productid;
    if (!mongoose.Types.ObjectId.isValid(productid)) {
      return res.status(400).json({
        message: "Invalid Product ID",
        success: false,
      });
    }
    const product = await productModel.findOne({ _id: productid }).populate("category").populate("Tag")
    if (product) {
      return res.status(200).json({
        data: product,
        message: "fetched",
        success: true,
        filepath: "http://localhost:8001/uploads/product",
      });
    }
    return res.status(400).json({
      message: "No Product Found",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// export const getproduct = async (req, res) => {
//   try {
//     const productid = req.params.productid;
//     const product = await productModel.findOne({ _id: productid });
//     if (product) {
//       return res.status(200).json({
//         data: product,
//         message: "fetched",
//         success: true,
//         filepath: "http://localhost:8001/uploads/product",
//       });
//     }
//     return res.status(400).json({
//       message: "No Product Found",
//       success: false,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//       success: false,
//     });
//   }
// };

export const getproducts = async (req, res) => {
  try {
    const { page, limit, search, sort, min, max } = req.query;

    //ek page me kitna chahiye
    const skipno = limit * (page - 1);

    const rgx = (pattern) => {
      return new RegExp(`.*${pattern}*.`);
    };

    let filter = {};
    if (search) {
      const searchRgx = rgx(search);
      filter = {
        $or: [
          { title: { $regex: searchRgx, $options: "i" } },
          { "category.name": { $regex: searchRgx, $options: "i" } },
          { description: { $regex: searchRgx, $options: "i" } },
          { price: { $regex: searchRgx, $options: "i" } },
        ],
      };
    }

    //sorting
    let sortValue = ["_id", 1];
    if (sort == "new") {
      sortValue = ["_id", -1];
    }
    if (sort == "old") {
      sortValue = ["_id", 1];
    }
    if (sort == "lth") {
      sortValue = ["price", 1];
    }
    if (sort == "htl") {
      sortValue = ["price", -1];
    }
    if (min && max) {
      filter = { ...filter, price: { $gte: min, $lte: max } };
    }
const totalproducts=await productModel.countDocuments()
    const products = await productModel
      .find(filter)
      .populate("category")
      .populate("Tag")
      .limit(Number(limit))
      .skip(Number(skipno))
      .sort([sortValue]);

    if (products) {
      return res.status(200).json({
        count: products.length,
        totalproducts:totalproducts,
        data: products,
        message: "All Products Fetched Successfully",
        success: true,
        filepath: "http://localhost:8001/uploads/product",
      });
    }
    return res.status(400).json({
      message: "Bad request",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};

// export const Updateproduct = async (req, res) => {
//   try {
//     const productid = req.params.productid;
//     const { title, description, price, quantity, category } = req.body;
//     const product = await productModel.findOne({_id:productid})
// if(product){
//     // Delete associated files from the file system
//     if (product.thumbnail) {
//         fs.unlinkSync("./uploads/product/" + product.thumbnail);
//       }
//       if (product.images && product.images.length > 0) {
//         product.images.forEach((image) => {
//           fs.unlinkSync(`./uploads/product/${image}`);
//         });
//       }

//     }

//     let img = null;
//     let imgArr = [];

//     const fileWithData = upload.fields([
//       { name: "thumbnail", maxCount: 1 },
//       { name: "images", maxCount: 10 },
//     ]);

//     fileWithData(req, res, async function (err) {
//       if (err) {
//         return res.status(400).json({ message: err.message, success: false });
//       }
//       if (req.files) {
//         // if (req.files["thumbnail"][0]) {
//         //   img = req.files["thumbnail"][0].filename;
//         // }

//         if (req.files["images"]) {
//           imgArr = req.files["images"].map((file) => file.filename);
//         }
//       }

//       const Product = await productModel.updateOne(
//         { _id: productid },
//         {
//           $set: {
//             title: title,
//             description: description,
//             price: price,
//             quantity: quantity,
//             category: category,
//             thumbnail: imgArr[0] || req.body.thumbnail, // If no new thumbnail, retain the old one
//             images: imgArr.length > 0 ? imgArr : req.body.images,
//           },
//         }
//       );
//       if (Product.acknowledged) {
//         return res.status(200).json({
//           message: "Product updated successfully!",
//           success: true,
//         });
//       }
//       return res.status(400).json({
//         message: "Failed to update product.",
//         success: false,
//       });
//     });
//   } catch (err) {
//     return res.status(500).json({
//       message: err.message,
//       success: false,
//     });
//   }
// };

export const updateProduct = async (req, res) => {
  try {
    const productFields = upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "images", maxCount: 10 },
    ]);
    productFields(req, res, async function (err) {
      if (err) throw new Error(err);

      const productId = req.params.product_id;
      const {
        title,
        category,
        Tag,
        price,
        quantity,
        description,

        // deletedImages,
      } = req.body;

      const existingProduct = await productModel.findOne({ _id: productId });

      let thumbnail = existingProduct.thumbnail;
      console.log(thumbnail);
      let imageArr = [];
      let removeImages = [];
      let deletedImages = existingProduct["images"];
      console.log(deletedImages);
      if (deletedImages && Array.isArray(deletedImages)) {
        removeImages = deletedImages;
        deletedImages.forEach((element) => {
          if (fs.existsSync(`./uploads/product/${element}`)) {
            fs.unlinkSync(`./uploads/product/${element}`);
          }
        });
      } else {
        removeImages.push(deletedImages);
        if (fs.existsSync(`./uploads/product/${deletedImages}`)) {
          fs.unlinkSync(`./uploads/product/${deletedImages}`);
        }
      }

      if (req.files["thumbnail"]) {
        thumbnail = req.files["thumbnail"][0].filename;
        if (fs.existsSync(`./uploads/product/${thumbnail} `)) {
          fs.unlinkSync(`./uploads/product/${thumbnail}`);
        }
      }

      if (req.files["images"]) {
        req.files["images"].forEach((element) => {
          imageArr.push(element.filename);
        });
      }
      const product = await productModel.updateOne(
        { _id: productId },
        {
          $set: {
            title: title,
            category: category,
            Tag: Tag,
            price: price,
            quantity: quantity,
            stock: quantity,
            description: description,
            thumbnail: thumbnail,
          },
        }
      );

      if (imageArr && Array.isArray(imageArr)) {
        await productModel.updateOne(
          { _id: productId },
          {
            $push: {
              images: { $each: imageArr },
            },
          }
        );
      }
      if (removeImages && Array.isArray(removeImages)) {
        await productModel.updateOne(
          { _id: productId },
          {
            $pull: {
              images: { $in: removeImages },
            },
          }
        );
      }

      // console.log(product);
      if (!product.matchedCount) throw new Error("Updation failed");

      return res.status(200).json({
        message: "Product updated successfully",
      });
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const Deleteproduct = async (req, res) => {
  try {
    const productid = req.params.productid;
    const product = await productModel.findOne({ _id: productid });
    if (!product) {
      return res.status(404).json({
        message: "No Product Found with this id!",
        success: false,
      });
    }
    if (product.thumbnail) {
      fs.unlinkSync("./uploads/product/" + product.thumbnail);
    }
    if (product.images && product.images.length > 0) {
      product.images.forEach((image) => {
        fs.unlinkSync("./uploads/product/" + image);
      });
    }

    const deleteResult = await productModel.deleteOne({ _id: productid });
    if (deleteResult.acknowledged) {
      return res.status(200).json({
        message: "product deleted successfully",
        success: true,
        data: deleteResult,
      });
    }
    return res.status(400).json({
      message: "Failed to delete the product.",
      success: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
