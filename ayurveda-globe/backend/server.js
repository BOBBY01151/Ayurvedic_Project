require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./config/logger');

// Connect to MongoDB
connectDB();

// Set timezone to Sri Lanka
process.env.TZ = 'Asia/Colombo';

const PORT = process.env.PORT || 4000;

// Start server
const server = app.listen(PORT, () => {
  logger.info(`🚀 Ayurveda Globe Backend running on port ${PORT}`);
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
