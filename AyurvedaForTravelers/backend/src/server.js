require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const hpp = require('hpp');

const connectDB = require('./config/database');
const logger = require('./config/logger');

// Import routes
const authRoutes = require('./routes/auth');
const treatmentRoutes = require('./routes/treatments');
const packageRoutes = require('./routes/packages');
const therapistRoutes = require('./routes/therapists');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');
const contentRoutes = require('./routes/content');

const app = express();

// Set timezone to Sri Lanka
process.env.TZ = 'Asia/Colombo';

// Connect to MongoDB
connectDB();

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 auth requests per windowMs
  message: {
    error: 'Too many authentication attempts, please try again later.',
  },
});

app.use('/api/v1/auth', authLimiter);

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:80'
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use((req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    });
  }
  next();
});

// Prevent parameter pollution
app.use(hpp());

// HTTP request logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    timezone: 'Asia/Colombo',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    service: 'AyurvedaForTravelers API'
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/treatments', treatmentRoutes);
app.use('/api/v1/packages', packageRoutes);
app.use('/api/v1/therapists', therapistRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/content', contentRoutes);

// API info endpoint
app.get('/api/v1', (req, res) => {
  res.json({
    message: 'Welcome to AyurvedaForTravelers API',
    version: '1.0.0',
    documentation: '/api/v1/docs',
    timezone: 'Asia/Colombo',
    timestamp: new Date().toISOString(),
    features: [
      'Authentication & Authorization',
      'Treatment Management',
      'Package Management', 
      'Therapist Management',
      'Booking System',
      'Payment Processing',
      'Content Management (Blog/FAQ/Testimonials)'
    ]
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: `Route ${req.originalUrl} not found`,
      statusCode: 404,
      timestamp: new Date().toISOString()
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Global error handler:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  });
});

const PORT = process.env.PORT || 4000;

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🌿 AyurvedaForTravelers Backend running on port ${PORT}`);
  logger.info(`📍 Environment: ${process.env.NODE_ENV}`);
  logger.info(`🌍 Timezone: ${process.env.TZ}`);
  logger.info(`⏰ Server time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Colombo' })}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logger.info('Process terminated');
  });
});

module.exports = server;
