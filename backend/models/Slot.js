import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  isBooked: { type: Boolean, default: false },
});

const Slot = mongoose.model("Slot", SlotSchema);
export default Slot;
