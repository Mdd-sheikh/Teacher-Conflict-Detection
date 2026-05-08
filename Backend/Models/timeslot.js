import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema(
  {
    slotNumber: {
      type: Number,
      required: true,
      // example: 1, 2, 3
    },

    day: {
      type: String,
      required: true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
    },

    startTime: {
      type: String,
      required: true,
      // example: "08:00"
    },

    endTime: {
      type: String,
      required: true,
      // example: "09:00"
    },
  },
  { timestamps: true }
);

const TimeSlotModel = mongoose.models.TimeSlot || mongoose.model("TimeSlot", timeSlotSchema);
export default TimeSlotModel;