import cartModel from "../Models/cart.model";
import productModel from "../Models/product.model";

export const addCart = async (req, res) => {
  try {
    const { userID, productID, quantity } = req.body;
    const exitingItem = await cartModel.findOne({
      userId: userID,
      productId: productID,
    });
    if (exitingItem) {
      let qty = quantity
        ? exitingItem.quantity + quantity
        : exitingItem.quantity + 1;
    if (qty > 10) {
      return res.status(200).json({
        message: "quantity exceeded",
      });
    }
    const updateQty = await cartModel.updateOne(
      { _id: exitingItem._id },
      {
        $set: {
          quantity: qty,
        },
      }
    );
    if (updateQty.modifiedCount > 0) {
      return res.status(201).json({
        message: "Updated",
        success: true,
      });
    }
}
const proData=await productModel.findOne({_id:productID})
const saveData=await cartModel.create({
    userID:userID,
    productID:productID,
    title:proData.title,
    price:proData.price,
    image:proData.thumbnail,
    quantity:quantity ? quantity:1,
})
if(saveData){
    return res.status(201).json({
        data:saveData,
        message:"Add to Cart Successfully",
        success:true,
    })
}
  } catch (err) {
    return res.status(500).json({
        message: err.message,
        success: false,
      });
  }
};



export const getCartItems = async (req, res) => {
try{
  const userID=req.params.user_id
  const cartItems=await cartModel.find({userID:userID})
  if(cartItems){
    return res.status(200).json({
        data: cartItems,
        count: cartItems.length,
        success: true,
      });
  }
}catch(err){
    return res.status(500).json({
        message: err.message,
        success: false,
      });
}
};

export const updateQuantity = async (req, res) => {
    try{

        const type=req.query.type;
        const cartItemID=req.params.item_id;
        const cartItem=await cartModel.findOne({_id:cartItemID})
        let qty=cartItem.quantity;
        if(type=="inc"){
            qty=qty+1
        }
        if(type=="dec"){
            qty=qty-1
        }
        if(qty>10){
            return res.status(200).json({
                message:"Quantity exceeded",
            })
        }
        if(qty==0){
            const deleteItem=await cartModel.deleteOne({_id:cartItemID})
            if(deleteItem.deletedCount>0){
                return res.status(200).json({
                    message:"Item removed",
                })
            }
        }
        const updateCartQty=await cartModel.updateOne({_id:cartItemID},{$set:{
            quantity:qty,
        }})
        if(updateCartQty.modifiedCount>0){
            return res.status(200).json({
                success:true,
                message:"Updated",
            })
        }
    }catch(err){
        return res.status(500).json({
            message: err.message,
            success: false,
          });
    }
};

export const deleteCartItem = async (req, res) => {
    try {
        const cartItemID = req.params.item_id;
        const deletedItem = await cartModel.deleteOne({ _id: cartItemID });
        if (deletedItem.deletedCount > 0) {
          return res.status(200).json({
            message: "item removed Successfully",
          });
        }

      } catch (err) {
        return res.status(500).json({
          message: err.message,
          success: false,
        });
      }
};


export const getAllItems = async (req, res) => {
  try {
    const userID = req.params.user_id;
    const cartItems = await cartModel.find();
    if (cartItems) {
      return res.status(200).json({
        count: cartItems.length,

        data: cartItems,
        success: true,
        message:"get all carts successfully",
        filepath: "http://localhost:8001/uploads/product",

      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      success: false,
    });
  }
};
