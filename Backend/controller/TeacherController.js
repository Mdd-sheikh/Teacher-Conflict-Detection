import Room from "../Models/room.js";
import Teacher from "../Models/AddTeacher.js";
import Class from "../Models/class.js";
import Subject from "../Models/subject.js";
import TimeSlot from "../Models/timeslot.js";


// generate unique teacher ID and default password
export const generateTeacherId = async () => {
    const year = new Date().getFullYear();
    const count = await Teacher.countDocuments();
    const serial = String(count + 1).padStart(3, "0");
    return `TCH-${year}-${serial}`;
};

// generate default password based on teacher's name
export const generatePassword = (name) => {
    const parts = name.trim().split(" ");
    const namePart =
        parts.length > 1
            ? parts[parts.length - 1] // Last name
            : parts[0]; // First name
    const num = Math.floor(Math.random() * 900) + 100;
    return `${namePart}@${num}`;
};

// Create a new teacher

export const createTeacher = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            subjects,   // array of subject IDs   // array of class IDs
            rooms,      // array of room IDs
            timeSlots,  // array of timeSlot IDs
        } = req.body;

        // ── Validation ──────────────────────
        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email and phone are required",
            });
        }

        // ── Check duplicate email ────────────
        const emailExists = await Teacher.findOne({ email });
        if (emailExists) {
            return res.status(400).json({
                success: false,
                message: "Teacher with this email already exists",
            });
        }

        // ── Validate subjects exist ──────────
        if (subjects && subjects.length > 0) {
            const subjectCount = await Subject.countDocuments({
                _id: { $in: subjects },
            });
            if (subjectCount !== subjects.length) {
                return res.status(400).json({
                    success: false,
                    message: "One or more subjects not found",
                });
            }
        }

        // ── Validate classes exist ───────────

        // ── Validate rooms exist ─────────────
        if (rooms && rooms.length > 0) {
            const roomCount = await Room.countDocuments({
                _id: { $in: rooms },
            });
            if (roomCount !== rooms.length) {
                return res.status(400).json({
                    success: false,
                    message: "One or more rooms not found",
                });
            }
        }

        // ── Validate timeSlots exist ─────────
       

        // ── Auto Generate Credentials ────────
        const teacherId = await generateTeacherId();
        const plainPassword = generatePassword(name);

        // ── Create Teacher ───────────────────
        const teacher = await Teacher.create({
            name,
            email,
            phone,
            teacherId:teacherId,
            password: plainPassword,
            subjects: subjects || [],
            rooms: rooms || [],
            timeSlots,
            isActive: true,
            isFirstLogin: true,
        });

        // ── Populate response ────────────────
        const populated = await Teacher.findById(teacher._id)
            

        res.status(201).json({
            success: true,
            message: "Teacher created successfully",
            // Send plain password ONCE to admin
            credentials: {
                teacherId,
                password: plainPassword,
            },
            data: populated,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// get all teachers with pagination and filtering
export const getAllTeachers = async (req, res) => {
    try {
        // ── Search & Filter ──────────────────
        const { search, status } = req.query;

        let query = {};

        // Search by name or teacherId
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { teacherId: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        // Filter by status
        if (status === "active") {
            query.isActive = true;
        } else if (status === "inactive") {
            query.isActive = false;
        }

        const teachers = await Teacher.find(query)
            .populate("subjects", "name code")
            .populate("classes", "name grade")
            .populate("rooms", "roomNumber type")
            .populate("timeSlots", "day startTime endTime slotNumber")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: teachers.length,
            data: teachers,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};



// get teacher by ID

export const getTeacherById = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
            .populate("subjects", "name code")
            .populate("classes", "name grade")
            .populate("rooms", "roomNumber type")
            .populate("timeSlots", "day startTime endTime slotNumber");

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        res.status(200).json({
            success: true,
            data: teacher,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// update teacher details
export const updateTeacher = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            subjects,
            classes,
            rooms,
            timeSlots,
            isActive,
        } = req.body;

        // ── Find teacher ─────────────────────
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        // ── Check duplicate email ────────────
        if (email && email !== teacher.email) {
            const emailExists = await Teacher.findOne({ email });
            if (emailExists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use",
                });
            }
        }

        // ── Update fields ────────────────────
        if (name) teacher.name = name;
        if (email) teacher.email = email;
        if (phone) teacher.phone = phone;
        if (subjects) teacher.subjects = subjects;
        if (classes) teacher.classes = classes;
        if (rooms) teacher.rooms = rooms;
        if (timeSlots) teacher.timeSlots = timeSlots;
        if (isActive !== undefined) teacher.isActive = isActive;

        await teacher.save();

        // ── Populate response ────────────────
        const updated = await Teacher.findById(teacher._id)
            .populate("subjects", "name code")
            .populate("classes", "name grade")
            .populate("rooms", "roomNumber type")
            .populate("timeSlots", "day startTime endTime slotNumber");

        res.status(200).json({
            success: true,
            message: "Teacher updated successfully",
            data: updated,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// delete teacher (soft delete by setting isActive to false)

export const deleteTeacher = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        await Teacher.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Teacher deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// Additional functions like getTeachersBySubject, getTeachersByClass, etc. can be implemented similarly by querying the Teacher model with appropriate filters.
export const resetTeacherPassword = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        // Generate new password
        const newPassword = generatePassword(teacher.name);

        teacher.password = newPassword;
        teacher.isFirstLogin = true; // force change again
        await teacher.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
            // Send plain password to admin
            credentials: {
                teacherId: teacher.teacherId,
                password: newPassword,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


// teacher status 
export const toggleTeacherStatus = async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Teacher not found",
            });
        }

        teacher.isActive = !teacher.isActive;
        await teacher.save();

        res.status(200).json({
            success: true,
            message: `Teacher ${teacher.isActive ? "activated" : "deactivated"
                } successfully`,
            isActive: teacher.isActive,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

export const previewCredentials = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required",
            });
        }

        const teacherId = await generateTeacherId();
        const password = generatePassword(name);

        res.status(200).json({
            success: true,
            data: {
                teacherId,
                password,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

