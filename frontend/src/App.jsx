import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorDetails from "./pages/DoctorDetails";
import AppointmentList from "./components/AppointmentList";
import Home from "./pages/Home";
import { Container } from "@mui/material";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
          <Route path="/appointments" element={<AppointmentList />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
