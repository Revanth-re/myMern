# Deployment Checklist for Render

## ✅ Pre-Deployment Checklist

### 1. Environment Variables Setup
- [ ] **MONGODB_URI**: Set your MongoDB connection string
- [ ] **FRONTEND_URL**: Set your frontend application URL
- [ ] **JWT_SECRET**: Set a secure JWT secret key
- [ ] **RAZOR_PAY_KEY_ID**: Set your Razorpay key ID
- [ ] **RAZOR_PAY_SECRET_KEY**: Set your Razorpay secret key

### 2. Render Configuration
- [ ] **Build Command**: `npm install`
- [ ] **Start Command**: `npm start`
- [ ] **Node.js Version**: 18.x or higher (auto-detected)

### 3. Code Changes Made
- [x] Updated `index.js` to use `process.env.PORT`
- [x] Updated CORS configuration for production
- [x] Updated database connection to use environment variables
- [x] Fixed async/await issue in login route
- [x] Updated JWT secret environment variable name
- [x] Updated Node.js engine version in package.json

### 4. Frontend Configuration
- [ ] Update your frontend API base URL to point to your Render backend URL
- [ ] Ensure CORS is properly configured for your frontend domain

## 🚀 Deployment Steps

1. **Push your updated code to GitHub**
2. **Connect your repository to Render**
3. **Set all environment variables in Render dashboard**
4. **Deploy the service**
5. **Test the API endpoints**

## 🔧 Troubleshooting

### Common Issues:
- **Port Error**: Make sure `process.env.PORT` is used instead of hardcoded port
- **CORS Error**: Ensure FRONTEND_URL is set correctly
- **Database Connection**: Verify MONGODB_URI is correct
- **JWT Error**: Check JWT_SECRET is set

### Testing Your API:
```bash
# Test if server is running
curl https://your-backend-url.onrender.com/

# Test a specific endpoint
curl https://your-backend-url.onrender.com/api/getAll
```

## 📝 Notes
- The server will automatically use the PORT provided by Render
- CORS is configured to accept requests from localhost (development) and your frontend URL
- All sensitive data should be stored in environment variables
- Make sure your MongoDB Atlas cluster allows connections from all IPs (0.0.0.0/0) for Render
