import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
      // example: "101", "Lab-A"
    },

    type: {
      type: String,
      enum: ["classroom", "lab", "hall"],
      default: "classroom",
    },

    capacity: {
      type: Number,
      default: 40,
    },
  },
  { timestamps: true }
);

const RoomModel = mongoose.models.Room || mongoose.model("Room", roomSchema);
export default RoomModel;