import { ThemeProvider, CssBaseline, Container } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorDetails from "./pages/DoctorDetails";
import AppointmentList from "./components/AppointmentList";
import DoctorsList from "./components/DoctorList";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorsList />} />
            <Route path="/doctor/:id" element={<DoctorDetails />} />
            <Route path="/appointments" element={<AppointmentList />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
