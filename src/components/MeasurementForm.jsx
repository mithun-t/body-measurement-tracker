import React, { useState } from "react";

const MeasurementForm = () => {
  const [measurements, setMeasurements] = useState({
    weight: "",
    bodyFat: "",
    chest: "",
    waist: "",
    arm: "",
    leg: "",
    date: "",
  });

  const handleChange = (e) => {
    setMeasurements({
      ...measurements,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let savedMeasurements =
      JSON.parse(localStorage.getItem("measurements")) || [];
    savedMeasurements.push(measurements);
    localStorage.setItem("measurements", JSON.stringify(savedMeasurements));
    setMeasurements({
      weight: "",
      bodyFat: "",
      chest: "",
      waist: "",
      arm: "",
      leg: "",
      date: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={measurements.date}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Weight (kg):
        <input
          type="number"
          name="weight"
          value={measurements.weight}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Body Fat (%):
        <input
          type="number"
          name="bodyFat"
          value={measurements.bodyFat}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Chest (cm):
        <input
          type="number"
          name="chest"
          value={measurements.chest}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Waist (cm):
        <input
          type="number"
          name="waist"
          value={measurements.waist}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Arm (cm):
        <input
          type="number"
          name="arm"
          value={measurements.arm}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Leg (cm):
        <input
          type="number"
          name="leg"
          value={measurements.leg}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default MeasurementForm;
