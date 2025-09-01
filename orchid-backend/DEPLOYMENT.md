# 🚀 Production Deployment Guide

This guide will help you deploy the Orchid Haven backend to production for selling.

## 📋 Prerequisites

- Node.js 16+ installed
- Git repository set up
- Domain name (optional but recommended)
- SSL certificate (for HTTPS)

## 🌐 Deployment Options

### 1. Render (Recommended - Free Tier Available)

**Pros:**
- Free tier available
- Easy deployment
- Automatic HTTPS
- Good performance

**Steps:**
1. **Sign up** at [render.com](https://render.com)
2. **Connect your GitHub repository**
3. **Create a new Web Service**
4. **Configure settings:**
   - **Name**: `orchid-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or paid for better performance)

5. **Set Environment Variables:**
   ```
   JWT_SECRET=your-super-secure-jwt-secret
   NODE_ENV=production
   FRONTEND_URL=https://yourdomain.com
   ```

6. **Deploy** and get your backend URL

### 2. Railway (Alternative - Free Tier)

**Steps:**
1. Sign up at [railway.app](https://railway.app)
2. Connect GitHub repository
3. Deploy automatically
4. Set environment variables

### 3. Heroku (Paid)

**Steps:**
1. Create Heroku account
2. Install Heroku CLI
3. Run deployment commands
4. Set config vars

## 🔧 Production Setup

### 1. Environment Variables

Create `.env` file with production values:

```env
# JWT Configuration
JWT_SECRET=your-super-secure-production-jwt-secret

# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URL
FRONTEND_URL=https://yourdomain.com

# Security
TRUST_PROXY=true
```

### 2. Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Update Frontend API URL

In your frontend, update the API base URL to your production backend URL.

## 🔒 Security Checklist

- [ ] **Strong JWT Secret** (64+ characters)
- [ ] **HTTPS enabled**
- [ ] **CORS configured** for your domain
- [ ] **Rate limiting** enabled
- [ ] **Input validation** active
- [ ] **File upload restrictions** in place
- [ ] **Error messages** don't expose sensitive info
- [ ] **Admin password** changed from default

## 📊 Monitoring & Logs

### Health Check
- Endpoint: `GET /health`
- Use for monitoring services

### API Documentation
- Endpoint: `GET /api`
- Lists all available endpoints

### Logs
- Access logs: `logs/access.log`
- Error logs: `logs/error.log`
- Monitor for issues

## 🚨 Performance Optimization

### For High Traffic (15K+ visitors):

1. **Upgrade to Paid Plan**
   - Render: Paid plans available
   - Railway: Paid plans available
   - Heroku: Paid plans available

2. **Database Integration**
   - Add MongoDB/PostgreSQL
   - Replace in-memory storage

3. **CDN for Images**
   - Use Cloudinary or AWS S3
   - Faster image delivery

4. **Caching**
   - Redis for session storage
   - Response caching

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

## 📝 Client Handover

### 1. Documentation Package
- Deployment guide
- API documentation
- Admin credentials
- Support contact

### 2. Training Session
- Admin panel usage
- Content management
- Basic troubleshooting

### 3. Support Agreement
- 30 days free support
- Paid support options
- Maintenance packages

## 🔄 Maintenance

### Regular Tasks
- Monitor logs for errors
- Update dependencies
- Backup data (when database is added)
- Check performance metrics

### Updates
- Security patches
- Feature updates
- Bug fixes

## 🆘 Troubleshooting

### Common Issues

1. **Server not starting**
   - Check environment variables
   - Verify port availability
   - Check logs

2. **CORS errors**
   - Verify FRONTEND_URL setting
   - Check domain configuration

3. **File upload issues**
   - Check file size limits
   - Verify upload directory permissions

4. **Authentication problems**
   - Verify JWT_SECRET
   - Check token expiration

## 📞 Support

For deployment issues:
- Check platform documentation
- Review error logs
- Contact platform support

For application issues:
- Review application logs
- Check API responses
- Test endpoints manually

## 🎯 Next Steps

1. **Deploy to chosen platform**
2. **Test all endpoints**
3. **Update frontend API URL**
4. **Set up monitoring**
5. **Prepare client documentation**
6. **Plan support strategy**

---

**Remember**: Always test thoroughly in production before client handover!
