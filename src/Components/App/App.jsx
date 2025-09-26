import { useState, useEffect } from "react";
import './App.css';
import Header from '../Header/Header';
import Home from '../../pages/Home/Home';
import Background from '../Background/Background.jsx';
import Footer from '../Footer/Footer';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState(() => {
    if (typeof window === 'undefined') return 'metric';
    return localStorage.getItem('unit') || 'metric';
  });

  useEffect(() => {
    try { localStorage.setItem('unit', unit); } catch {}
  }, [unit]);

  return (
    <div className="App">
      <Header unit={unit} onToggleUnit={() => setUnit(prev => prev === 'metric' ? 'imperial' : 'metric')} />
      <Home setWeatherData={setWeatherData} weatherData={weatherData} unit={unit} />
      <Footer />
      <Background weatherId={weatherData?.weather[0]?.id || 800} />
    </div>
  );
}

export default App;
