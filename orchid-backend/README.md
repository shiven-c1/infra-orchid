# Orchid Haven Admin Backend

This is the backend server for the Orchid Haven admin system that allows you to manage properties, jobs, and images.

## Features

- 🔐 **Authentication** - Secure login with JWT tokens
- 🏠 **Property Management** - Add, edit, delete properties
- 💼 **Job Management** - Add, edit, delete job postings
- 📸 **Image Upload** - Upload and manage images
- 🛡️ **Security** - Protected API endpoints

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Server**
   ```bash
   npm run dev
   ```

3. **Access the API**
   - Server runs on: `http://localhost:5000`
   - API endpoints: `http://localhost:5000/api/*`

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Properties
- `GET /api/properties` - Get all properties
- `POST /api/properties` - Create property
- `PUT /api/properties/:id` - Update property
- `DELETE /api/properties/:id` - Delete property

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Images
- `POST /api/upload` - Upload image
- `GET /api/images` - Get all images
- `DELETE /api/images/:filename` - Delete image

## Frontend Access

1. **Start Frontend** (in another terminal)
   ```bash
   cd ../orchid-haven-showcase
   npm run dev
   ```

2. **Access Admin Panel**
   - Login: `http://localhost:5173/login`
   - Admin Dashboard: `nhttp://localhost:5173/admin`

## File Structure

```
orchid-backend/
├── src/
│   └── server.js          # Main server file
├── uploads/               # Image upload directory
├── package.json
└── README.md
```

## Security Notes

- This is a demo setup with in-memory storage
- For production, use a proper database (MongoDB, PostgreSQL)
- Change the JWT secret in production
- Add proper environment variables
- Implement rate limiting and additional security measures
