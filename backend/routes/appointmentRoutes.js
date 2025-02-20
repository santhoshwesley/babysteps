import express from "express";
import {
  bookAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
  getAvailableSlots,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.get("/", getAppointments); // Get all appointments
router.get("/:id", getAppointmentById); // Get appointment by ID
router.post("/book", bookAppointment); // Create new appointment
router.put("/:id", updateAppointment); // Update an appointment
router.delete("/:id", cancelAppointment); // Delete an appointment
router.get("/available-slots", getAvailableSlots);

export default router;
