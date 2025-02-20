import mongoose from "mongoose";
import dotenv from "dotenv";
import Slot from "./models/Slot.js";
import Doctor from "./models/Doctor.js";

dotenv.config();

const seedSlots = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Get all doctors
    const doctors = await Doctor.find();

    if (!doctors.length) {
      console.log("No doctors found. Add doctors first.");
      return;
    }

    const timeSlots = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM",
    ];

    const slots = doctors.flatMap((doctor) =>
      timeSlots.map((time) => ({
        doctorId: doctor._id,
        date: "2025-02-21",
        time,
        isBooked: false,
      }))
    );

    await Slot.insertMany(slots);
    console.log("Slots seeded successfully!");
  } catch (error) {
    console.error("Error seeding slots:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedSlots();
