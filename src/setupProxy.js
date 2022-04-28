const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.warn("starting router...");

  app.use(function (req, res, next) {
    console.warn("HTTP", req.method, "ON", req.url);
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
};
