import { useEffect, useState } from "react";
import { getAppointments } from "../api/api";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Container,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAppointments()
      .then((res) => {
        setAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <List>
        {appointments.map((apt) => (
          <ListItem key={apt._id}>
            <ListItemText
              primary={`${apt.patientName} - ${apt.appointmentType} on ${apt.date} at ${apt.time}`}
            />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
      >
        Back to Home
      </Button>
    </Container>
  );
};

export default AppointmentList;
