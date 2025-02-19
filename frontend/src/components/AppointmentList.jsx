import { useEffect, useState } from "react";
import { getAppointments } from "../api/api";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Container,
} from "@mui/material";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <List>
        {appointments.map((apt) => (
          <ListItem key={apt._id}>
            <ListItemText
              primary={`${apt.patientName} - ${apt.appointmentType} on ${apt.date}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default AppointmentList;
