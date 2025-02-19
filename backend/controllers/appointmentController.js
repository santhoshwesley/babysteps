import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// Book an appointment
export const bookAppointment = async (req, res) => {
  const { doctorId, patientName, date, time, duration, appointmentType } =
    req.body;

  try {
    if (!["General", "Urgent"].includes(appointmentType)) {
      return res.status(400).json({ error: "Invalid appointment type" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    if (!doctor.availableSlots.includes(time)) {
      return res.status(400).json({ error: "Slot not available" });
    }

    const newAppointment = new Appointment({
      doctorId,
      patientName,
      date,
      slot: time,
      duration,
      appointmentType,
    });

    await newAppointment.save();

    doctor.availableSlots = doctor.availableSlots.filter((s) => s !== time);
    await doctor.save();

    res.json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ error: "Error booking appointment" });
  }
};

// Get appointments for a doctor
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      doctorId: req.params.doctorId,
    });
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
};
