import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    // ── Basic Info ──────────────────────
    name: {
      type: String,
      required: [true, "Teacher name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },

    // ── Login Credentials ───────────────
    // Admin assigns these
    teacherId: {
      type: String,
      unique: true,
      // Auto generated: TCH-2024-001
    },

    password: {
      type: String,
      required: true,
      // Auto generated: Sharma@347
      // stored as plain (teacher will change later)
      // OR hash it - your choice
    },

    // ── Subject Assigned ────────────────
    // Admin assigns which subjects teacher teaches
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],

    // ── Class Assigned ──────────────────
    // Admin assigns which classes teacher teaches
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
      },
    ],

    // ── Room Assigned ───────────────────
    // Admin assigns which room teacher uses
    rooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
      },
    ],

    // ── Time Slots Assigned ─────────────
    // Admin assigns working time slots
    timeSlots: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TimeSlot",
      },
    ],

    // ── Account Status ───────────────────
    isActive: {
      type: Boolean,
      default: true,
    },

    isFirstLogin: {
      type: Boolean,
      default: true,
      // true = teacher must change password
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);
export default Teacher;