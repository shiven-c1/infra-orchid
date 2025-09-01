require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

// Import production modules
const securityMiddleware = require('./middleware/security');
const validationMiddleware = require('./middleware/validation');
const logger = require('./utils/logger');
const dbConfig = require('./config/database');

const app = express();

// Trust proxy for rate limiting
app.set('trust proxy', 1);

// Security middleware
app.use(securityMiddleware.helmet);
app.use(securityMiddleware.compression);

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || 'https://yourdomain.com']
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(logger.access);
  app.use(logger.error);
} else {
  app.use(logger.console);
}

app.use(logger.apiRequest);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads', { recursive: true });
}

// File upload configuration with enhanced security
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, safeName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Max 5 files per request
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    
    // Check file extension
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return cb(new Error('Invalid file extension!'), false);
    }
    
    cb(null, true);
  }
});

// In-memory data storage (replace with database in production)
let users = [
  {
    id: 1,
    username: 'orchid992',
    password: '$2a$12$mOc2pVx/fwRQ3fJ61zT/Ge7HA/HtA089vSR6OdQch.RWBL4qMOTKe', // orchid992
    role: 'admin'
  }
];

// Import your existing data arrays here
let properties = [
  {
    id: 1,
    title: "ORCHID INFINITY",
    location: "50, Hill Road, Shivaji Nagar, Nagpur-440010(MS)",
    price: "₹195.58 Lakhs Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/infinity.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/infinity2.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/infinity3.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/infinitynew.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/infinitynew2.png"
    ],
    customInfo: ["4 BHK", "1450 sq.ft."],
    type: "Apartment",
    filterCategory: "4BHK",
    isActive: true
  },
  {
    id: 2,
    title: "ORCHID GOKUL",
    location: "Beside Little Jewels School, Khare Town, Dharampeth, Nagpur – 440010",
    price: "₹170 Lakhs Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/gokul1.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/gokul2.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/gokul3.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/GOKULnew.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/GOKULnew2.png"
    ],
    customInfo: ["4 BHK", "1750 sq.ft."],
    type: "Apartment",
    filterCategory: "4BHK",
    isActive: true
  },
  {
    id: 3,
    title: "ORCHID IMPERIA",
    location: "58, State Bank Colony, North Ambazari Road, Dharampeth (West), Nagpur – 440010",
    price: "₹129.37 Lakhs Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/imperia1.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/imperia2.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/impeira3.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/IMPERIAnew.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/IMPERIAnew1.png"
    ],
    customInfo: ["3 BHK", "1725 sq.ft."],
    type: "Apartment",
    filterCategory: "3BHK",
    isActive: true
  },
  {
    id: 4,
    title: "ORCHID POORVA",
    location: "G-5, Scientific Co-op Housing Society, Behind Hotel Ashok, Laxmi Nagar, Nagpur – 440022",
    price: "₹2.55 Cr. Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/poorva1.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/poorva2.png"
    ],
    customInfo: ["4 BHK", "2550 sq.ft."],
    type: "Apartment",
    filterCategory: "3BHK",
    isActive: true
  },
  {
    id: 5,
    title: "ORCHID SHIVNERI",
    location: "69, Hingna Rd, Hingna Naka, Nagpur, Maharashtra 440036",
    price: "₹1.48 Cr. Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/shivnri.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/shivnari2.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/shivnari3.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/shivnerinew.png"
    ],
    customInfo: [
      "3 BHK",
      "1847 sq.ft.",
      "1607 sq.ft.",
      "1510 sq.ft."
    ],
    type: "Apartment",
    filterCategory: "3BHK",
    isActive: true
  },
  {
    id: 6,
    title: "ORCHID SUNSHINE",
    location: "2, Haribhau Satpute Layout, Opposite Apollo Pharmacy, Main Road, Manish Nagar, Nagpur – 440015",
    price: "₹80.00 Lakhs Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/sunshine.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/sunshine2.png"
    ],
    customInfo: [
      "3 BHK",
      "1548.28 sq. ft."
    ],
    type: "Apartment",
    filterCategory: "Ready Possession",
    isActive: true
  },
  {
    id: 7,
    title: "ORCHID Meadows",
    location: "Behind Jhanda Chowk, Abhayankar Nagar, Nagpur – 440010 (MS)",
    price: "₹162.45 Lakhs Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/Orchid-Meadows.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/new2.png"
    ],
    customInfo: [
      "3 BHK",
      "9500 x 1710 sq ft"
    ],
    amenities: [
      "CCTV surveillance",
      "EV charging",
      "Pop up in all room",
      "Modular kitchen",
      "Vastu complaint",
      "Everything is nearby: malls, hospital, prime location",
      "Terrace garden",
      "Video door phone",
      "Senior citizen sit"
    ],
    type: "Apartment",
    filterCategory: "3BHK",
    isActive: true
  },
  {
    id: 8,
    title: "ORCHID MADHUDATTA",
    location: "12-B, Tilak Nagar, Near Basketball Ground, Nagpur – 440008",
    price: "₹161.36 Lakhs Onwards",
    images: [
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/MADHUDATTA.jpeg",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/MADHUDATTA2.png",
      "https://raw.githubusercontent.com/shiven-c1/orchid-imaages/main/MADHUDATTA3.png"
    ],
    customInfo: ["3 BHK", "1655 sq. ft."],
    type: "Apartment",
    filterCategory: "3BHK",
    isActive: true
  }
];

