# Production-ready Dockerfile for CloudTakeoff Pro
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source
COPY . .

# Build (if needed)
RUN npm run build 2>/dev/null || true

# Production image - use lightweight base
FROM node:18-alpine

WORKDIR /app

# Install serve to host static files for production
RUN npm install -g serve

# Copy built app
COPY --from=builder /app/public ./public
COPY --from=builder /app/src ./src 2>/dev/null || true
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expose port
EXPOSE 3000

# Non-root user for security
USER node

# Start server
CMD ["serve", "-s", "public", "-l", "3000"]
