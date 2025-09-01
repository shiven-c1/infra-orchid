const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Custom token for request ID
morgan.token('id', (req) => req.id);

// Custom token for response time
morgan.token('response-time', (req, res) => {
  if (!res._header || !req._startAt) return '';
  const diff = process.hrtime(req._startAt);
  const ms = diff[0] * 1e3 + diff[1] * 1e-6;
  return ms.toFixed(3);
});

// Custom format for detailed logging
const detailedFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms';

// Create write streams for different log types
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

const errorLogStream = fs.createWriteStream(
  path.join(logsDir, 'error.log'),
  { flags: 'a' }
);

// Logger configuration
const logger = {
  // Access logging (all requests)
  access: morgan(detailedFormat, {
    stream: accessLogStream,
    skip: (req, res) => res.statusCode < 400
  }),

  // Error logging (only errors)
  error: morgan(detailedFormat, {
    stream: errorLogStream,
    skip: (req, res) => res.statusCode < 400
  }),

  // Console logging for development
  console: morgan('combined'),

  // Custom logging functions
  info: (message, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message,
      data
    };
    console.log(JSON.stringify(logEntry));
  },

  error: (message, error = null, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message,
      error: error ? error.stack : null,
      data
    };
    console.error(JSON.stringify(logEntry));
  },

  warn: (message, data = {}) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'WARN',
      message,
      data
    };
    console.warn(JSON.stringify(logEntry));
  },

  // API request logging
  apiRequest: (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logData = {
        method: req.method,
        url: req.url,
        status: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip || req.connection.remoteAddress
      };

      if (res.statusCode >= 400) {
        logger.error(`API Request Failed`, null, logData);
      } else {
        logger.info(`API Request`, logData);
      }
    });

    next();
  }
};

module.exports = logger;
