const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// In-memory data storage (replace with database in production)
let users = [
  {
    id: 1,
    username: 'admin',
    password: '$2b$12$ElS4/pDEC8w/VTc4fJLAQ.GzioEpwNJebkTnSTDZw53bsvzuOBSnW', // admin123
    role: 'admin'
  }
];

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
      "Strong knowledge of property laws",
      "Excellent analytical and communication skills"
    ],
    isHiring: true
  }
];

// Executive Team API
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

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// Properties API
app.get('/api/properties', (req, res) => {
  res.json(properties.filter(p => p.isActive));
});

app.post('/api/properties', authenticateToken, (req, res) => {
  const newProperty = {
    id: properties.length + 1,
    ...req.body,
    isActive: true
  };
  properties.push(newProperty);
  res.status(201).json(newProperty);
});

app.put('/api/properties/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = properties.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Property not found' });
  }
  
  properties[index] = { ...properties[index], ...req.body };
  res.json(properties[index]);
});

app.delete('/api/properties/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = properties.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Property not found' });
  }
  
  properties[index].isActive = false;
  res.json({ message: 'Property deleted' });
});

// Jobs API
app.get('/api/jobs', (req, res) => {
  res.json(jobs);
});

app.post('/api/jobs', authenticateToken, (req, res) => {
  const newJob = {
    id: jobs.length + 1,
    ...req.body
  };
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.put('/api/jobs/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = jobs.findIndex(j => j.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  jobs[index] = { ...jobs[index], ...req.body };
  res.json(jobs[index]);
});

app.delete('/api/jobs/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = jobs.findIndex(j => j.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Job not found' });
  }
  
  jobs.splice(index, 1);
  res.json({ message: 'Job deleted' });
});

// Executive Team API
app.get('/api/executive-team', (req, res) => {
  res.json(executiveTeam);
});

app.post('/api/executive-team', authenticateToken, (req, res) => {
  const newExecutive = {
    id: executiveTeam.length + 1,
    ...req.body
  };
  executiveTeam.push(newExecutive);
  res.status(201).json(newExecutive);
});

app.put('/api/executive-team/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = executiveTeam.findIndex(et => et.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Executive not found' });
  }
  
  executiveTeam[index] = { ...executiveTeam[index], ...req.body };
  res.json(executiveTeam[index]);
});

app.delete('/api/executive-team/:id', authenticateToken, (req, res) => {
  const id = parseInt(req.params.id);
  const index = executiveTeam.findIndex(et => et.id === id);
  
  if (index === -1) {
    return res.status(404).json({ message: 'Executive not found' });
  }
  
  executiveTeam.splice(index, 1);
  res.json({ message: 'Executive deleted' });
});

// Image upload API
app.post('/api/upload', authenticateToken, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      url: imageUrl
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed' });
  }
});

// Get uploaded images
app.get('/api/images', (req, res) => {
  try {
    const files = fs.readdirSync('./uploads');
    const images = files
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map(file => ({
        filename: file,
        url: `http://localhost:5000/uploads/${file}`
      }));
    
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get images' });
  }
});

// Delete image
app.delete('/api/images/:filename', authenticateToken, (req, res) => {
  try {
    const filename = req.params.filename;
    const filepath = path.join('./uploads', filename);
    
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Admin login: username=admin, password=admin123`);
});
