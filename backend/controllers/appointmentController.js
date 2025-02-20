import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";
import Slot from "../models/Slot.js";

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ error: "Error fetching appointments" });
  }
};

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    res.json(appointment);
  } catch (error) {
    console.error("Error fetching appointment:", error);
    res.status(500).json({ error: "Error fetching appointment" });
  }
};

// Fetch available slots for a specific doctor & date
// export const getAvailableSlots = async (req, res) => {
//   const { doctorId, date } = req.query; // Get doctorId and date from query params

//   try {
//     const doctor = await Doctor.findById(doctorId);
//     if (!doctor) return res.status(404).json({ error: "Doctor not found" });

//     // Find already booked slots for this doctor on the given date
//     const bookedAppointments = await Appointment.find({ doctorId, date });

//     // Extract booked slots
//     const bookedSlots = bookedAppointments.map(
//       (appointment) => appointment.slot
//     );

//     // Filter out booked slots from availableSlots
//     const availableSlots = doctor.availableSlots.filter(
//       (slot) => !bookedSlots.includes(slot)
//     );

//     res.json({ availableSlots });
//   } catch (error) {
//     console.error("Error fetching available slots:", error);
//     res.status(500).json({ error: "Error fetching available slots" });
//   }
// };

// Book an appointment
export const bookAppointment = async (req, res) => {
  const { doctorId, patientName, date, slot, duration, appointmentType } =
    req.body;

  try {
    if (!["General", "Urgent"].includes(appointmentType)) {
      return res.status(400).json({ error: "Invalid appointment type" });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    // Ensure the appointment is only blocked on the specific date
    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      date,
      slot,
    });

    if (overlappingAppointment) {
      return res
        .status(400)
        .json({ error: "Time slot already booked for this date" });
    }

    const newAppointment = new Appointment({
      doctorId,
      patientName,
      date,
      slot,
      duration,
      appointmentType,
    });

    await newAppointment.save();

    res.json({
      message: "Appointment booked successfully",
      appointment: newAppointment,
    });
  } catch (err) {
    console.error("Error booking appointment:", err);
    res.status(500).json({ error: "Error booking appointment" });
  }
};

//Update an appointment
export const updateAppointment = async (req, res) => {
  const { patientName, appointmentType } = req.body;

  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    appointment.patientName = patientName || appointment.patientName;
    appointment.appointmentType =
      appointmentType || appointment.appointmentType;

    await appointment.save();
    res.json({ message: "Appointment updated successfully", appointment });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ error: "Error updating appointment" });
  }
};

export const getAvailableSlots = async (req, res) => {
  const { doctorId, date } = req.query;

  try {
    const slots = await Slot.find({ doctorId, date, isBooked: false });
    res.json({ availableSlots: slots.map((slot) => slot.time) });
  } catch (error) {
    res.status(500).json({ error: "Error fetching available slots" });
  }
};

//  Cancel an appointment
export const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Appointment canceled successfully" });
  } catch (error) {
    console.error("Error canceling appointment:", error);
    res.status(500).json({ error: "Error canceling appointment" });
  }
};
