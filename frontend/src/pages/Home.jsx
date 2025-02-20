import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDoctors, getAppointments } from "../api/api";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getDoctors(), getAppointments()])
      .then(([docRes, aptRes]) => {
        setDoctors(docRes.data);
        setAppointments(aptRes.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center" sx={{ mt: 3 }}>
        Welcome to the Appointment Booking System
      </Typography>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center", height: "100%" }}>
            <CardContent>
              <Typography variant="h6">Book an Appointment</Typography>
              <Typography variant="body2" color="textSecondary">
                Find a doctor and book an available slot.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button component={Link} to="/doctors" variant="contained">
                Find Doctors
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ textAlign: "center", height: "100%" }}>
            <CardContent>
              <Typography variant="h6">View Appointments</Typography>
              <Typography variant="body2" color="textSecondary">
                Check your upcoming and past appointments.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                component={Link}
                to="/appointments"
                variant="contained"
                color="secondary"
              >
                My Appointments
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      {/* Upcoming Appointments */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Upcoming Appointments
        </Typography>
        {appointments.length === 0 ? (
          <Typography color="textSecondary">
            No upcoming appointments.
          </Typography>
        ) : (
          <Box component="ul" sx={{ pl: 2 }}>
            {appointments.slice(0, 3).map((apt) => (
              <Box component="li" key={apt._id} sx={{ mb: 1 }}>
                <strong>{apt.patientName}</strong> - {apt.appointmentType} on{" "}
                <strong>{apt.date}</strong> at <strong>{apt.slot}</strong>
              </Box>
            ))}
          </Box>
        )}
      </Paper>

      {/* Doctors List */}
      <Typography variant="h5" gutterBottom align="center">
        Doctors Available
      </Typography>
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card sx={{ textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">{doctor.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {doctor.specialization}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "center" }}>
                <Button
                  component={Link}
                  to={`/doctor/${doctor._id}`}
                  variant="contained"
                >
                  View Slots
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
