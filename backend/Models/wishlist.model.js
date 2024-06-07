import mongoose, { Schema } from "mongoose";

const WishlistSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    productId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    title: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: null,
      },
      price: {
        type: Number,
        required: true,
      },
      created_at:{
        type:Date,
        default:Date.now()
      }
})


export default mongoose.model("wishlist",WishlistSchema)