import express from "express";
import { Updatecate, addCategory, deletecate, getAllCategories, getCatByid, getCategory } from "../Controllers/productcate.controller";
const router = express.Router();

router.post("/add-category", addCategory);
router.get("/get-category/:cat_id",getCategory)
router.get("/getAllcate",getAllCategories)
router.get("/getCatid/:category_id",getCatByid)
router.put("/update-cate/:cat_id",Updatecate)
router.delete("/delete-cate/:cat_id",deletecate)



export default router;
