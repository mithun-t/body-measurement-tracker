import { useEffect, useState } from "react";

const MeasurementList = () => {
  const [measurementData, setMeasurementData] = useState([]);

  useEffect(() => {
    const savedMeasurements =
      JSON.parse(localStorage.getItem("measurements")) || [];
    setMeasurementData(savedMeasurements);
  }, []);

  return (
    <div>
      <h2>Logged Measurements</h2>
      <ul>
        {measurementData.map((measurement, index) => (
          <li key={index}>
            {measurement.date} - Weight: {measurement.weight}kg, Chest:{" "}
            {measurement.chest}cm, Waist: {measurement.waist}cm, Arm:{" "}
            {measurement.arm}cm, Leg: {measurement.leg}cm, Body Fat:{" "}
            {measurement.bodyFat}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MeasurementList;
