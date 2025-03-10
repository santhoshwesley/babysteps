import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  workingHours: {
    start: String,
    end: String,
  },
  availableSlots: { type: [String], default: [] },
});

export default mongoose.model("Doctor", doctorSchema);
