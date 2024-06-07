import express from "express";
import {  addCart, deleteCartItem, getAllItems, getCartItems,  updateQuantity } from "../Controllers/cart.controller";

const router = express.Router();

router.post("/add-cart", addCart);
router.get("/get-carts/:user_id",getCartItems)
router.put("/update-cart/:item_id",updateQuantity)
router.delete("/delete-cart/:item_id",deleteCartItem)
router.get("/get-items",getAllItems)

export default router;