let jobs = [
  {
    id: 1,
    title: "Sales Executive",
    summary: "Drive property sales through effective client engagement and market knowledge.",
    details: [
      "Generate leads and convert them into sales",
      "Conduct property site visits with potential clients",
      "Maintain client relationships and follow-ups",
      "Achieve monthly and quarterly sales targets"
    ],
    responsibilities: [
      "Generate leads and convert them into sales",
      "Conduct property site visits with potential clients",
      "Maintain client relationships and follow-ups",
      "Achieve monthly and quarterly sales targets",
      "Prepare and present property proposals"
    ],
    requirements: [
      "Graduate in any discipline",
      "2-3 years experience in real estate sales",
      "Excellent communication and negotiation skills",
      "Knowledge of local real estate market"
    ],
    isHiring: true
  },
  {
    id: 2,
    title: "Marketing Manager",
    summary: "Develop and execute marketing strategies to promote properties and brand awareness.",
    details: [
      "Create and implement marketing campaigns",
      "Manage digital marketing channels and social media",
      "Coordinate with advertising agencies",
      "Track marketing ROI and performance metrics"
    ],
    responsibilities: [
      "Create and implement marketing campaigns",
      "Manage digital marketing channels and social media",
      "Coordinate with advertising agencies",
      "Track marketing ROI and performance metrics",
      "Develop content for brochures and websites"
    ],
    requirements: [
      "MBA in Marketing or related field",
      "3-5 years experience in real estate marketing",
      "Strong digital marketing skills",
      "Creative thinking and analytical abilities"
    ],
    isHiring: true
  },
  {
    id: 3,
    title: "Civil Site Supervisor",
    summary: "To work as a Civil Site Supervisor and ensure smooth, safe, and quality execution of construction projects.",
    details: [
      "Supervise daily site work (brickwork, plaster, concreting, tiling, plumbing, electrical, finishing)",
      "Check that work is done as per drawings and quality standards",
      "Manage and guide labor, contractors, and site staff"
    ],
    responsibilities: [
      "Supervise daily site work (brickwork, plaster, concreting, tiling, plumbing, electrical, finishing)",
      "Check that work is done as per drawings and quality standards",
      "Manage and guide labor, contractors, and site staff",
      "Ensure safety protocols are followed",
      "Prepare daily progress reports"
    ],
    requirements: [
      "Diploma / Degree in Civil Engineering (or equivalent)",
      "Worked on residential / commercial projects as Site Supervisor",
      "Knowledge of civil construction methods",
      "Strong leadership and communication skills"
    ],
    isHiring: true
  },
  {
    id: 4,
    title: "Architect",
    summary: "Design innovative and functional residential and commercial properties.",
    details: [
      "Create architectural designs and blueprints",
      "Work with clients to understand requirements",
      "Ensure designs meet building codes and regulations",
      "Collaborate with construction teams"
    ],
    responsibilities: [
      "Create architectural designs and blueprints",
      "Work with clients to understand requirements",
      "Ensure designs meet building codes and regulations",
      "Collaborate with construction teams",
      "Present design concepts to stakeholders"
    ],
    requirements: [
      "Bachelor's degree in Architecture",
      "3-5 years experience in residential architecture",
      "Proficiency in AutoCAD and design software",
      "Strong creative and technical skills"
    ],
    isHiring: true
  },
  {
    id: 5,
    title: "Customer Service Representative",
    summary: "Provide excellent customer support and handle client inquiries professionally.",
    details: [
      "Handle customer inquiries and complaints",
      "Provide information about properties and services",
      "Maintain customer database and records",
      "Coordinate with other departments for customer needs"
    ],
    responsibilities: [
      "Handle customer inquiries and complaints",
      "Provide information about properties and services",
      "Maintain customer database and records",
      "Coordinate with other departments for customer needs",
      "Follow up with customers for feedback"
    ],
    requirements: [
      "Graduate in any discipline",
      "1-2 years experience in customer service",
      "Excellent communication skills",
      "Patient and empathetic approach"
    ],
    isHiring: true
  },
  {
    id: 6,
    title: "Driver",
    summary: "Drive company vehicles for office and Directors with punctual service.",
    details: [
      "Drive company vehicles for office and Directors",
      "Ensure vehicle cleanliness and timely servicing",
      "Provide punctual pick-up and drop",
      "Follow traffic rules and ensure safety"
    ],
    responsibilities: [
      "Drive company vehicles for office and Directors",
      "Ensure vehicle cleanliness and timely servicing",
      "Provide punctual pick-up and drop",
      "Follow traffic rules and ensure safety",
      "Maintain vehicle log and fuel records"
    ],
    requirements: [
      "Valid driving license",
      "3–5 years driving experience",
      "Good knowledge of Nagpur and nearby routes",
      "Clean driving record"
    ],
    isHiring: true
  },
  {
    id: 7,
    title: "Accounts Executive",
    summary: "Manage financial records and transactions for the company.",
    details: [
      "Maintain accurate financial records",
      "Process invoices and payments",
      "Prepare financial reports and statements",
      "Handle tax compliance and filings"
    ],
    responsibilities: [
      "Maintain accurate financial records",
      "Process invoices and payments",
      "Prepare financial reports and statements",
      "Handle tax compliance and filings",
      "Coordinate with external auditors"
    ],
    requirements: [
      "B.Com or M.Com degree",
      "2-3 years experience in accounting",
      "Knowledge of Tally or similar accounting software",
      "Understanding of tax laws and regulations"
    ],
    isHiring: true
  },
  {
    id: 8,
    title: "Legal Advisor",
    summary: "Provide legal guidance on property transactions and compliance matters.",
    details: [
      "Review and draft property agreements",
      "Ensure compliance with real estate laws",
      "Handle legal documentation and registrations",
      "Provide legal advice to management"
    ],
    responsibilities: [
      "Review and draft property agreements",
      "Ensure compliance with real estate laws",
      "Handle legal documentation and registrations",
      "Provide legal advice to management",
      "Represent company in legal matters"
    ],
    requirements: [
      "LLB degree from recognized university",
      "3-5 years experience in real estate law",
      "Knowledge of property laws and regulations",
      "Strong analytical and communication skills"
    ],
    isHiring: true
  }
];

