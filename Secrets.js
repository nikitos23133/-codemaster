// server/utils/secrets.js
const AWS = require('aws-sdk');
const client = new AWS.SecretsManager();

async function getSecret(secretName) {
  const data = await client.getSecretValue({ SecretId: secretName }).promise();
  return JSON.parse(data.SecretString);
}

// Использование в конфигурации
const dbSecret = await getSecret('prod/db/credentials');
mongoose.connect(`mongodb://${dbSecret.user}:${dbSecret.password}@db-host`);
