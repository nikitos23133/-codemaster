// services/notifications/service.js
const amqp = require('amqplib');

async function start() {
  const conn = await amqp.connect('amqp://localhost');
  const channel = await conn.createChannel();
  
  channel.consume('notifications', (msg) => {
    const content = JSON.parse(msg.content.toString());
    sendEmail(content.email, content.message);
    channel.ack(msg);
  });
}

function sendEmail(email, message) {
  // Логика отправки email
}
