import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL; // https://api.openweathermap.org/data/2.5

// Weather by city or coordinates
export const getWeatherByParams = async ({ city, lat, lon }) => {
  try {
    let url;
    if (city) {
      url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    } else if (lat != null && lon != null) {
      url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      throw new Error("City or coordinates required");
    }
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// Forecast by city or coordinates
export const getForecastByCoords = async ({ city, lat, lon }) => {
  try {
    let url;
    if (city) {
      url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    } else if (lat != null && lon != null) {
      url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    } else {
      throw new Error("City or coordinates required for forecast");
    }
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};

// UV Index by coordinates
export const getUVIndex = async ({ lat, lon }) => {
  if (lat == null || lon == null) throw new Error("Coordinates required for UV index");
  try {
    const res = await axios.get(`${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
    return res.data; // { value, lat, lon }
  } catch (err) {
    console.error("Error fetching UV Index:", err);
    throw err;
  }
};

// Search suggestions (Geo API)
export const getSearchSuggestions = async (query) => {
  if (!query || query.trim().length === 0) return [];
  try {
    const res = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`);
    return res.data; // [{ name, country, lat, lon }]
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    throw error;
  }
};

// Reverse geocoding (Geo API)
export const getCityByCoords = async ({ lat, lon }) => {
  if (lat == null || lon == null) throw new Error("Coordinates required for reverse geocoding");
  try {
    const res = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
    return res.data[0]; // { name, country, lat, lon }
  } catch (err) {
    console.error("Error fetching city by coordinates:", err);
    throw err;
  }
};

// --------- OpenWeather Map Tiles helpers ---------
// Compute XYZ tile from lat/lon and zoom per Slippy Map tiling scheme
export const latLonToTileXY = (lat, lon, z) => {
  const n = Math.pow(2, z);
  const xtile = Math.floor(n * ((lon + 180) / 360));
  const latRad = (lat * Math.PI) / 180;
  const ytile = Math.floor(
    n * (1 - (Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI)) / 2
  );
  return { x: xtile, y: ytile };
};

// Build a tile URL for OpenWeatherMap tile layers
export const getOWMTileUrl = ({ layer, z, x, y }) => {
  return `https://tile.openweathermap.org/map/${layer}/${z}/${x}/${y}.png?appid=${API_KEY}`;
};