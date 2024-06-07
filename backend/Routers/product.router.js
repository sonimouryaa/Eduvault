import express from 'express'
import { Addproduct, Deleteproduct, updateProduct, getproduct, getproducts } from '../Controllers/product.controller'
const router=express.Router()


router.post("/add-product",Addproduct)
router.get("/get-products",getproducts)
router.get("/get-product/:productid",getproduct)
router.put('/update-product/:product_id',updateProduct )
router.delete("/delete-product/:productid",Deleteproduct)






export default router