import express from 'express';
import { getAllTimeSlots } from '../controller/timeslotController.js';
import { createTimeSlot } from '../controller/timeslotController.js';
const timeSlotRouter = express.Router();

// All routes protected (admin only)
timeSlotRouter.post("/createtimeslot", createTimeSlot);
timeSlotRouter.get("/gettimeslots", getAllTimeSlots);

export default timeSlotRouter;