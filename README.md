# 🌤️ Weather App

A modern, responsive weather application built with React and Vite, featuring real-time weather data, forecasts, and an elegant glassmorphism design.

![Weather App Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.x-blue) ![Vite](https://img.shields.io/badge/Vite-Latest-purple)

## ✨ Features

### 🌟 Core Features
- **Real-time Weather Data** - Current weather conditions with detailed metrics
- **7-Day Forecast** - Extended weather predictions
- **Hourly Forecast** - 24-hour weather timeline
- **UV Index Monitoring** - Sun safety information with color-coded indicators
- **Interactive Weather Map** - Cloud and wind overlays
- **Location Search** - Search weather by city name with autocomplete
- **Geolocation Support** - Automatic location detection

### 🎨 Design & UX
- **Glassmorphism UI** - Modern translucent design with backdrop blur
- **Dark/Light Theme** - Seamless theme switching with system preference detection
- **Responsive Design** - Optimized for all devices (425px to 4K)
- **Smooth Animations** - CSS transitions and hover effects
- **Accessibility First** - WCAG compliant with proper ARIA labels

### 🔧 Technical Features
- **Unit Conversion** - Celsius/Fahrenheit toggle
- **Local Storage** - Persistent theme and unit preferences
- **Error Handling** - Graceful API error management
- **Performance Optimized** - Lazy loading and efficient rendering
- **PWA Ready** - Service worker support for offline functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager
- OpenWeatherMap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gokhankkaraduman/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Add your OpenWeatherMap API key to `.env`:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
weather-app/
├── public/                 # Static assets
├── src/
│   ├── Components/        # React components
│   │   ├── App/          # Main application component
│   │   ├── Header/       # Navigation and theme controls
│   │   ├── SearchForm/   # Location search functionality
│   │   ├── WeatherPanel/ # Current weather display
│   │   ├── ForecastPanel/# Weather forecasts and maps
│   │   ├── Footer/       # App footer with developer info
│   │   └── Modal/        # Reusable modal component
│   ├── pages/            # Page components
│   │   └── Home/         # Main weather dashboard
│   ├── services/         # API service layer
│   ├── helper/           # Utility functions
│   ├── css/              # Global styles and variables
│   └── assets/           # Images and static files
├── .env.example          # Environment variables template
└── README.md            # Project documentation
```

## 🎯 Component Architecture

### Core Components

#### `<WeatherPanel />`
- Current weather conditions
- Temperature with feels-like
- Humidity, pressure, visibility
- Wind speed and direction with compass
- Weather description and icons

#### `<ForecastPanel />`
- 24-hour hourly forecast
- 7-day daily forecast
- UV index with safety recommendations
- Interactive weather map with layers

#### `<Header />`
- Theme toggle (Dark/Light)
- Unit toggle (°C/°F)
- App logo and branding

#### `<SearchForm />`
- City search with autocomplete
- Geolocation detection
- Search history (planned)

## 🌐 API Integration

### OpenWeatherMap APIs Used
- **Current Weather API** - Real-time weather data
- **5 Day Weather Forecast** - Extended predictions
- **UV Index API** - Sun safety information
- **Geocoding API** - Location search and coordinates
- **Weather Maps API** - Cloud and wind overlays

### API Service Layer
```javascript
// Example API usage
import { getCurrentWeather, getForecast } from './services/apiServices';

const weatherData = await getCurrentWeather(lat, lon);
const forecastData = await getForecast(lat, lon);
```

## 🎨 Theming System

### CSS Variables Architecture
```css
:root {
  /* Light theme variables */
  --bg-primary: rgba(255, 255, 255, 0.1);
  --text-primary: #2c3e50;
  --glass-bg: rgba(255, 255, 255, 0.25);
}

:root[data-theme="dark"] {
  /* Dark theme overrides */
  --bg-primary: rgba(0, 0, 0, 0.3);
  --text-primary: #ecf0f1;
  --glass-bg: rgba(0, 0, 0, 0.25);
}
```

### Theme Toggle Implementation
- System preference detection
- Local storage persistence
- Smooth transitions between themes
- Dynamic background overlays

## 📱 Responsive Design

### Breakpoint Strategy
- **Desktop** (1200px+) - Full feature layout
- **Tablet** (768px - 1199px) - Optimized grid
- **Mobile Large** (576px - 767px) - Stacked layout
- **Mobile Medium** (480px - 575px) - Compact design
- **Mobile Small** (425px - 479px) - Ultra-compact
- **Mobile XS** (320px - 424px) - Minimum viable

### Mobile Optimizations
- Touch-friendly interface (44px minimum targets)
- Horizontal scroll for forecast cards
- Collapsible sections
- Optimized font scaling
- Reduced motion for performance

## 🔧 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Production Build
```bash
npm run build
```

Output directory: `dist/`

### Deployment Options
- **Vercel** - Recommended for React apps
- **Netlify** - Great for static hosting
- **GitHub Pages** - Free hosting option
- **Docker** - Containerized deployment

## 🧪 Testing

### Test Coverage
- Component unit tests
- API service tests
- Integration tests
- E2E testing with Cypress (planned)

```bash
npm run test         # Run test suite
npm run test:coverage # Generate coverage report
```

## 🚀 Performance Optimizations

### Implemented
- **Code Splitting** - Dynamic imports for routes
- **Image Optimization** - WebP format with fallbacks
- **CSS Minification** - Production build optimization
- **Tree Shaking** - Unused code elimination
- **Caching Strategy** - API response caching

### Performance Metrics
- **First Contentful Paint** < 1.5s
- **Largest Contentful Paint** < 2.5s
- **Cumulative Layout Shift** < 0.1
- **First Input Delay** < 100ms

## 🔒 Security

### API Security
- Environment variables for sensitive data
- API key rotation support
- Rate limiting awareness
- HTTPS enforcement

### Content Security
- XSS protection
- Content Security Policy headers
- Secure cookie handling
- Input sanitization

## 🌍 Browser Support

### Supported Browsers
- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+
- **Mobile Safari** iOS 14+
- **Chrome Mobile** Android 90+

### Progressive Enhancement
- Core functionality works without JavaScript
- Graceful degradation for older browsers
- Feature detection over browser detection

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- **ESLint** configuration enforced
- **Prettier** for code formatting
- **Conventional Commits** for commit messages
- **Component documentation** required
- **Test coverage** minimum 80%

### Commit Convention
```
feat: add new weather map integration
fix: resolve temperature conversion bug
docs: update API documentation
style: improve responsive design for mobile
refactor: optimize API service layer
test: add unit tests for weather components
```

## 📋 Roadmap

### Version 2.0 (Planned)
- [ ] **Weather Alerts** - Severe weather notifications
- [ ] **Historical Data** - Weather history charts
- [ ] **Favorites** - Save multiple locations
- [ ] **Widgets** - Customizable dashboard widgets
- [ ] **Offline Mode** - PWA with offline functionality

### Version 2.1 (Future)
- [ ] **Weather Radar** - Animated precipitation maps
- [ ] **Air Quality** - AQI monitoring
- [ ] **Weather Comparison** - Side-by-side location comparison
- [ ] **Export Data** - CSV/JSON weather data export
- [ ] **API Rate Limiting** - Smart caching and batching

## 📊 Analytics & Monitoring

### Performance Monitoring
- **Core Web Vitals** tracking
- **Error boundary** implementation
- **API response time** monitoring
- **User interaction** analytics

### Usage Analytics
- **Page views** and **session duration**
- **Feature usage** patterns
- **Device and browser** statistics
- **Geographic usage** distribution

## 🐛 Known Issues

### Current Limitations
- **API Rate Limits** - 1000 calls/day on free tier
- **Geocoding Accuracy** - Depends on OpenWeatherMap data
- **Historical Data** - Limited to current conditions
- **Offline Support** - Not yet implemented

### Bug Reports
Please report bugs via [GitHub Issues](https://github.com/gokhankkaraduman/weather-app/issues) with:
- Browser and version
- Device type and OS
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Gökhan Karaduman**
- **GitHub**: [@gokhankkaraduman](https://github.com/gokhankkaraduman)
- **LinkedIn**: [Gökhan Karaduman](https://www.linkedin.com/in/gökhan-karaduman-419198320)
- **Email**: [Contact via GitHub](https://github.com/gokhankkaraduman)

## 🙏 Acknowledgments

### APIs & Services
- **OpenWeatherMap** - Weather data provider
- **React Icons** - Beautiful icon library
- **Vite** - Lightning-fast build tool

### Design Inspiration
- **Glassmorphism** design trend
- **Material Design** principles
- **Apple Weather** app UX patterns

### Open Source Libraries
- **React** - UI library
- **CSS Modules** - Scoped styling
- **Formik** - Form handling
- **ESLint & Prettier** - Code quality

---

<div align="center">
  <p>Made with ❤️ by <strong>Gökhan Karaduman</strong></p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>