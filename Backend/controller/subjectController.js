import SubjectModel from "../Models/subject.js";

// ─────────────────────────────────────────
// HELPER: Auto generate subject code
// Mathematics → MATH101
// ─────────────────────────────────────────
const generateSubjectCode = async (name) => {
    const prefix = name
        .trim()
        .substring(0, 4)
        .toUpperCase();
    const count = await SubjectModel.countDocuments();
    const serial = String(count + 1).padStart(3, "0");
    return `${prefix}${serial}`;
    // Output: MATH101
};

// ─────────────────────────────────────────
// @desc    Create new subject
// @route   POST /api/subjects
// @access  Admin
// ─────────────────────────────────────────
export const createSubject = async (req, res) => {
    try {
        const { name, code, department, assignteacher } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Subject name is required",
            });
        }

        // Check duplicate name
        const nameExists = await SubjectModel.findOne({
            name: { $regex: `^${name}$`, $options: "i" },
        });
        if (nameExists) {
            return res.status(400).json({
                success: false,
                message: "Subject already exists",
            });
        }

        // Auto generate code if not provided
        const subjectCode = code
            ? code.toUpperCase()
            : await generateSubjectCode(name);

        // Check duplicate code
        const codeExists = await SubjectModel.findOne({ code: subjectCode });
        if (codeExists) {
            return res.status(400).json({
                success: false,
                message: `Subject code ${subjectCode} already exists`,
            });
        }

        const subject = await SubjectModel.create({
            name,
            code: subjectCode,
            department,
            assignteacher
        });

        res.status(201).json({
            success: true,
            message: "Subject created successfully",
            data: subject,
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
// @desc    Get all subjects
// @route   GET /api/subjects
// @access  Admin
// ─────────────────────────────────────────
export const getAllSubjects = async (req, res) => {
    try {
        const { search } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { code: { $regex: search, $options: "i" } },
            ];
        }

        const subjects = await SubjectModel.find(query)
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            count: subjects.length,
            data: subjects,
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
// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Admin
// ─────────────────────────────────────────
export const getSubjectById = async (req, res) => {
    try {
        const subject = await SubjectModel.findById(req.params.id);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found",
            });
        }

        res.status(200).json({
            success: true,
            data: subject,
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
// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Admin
// ─────────────────────────────────────────
export const updateSubject = async (req, res) => {
    try {
        const { name, code } = req.body;

        const subject = await SubjectModel.findById(req.params.id);
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found",
            });
        }

        // Check duplicate name
        if (name && name !== subject.name) {
            const exists = await SubjectModel.findOne({
                name: { $regex: `^${name}$`, $options: "i" },
            });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Subject name already exists",
                });
            }
        }

        // Check duplicate code
        if (code && code !== subject.code) {
            const exists = await SubjectModel.findOne({
                code: code.toUpperCase(),
            });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Subject code already exists",
                });
            }
        }

        if (name) subject.name = name;
        if (code) subject.code = code.toUpperCase();

        await subject.save();

        res.status(200).json({
            success: true,
            message: "Subject updated successfully",
            data: subject,
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
// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Admin
// ─────────────────────────────────────────
export const deleteSubject = async (req, res) => {
    try {
        const subject = await SubjectModel.findById(req.params.id);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: "Subject not found",
            });
        }

        await Subject.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Subject deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};