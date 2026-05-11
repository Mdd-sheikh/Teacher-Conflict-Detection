import express from 'express';
import { getAllTimeSlots } from '../controller/timeslotController.js';
import { createTimeSlot } from '../controller/timeslotController.js';
import { auth } from '../middleware/auth.js';
const timeSlotRouter = express.Router();

// All routes protected (admin only)
timeSlotRouter.post("/createtimeslot",auth, createTimeSlot);
timeSlotRouter.get("/gettimeslots",auth, getAllTimeSlots);

export default timeSlotRouter;