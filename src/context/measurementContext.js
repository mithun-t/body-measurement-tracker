import { createContext, useState } from "react";

export const MeasurementContext = createContext();

export const MeasurementProvider = ({ children }) => {
  const [measurements, setMeasurements] = useState([]);
  return <MeasurementContext.Provider value={{ measurements, setMeasurements }}>{children}</MeasurementContext.Provider>;
};
