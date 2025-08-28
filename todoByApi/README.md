# Backend API for Dhukaan Tracker

## Deployment on Render

### Environment Variables Required

Set these environment variables in your Render dashboard:

1. **MONGODB_URI**: Your MongoDB connection string
   ```
   mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   ```

2. **FRONTEND_URL**: Your frontend application URL
   ```
   https://your-frontend-domain.onrender.com
   ```

3. **JWT_SECRET**: A secure secret key for JWT tokens
   ```
   your_secure_jwt_secret_here
   ```

4. **RAZOR_PAY_KEY_ID**: Your Razorpay key ID
   ```
   rzp_test_your_key_id_here
   ```

5. **RAZOR_PAY_SECRET_KEY**: Your Razorpay secret key
   ```
   your_razorpay_secret_key_here
   ```

### Render Configuration

- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node.js Version**: 18.x or higher (automatically detected)

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with the required environment variables

3. Run the development server:
   ```bash
   npm run dev
   ```

### API Endpoints

The API is available at the root path `/` and includes all the routes defined in `routes/router.js`.

### CORS Configuration

The API is configured to accept requests from:
- `http://localhost:5173` (local development)
- Your frontend URL (set via FRONTEND_URL environment variable)
- Requests with no origin (mobile apps, etc.)
