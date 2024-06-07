import express from 'express'
import { UpdateTag, addTag, deleteTag, getAllTag, getTag, getTagByid } from '../Controllers/producttag.controller'
const router=express.Router()

router.post("/add-tag",addTag)
router.get("/get-tag/:tag_id",getTag)
router.get("/get-all-tag",getAllTag)
router.put("/update-tag/:tag_id",UpdateTag)
router.delete("/delete-tag/:tag_id",deleteTag)
router.get("/gettagId/:tag_id",getTagByid)









export default router