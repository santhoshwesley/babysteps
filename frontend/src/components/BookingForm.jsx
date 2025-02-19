import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { bookAppointment } from "../api/api";

const BookingForm = ({ open, handleClose, doctorId, selectedSlot }) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("");

  const handleSubmit = async () => {
    try {
      await bookAppointment({
        doctorId,
        date: selectedSlot,
        duration: 30,
        appointmentType,
        patientName,
      });
      alert("Appointment booked!");
      handleClose();
    } catch (error) {
      console.error("Booking failed", error);
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
          label="Appointment Type"
          value={appointmentType}
          onChange={(e) => setAppointmentType(e.target.value)}
          margin="dense"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Confirm Booking
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BookingForm;
