import  { createProxyMiddleware }  from 'http-proxy-middleware';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
module.exports = function(app:any) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.example.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
      logger: console,
    })
  );
};
