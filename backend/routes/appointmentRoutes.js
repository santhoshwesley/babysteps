import express from "express";
import {
  bookAppointment,
  getAppointments,
} from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/book", bookAppointment);
router.get("/:doctorId", getAppointments);

export default router;
