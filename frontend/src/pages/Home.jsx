import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
} from "@mui/material";

const Home = () => {
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

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Doctors Available
      </Typography>
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={4} key={doctor._id}>
            <Card>
              <CardContent>
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
