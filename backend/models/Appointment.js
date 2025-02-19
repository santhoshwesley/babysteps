import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: { type: String, required: true },
  slot: { type: String, required: true },
  duration: { type: Number, required: true, default: 30 },
  appointmentType: {
    type: String,
    enum: ["General", "Urgent"],
    default: "General",
  },
  patientName: { type: String, required: true },
  notes: { type: String },
});

export default mongoose.model("Appointment", appointmentSchema);
