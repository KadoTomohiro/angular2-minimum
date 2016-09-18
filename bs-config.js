const proxy = require('http-proxy-middleware');

var apiProxy = proxy('/app', {
  target: 'http://localhost:8001',
  changeOrigin: true   // for vhosted sites
});

module.exports = {
  "port": 8000,
  "files": ["./**/*.{html,htm,css,js}"],
  "server": {
    middleware: {
      0: require('connect-history-api-fallback')({
        index: '/index.html'
      }),
      1: apiProxy
    },
    "baseDir": [
      "./src/",
      "./bin/"
    ],
    "routes": {
      "/node_modules": "node_modules"
    }
  }
};