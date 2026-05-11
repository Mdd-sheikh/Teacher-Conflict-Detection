import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      // example: "Mathematics"
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      // example: "MATH101"
    },
    department: {
      type: String
    },
    assignteacher: {
      type: String
    }
  },
  { timestamps: true }
);

const SubjectModel = mongoose.models.Subject || mongoose.model("Subject", subjectSchema);
export default SubjectModel;