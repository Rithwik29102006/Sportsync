# SportsSync Deployment Guide

## Frontend (Vercel) & Backend (Railway) Deployment

### 1. Backend Deployment on Railway

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push origin main
   ```

2. **Deploy to Railway**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory
   - Railway will automatically detect the Node.js app and deploy

3. **Environment Variables**
   Set these in Railway dashboard:
   - `NODE_ENV=production`
   - `PORT=3000` (Railway sets this automatically)

4. **Get your Railway URL**
   After deployment, Railway will give you a URL like: `https://sportssync-backend.up.railway.app`

### 2. Frontend Deployment on Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from frontend directory**
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Set Environment Variable**
   During deployment or in Vercel dashboard:
   - `VITE_API_URL=https://your-railway-url.railway.app`
   Replace with your actual Railway URL

4. **Alternative: Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Add environment variable `VITE_API_URL`

### 3. Update API Configuration

After getting your Railway URL, update the frontend environment variable:

```bash
# In Vercel dashboard or via CLI
vercel env add VITE_API_URL production
# Enter: https://your-railway-url.railway.app
```

### 4. Verify Deployment

1. **Backend Health Check**
   ```bash
   curl https://your-railway-url.railway.app/health
   ```

2. **Frontend**
   Visit your Vercel URL and test the application

### 5. Local Development

To run locally with production-like setup:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in separate terminal)
cd frontend
npm install
npm run dev
```

### File Structure

```
Sportssync--main/
├── backend/
│   ├── railway.json          # Railway deployment config
│   ├── nixpacks.toml         # Railway build config
│   └── server.js             # Express server
├── frontend/
│   ├── vercel.json           # Vercel deployment config
│   └── src/config/api.js     # API configuration
├── Dockerfile                # Docker deployment (alternative)
├── docker-compose.yml        # Docker Compose (alternative)
└── DEPLOYMENT.md             # This file
```

### Troubleshooting

- **CORS Issues**: Ensure backend allows your Vercel domain
- **API Calls**: Check that `VITE_API_URL` is set correctly in Vercel
- **Build Failures**: Verify all dependencies are in package.json
- **Health Checks**: Railway uses `/health` endpoint to verify app is running
