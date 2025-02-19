import mongoose from "mongoose";
import dotenv from "dotenv";
import Doctor from "./models/Doctor.js";

dotenv.config(); // Load .env variables

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const doctors = [
  {
    name: "Dr. John Doe",
    specialization: "Cardiologist",
    availableSlots: ["10:00 AM", "11:30 AM", "2:00 PM"],
  },
  {
    name: "Dr. Sarah Smith",
    specialization: "Dermatologist",
    availableSlots: ["9:00 AM", "12:00 PM", "3:30 PM"],
  },
  {
    name: "Dr. Raj Patel",
    specialization: "Orthopedic",
    availableSlots: ["10:30 AM", "1:00 PM", "3:00 PM"],
  },
];

async function seedDB() {
  try {
    await Doctor.deleteMany({});
    await Doctor.insertMany(doctors);
    console.log("✅ Doctors Seeded!");
  } catch (error) {
    console.error("❌ Error Seeding Doctors:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
