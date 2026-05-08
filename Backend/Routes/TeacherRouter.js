// routes/teacher.js
import express from "express";
import { auth } from "../middleware/auth.js";
import { createTeacher } from "../controller/TeacherController.js";
import { getAllTeachers } from "../controller/TeacherController.js";
import { getTeacherById } from "../controller/TeacherController.js";
import { updateTeacher } from "../controller/TeacherController.js";
import { deleteTeacher } from "../controller/TeacherController.js";
import { resetTeacherPassword } from "../controller/TeacherController.js";
import { toggleTeacherStatus } from "../controller/TeacherController.js";
import { previewCredentials } from "../controller/TeacherController.js";


const teacherRouter = express.Router();

// All routes protected (admin only)


teacherRouter.post("/preview", auth, previewCredentials);
teacherRouter.post("/", auth, createTeacher);
teacherRouter.get("/", auth, getAllTeachers);
teacherRouter.get("/:id", auth, getTeacherById);
teacherRouter.put("/:id", auth, updateTeacher);
teacherRouter.delete("/:id", auth, deleteTeacher);
teacherRouter.patch("/:id/reset-password", auth, resetTeacherPassword);
teacherRouter.patch("/:id/toggle-status", auth, toggleTeacherStatus);

export default teacherRouter;