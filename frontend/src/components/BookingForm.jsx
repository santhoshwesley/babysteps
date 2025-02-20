import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import API_URL from "../api/api";
import "../styles.css";

const BookingForm = ({
  open,
  handleClose,
  doctorId,
  selectedSlot,
  selectedDate,
}) => {
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("General");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBooking = async () => {
    if (!patientName) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/appointments/book`, {
        doctorId,
        patientName,
        date: selectedDate,
        slot: selectedSlot,
        duration: 30,
        appointmentType,
      });

      alert("Appointment booked successfully!");
      handleClose();
      navigate("/appointments");
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(error.response?.data?.error || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Book Appointment</DialogTitle>
      <DialogContent>
        <TextField
          label="Patient Name"
          fullWidth
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Appointment Type</InputLabel>
          <Select
            value={appointmentType}
            onChange={(e) => setAppointmentType(e.target.value)}
          >
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Urgent">Urgent</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Selected Date"
          fullWidth
          value={selectedDate}
          disabled
          margin="dense"
        />
        <TextField
          label="Selected Slot"
          fullWidth
          value={selectedSlot}
          disabled
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleBooking}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BookingForm;
