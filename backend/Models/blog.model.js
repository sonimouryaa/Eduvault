import mongoose from "mongoose";
import productCategoryModel from "./product.category.model";
import blogCategoryModel from "./blogCategory.model";
import BlogTagModel from "./Blog.tag.model";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: blogCategoryModel,
  },
  Tag: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: BlogTagModel,
  },
  thumbnail: {
    type: String,
    default: null,
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

export default mongoose.model("Blog", blogSchema);
