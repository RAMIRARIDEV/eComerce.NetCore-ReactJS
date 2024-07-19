const createProxyMiddleware = require('http-proxy-middleware');
const { env } = require('process');

const target = 'http://localhost:5145';
//const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
//    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:5145';

const context =  [
  "/api/categories/getall",
  "/api/users/getall",
  "/api/products/getall"//,
  //"/api/venta",
  //"/api/utilidad",
  //"/api/session"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    target: target,
    secure: false
  });

  app.use(appProxy);
};
