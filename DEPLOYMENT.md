# SportsSync Deployment Guide

## Frontend (Vercel) & Backend (Railway) Deployment

### Current Production URLs:
- **Backend**: https://sportsync-production-afb3.up.railway.app:8080
- **Frontend**: (Deploy to Vercel)

### 1. Backend Deployment on Railway ✅

Your backend is already deployed at: `https://sportsync-production-afb3.up.railway.app:8080`

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

3. **Environment Variable**
   The `VITE_API_URL` is already set in `vercel.json` to:
   ```
   https://sportsync-production-afb3.up.railway.app:8080
   ```

4. **Alternative: Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Environment variable is pre-configured

### 3. Verify Deployment

1. **Backend Health Check**
   ```bash
   curl https://sportsync-production-afb3.up.railway.app:8080/health
   ```

2. **Frontend**
   Visit your Vercel URL and test the application

### 4. Local Development

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
│   ├── package.json             # Node.js configuration
│   └── server.js                # Express server (port 8080)
├── frontend/
│   ├── vercel.json              # Vercel deployment config
│   └── src/config/api.js        # API configuration
└── DEPLOYMENT.md                # This file
```

### Configuration Details

**Backend (Railway):**
- Port: 8080 (Railway default)
- Health check: `/health`
- Node.js 18+
- No database required

**Frontend (Vercel):**
- Static build with Vite
- API calls to Railway backend
- Environment variable: `VITE_API_URL`

### Troubleshooting

- **CORS Issues**: Backend allows all origins with cors()
- **API Calls**: Verify Railway backend is accessible
- **Build Failures**: Check Vercel build logs
- **Health Checks**: Railway monitors `/health` endpoint
