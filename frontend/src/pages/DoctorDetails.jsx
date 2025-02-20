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
  TextField,
  Box,
} from "@mui/material";
import BookingForm from "../components/BookingForm";
import dayjs from "dayjs";
import "../styles.css";

const DoctorDetails = () => {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDoctorSlots(id, selectedDate)
      .then((res) => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(console.error);
  }, [id, selectedDate]);

  if (loading)
    return (
      <Box className="center-screen">
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Container className="center-container">
        <Box textAlign="center" width="100%">
          <Typography variant="h4" gutterBottom>
            Select a Date & Time Slot
          </Typography>

          {/* Date Picker */}
          <Box sx={{ mb: 2 }}>
            <TextField
              type="date"
              fullWidth
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              inputProps={{
                min: dayjs().format("YYYY-MM-DD"),
                max: dayjs().add(6, "day").format("YYYY-MM-DD"),
              }}
            />
          </Box>

          {/* Slot Selection */}
          <Box sx={{ mb: 3 }}>
            <Select
              fullWidth
              value={selectedSlot}
              onChange={(e) => setSelectedSlot(e.target.value)}
              disabled={slots.length === 0}
              displayEmpty
            >
              <MenuItem value="" disabled>
                {slots.length > 0 ? "Select a Slot" : "No slots available"}
              </MenuItem>
              {slots.map((slot) => (
                <MenuItem key={slot} value={slot}>
                  {slot}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Book Appointment Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            disabled={!selectedSlot}
            sx={{ width: "100%", padding: "10px" }}
          >
            Book Appointment
          </Button>
        </Box>

        {/* Booking Form Modal */}
        <BookingForm
          open={open}
          handleClose={() => setOpen(false)}
          doctorId={id}
          selectedSlot={selectedSlot}
          selectedDate={selectedDate}
        />
      </Container>
    </Box>
  );
};

export default DoctorDetails;
