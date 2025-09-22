
import { useEffect, useMemo, useState } from 'react';

export default function Background({weatherId}) {

    function getBackgroundImage(weatherId){
            // id classification https://openweathermap.org/weather-conditions
    if (weatherId >= 200 && weatherId < 300) {
      return 'https://i.gifer.com/Rnim.gif'; // thunderstorm
    } else if (weatherId >= 300 && weatherId < 400) {
      return 'https://i.gifer.com/Rhhw.gif'; // drizzle
    } else if (weatherId >= 500 && weatherId < 600) {
      return 'https://i.gifer.com/7scx.gif'; // rain
    } else if (weatherId >= 600 && weatherId < 700) {
      return 'https://i.gifer.com/YY5R.gif'; // snow
    } else if (weatherId >= 700 && weatherId < 800) {
      return 'https://i.gifer.com/604.gif'; // strong wind
    } else if (weatherId === 800) {
      return 'https://i.gifer.com/Lx0q.gif'; // clear day Image
    } else {
      return 'https://i.gifer.com/fyCe.gif'; // cloudy day
    }
    }

    const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');

    useEffect(() => {
      const handler = (e) => setTheme(e.detail || (document.documentElement.getAttribute('data-theme') || 'light'));
      window.addEventListener('themechange', handler);
      return () => window.removeEventListener('themechange', handler);
    }, []);

    const overlayStyle = useMemo(() => {
      if (theme === 'dark') {
        // softer overlay, keep motion visible
        return 'radial-gradient(70% 70% at 20% 15%, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.38) 100%)';
      }
      // light mode: minimal vignette
      return 'radial-gradient(72% 72% at 22% 18%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.02) 100%)';
    }, [theme]);

    return (
    <div style={{
        backgroundImage: `url(${getBackgroundImage(weatherId)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        inset: 0,
        zIndex: -1
    }}>
      <div style={{ position:'absolute', inset:0, background: overlayStyle, backdropFilter: 'blur(2px) saturate(115%)' }} />
    </div>
    )
}
