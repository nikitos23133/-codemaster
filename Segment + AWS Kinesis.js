// server/middleware/analytics.js
const Analytics = require('analytics-node');
const analytics = new Analytics('YOUR_WRITE_KEY');

module.exports = (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    analytics.track({
      userId: req.user?.id,
      event: 'API Request',
      properties: {
        path: req.path,
        duration: Date.now() - start,
        statusCode: res.statusCode
      }
    });
  });
  
  next();
};
