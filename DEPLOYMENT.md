# 🚀 Vercel Deployment Guide

This guide will help you deploy the Weather App to Vercel with proper configuration and environment variables.

## 📋 Prerequisites

- [Vercel Account](https://vercel.com/signup)
- [OpenWeatherMap API Key](https://openweathermap.org/api)
- Git repository (GitHub, GitLab, or Bitbucket)

## 🎯 Quick Deploy

### Option 1: Deploy Button (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/gokhankkaraduman/weather-app&env=VITE_OPENWEATHER_API_KEY&envDescription=OpenWeatherMap%20API%20key%20for%20weather%20data&envLink=https://openweathermap.org/api)

### Option 2: Manual Deployment

1. **Fork/Clone the repository**
   ```bash
   git clone https://github.com/gokhankkaraduman/weather-app.git
   cd weather-app
   ```

2. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

3. **Login to Vercel**
   ```bash
   vercel login
   ```

4. **Deploy**
   ```bash
   vercel --prod
   ```

## ⚙️ Configuration Files

### `vercel.json`
```json
{
  "name": "weather-app",
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### Key Configuration Options:
- **Framework**: `vite` - Optimized for Vite builds
- **Build Command**: `npm run build` - Production build
- **Output Directory**: `dist` - Vite build output
- **Regions**: `iad1` - US East (Virginia) for optimal performance

## 🔐 Environment Variables

### Required Variables

1. **Go to Vercel Dashboard** → Your Project → Settings → Environment Variables

2. **Add the following variables:**

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `VITE_OPENWEATHER_API_KEY` | Your OpenWeatherMap API key | Production, Preview, Development |

### Getting OpenWeatherMap API Key

1. **Sign up** at [OpenWeatherMap](https://openweathermap.org/api)
2. **Navigate** to API Keys section
3. **Generate** a new API key
4. **Copy** the key for Vercel environment variables

### Optional Variables

| Variable Name | Default Value | Description |
|---------------|---------------|-------------|
| `VITE_DEFAULT_LAT` | `41.0082` | Default latitude (Istanbul) |
| `VITE_DEFAULT_LON` | `28.9784` | Default longitude (Istanbul) |
| `VITE_DEV_MODE` | `false` | Enable development features |

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Go to** Project Settings → Domains
2. **Add** your custom domain
3. **Configure** DNS records:
   ```
   Type: CNAME
   Name: @ (or subdomain)
   Value: cname.vercel-dns.com
   ```
4. **Wait** for DNS propagation (up to 24 hours)

### SSL Certificate
- **Automatic**: Vercel provides free SSL certificates
- **Custom**: Upload your own SSL certificate if needed

## 🔧 Build Configuration

### Build Settings
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "nodeVersion": "18.x"
}
```

### Build Optimization
- **Tree Shaking**: Enabled by default
- **Code Splitting**: Automatic route-based splitting
- **Asset Optimization**: Images and CSS minification
- **Compression**: Gzip and Brotli compression

## 🚀 Deployment Process

### Automatic Deployment
1. **Push** to main/master branch
2. **Vercel** automatically builds and deploys
3. **Preview** deployments for pull requests
4. **Production** deployment on merge

### Manual Deployment
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# Deploy with environment variables
vercel --prod -e VITE_OPENWEATHER_API_KEY=your_api_key
```

## 📊 Performance Optimization

### Vercel Analytics
1. **Enable** Analytics in project settings
2. **Monitor** Core Web Vitals
3. **Track** user interactions
4. **Optimize** based on metrics

### Edge Functions (Future)
```javascript
// api/weather.js
export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  
  // Cached weather data at edge
  return new Response(JSON.stringify(weatherData), {
    headers: { 'content-type': 'application/json' },
  });
}
```

## 🔒 Security Configuration

### Headers Configuration
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; connect-src 'self' https://api.openweathermap.org;"
        }
      ]
    }
  ]
}
```

### API Security
- **CORS**: Configured for OpenWeatherMap API
- **Rate Limiting**: Handled by OpenWeatherMap
- **API Key**: Secured in environment variables

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for missing dependencies
npm audit fix
```

#### Environment Variables Not Working
1. **Check** variable names (case-sensitive)
2. **Verify** VITE_ prefix for client-side variables
3. **Redeploy** after adding variables
4. **Check** build logs for errors

#### API Calls Failing
1. **Verify** API key is valid
2. **Check** API quota limits
3. **Review** network requests in browser dev tools
4. **Test** API endpoints manually

### Debug Commands
```bash
# Check deployment logs
vercel logs your-deployment-url

# Test build locally
npm run build
npm run preview

# Verify environment variables
vercel env ls
```

## 📈 Monitoring & Analytics

### Vercel Analytics
- **Real User Monitoring**: Core Web Vitals
- **Performance Insights**: Load times and interactions
- **Error Tracking**: Runtime and build errors
- **Traffic Analysis**: Page views and user behavior

### Custom Analytics
```javascript
// Add to your React components
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <YourApp />
      <Analytics />
    </>
  );
}
```

## 🔄 CI/CD Pipeline

### GitHub Integration
1. **Connect** GitHub repository
2. **Auto-deploy** on push to main
3. **Preview** deployments for PRs
4. **Environment** promotion workflow

### Deployment Hooks
```bash
# Pre-build hook
npm run lint

# Post-build hook
npm run test

# Deployment success webhook
curl -X POST your-webhook-url
```

## 💡 Best Practices

### Performance
- **Enable** compression in Vercel settings
- **Optimize** images with Vercel Image Optimization
- **Use** Edge Functions for API routes
- **Implement** proper caching strategies

### Security
- **Rotate** API keys regularly
- **Monitor** usage and quotas
- **Enable** DDoS protection
- **Use** HTTPS everywhere

### Monitoring
- **Set up** alerts for downtime
- **Monitor** API response times
- **Track** error rates
- **Review** performance metrics regularly

## 🆘 Support

### Getting Help
- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Community Forum**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Discord**: [vercel.com/discord](https://vercel.com/discord)
- **Twitter**: [@vercel](https://twitter.com/vercel)

### Project Support
- **GitHub Issues**: [Report bugs](https://github.com/gokhankkaraduman/weather-app/issues)
- **Discussions**: [Feature requests](https://github.com/gokhankkaraduman/weather-app/discussions)

---

<div align="center">
  <p>🚀 <strong>Happy Deploying!</strong> 🚀</p>
  <p>Made with ❤️ by <strong>Gökhan Karaduman</strong></p>
</div>
