import ClassModel from "../Models/class.js";

// ─────────────────────────────────────────
// @desc    Create new class
// @route   POST /api/classes
// @access  Admin
// ─────────────────────────────────────────
export const createClass = async (req, res) => {
  try {
    const { name, grade, studentCount } = req.body;

    // Validation
    if (!name || !grade) {
      return res.status(400).json({
        success: false,
        message: "Name and grade are required",
      });
    }

    // Check duplicate
    const exists = await ClassModel.findOne({ name });
    if (exists) {
      return res.status(400).json({
        success: false,
        message: `Class ${name} already exists`,
      });
    }

    const newClass = await ClassModel.create({
      name,
      grade,
      studentCount: studentCount || 0,
    });

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
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
// @desc    Get all classes
// @route   GET /api/classes
// @access  Admin
// ─────────────────────────────────────────
export const getAllClasses = async (req, res) => {
  try {
    const { search, grade } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name:  { $regex: search, $options: "i" } },
        { grade: { $regex: search, $options: "i" } },
      ];
    }

    if (grade) {
      query.grade = grade;
    }

    const classes = await ClassModel.find(query)
      .sort({ grade: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes,
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
// @desc    Get single class
// @route   GET /api/classes/:id
// @access  Admin
// ─────────────────────────────────────────
export const getClassById = async (req, res) => {
  try {
    const cls = await ClassModel.findById(req.params.id);

    if (!cls) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    res.status(200).json({
      success: true,
      data: cls,
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
// @desc    Update class
// @route   PUT /api/classes/:id
// @access  Admin
// ─────────────────────────────────────────
export const updateClass = async (req, res) => {
  try {
    const { name, grade, studentCount } = req.body;

    const cls = await ClassModel.findById(req.params.id);
    if (!cls) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Check duplicate name
    if (name && name !== cls.name) {
      const exists = await ClassModel.findOne({ name });
      if (exists) {
        return res.status(400).json({
          success: false,
          message: `Class ${name} already exists`,
        });
      }
    }

    if (name)                         cls.name         = name;
    if (grade)                        cls.grade        = grade;
    if (studentCount !== undefined)   cls.studentCount = studentCount;

    await cls.save();

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      data: cls,
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
// @desc    Delete class
// @route   DELETE /api/classes/:id
// @access  Admin
// ─────────────────────────────────────────
export const deleteClass = async (req, res) => {
  try {
    const cls = await ClassModel.findById(req.params.id);

    if (!cls) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    await ClassModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};