import express from 'express'
import { DeleteCourse, GetCourse, UpdateCourse, addCourse, addCourseCat, getAllCourse, getCourseCat } from '../Controllers/course.controller'
const router=express.Router()

router.post("/add-courseCat",addCourseCat)
router.get("/get-courseCat",getCourseCat)


router.post("/add-course",addCourse)
router.get("/get-courses",getAllCourse)
router.get("/get-course/:courseid",GetCourse)
router.put("/update-course/:courseid",UpdateCourse)
router.delete("/delete-course/:courseid",DeleteCourse)

export default router