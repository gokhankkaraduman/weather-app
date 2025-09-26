import style from './Header.module.css';
import logo from '../../assets/logo.png';
import { useEffect, useState } from 'react';
import { LuSunMedium, LuMoonStar } from 'react-icons/lu';
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb';

export default function Header({ unit = 'metric', onToggleUnit }) {
  const [theme, setTheme] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    return saved || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
    try { localStorage.setItem('theme', theme); } catch {}
    try { window.dispatchEvent(new CustomEvent('themechange', { detail: theme })); } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className={style.header}>
        <div className={style.logoContainer}>
            <img className={style.logo} src={logo} alt="Weather App Logo" />
            <h2 className={style.title}>Cloud Peek</h2>
        </div>
        <div></div>
        <div className={style.buttons}>
            <button aria-label="Toggle theme" className={`${style.togglebutton} ${theme === 'dark' ? style.toggled : style.untoggled}`} onClick={toggleTheme}>
              <span className={style.knob} />
              <LuSunMedium className={style.sun} />
              <LuMoonStar className={style.moon} />
            </button>
            <button aria-label="Toggle units" role="switch" aria-checked={unit === 'imperial'} className={`${style.unitToggle} ${unit === 'imperial' ? style.unitImperial : ''}`} onClick={onToggleUnit}>
              <span className={style.unitKnob} />
              <TbTemperatureCelsius className={style.unitC} />
              <TbTemperatureFahrenheit className={style.unitF} />
            </button>
        </div>
    </header>
  )
};