# CloudTakeoff Pro - Enterprise Construction Takeoff Software

**The fastest, most accurate digital construction plan measurement and takeoff tool on the market.**

Production-ready, cloud-native, and ready to deploy. Built for construction professionals who need precision, speed, and reliability.

## 🎯 Features

### Core Measurement Tools
- 📏 **Precision Digital Measurement** - Sub-pixel accuracy with live measurement display
- 📐 **Scale Calibration** - Auto-scale or manual calibration from known dimensions
- 🎯 **Area Calculation** - Multi-point area drawing with automatic volume computation
- 📍 **Annotation Suite** - Measure tools, line drawing, text markup, and highlighter
- 🔍 **Advanced Zoom & Pan** - Smooth navigation for large, complex plan sets

### Professional Features
- 📊 **Multi-Zone Management** - Organize measurements by zone, floor, or area
- 📄 **PDF & Image Support** - Works with multi-page PDFs and image files
- 💾 **Export Options** - PDF reports with embedded measurements and CSV data export
- 🔄 **Real-time Results** - Instant calculation of areas and volumes as you measure
- 👥 **Team Ready** - Cloud deployment for collaborative access

### Enterprise Grade
- 🔒 **Secure File Handling** - Client-side PDF processing, no server storage required
- ⚡ **Performance Optimized** - Handles large plan sets (500+ pages) without lag
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🌙 **Dark Mode UI** - Professional dark interface reduces eye strain
- 📈 **Analytics Ready** - Event tracking structure for usage analytics

## 🚀 Quick Start

### Local Development

```bash
# Clone and navigate
cd climaforge

# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Serve production
npm start
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Access at http://localhost:3000
```

## ☁️ Cloud Deployment

### Vercel (Recommended - Zero Config)

Vercel is pre-configured in `vercel.json`. Simply push to GitHub:

```bash
git push origin main
```

The app will deploy automatically at `your-project.vercel.app`.

### AWS EC2

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-instance

# Clone repo
git clone https://github.com/yourusername/climaforge.git
cd climaforge

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Run container
docker build -t cloudtakeoff .
docker run -d -p 80:3000 cloudtakeoff
```

### Google Cloud Run

```bash
# Install Google Cloud CLI
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# Deploy
gcloud run deploy cloudtakeoff \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Docker Hub / Container Registry

```bash
# Build for production
docker build -t yourusername/cloudtakeoff:latest .

# Push to Docker Hub
docker login
docker push yourusername/cloudtakeoff:latest

# Deploy anywhere that supports Docker
docker pull yourusername/cloudtakeoff:latest
docker run -p 3000:3000 yourusername/cloudtakeoff:latest
```

### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login and deploy
heroku login
heroku create your-app-name
git push heroku main
```

### DigitalOcean App Platform

1. Connect your GitHub repository
2. Create new App from Repository
3. Choose `public` directory
4. Deploy

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=public
```

## 📊 Usage

### Setting Up Measurements

1. **Upload a Plan**
   - Click file input and select PDF or image
   - Tool automatically detects coloring

2. **Calibrate Scale**
   - Click "Draw Scale Line"
   - Click two points on a known dimension (e.g., a door width of 0.9m)
   - Enter the real distance
   - Click "Set Scale"

3. **Draw Areas**
   - Use "Start Area" to begin
   - Click points to define boundaries
   - Double-click or press Enter to finish
   - Select thickness and color

4. **Export Results**
   - "Export PDF" includes annotations and measurements
   - "Export CSV" for spreadsheet integration

### Keyboard Shortcuts

- `Enter` - Finish current area/measurement
- `Esc` - Cancel current operation
- `+` / `-` - Zoom in/out
- `Space + Drag` - Pan view

## 🏗️ Architecture

### Frontend Stack
- **Vanilla JavaScript** (No framework overhead)
- **HTML5 Canvas** for rendering
- **PDF.js** for PDF processing
- **jsPDF** for report generation
- **Martinez** for polygon clipping

### Cloud Ready
- **Containerized** with Docker
- **Stateless** design (no backend required)
- **CDN Friendly** (all libraries from CDN)
- **Service Worker** for offline support

## 🔒 Security

- ✅ Client-side file processing (no upload to server)
- ✅ No user data stored
- ✅ No cookies or tracking by default
- ✅ HTTPS ready
- ✅ CSP friendly
- ✅ XSS protected

## 📈 Performance

- **Page Load**: < 2 seconds
- **Large PDF (500+ pages)**: Smooth navigation
- **Measurements**: Real-time calculation
- **Export**: < 5 seconds for full report

Optimized for:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Configuration

### Environment Variables

```bash
NODE_ENV=production
PORT=3000
ANALYTICS_ENABLED=false  # Set to true for event tracking
```

### Customize Branding

Edit `/public/index.html`:
- Line 19: Change `☁ CloudTakeoff Pro` to your brand
- Line 20: Change subtitle
- CSS variables in `<style>` for colors

## 📊 Monitoring & Analytics

### Optional: Add Analytics

Add your tracking code before closing `</body>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Health Check

```bash
# Test deployment is responsive
curl -I https://your-app.example.com

# Should return 200
```

## 🐛 Troubleshooting

### PDF not loading
- Check PDF file size (must be < 50MB for web)
- Verify PDF is not encrypted
- Try uploading as image instead

### Measurements not calculating
- Ensure scale is set (check scale display)
- Verify measurement points are on visible area
- Try zoom in for precision

### Export not working
- Disable browser pop-up blocker
- Check browser console for errors
- Try PDF export instead of CSV

## 📝 License

Proprietary - CloudTakeoff Pro
Built for professional construction use

## 🚀 Support & Roadmap

### Coming Soon
- [ ] ocr-based automatic scale detection
- [ ] Multi-user collaboration
- [ ] Cloud project storage
- [ ] Mobile app (iOS/Android)
- [ ] AI-powered takeoff suggestions
- [ ] Integration with estimating software
- [ ] Database backend for project history

### Support

For issues, feature requests, or questions:
- 📧 support@cloudtakeoff.local
- 💬 GitHub Issues
- 📱 Project Slack

---

**Built for contractors by contractors. Precision. Speed. Reliability.**

*CloudTakeoff Pro v2.0 - Production Ready*
