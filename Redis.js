// server/utils/cache.js
const redis = require('redis');
const client = redis.createClient();

const cache = (req, res, next) => {
  const key = req.originalUrl;
  client.get(key, (err, data) => {
    if (data) {
      res.send(JSON.parse(data));
    } else {
      res.originalSend = res.send;
      res.send = (body) => {
        client.setex(key, 3600, body);
        res.originalSend(body);
      };
      next();
    }
  });
};

module.exports = cache;

// Использование в роуте
app.get('/api/courses', cache, async (req, res) => {
  // Логика получения курсов
});
