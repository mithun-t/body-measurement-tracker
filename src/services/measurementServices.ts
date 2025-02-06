import axios from "axios";

const BASE_URL = "http://localhost:5063/api";

export const fetchData = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/BodyMeasurement/User/${userId}`);
    return response.data;
  } catch (err) {
    return [];
  }
};
