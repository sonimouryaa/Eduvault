import mongoose from "mongoose";
import productCategoryModel from "./product.category.model";
import productTagModel from "./product.Tag.model";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    default: null,
  },
  category: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: productCategoryModel,
  },
  Tag: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: productTagModel,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  thumbnail: {
    type: String,
    default: null,
  },
  images: {
    type: Array,
    default: [],
  },

  status: {
    type: Number,
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("product", productSchema);
