import express from 'express'
import { AddBlog, AddBlogCat, AddBlogTag, DeleteBlog, GetAllBlogs, GetBlog, GetBlogTags, GetBlogcates, UpdateBlog, deleteBlogtag, getblogCatid, getblogTagid } from '../Controllers/blog.controller'
const router=express.Router()



router.post("/add-blogcat",AddBlogCat)
router.get("/get-blogcat",GetBlogcates)
// router.get("/get-blogcats",Get)
router.post("/add-blogtag",AddBlogTag)
router.get("/get-blogtag",GetBlogTags)

router.delete("/delete-blogtag/:tag_id",deleteBlogtag)
router.get("/getblogcatid/:category_id",getblogCatid)
router.get("/getblogTagid/:tag_id",getblogTagid)

router.post("/add-blog",AddBlog)
router.get("/get-allblogs",GetAllBlogs)
router.get("/get-blog/:blog_id",GetBlog)
router.delete("/delete-blog/:blog_id",DeleteBlog)
router.put("/update-blog/:blog_id",UpdateBlog)












export default router