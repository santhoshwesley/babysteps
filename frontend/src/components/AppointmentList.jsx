import { useEffect, useState } from "react";
import {
  getAppointments,
  updateAppointment,
  cancelAppointment,
} from "../api/api";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Container,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Grid,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [appointmentType, setAppointmentType] = useState("General");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await getAppointments();

      if (res?.data) {
        console.log(res.data);
        setAppointments(res?.data);
      } else {
        console.error("Unexpected API response:", res);
        alert("Failed to fetch appointments.");
      }
    } catch (err) {
      console.error("Error fetching appointments:", err);
      alert("Failed to fetch appointments. Check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (appointment) => {
    setEditData(appointment);
    setPatientName(appointment.patientName);
    setAppointmentType(appointment.appointmentType);
  };

  const handleUpdate = async () => {
    if (!editData) return;

    try {
      await updateAppointment(editData._id, {
        patientName,
        appointmentType,
      });
      alert("Appointment updated!");
      setEditData(null);
      fetchAppointments();
    } catch (error) {
      console.error("Failed to update appointment:", error);
      alert("Update failed.");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?"))
      return;

    try {
      await cancelAppointment(id);
      alert("Appointment cancelled!");
      fetchAppointments();
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      alert("Cancel failed.");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom align="center">
        Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography align="center">No appointments found.</Typography>
      ) : (
        <List>
          {appointments.map((apt) => (
            <Paper
              key={apt._id}
              elevation={3}
              style={{ padding: "15px", marginBottom: "15px" }}
            >
              <ListItem
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <ListItemText
                  primary={
                    <Typography variant="h6">{apt.patientName}</Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2">
                        {apt.appointmentType}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        DATE: {apt.date} TIME: {apt.slot}
                      </Typography>
                    </>
                  }
                />

                <Grid container spacing={2} justifyContent="flex-end">
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(apt)}
                    >
                      Edit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleCancel(apt._id)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/")}
        style={{
          marginTop: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Back to Home
      </Button>

      {/* Edit Appointment Dialog */}
      {editData && (
        <Dialog open={true} onClose={() => setEditData(null)}>
          <DialogTitle>Edit Appointment</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              margin="dense"
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              select
              label="Appointment Type"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              margin="dense"
              style={{ marginBottom: "20px" }}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </TextField>
            <Button
              onClick={handleUpdate}
              variant="contained"
              color="primary"
              style={{ display: "block", margin: "0 auto" }}
            >
              Update
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

export default AppointmentList;