let executiveTeam = [
  {
    id: 1,
    name: "Mr. Vinod Nalamwar",
    position: "Founder & CEO",
    image: null, // Will store the profile image URL
    bio: "Visionary leader with over 15 years of experience in real estate development"
  },
  {
    id: 2,
    name: "Manjusha Nalamwar",
    position: "Co Director",
    image: null, // Will store the profile image URL
    bio: "Strategic leader driving operational excellence and customer satisfaction"
  },
  {
    id: 3,
    name: "Rushika Nalamwar",
    position: "Co Director",
    image: null, // Will store the profile image URL
    bio: "Innovation-focused director leading project development and quality assurance"
  },
  {
    id: 4,
    name: "Hrushikesh Nalamwar",
    position: "Co Director",
    image: null, // Will store the profile image URL
    bio: "Financial expert managing business growth and strategic partnerships"
  }
];

// JWT Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      message: 'Access token required' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) {
      logger.warn('Invalid JWT token', { token: token.substring(0, 10) + '...' });
      return res.status(403).json({ 
        success: false,
        message: 'Invalid or expired token' 
      });
    }
    req.user = user;
    next();
  });
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API Documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Orchid Haven API',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me'
      },
      properties: {
        list: 'GET /api/properties',
        create: 'POST /api/properties',
        update: 'PUT /api/properties/:id',
        delete: 'DELETE /api/properties/:id'
      },
      jobs: {
        list: 'GET /api/jobs',
        create: 'POST /api/jobs',
        update: 'PUT /api/jobs/:id',
        delete: 'DELETE /api/jobs/:id'
      },
      executive: {
        list: 'GET /api/executive-team',
        create: 'POST /api/executive-team',
        update: 'PUT /api/executive-team/:id',
        delete: 'DELETE /api/executive-team/:id'
      },
      uploads: {
        upload: 'POST /api/upload',
        list: 'GET /api/images',
        delete: 'DELETE /api/images/:filename'
      }
    }
  });
});

