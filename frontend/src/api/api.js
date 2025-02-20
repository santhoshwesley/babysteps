import axios from "axios";

const API_URL = "https://babysteps-gi7r.onrender.com";
export default API_URL;

export const getDoctors = () => axios.get(`${API_URL}/doctors`);
export const getDoctorSlots = (id, date) =>
  axios.get(`${API_URL}/doctors/${id}/slots?date=${date}`);
export const bookAppointment = (data) =>
  axios.post(`${API_URL}/appointments/book`, data);
export const getAppointments = () => axios.get(`${API_URL}/appointments`);
export const getAppointmentById = (id) =>
  axios.get(`${API_URL}/appointments/${id}`);
export const updateAppointment = (id, data) =>
  axios.put(`${API_URL}/appointments/${id}`, data);
export const cancelAppointment = (id) =>
  axios.delete(`${API_URL}/appointments/${id}`);
