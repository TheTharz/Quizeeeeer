const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const quizRoutes = require('./routes/quizRoutes');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const { ensureAuth } = require('./middlewares/authMiddleware');
const attemptRoutes = require('./routes/attemptRoutes.js');
const statRoutes = require('./routes/statRoutes.js');

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// // Express session
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
//   })
// );

// // Passport middleware for authentication
// app.use(passport.initialize());
// app.use(passport.session());
// require('./config/passport')(passport); // Passport config

// Routes
app.use('/api/quizzes', quizRoutes); // Quiz routes
app.use('/api/questions', questionRoutes); // Question routes
app.use('/api/users', userRoutes); // User management routes
app.use('/api/attempts', attemptRoutes); // Attempt related routes
app.use('/api/stats', statRoutes); // Stat management routes

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Quiz App API');
});

// 404 Route
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