// Apply rate limiting to API routes
app.use('/api', securityMiddleware.apiLimiter);

// Authentication routes with validation
app.post('/api/auth/login', 
  securityMiddleware.authLimiter,
  validationMiddleware.validateLogin,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    try {
      const { username, password } = req.body;
      const user = users.find(u => u.username === username);

      if (!user) {
        logger.warn('Login attempt with invalid username', { username });
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        logger.warn('Login attempt with invalid password', { username });
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials'
        });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '24h' }
      );

      logger.info('Successful login', { username: user.username });
      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      logger.error('Login error', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

app.get('/api/auth/me', authenticateToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// Properties API with validation
app.get('/api/properties', (req, res) => {
  try {
    res.json({
      success: true,
      data: properties,
      count: properties.length
    });
  } catch (error) {
    logger.error('Error fetching properties', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/properties', 
  authenticateToken,
  validationMiddleware.validateProperty,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    try {
      const newProperty = {
        id: properties.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      properties.push(newProperty);
      
      logger.info('Property created', { id: newProperty.id, title: newProperty.title });
      res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: newProperty
      });
    } catch (error) {
      logger.error('Error creating property', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

// Properties API - Complete CRUD operations
app.put('/api/properties/:id', 
  authenticateToken,
  validationMiddleware.validateProperty,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = properties.findIndex(p => p.id === id);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Property not found'
        });
      }
      
      properties[index] = { ...properties[index], ...req.body, updatedAt: new Date().toISOString() };
      
      logger.info('Property updated', { id, title: properties[index].title });
      res.json({
        success: true,
        message: 'Property updated successfully',
        data: properties[index]
      });
    } catch (error) {
      logger.error('Error updating property', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

app.delete('/api/properties/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = properties.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }
    
    const deletedProperty = properties.splice(index, 1)[0];
    
    logger.info('Property deleted', { id, title: deletedProperty.title });
    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting property', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Jobs API - Complete CRUD operations
app.get('/api/jobs', (req, res) => {
  try {
    res.json({
      success: true,
      data: jobs,
      count: jobs.length
    });
  } catch (error) {
    logger.error('Error fetching jobs', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/jobs', 
  authenticateToken,
  validationMiddleware.validateJob,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    try {
      const newJob = {
        id: jobs.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      jobs.push(newJob);
      
      logger.info('Job created', { id: newJob.id, title: newJob.title });
      res.status(201).json({
        success: true,
        message: 'Job created successfully',
        data: newJob
      });
    } catch (error) {
      logger.error('Error creating job', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

app.put('/api/jobs/:id', 
  authenticateToken,
  validationMiddleware.validateJob,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = jobs.findIndex(j => j.id === id);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Job not found'
        });
      }
      
      jobs[index] = { ...jobs[index], ...req.body, updatedAt: new Date().toISOString() };
      
      logger.info('Job updated', { id, title: jobs[index].title });
      res.json({
        success: true,
        message: 'Job updated successfully',
        data: jobs[index]
      });
    } catch (error) {
      logger.error('Error updating job', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

app.delete('/api/jobs/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = jobs.findIndex(j => j.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Job not found'
      });
    }
    
    const deletedJob = jobs.splice(index, 1)[0];
    
    logger.info('Job deleted', { id, title: deletedJob.title });
    res.json({
      success: true,
      message: 'Job deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting job', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Executive Team API - Complete CRUD operations
app.get('/api/executive-team', (req, res) => {
  try {
    res.json({
      success: true,
      data: executiveTeam,
      count: executiveTeam.length
    });
  } catch (error) {
    logger.error('Error fetching executive team', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.post('/api/executive-team', 
  authenticateToken,
  validationMiddleware.validateExecutive,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    try {
      const newExecutive = {
        id: executiveTeam.length + 1,
        ...req.body,
        createdAt: new Date().toISOString()
      };
      executiveTeam.push(newExecutive);
      
      logger.info('Executive created', { id: newExecutive.id, name: newExecutive.name });
      res.status(201).json({
        success: true,
        message: 'Executive created successfully',
        data: newExecutive
      });
    } catch (error) {
      logger.error('Error creating executive', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

app.put('/api/executive-team/:id', 
  authenticateToken,
  validationMiddleware.validateExecutive,
  validationMiddleware.handleValidationErrors,
  (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const index = executiveTeam.findIndex(e => e.id === id);
      
      if (index === -1) {
        return res.status(404).json({
          success: false,
          message: 'Executive not found'
        });
      }
      
      executiveTeam[index] = { ...executiveTeam[index], ...req.body, updatedAt: new Date().toISOString() };
      
      logger.info('Executive updated', { id, name: executiveTeam[index].name });
      res.json({
        success: true,
        message: 'Executive updated successfully',
        data: executiveTeam[index]
      });
    } catch (error) {
      logger.error('Error updating executive', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
);

app.delete('/api/executive-team/:id', authenticateToken, (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = executiveTeam.findIndex(e => e.id === id);
    
    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Executive not found'
      });
    }
    
    const deletedExecutive = executiveTeam.splice(index, 1)[0];
    
    logger.info('Executive deleted', { id, name: deletedExecutive.name });
    res.json({
      success: true,
      message: 'Executive deleted successfully'
    });
  } catch (error) {
    logger.error('Error deleting executive', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Images API
app.get('/api/images', (req, res) => {
  try {
    const files = fs.readdirSync('./uploads');
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        url: `${req.protocol}://${req.get('host')}/uploads/${file}`
      }));
    
    res.json({
      success: true,
      data: images,
      count: images.length
    });
  } catch (error) {
    logger.error('Error fetching images', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get images'
    });
  }
});

app.delete('/api/images/:filename', authenticateToken, (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join('./uploads', filename);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      logger.info('Image deleted', { filename });
      res.json({
        success: true,
        message: 'Image deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
  } catch (error) {
    logger.error('Error deleting image', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image'
    });
  }
});

// File upload with rate limiting
app.post('/api/upload', 
  authenticateToken,
  securityMiddleware.uploadLimiter,
  upload.single('image'), 
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }
      
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
      
      logger.info('File uploaded successfully', { 
        filename: req.file.filename,
        size: req.file.size 
      });
      
      res.json({
        success: true,
        message: 'File uploaded successfully',
        data: {
          filename: req.file.filename,
          url: imageUrl,
          size: req.file.size
        }
      });
    } catch (error) {
      logger.error('Upload error', error);
      res.status(500).json({
        success: false,
        message: 'Upload failed'
      });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error', err);
  
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Maximum size is 10MB.'
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        success: false,
        message: 'Too many files. Maximum is 5 files.'
      });
    }
  }
  
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  logger.info('Server started', {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    adminCredentials: {
      username: 'orchid992',
      password: 'orchid992'
    }
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

module.exports = app;
