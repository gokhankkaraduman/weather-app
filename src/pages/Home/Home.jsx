import { useEffect, useState } from "react";
import SearchForm from "../../Components/SearchForm/SearchForm";
import WeatherPanel from "../../Components/WeatherPanel/WeatherPanel";
import ForecastPanel from "../../Components/ForecastPanel/ForecastPanel";
import { getWeatherByParams, getForecastByCoords, getUVIndex } from "../../services/apiServices";
import getLocation from "../../helper/location.js";
import styles from "./Home.module.css";

export default function Home({ setWeatherData,  weatherData, unit }) {
  const [forecastData, setForecastData] = useState(null);
  const [uvData, setUVData] = useState(null);
  const [localWeatherData, setLocalWeatherData] = useState(null); // sadece Home içi kullanım


  // Tarayıcı konumu ile veri çek
  useEffect(() => {
    const fetchLocationWeather = async () => {
      try {
        const position = await getLocation();
        if (!position || !position.coords) {
          console.warn('Position or coords not available');
          return;
        }

        const { latitude, longitude } = position.coords;

        const weather = await getWeatherByParams({ lat: latitude, lon: longitude });
        setLocalWeatherData(weather); // Home içi
        setWeatherData(weather);      // App'e gönderiyoruz

        const forecast = await getForecastByCoords({ lat: latitude, lon: longitude });
        setForecastData(forecast);

        const uv = await getUVIndex({ lat: latitude, lon: longitude });
        setUVData(uv);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocationWeather();
  }, []);//linter-disable-line react-hooks/exhaustive-deps

  // SearchForm’dan gelen şehir
  const handleSelectLocation = async (location) => {
    try {
      const weather = await getWeatherByParams({ city: location.name });
      setLocalWeatherData(weather);
      setWeatherData(weather);

      const forecast = await getForecastByCoords({ city: location.name });
      setForecastData(forecast);

      const uv = await getUVIndex({ lat: weather.coord.lat, lon: weather.coord.lon });
      setUVData(uv);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.content}>
      <div className={styles.searchSection}>
        <SearchForm onSelect={handleSelectLocation} />
        {localWeatherData && (
          <WeatherPanel data={localWeatherData} unit={unit} />
        )}
      </div>

      <div className={styles.weatherSection}>
        {forecastData && (
          <ForecastPanel
            data={forecastData}
            uv={uvData}
            current={localWeatherData}
            unit={unit}
            className={styles.forecastPanel}
          />
        )}
      </div>
    </div>
  );
}
