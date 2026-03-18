# Multi-stage build for SportsSync
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN cd backend && npm ci --only=production
RUN cd frontend && npm ci

# Copy source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Build frontend
RUN cd frontend && npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy backend dependencies and built frontend
COPY --from=builder /app/backend/node_modules ./backend/node_modules/
COPY --from=builder /app/backend ./backend/
COPY --from=builder /app/frontend/dist ./frontend/dist/

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["node", "backend/server.js"]
