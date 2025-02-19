import axios from "axios";

const API_URL = "http://localhost:5000";

export const getDoctors = () => axios.get(`${API_URL}/doctors`);
export const getDoctorSlots = (id, date) =>
  axios.get(`${API_URL}/doctors/${id}/slots?date=${date}`);
export const bookAppointment = (data) =>
  axios.post(`${API_URL}/appointments`, data);
export const getAppointments = () => axios.get(`${API_URL}/appointments`);
export const updateAppointment = (id, data) =>
  axios.put(`${API_URL}/appointments/${id}`, data);
export const cancelAppointment = (id) =>
  axios.delete(`${API_URL}/appointments/${id}`);
