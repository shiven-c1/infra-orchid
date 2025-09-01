// Database configuration for future implementation
// Currently using in-memory storage, but ready for MongoDB/PostgreSQL

const config = {
  // In-memory storage (current implementation)
  memory: {
    enabled: true,
    // Data will be lost on server restart
  },
  
  // MongoDB configuration (for future use)
  mongodb: {
    enabled: false,
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/orchid-haven',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  
  // PostgreSQL configuration (for future use)
  postgresql: {
    enabled: false,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'orchid_haven',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};

module.exports = config;
