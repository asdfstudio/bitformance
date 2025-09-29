# Bitformance 📊

> Comprehensive cryptocurrency showcase and analytics platform - Real-time market data and insights

[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.2-38bdf8.svg)](https://tailwindcss.com/)
[![Chart.js](https://img.shields.io/badge/Chart.js-3.9-ff6384.svg)](https://www.chartjs.org/)
[![Commercial](https://img.shields.io/badge/License-Commercial-orange.svg)](LICENSE)
[![Live](https://img.shields.io/badge/Live-bitformance.com-success.svg)](https://bitformance.com/)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Build & Deployment](#build--deployment)
- [Performance](#performance)
- [Team](#team)
- [License](#license)

## 🎯 About

**Bitformance** is a cutting-edge cryptocurrency showcase platform that provides real-time market data, analytics, and insights for digital assets. Built with React and modern web technologies, it delivers a fast, responsive, and intuitive user experience for tracking cryptocurrency performance and market trends.

Visit the live platform at **[bitformance.com](https://bitformance.com/)**

Developed by **Airly Studio**, Bitformance serves as a comprehensive resource for cryptocurrency enthusiasts, traders, and investors.

## ✨ Features

- **Real-time Market Data**: Live cryptocurrency prices and market updates
- **Interactive Charts**: Dynamic price charts with Chart.js and Recharts
- **Performance Analytics**: Comprehensive crypto performance metrics
- **Market Insights**: Detailed analysis and market trends
- **Responsive Design**: Mobile-first, optimized for all devices
- **Social Media Integration**: Twitter and social media embeds
- **Cookie Consent**: GDPR-compliant cookie management
- **reCAPTCHA Protection**: Bot prevention and security
- **Data Visualization**: Advanced charting and data representation
- **Toast Notifications**: Real-time user feedback
- **SWR Integration**: Efficient data fetching and caching
- **Fast Performance**: Optimized loading and rendering

## 🛠️ Tech Stack

### Core
- **Framework**: [React](https://reactjs.org/) 18.2
- **Build Tool**: [Create React App](https://create-react-app.dev/) 5.0.1
- **Language**: JavaScript (ES6+)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3.2

### UI & Visualization
- **Charts**: [Chart.js](https://www.chartjs.org/) 3.9.1, [react-chartjs-2](https://react-chartjs-2.js.org/) 4.3.1
- **Data Visualization**: [Recharts](https://recharts.org/) 2.6.2
- **Icons**: [Font Awesome](https://fontawesome.com/) 6.2.0 (Free & Brand icons)

### Libraries & Utilities
- **Routing**: [React Router DOM](https://reactrouter.com/) 6.4.3
- **Data Fetching**: [SWR](https://swr.vercel.app/) 1.3.0
- **Date Handling**: [Moment.js](https://momentjs.com/) 2.29.4
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/) 9.1.1
- **Cookie Consent**: [React Cookie Consent](https://www.npmjs.com/package/react-cookie-consent) 8.0.1
- **reCAPTCHA**: [React Google reCAPTCHA](https://www.npmjs.com/package/react-google-recaptcha) 2.1.0
- **Social Embeds**: React Social Media Embed, React Twitter Embed

### Development
- **CSS Processing**: [PostCSS](https://postcss.org/) 8.4.18, [Autoprefixer](https://github.com/postcss/autoprefixer) 10.4.13
- **Testing**: Jest, React Testing Library
- **Performance**: [Web Vitals](https://web.dev/vitals/) 2.1.4

## 📋 Prerequisites

Before getting started, ensure you have:

- **Node.js**: Version 16.0 or higher ([Download](https://nodejs.org/))
- **npm**: Version 8.0 or higher (comes with Node.js)
- **Git**: Latest version ([Download](https://git-scm.com/))

Optional:
- **VS Code**: Recommended code editor
- **React Developer Tools**: Browser extension for debugging

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Airly-Studio/bitformance-frontend-v2.git
   cd bitformance-frontend-v2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure required API keys and environment variables.

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏃 Running the Application

### Development Mode

```bash
# Start development server
npm start

# Access at http://localhost:3000
```

The app will automatically reload when you make changes to the code.

### Production Build

```bash
# Create optimized production build
npm run build

# Serve production build locally (requires serve package)
npx serve -s build
```

## 🏗️ Project Structure

```
├── public/                    # Static files
│   ├── index.html            # HTML template
│   ├── favicon.ico           # Favicon
│   └── assets/               # Public assets
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Common components
│   │   ├── charts/          # Chart components
│   │   ├── layout/          # Layout components
│   │   └── crypto/          # Crypto-specific components
│   ├── pages/               # Page components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Utility functions
│   ├── services/            # API services
│   ├── styles/              # Global styles
│   ├── App.js               # Main App component
│   └── index.js             # Application entry point
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── README.md
```

## 🛠️ Available Scripts

```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
npm run eject          # Eject from Create React App (irreversible)
```

### Additional Commands

```bash
# Install dependencies
npm install

# Update dependencies
npm update

# Check for outdated packages
npm outdated

# Audit for security vulnerabilities
npm audit

# Fix security vulnerabilities
npm audit fix
```

## 🚀 Build & Deployment

### Production Build

```bash
# Create optimized production build
npm run build
```

This creates a `build` folder with optimized static files ready for deployment.

### Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Netlify
```bash
# Build command
npm run build

# Publish directory
build
```

#### Traditional Hosting
Upload the contents of the `build` folder to your web server.

### Environment Variables

Required environment variables for production:
- API endpoints
- reCAPTCHA site key
- Analytics IDs
- Social media API keys

### Build Optimization

The production build includes:
- Minified JavaScript and CSS
- Optimized images and assets
- Code splitting for faster loading
- Tree shaking for smaller bundle size
- Source maps for debugging

## ⚡ Performance

### Optimization Features

- **Code Splitting**: Automatic route-based code splitting
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized image loading
- **Caching**: SWR for efficient data caching
- **Minification**: Optimized bundle size
- **Tree Shaking**: Removes unused code
- **Web Vitals**: Performance monitoring

### Performance Metrics

Target metrics:
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1

### Browser Support

Production build supports:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎨 Styling

### Tailwind CSS

The application uses Tailwind CSS for styling with custom configurations:

- **Responsive Design**: Mobile-first approach
- **Custom Theme**: Brand colors and typography
- **Utility Classes**: Efficient styling workflow
- **Dark Mode**: Support for dark theme (if implemented)

### Custom Styles

Additional styles can be found in:
- `src/styles/` - Global CSS files
- Component-level styles using Tailwind classes

## 🔐 Security

### Security Features

- **reCAPTCHA**: Bot protection on forms
- **Cookie Consent**: GDPR compliance
- **Content Security Policy**: XSS prevention
- **HTTPS**: Secure data transmission
- **Input Validation**: Client-side validation
- **Dependency Auditing**: Regular security checks

### Best Practices

1. Keep dependencies up to date
2. Use environment variables for sensitive data
3. Enable HTTPS in production
4. Implement proper error boundaries
5. Regular security audits
6. Monitor for vulnerabilities

## 📊 Analytics & Monitoring

### Web Vitals

Built-in Web Vitals monitoring tracks:
- Core Web Vitals (LCP, FID, CLS)
- First Contentful Paint
- Time to First Byte
- Performance metrics

### Error Tracking

Implement error boundaries and monitoring for production stability.

## 🧪 Testing

### Running Tests

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Structure

Tests are located alongside components:
- Unit tests for components
- Integration tests for features
- Utility function tests

## 🌐 Browser Compatibility

### Production
- Modern browsers (>0.2% market share)
- Excludes dead browsers and Opera Mini

### Development
- Latest Chrome
- Latest Firefox
- Latest Safari

## 📄 License

This project is proprietary software owned by **Airly Studio**. All rights reserved.

**© 2025 Airly Studio.**

This software and its documentation are proprietary to Airly Studio and are protected by copyright law. Unauthorized copying, distribution, or modification is strictly prohibited.

## 👥 Team

**Developed by Airly Studio**

- **[Taraqul Islam Rony](https://github.com/TIRony)** - *Full Stack Engineer*

## 🙏 Acknowledgments

- React team for the excellent framework
- Tailwind CSS for utility-first CSS
- Chart.js and Recharts for data visualization
- Create React App for build tooling
- Open source community for libraries
- Cryptocurrency data providers

## 📞 Support & Contact

- **Website**: [bitformance.com](https://bitformance.com/)
- **Company**: [Airly Studio](https://airlystudio.com)
- **Email**: hello@airlystudio.com

For platform support, feature requests, or technical assistance, contact our development team.

---

⭐ **Empowering Crypto Insights | Built with precision by Airly Studio**
