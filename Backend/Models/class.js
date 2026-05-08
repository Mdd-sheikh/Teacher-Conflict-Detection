import mongoose from "mongoose";
const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        // example: "10-A", "11-B"
    },

    grade: {
        type: String,
        required: true,
        // example: "10", "11"
    },

    studentCount: {
        type: Number,
        default: 0,
    },
})

const ClassModel = mongoose.models.Class || mongoose.model("Class", classSchema);

export default ClassModel; 
