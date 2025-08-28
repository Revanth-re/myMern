# Deployment Guide

## Vercel Deployment

### Environment Variables Setup

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add the following environment variable:

```
VITE_API_URL=https://your-backend-url.onrender.com
```

Replace `https://your-backend-url.onrender.com` with your actual Render backend URL.

### Build Configuration

The project is now configured to work with Vercel deployment. The main changes made:

1. **Removed `@tailwindcss/vite`** - This was causing the `lightningcss` binary issue
2. **Added traditional Tailwind CSS** - Using `tailwindcss` v3.4.0 with PostCSS
3. **Created proper configuration files**:
   - `postcss.config.js`
   - `tailwind.config.js`
   - `src/config.js` for API configuration

### API URL Updates

All API calls in the codebase should be updated to use the centralized configuration:

```javascript
import { config } from './config';

// Instead of: axios.get("http://localhost:5000/api/endpoint")
// Use: axios.get(`${config.API_BASE_URL}/api/endpoint`)
```

### Local Development

For local development, create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:5000
```

### Build Command

The build command `npm run build` should now work successfully on Vercel.
