import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productcateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  products: {
    type: String,
  },
  title: {
    type: String,
    default: null,
  },
  image: {
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

export default mongoose.model("productcate", productcateSchema);
