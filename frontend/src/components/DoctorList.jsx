import { useEffect, useState } from "react";
import { getDoctors } from "../api/api";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../styles.css";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors()
      .then((res) => {
        setDoctors(res.data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading)
    return (
      <CircularProgress style={{ display: "block", margin: "20px auto" }} />
    );

  return (
    <Container className="doctor-container">
      <Paper elevation={3} style={{ padding: "20px", marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Doctors Available
        </Typography>
        <Grid container spacing={3}>
          {doctors.map((doctor) => (
            <Grid item xs={12} sm={6} md={4} key={doctor._id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "8px",
                  boxShadow: "2px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{doctor.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {doctor.specialization}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={`/doctor/${doctor._id}`}
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    View Slots
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default DoctorsList;
