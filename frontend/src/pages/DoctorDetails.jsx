import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorSlots } from "../api/api";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import BookingForm from "../components/BookingForm";

const DoctorDetails = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDoctorSlots(id, new Date().toISOString().split("T")[0])
      .then((res) => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id]);

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

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        disabled={!selectedSlot}
        style={{ marginTop: "10px" }}
      >
        Book Appointment
      </Button>

      <BookingForm
        open={open}
        handleClose={() => setOpen(false)}
        doctorId={id}
        selectedSlot={selectedSlot}
      />
    </Container>
  );
};

export default DoctorDetails;
