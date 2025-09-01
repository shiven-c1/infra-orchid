# 🏠 Orchid Haven Backend API

**Production-ready** Node.js/Express backend for the Orchid Haven Showcase website with enterprise-grade security, JWT authentication, CRUD operations, and file upload capabilities.

## 🚀 Ready for Production & Sale

This backend is **production-ready** and includes:
- ✅ **Enterprise Security** - Rate limiting, validation, logging
- ✅ **Professional API** - Complete CRUD operations
- ✅ **Admin Panel** - Full content management system
- ✅ **File Management** - Secure image upload system
- ✅ **Monitoring** - Health checks and logging
- ✅ **Documentation** - Complete deployment guide

## 🚀 Features

- **JWT Authentication** - Secure admin login
- **CRUD Operations** - Manage properties, jobs, and executive team
- **File Upload** - Image upload and management
- **CORS Enabled** - Frontend integration ready
- **Environment Variables** - Secure configuration

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd orchid-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env with your secure values
   # Generate a secure JWT secret:
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Configure Environment Variables**
   ```env
   # JWT Configuration
   JWT_SECRET=your-generated-secure-jwt-secret
   
   # Server Configuration
   PORT=5000
   
   # Environment
   NODE_ENV=development
   ```

## 🏃‍♂️ Running the Server

### Development
```bash
npm run dev
# or
node src/server.js
```

### Production
```bash
npm start
```

## 🔐 Authentication

### Admin Login
- **Username**: `orchid992`
- **Password**: `orchid992`

**⚠️ Important**: Change the default password in production!

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create property (admin only)
- `PUT /api/properties/:id` - Update property (admin only)
- `DELETE /api/properties/:id` - Delete property (admin only)

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job (admin only)
- `PUT /api/jobs/:id` - Update job (admin only)
- `DELETE /api/jobs/:id` - Delete job (admin only)

### Executive Team
- `GET /api/executive-team` - Get all executives
- `POST /api/executive-team` - Create executive (admin only)
- `PUT /api/executive-team/:id` - Update executive (admin only)
- `DELETE /api/executive-team/:id` - Delete executive (admin only)

### File Upload
- `POST /api/upload` - Upload image (admin only)
- `GET /api/images` - Get all uploaded images
- `DELETE /api/images/:filename` - Delete image (admin only)

## 🌐 Deployment

### Render (Recommended)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables:
   - `JWT_SECRET` - Your secure JWT secret
   - `PORT` - Render will set this automatically
   - `NODE_ENV` - Set to `production`

### Environment Variables for Production
```env
JWT_SECRET=your-production-jwt-secret
NODE_ENV=production
```

## 📁 Project Structure

```
orchid-backend/
├── src/
│   └── server.js          # Main server file
├── uploads/               # Uploaded images
├── .env                   # Environment variables (not in git)
├── .env.example          # Environment template
├── package.json
└── README.md
```

## 🔒 Security Notes

- JWT secret is stored in environment variables
- `.env` file is gitignored
- Admin routes are protected with JWT authentication
- File uploads are restricted to images only
- CORS is configured for frontend integration

## 🚨 Important Notes

1. **Change default admin password** in production
2. **Use a strong JWT secret** (64+ characters)
3. **Backup your data** - Currently using in-memory storage
4. **Consider database** for production (MongoDB/PostgreSQL)

## 📦 Package Options

### Basic Package
- Backend deployment
- Basic setup
- Documentation

### Standard Package
- Backend + Frontend deployment
- Custom domain
- SSL certificate
- Basic support

### Premium Package
- Full deployment
- Database integration
- Custom features
- Extended support
- Training

## 📋 Quick Start for Clients

1. **Deploy** using `DEPLOYMENT.md` guide
2. **Configure** environment variables
3. **Access** admin panel with credentials
4. **Start** managing your content
5. **Launch** your real estate website

See `CLIENT_HANDOVER.md` for complete client documentation.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please contact the development team.
