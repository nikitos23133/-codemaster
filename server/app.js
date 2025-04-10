const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const validator = require('validator');

const app = express();

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100 // лимит запросов
}));

// Модель пользователя (server/models/User.js)
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Invalid email']
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  progress: { type: Map, of: Number }, // { courseId: percentage }
  resetToken: String,
  resetExpires: Date
});

// Шифрование пароля
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Роут аутентификации (server/routes/auth.js)
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Роут платежей (server/routes/payments.js)
app.post('/api/payment', async (req, res) => {
  const { amount, currency, token } = req.body;
  
  try {
    const charge = await stripe.charges.create({
      amount,
      currency,
      source: token.id,
      description: 'Платеж за курс'
    });

    // Сохранение данных о платеже
    const payment = new Payment({
      user: req.userId,
      amount,
      course: req.body.courseId
    });
    await payment.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Админ панель (server/routes/admin.js)
app.get('/api/admin/users', checkRole('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Middleware проверки JWT
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Auth failed' });
  }
};

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
