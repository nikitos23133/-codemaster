// server/utils/circuitBreaker.js
const { CircuitBreaker } = require('opossum');

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};

const protectedService = new CircuitBreaker(async (url) => {
  const response = await fetch(url);
  return response.json();
}, options);

// Использование
app.get('/api/external', async (req, res) => {
  try {
    const data = await protectedService.fire('https://external.service');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Service unavailable' });
  }
});
