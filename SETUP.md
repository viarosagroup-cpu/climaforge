# 🚀 CloudTakeoff Pro - Complete Setup & Deployment Guide

## Overview

CloudTakeoff Pro is an enterprise-grade construction takeoff and measurement tool. This guide covers everything from local development to production deployment.

## Quick Navigation

1. [Local Development](#local-development)
2. [Docker Setup](#docker-setup)
3. [Cloud Deployment](#cloud-deployment)
4. [Production Configuration](#production-configuration)
5. [Monitoring & Scaling](#monitoring--scaling)

---

## Local Development

### Prerequisites

- **Node.js 18+** ([download](https://nodejs.org/))
- **Git**
- **npm or yarn**
- **Docker** (optional, for containerized testing)

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/climaforge.git
cd climaforge

# Install dependencies
npm install

# Create .env from template
cp .env.example .env

# Start development server
npm run dev

# Open browser at http://localhost:5173
```

### Development Workflow

```bash
# Watch for changes and rebuild
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint

# Format code
npm run format
```

---

## Docker Setup

### Local Docker Development

```bash
# Build image
docker build -t cloudtakeoff:dev .

# Run container
docker run -p 3000:3000 -v $(pwd):/app cloudtakeoff:dev

# Access at http://localhost:3000
```

### Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down

# Remove volumes
docker-compose down -v
```

### Docker Image Variants

```bash
# Dev image (larger, with tools)
docker build -f Dockerfile.dev -t cloudtakeoff:dev .

# Production image (minimal, optimized)
docker build -t cloudtakeoff:prod .

# Alpine image (smallest)
docker build -f Dockerfile.alpine -t cloudtakeoff:alpine .
```

---

## Cloud Deployment

### 1️⃣ Vercel (Recommended - Zero Config)

Fastest way to deploy with zero configuration.

#### Initial Setup

```bash
# Install Vercel CLI
npm i -g vercel

# Login and link project
vercel login
vercel link

# Deploy
vercel --prod
```

#### Continuous Deployment

Push to GitHub → Automatic deployment to Vercel

**Environment Variables:**

```
ANALYTICS_ENABLED=false
NODE_ENV=production
```

**Deployment URL:** `https://your-project.vercel.app`

---

### 2️⃣ AWS (EC2 + S3 + CloudFront)

For enterprises requiring full AWS ecosystem.

#### Step-by-Step Deployment

```bash
# 1. Create EC2 instance (Ubuntu 22.04 LTS)
# 2. SSH into instance
ssh -i ~/.ssh/your-key.pem ubuntu@your-instance-ip

# 3. Install dependencies
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker ubuntu

# 4. Clone and deploy
git clone https://github.com/yourusername/climaforge.git
cd climaforge
docker-compose -f docker-compose.prod.yml up -d

# 5. Set up reverse proxy with nginx
sudo apt-get install nginx
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo systemctl restart nginx

# 6. Configure SSL with Let's Encrypt
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
```

#### AWS Setup

```bash
# Configure AWS CLI
aws configure

# Create S3 bucket for uploads
aws s3 mb s3://cloudtakeoff-uploads --region us-east-1

# Create CloudFront distribution (use AWS Console)
# Point to: https://your-instance-ip/

# Upload environment config
aws s3 cp .env.prod s3://cloudtakeoff-uploads/.env
```

#### Cost Estimate (Monthly)
- EC2 t3.medium: $30
- RDS (if used): $20
- S3 + CloudFront: $5-15
- **Total: ~$50-65/month**

---

### 3️⃣ Google Cloud Run

Serverless container deployment - pay only for what you use.

#### Deployment Steps

```bash
# 1. Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# 2. Initialize and authenticate
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 3. Build and push to Container Registry
gcloud builds submit --tag gcr.io/YOUR_PROJECT/cloudtakeoff

# 4. Deploy to Cloud Run
gcloud run deploy cloudtakeoff \
  --image gcr.io/YOUR_PROJECT/cloudtakeoff:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production

# 5. Get service URL
gcloud run services describe cloudtakeoff --platform managed --region us-central1
```

#### Cost Estimate (Monthly)
- Cloud Run: $0.00002/request + compute
- For 10,000 requests/day: **~$15-20/month**

---

### 4️⃣ DigitalOcean App Platform

Simple, affordable container hosting.

#### GitHub Integration

1. Go to DigitalOcean Dashboard
2. Click "Apps" → "Create App"
3. Connect GitHub repository
4. Select `main` branch
5. Configure:
   - **Build Command:** `npm install`
   - **Run Command:** `serve -s public -l 3000`
6. Set Environment Variables
7. Deploy

Or via CLI:

```bash
# Install doctl
# https://docs.digitalocean.com/reference/doctl/

# Create app.yaml
cat > do-app.yaml << EOF
name: cloudtakeoff
services:
- name: web
  github:
    repo: yourusername/climaforge
    branch: main
  build_command: npm install
  run_command: serve -s public -l 3000
  http_port: 3000
EOF

# Deploy
doctl apps create --spec do-app.yaml
```

#### Cost Estimate (Monthly)
- Basic plan: **$12/month** (shared CPU)
- Standard plan: **$50/month** (dedicated resources)

---

### 5️⃣ Heroku (Legacy but Simple)

```bash
# Install Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Create app
heroku apps:create your-app-name

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

### 6️⃣ Self-Hosted on VPS

For full control (Linode, Vultr, Hetzner, etc.)

```bash
# 1. SSH into your VPS
ssh root@your-vps-ip

# 2. Update system
apt update && apt upgrade -y

# 3. Install Docker
curl -fsSL https://get.docker.com | sh
usermod -aG docker root

# 4. Install Docker Compose
curl -L https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# 5. Clone and deploy
git clone https://github.com/yourusername/climaforge.git
cd climaforge
docker-compose up -d

# 6. Install Nginx reverse proxy
apt install nginx -y
cp nginx.conf /etc/nginx/nginx.conf
systemctl restart nginx

# 7. Setup SSL (Let's Encrypt)
apt install certbot python3-certbot-nginx -y
certbot certonly --standalone -d your-domain.com

# 8. Setup auto-renewal
systemctl enable certbot.timer
systemctl start certbot.timer
```

#### Cost Estimates (Monthly)
- Linode ($5-10/month): Small VPS, 1GB RAM
- Vultr ($2.50-10/month): Flexible pricing
- Hetzner ($3-5/month): Very affordable
- DigitalOcean Droplet ($4-6/month): Starting plan

---

## Production Configuration

### Environment Setup

```bash
# Create production .env
cat > .env.production << EOF
NODE_ENV=production
PORT=3000
DEBUG=false
ANALYTICS_ENABLED=true
COMPRESSION_ENABLED=true
CACHE_ENABLED=true
EOF
```

### Security Checklist

- [ ] HTTPS/SSL enabled
- [ ] Security headers configured
- [ ] CORS properly restricted
- [ ] Rate limiting enabled
- [ ] File upload size limited (100MB)
- [ ] Secrets in environment variables
- [ ] Nginx reverse proxy
- [ ] Docker runs as non-root user

### Performance Optimization

```bash
# Enable gzip compression in nginx.conf (done)
# Enable HTTP/2 (done)
# Setup caching headers (done)
# Use CDN for static assets

# Test site speed
# https://pagespeed.web.dev/
# https://www.webpagetest.org/
```

### Database (Future)

When adding user accounts/storage:

```bash
# PostgreSQL example
docker run -d \
  --name cloudtakeoff-db \
  -e POSTGRES_PASSWORD=secure_password \
  -e POSTGRES_DB=cloudtakeoff \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15-alpine
```

---

## Monitoring & Scaling

### Health Checks

```bash
# Test deployment
curl -I https://your-app.example.com
# Should return 200

# Health endpoint
curl https://your-app.example.com/health
# Should return: ok
```

### Logging

```bash
# Docker logs
docker logs -f cloudtakeoff

# Docker Compose logs
docker-compose logs -f

# Tail last 100 lines
docker logs --tail 100 cloudtakeoff
```

### Auto-Scaling (Cloud Platforms)

#### Vercel
- Automatic ✅ (no configuration needed)

#### Google Cloud Run
```bash
gcloud run services update cloudtakeoff \
  --max-instances 100 \
  --max-concurrency 80
```

#### DigitalOcean
Configure in app.yaml:
```yaml
http_port: 3000
scaling:
  min_instance_count: 2
  max_instance_count: 10
```

### Monitoring Services

**Option 1: Free (Basic)**
- Cloud provider dashboards
- Docker stats: `docker stats`

**Option 2: Affordable ($10-20/month)**
- Datadog
- New Relic
- Sentry (for error tracking)

**Option 3: Enterprise**
- CloudWatch (AWS)
- Cloud Logging (GCP)
- Application Insights (Azure)

### Backup Strategy

```bash
# Backup Docker volumes
docker run --rm -v cloudtakeoff_data:/data -v $(pwd):/backup \
  alpine tar czf /backup/data.tar.gz -C / data

# Upload to S3
aws s3 cp data.tar.gz s3://your-backup-bucket/$(date +%Y%m%d).tar.gz
```

---

## Troubleshooting

### Docker Issues

```bash
# Container won't start
docker logs cloudtakeoff

# Port already in use
docker ps  # Check running containers
lsof -i :3000  # Find process using port

# Clean up
docker system prune -a
docker volume prune
```

### Deployment Issues

```bash
# Vercel build fails
vercel logs --follow

# GCP Cloud Run errors
gcloud run services describe cloudtakeoff
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=cloudtakeoff" --limit 50

# AWS EC2 issues
# SSH into instance
ssh -i key.pem ubuntu@ip
sudo systemctl status nginx
sudo systemctl status docker
```

---

## Next Steps

1. **Custom Domain**
   - Domain registrar (GoDaddy, Namecheap, etc.)
   - Point DNS to your host
   - Enable SSL certificate

2. **Monitoring**
   - Setup error tracking (Sentry)
   - Analytics (Google Analytics)
   - Performance monitoring

3. **Backup**
   - Database backups
   - Docker volume backups
   - Automated daily snapshots

4. **Team Setup**
   - GitHub organization
   - Pull request reviews
   - Staging environment

5. **Customization**
   - Branding (logo, colors)
   - Feature flags
   - Custom domains

---

## Support

- 📖 **Documentation**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- 🐛 **Issue Tracker**: GitHub Issues
- 💬 **Discussions**: GitHub Discussions
- 📧 **Email**: support@cloudtakeoff.local

---

**CloudTakeoff Pro - Built for Scale, Optimized for Performance** 🚀
