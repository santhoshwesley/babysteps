import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

// Book an appointment
export const bookAppointment = async (req, res) => {
  const { doctorId, patientName, date, slot, appointmentType } = req.body;

  try {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Check if slot is available
    if (!doctor.availableSlots.includes(slot)) {
      return res.status(400).json({ error: "Slot not available" });
    }

    const newAppointment = new Appointment({
      doctorId,
      patientName,
      date,
      slot,
      appointmentType,
    });

    await newAppointment.save();

    // Remove booked slot from available slots
    doctor.availableSlots = doctor.availableSlots.filter((s) => s !== slot);
    await doctor.save();

    res.json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (err) {
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
    res.status(500).json({ error: "Error fetching appointments" });
  }
};
