import styles from "./WeatherPanel.module.css";

export default function WeatherPanel({ data, unit = 'metric' }) {
  if (!data) return null;

  const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
  const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

  const toUnitTemp = (c) => unit === 'imperial' ? Math.round((c * 9) / 5 + 32) : Math.round(c);
  const toUnitSpeed = (ms) => unit === 'imperial' ? (ms * 2.23694).toFixed(1) : ms;
  const tempSymbol = unit === 'imperial' ? '°F' : '°C';
  const speedSymbol = unit === 'imperial' ? 'mph' : 'm/s';
  return (
    <div className={styles.weatherPanel}>
      <div className={styles.citySection}>
        <h1 className={styles.cityName}>{data.name}</h1>
        <h2 className={styles.temperature}>{toUnitTemp(data.main.temp)}{tempSymbol}</h2>
        <p className={styles.description}>{data.weather[0].description}</p>
      </div>

      <div className={styles.detailsSection}>
        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <h3 className={styles.detailTitle}>Feels Like</h3>
            <p className={styles.detailValue}>{toUnitTemp(data.main.feels_like)}{tempSymbol}</p>
          </div>

          <div className={styles.detailItem}>
            <h3 className={styles.detailTitle}>Humidity</h3>
            <p className={styles.detailValue}>{data.main.humidity}%</p>
          </div>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <h3 className={styles.detailTitle}>Pressure</h3>
            <p className={styles.detailValue}>{data.main.pressure} hPa</p>
          </div>
          <div className={styles.detailItem}>
            <h3 className={styles.detailTitle}>Visibility</h3>
            <p className={styles.detailValue}>{data.visibility / 1000} km</p>
          </div>
        </div>

        <div className={styles.detailRow}>
          <div className={styles.detailItem}>
            <h3 className={styles.detailTitle}>Cloudiness</h3>
            <p className={styles.detailValue}>{data.clouds.all}%</p>
          </div>

          <div className={styles.detailItem}>
            <h3 className={styles.detailTitle}>Sunrise & Sunset</h3>
            <p className={styles.detailValue}>
              Sunrise: {sunrise} | Sunset: {sunset}
            </p>
          </div>
        </div>


        <div className={styles.detailRow}>
          <div className={`${styles.detailItem} ${styles.detailItemFull}`}>
            <h3 className={styles.detailTitle}>Wind</h3>
            <div className={styles.windStats}>
              <div className={styles.windNumbers}>
                <div>
                  <p className={styles.detailTitle}>Speed</p>
                  <p className={styles.detailValue}>{toUnitSpeed(data.wind.speed)} {speedSymbol}</p>
                </div>
                <div>
                  <p className={styles.detailTitle}>Gusts</p>
                  <p className={styles.detailValue}>{data.wind.gust ? `${toUnitSpeed(data.wind.gust)} ${speedSymbol}` : '—'}</p>
                </div>
              </div>
              <div className={styles.compass}>
                <div className={styles.compassDial}>
                  <div className={styles.needle} style={{ transform: `rotate(${data.wind.deg ?? 0}deg)` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
