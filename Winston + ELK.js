// logger.js
const winston = require('winston');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const esTransport = new ElasticsearchTransport({
  level: 'info',
  clientOpts: { node: 'http://elasticsearch:9200' }
});

const logger = winston.createLogger({
  transports: [new winston.transports.Console(), esTransport]
});

// Использование
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
