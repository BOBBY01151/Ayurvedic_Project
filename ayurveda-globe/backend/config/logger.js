const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Simple logger implementation
// TODO: Replace with pino or winston for production
class Logger {
  constructor() {
    this.logFile = path.join(logsDir, 'app.log');
    this.errorFile = path.join(logsDir, 'error.log');
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });

    const logEntry = {
      timestamp,
      level: level.toUpperCase(),
      message: typeof message === 'object' ? JSON.stringify(message) : message,
      ...meta
    };

    return JSON.stringify(logEntry);
  }

  writeToFile(filename, content) {
    try {
      fs.appendFileSync(filename, content + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  log(level, message, meta = {}) {
    const formattedMessage = this.formatMessage(level, message, meta);
    
    // Console output with colors in development
    if (process.env.NODE_ENV !== 'production') {
      const colors = {
        info: '\x1b[36m',    // Cyan
        warn: '\x1b[33m',    // Yellow
        error: '\x1b[31m',   // Red
        debug: '\x1b[35m',   // Magenta
        reset: '\x1b[0m'     // Reset
      };

      const color = colors[level] || colors.reset;
      console.log(`${color}[${level.toUpperCase()}]${colors.reset} ${message}`);
      
      if (Object.keys(meta).length > 0) {
        console.log(`${color}Meta:${colors.reset}`, meta);
      }
    }

    // Write to log files
    this.writeToFile(this.logFile, formattedMessage);
    
    if (level === 'error') {
      this.writeToFile(this.errorFile, formattedMessage);
    }
  }

  info(message, meta = {}) {
    this.log('info', message, meta);
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  error(message, meta = {}) {
    this.log('error', message, meta);
  }

  debug(message, meta = {}) {
    if (process.env.NODE_ENV === 'development') {
      this.log('debug', message, meta);
    }
  }
}

module.exports = new Logger();
