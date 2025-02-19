import React, { useEffect, useState } from "react";
import { getDoctors } from "../api/api";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors()
      .then((res) => setDoctors(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map((doc) => (
          <li key={doc._id}>
            {doc.name} - {doc.specialization}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorList;
