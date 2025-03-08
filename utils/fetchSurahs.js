// utils/fetchSurahs.js
import axios from "axios";

export const fetchSurahs = async () => {
  try {
    const response = await axios.get("https://api.alquran.cloud/v1/surah");
    return response.data.data; // Returns the list of Surahs
  } catch (error) {
    console.error("Error fetching Surahs:", error);
    return [];
  }
};
