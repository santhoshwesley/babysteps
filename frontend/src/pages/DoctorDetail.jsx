import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorSlots, bookAppointment } from "../api/api";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const DoctorDetails = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");

  useEffect(() => {
    getDoctorSlots(id, new Date().toISOString().split("T")[0])
      .then((res) => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

  const handleBooking = () => {
    if (!patientName || !selectedSlot) return alert("Fill all details!");

    bookAppointment({
      doctorId: id,
      patientName,
      date: new Date().toISOString().split("T")[0],
      time: selectedSlot,
      appointmentType: "General",
    })
      .then(() => alert("Appointment Booked!"))
      .catch(console.error);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Available Slots
      </Typography>
      <Select
        fullWidth
        value={selectedSlot}
        onChange={(e) => setSelectedSlot(e.target.value)}
      >
        {slots.map((slot) => (
          <MenuItem key={slot} value={slot}>
            {slot}
          </MenuItem>
        ))}
      </Select>

      <TextField
        fullWidth
        label="Patient Name"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        style={{ marginTop: "10px" }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleBooking}
        style={{ marginTop: "10px" }}
      >
        Book Appointment
      </Button>
    </Container>
  );
};

export default DoctorDetails;
