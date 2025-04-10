// Взаимодействие с API
async function loginUser(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) throw new Error('Auth failed');
  return response.json();
}

// Обновленный метод записи на курс
async function enroll(courseId) {
  const response = await fetch('/api/payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      courseId,
      token: stripeToken // Получается через Stripe.js
    })
  });
  
  if (!response.ok) throw new Error('Payment failed');
  showCertificate();
}
