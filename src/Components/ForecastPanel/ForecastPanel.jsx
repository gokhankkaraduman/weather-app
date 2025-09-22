import styles from "./ForecastPanel.module.css";
import { latLonToTileXY, getOWMTileUrl } from "../../services/apiServices";

export default function ForecastPanel({ data, uv, current, unit = 'metric' }) {
  const hourlyForecast = data.list.slice(0, 8);
  const dailyForecast = data.list.filter(
    item => new Date(item.dt * 1000).getHours() === 12
  );

  // wind data now visualized in WeatherPanel

  const toUnitTemp = (c) => unit === 'imperial' ? Math.round((c * 9) / 5 + 32) : Math.round(c);

  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Hourly Forecast</h3>
        <div className={styles.hourlyContainer}>
          {hourlyForecast.map((hour, index) => (
            <div key={index} className={styles.hourlyCard}>
              <p className={styles.time}>
                {new Date(hour.dt * 1000).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className={styles.temp}>{toUnitTemp(hour.main.temp)}°</p>
              <img
                className={styles.icon}
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>5‑Day Forecast</h3>
        <div className={styles.dailyContainer}>
          {dailyForecast.slice(0, 7).map((day, index) => (
            <div key={index} className={styles.dailyCard}>
              <p className={styles.date}>{new Date(day.dt * 1000).toLocaleDateString([], { weekday: "short" })}</p>
              <p className={styles.temp}>{toUnitTemp(day.main.temp)}°</p>
              <img
                className={styles.icon}
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.uvContainer}>
          <div className={styles.uvHeader}>
            <h3 className={styles.sectionTitle}>UV Index</h3>
            <span className={styles.uvScore}>{uv?.value ?? "N/A"}</span>
          </div>
          <div className={styles.uvBar}>
            <span className={styles.uvFill} style={{ width: `${Math.min(100, (uv?.value ?? 0) * 10)}%` }} />
          </div>
          <p className={styles.uvNote}>Use sun protection until late afternoon.</p>
        </div>

        <div className={styles.mapContainer}>
          <h3 className={styles.sectionTitle}>Weather Map</h3>
          <div className={styles.mapWrap}>
            {(() => {
              const lat = current?.coord?.lat;
              const lon = current?.coord?.lon;
              if (lat == null || lon == null) return <div className={styles.mapPlaceholder}>Location not available</div>;
              const z = 6;
              const { x: xtile, y: ytile } = latLonToTileXY(lat, lon, z);
              const baseTiles = [];
              const overlayTiles = [];
              const baseLayer = 'clouds_new';
              const overlayLayer = 'wind_new';
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const x = xtile + dx;
                  const y = ytile + dy;
                  baseTiles.push(<img key={`b-${x}-${y}`} className={styles.tile} src={getOWMTileUrl({ layer: baseLayer, z, x, y })} alt="base" />);
                  overlayTiles.push(<img key={`o-${x}-${y}`} className={styles.tile} src={getOWMTileUrl({ layer: overlayLayer, z, x, y })} alt="overlay" />);
                }
              }
              return (
                <>
                  <div className={`${styles.tileGrid} ${styles.baseGrid}`}>{baseTiles}</div>
                  <div className={`${styles.tileGrid} ${styles.overlayGrid}`}>{overlayTiles}</div>
                </>
              );
            })()}
          </div>
          <p className={styles.mapCaption}>Layer: Wind • Source: OpenWeatherMap</p>
        </div>
      </div>
    </div>
  );
}
