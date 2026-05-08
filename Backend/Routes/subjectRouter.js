import express from "express";
import { auth } from "../middleware/auth.js";
import { createSubject } from "../controller/subjectController.js";
import { getAllSubjects } from "../controller/subjectController.js";
import { getSubjectById } from "../controller/subjectController.js";
import { updateSubject } from "../controller/subjectController.js";
import { deleteSubject } from "../controller/subjectController.js";
const subjectRouter = express.Router();

// All routes protected (admin only)
subjectRouter.post("/createsubject", auth, createSubject);
subjectRouter.get("/subjects", auth, getAllSubjects);
subjectRouter.get("/subjects/:id", auth, getSubjectById);
subjectRouter.put("/subjects/:id", auth, updateSubject);
subjectRouter.delete("/subjects/:id", auth, deleteSubject);


export default subjectRouter;
