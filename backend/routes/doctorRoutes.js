import express from "express";
import {
  getDoctors,
  addDoctor,
  getDoctorById,
  getDoctorSlots,
} from "../controllers/doctorController.js";

const router = express.Router();

router.get("/", getDoctors);
router.get("/:id", getDoctorById);
router.get("/:id/slots", getDoctorSlots);
router.post("/", addDoctor);

export default router;
