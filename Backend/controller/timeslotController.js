import TimeSlotModel from "../Models/timeslot.js";

// ─────────────────────────────────────────
// @desc    Create new time slot
// @route   POST /api/timeslots
// @access  Admin
// ─────────────────────────────────────────
export const createTimeSlot = async (req, res) => {
    try {
        const { day, startTime, endTime } = req.body;

        if (!day || !startTime || !endTime) {
            return res.status(400).json({
                success: false,
                message: "Day, startTime and endTime are required",
            });
        }

        // Check duplicate slot
        const exists = await TimeSlotModel.findOne({
            day,
            startTime,
            endTime,
        });
        if (exists) {
            return res.status(400).json({
                success: false,
                message: `Slot ${day} ${startTime}-${endTime} already exists`,
            });
        }

        // Auto slot number per day
        const count = await TimeSlotModel.countDocuments({ day });
        const slotNumber = count + 1;

        const timeSlot = await TimeSlotModel.create({
            day,
            startTime,
            endTime,
            slotNumber,
        });

        res.status(201).json({
            success: true,
            message: "Time slot created successfully",
            data: timeSlot,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ─────────────────────────────────────────
// @desc    Get all time slots
// @route   GET /api/timeslots
// @access  Admin
// ─────────────────────────────────────────
export const getAllTimeSlots = async (req, res) => {
    try {
        const { day } = req.query;

        let query = {};
        if (day) query.day = day;

        const timeSlots = await TimeSlotModel.find(query).sort({
            day: 1,
            slotNumber: 1,
        });

        // Group by day for easy frontend use
        const grouped = {
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
        };

        timeSlots.forEach((slot) => {
            if (grouped[slot.day]) {
                grouped[slot.day].push(slot);
            }
        });

        res.status(200).json({
            success: true,
            count: timeSlots.length,
            data: timeSlots,      // flat list
            grouped,              // grouped by day
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ─────────────────────────────────────────
// @desc    Get single time slot
// @route   GET /api/timeslots/:id
// @access  Admin
// ─────────────────────────────────────────
export const getTimeSlotById = async (req, res) => {
    try {
        const timeSlot = await TimeSlotModel.findById(req.params.id);

        if (!timeSlot) {
            return res.status(404).json({
                success: false,
                message: "Time slot not found",
            });
        }

        res.status(200).json({
            success: true,
            data: timeSlot,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ─────────────────────────────────────────
// @desc    Update time slot
// @route   PUT /api/timeslots/:id
// @access  Admin
// ─────────────────────────────────────────
export const updateTimeSlot = async (req, res) => {
    try {
        const { day, startTime, endTime } = req.body;

        const timeSlot = await TimeSlotModel.findById(req.params.id);
        if (!timeSlot) {
            return res.status(404).json({
                success: false,
                message: "Time slot not found",
            });
        }

        // Check duplicate
        const duplicate = await TimeSlotModel.findOne({
            day: day || timeSlot.day,
            startTime: startTime || timeSlot.startTime,
            endTime: endTime || timeSlot.endTime,
            _id: { $ne: req.params.id },
        });

        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "This time slot already exists",
            });
        }

        if (day) timeSlot.day = day;
        if (startTime) timeSlot.startTime = startTime;
        if (endTime) timeSlot.endTime = endTime;

        await timeSlot.save();

        res.status(200).json({
            success: true,
            message: "Time slot updated successfully",
            data: timeSlot,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// ─────────────────────────────────────────
// @desc    Delete time slot
// @route   DELETE /api/timeslots/:id
// @access  Admin
// ─────────────────────────────────────────
export const deleteTimeSlot = async (req, res) => {
    try {
        const timeSlot = await TimeSlotModel.findById(req.params.id);

        if (!timeSlot) {
            return res.status(404).json({
                success: false,
                message: "Time slot not found",
            });
        }

        await TimeSlotModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Time slot deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message, 
        });
    }
};