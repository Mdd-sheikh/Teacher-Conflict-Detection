import express from "express";
import { auth } from "../middleware/auth.js";
import { createRoom } from "../controller/roomController.js";
import { getAllRooms } from "../controller/roomController.js";
import { getRoomById } from "../controller/roomController.js";
import { updateRoom } from "../controller/roomController.js";
import { deleteRoom } from "../controller/roomController.js";


const roomRouter = express.Router();

// All routes protected (admin only)
roomRouter.post("/createroom", auth, createRoom);
roomRouter.get("/getrooms", auth, getAllRooms);
roomRouter.get("/:id", auth, getRoomById);
roomRouter.put("/:id", auth, updateRoom);
roomRouter.delete("/:id", auth, deleteRoom);


export default roomRouter;