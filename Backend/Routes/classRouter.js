import express from "express";
import { auth } from "../middleware/auth.js";
import { createClass } from "../controller/classControoler.js";
import { getAllClasses } from "../controller/classControoler.js";
import { getClassById } from "../controller/classControoler.js";
import { updateClass } from "../controller/classControoler.js";
import { deleteClass } from "../controller/classControoler.js";


const classRouter = express.Router();

// All routes protected (admin only)
classRouter.post("/createclass", auth, createClass);
classRouter.get("/getclasses", auth, getAllClasses);
classRouter.get("/:id", auth, getClassById);
classRouter.put("/:id", auth, updateClass);
classRouter.delete("/:id", auth, deleteClass);

export default classRouter;

// ─────────────────────────────────────────