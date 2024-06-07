import express from "express"
import { addFav, getFav, removeFav } from "../Controllers/wishlist.controller"
const router= express.Router()


router.post("/add-fav", addFav)
router.get("/get-fav/:userId", getFav)
router.delete("/remove-fav/:favId",removeFav)

export default router