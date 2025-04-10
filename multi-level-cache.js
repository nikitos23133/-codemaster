// server/middleware/cache.js
const redis = require('redis');
const NodeCache = require('node-cache');

const localCache = new NodeCache({ stdTTL: 60 });
const redisClient = redis.createClient(process.env.REDIS_URL);

module.exports = async (req, res, next) => {
  const key = req.originalUrl;
  
  // Check local cache
  const localData = localCache.get(key);
  if (localData) {
    return res.json(localData);
  }

  // Check Redis
  const redisData = await redisClient.get(key);
  if (redisData) {
    localCache.set(key, redisData);
    return res.json(JSON.parse(redisData));
  }

  // Proceed to database
  const originalSend = res.send;
  res.send = (body) => {
    redisClient.setex(key, 3600, body);
    localCache.set(key, body);
    originalSend.call(res, body);
  };
  
  next();
};
