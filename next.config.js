const withCSS = require('@zeit/next-css');
const optimizedImages = require('next-optimized-images');

// Configuración de servidor de pruebas

let nextConfig = {
  target: 'serverless',
  env: {
    BACKEND_URL: 'http://localhost:3001/',
    ENV_NAME: process.env.NODE_ENV,
    //BACKEND_URL: process.env.BACKEND_URL,
  },
};

if (process.env.NODE_ENV === 'production') {
  nextConfig.env.BACKEND_URL = 'https://webdevapi.herokuapp.com/';
}

// Configuración de servidor de producción
// let nextConfig = { env: { BACKEND_URL } };

module.exports = optimizedImages(withCSS(nextConfig));
