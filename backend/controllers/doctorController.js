import Doctor from "../models/Doctor.js";

// Get all doctors
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Error fetching doctors" });
  }
};
//Get doctors by id
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: "Error fetching doctor details" });
  }
};

// Get doctor slots
export const getDoctorSlots = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    res.json(doctor.availableSlots);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctor slots" });
  }
};

// Add a new doctor
export const addDoctor = async (req, res) => {
  const { name, specialization, availableSlots } = req.body;

  try {
    const newDoctor = new Doctor({ name, specialization, availableSlots });
    await newDoctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(500).json({ error: "Error adding doctor" });
  }
};
