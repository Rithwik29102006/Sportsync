import express from 'express';
import cors from 'cors';
import { apiRouter } from './routes/api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to communicate with backend
app.use(express.json()); // Parse JSON requests

// Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Mount Routes
app.use('/api', apiRouter);

// Serve frontend static files (for production)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle SPA routing - serve index.html for unknown routes
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 SportsSync Backend running on http://localhost:${PORT}`);
});
