import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { bookAppointment } from "../api/api";

const BookingForm = ({ open, handleClose, doctorId, selectedSlot }) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("General"); 

  const handleSubmit = async () => {
    if (!patientName) {
      alert("Please enter your name!");
      return;
    }

    if (!["General", "Urgent"].includes(appointmentType)) {
      alert("Invalid appointment type!"); 
      return;
    }

    try {
      await bookAppointment({
        doctorId,
        date: new Date().toISOString().split("T")[0],  Ensure date format
        time: selectedSlot, 
        duration: 30,
        appointmentType,
        patientName,
      });
      alert("Appointment booked!");
      handleClose();
    } catch (error) {
      console.error("Booking failed", error.response?.data || error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          margin="dense"
        />
        <TextField
          fullWidth
          select
          label="Appointment Type"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          margin="dense"
        >
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Urgent">Urgent</MenuItem>
        </TextField>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          style={{ marginTop: "10px" }}
        >
          Confirm Booking
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
