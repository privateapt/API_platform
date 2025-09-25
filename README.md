# 🚀 අපිලගේ AI - Sri Lankan AI API Platform

A modern, responsive SaaS platform providing AI-powered educational assistance specifically designed for Sri Lankan students. Built with Node.js backend and Next.js frontend.

## ✨ Features

### 🎯 **For Developers**
- **RESTful API** with authentication via API keys
- **Firebase Authentication** for user management  
- **Gemini AI Integration** for intelligent responses
- **Rate Limiting & Security** with CORS protection
- **Professional Dashboard** with usage analytics

### 🎓 **For Students**
- **Sinhala Language Support** - Native language processing
- **O/L & A/L Syllabus** - Sri Lankan curriculum focused  
- **Educational AI Tutor** - Mathematics, Physics, and more
- **Responsive Design** - Works on mobile, tablet, desktop

## 🏗️ Architecture

```
apiplatform_ready/
├── apiplatform_ready/          # Backend API Server (Node.js + Express)
│   ├── server.js              # Main server file with security fixes
│   ├── package.json           # Backend dependencies
│   └── .env                   # Environment variables (create from .env_copy)
├── frontend/                   # Frontend SaaS Dashboard (Next.js + TypeScript)
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   ├── components/        # Reusable UI components  
│   │   ├── contexts/          # React contexts (Auth)
│   │   ├── lib/               # Firebase config
│   │   └── services/          # API service layer
│   ├── package.json           # Frontend dependencies
│   └── .env.local             # Frontend environment vars (create from .env copy)
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Firebase project** with Authentication enabled
- **Google Gemini API** key

### 1. Backend Setup
```bash
cd apiplatform_ready
cp .env_copy .env
# Edit .env with your Firebase and Gemini credentials
npm install
npm start
```
Backend will run on **http://localhost:3000**

### 2. Frontend Setup  
```bash
cd frontend
cp ".env copy" .env.local
# Edit .env.local with your Firebase config
npm install
npm run dev
```
Frontend will run on **http://localhost:3001**

## 🔑 Environment Variables

### Backend (.env)
```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key  
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_DATABASE_URL=your-database-url

# Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Server Config
PORT=3000
ALLOWED_ORIGINS=http://localhost:3001
```

### Frontend (.env.local)
```env
# Firebase Web SDK
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

# Backend API
NEXT_PUBLIC_API_URL=https://endpoint.apilageai.lk
```

## 📖 API Documentation

### Authentication
```bash
curl -X POST https://endpoint.apilageai.lk/api/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"message": "Hello, how are you?"}'
```

### Response Format
```json
{
  "success": true,
  "response": "Hello! I'm doing well, thank you for asking.",
  "credits_remaining": 45,
  "timestamp": "2025-09-18T10:30:00Z"
}
```

## 🎨 UI Features

### Responsive Design
- **Desktop**: Split-screen login with Sinhala marketing content
- **Mobile**: Full-screen optimized with mobile logo
- **Tablet**: Adaptive layout for all screen sizes

### Dashboard Components
- **Navigation Bar** - Clean SaaS-style header
- **Stats Cards** - Credits and usage analytics  
- **API Key Management** - Copy/paste functionality
- **Quick Tester** - Built-in API testing tool
- **Documentation** - Complete API reference

## 🚦 Development

### Scripts
```bash
# Backend
npm start          # Production server
npm run dev        # Development with nodemon

# Frontend  
npm run dev        # Development server with Turbopack
npm run build      # Production build
npm run start      # Production server
```

### File Structure
- **Clean Architecture** - Separated concerns with services, contexts, components
- **TypeScript** - Full type safety across the frontend
- **Tailwind CSS** - Modern utility-first styling
- **shadcn/ui** - High-quality component library

## 🔒 Security Features

- ✅ **Environment Variables** - No hardcoded secrets
- ✅ **Firebase Admin SDK** - Secure authentication
- ✅ **CORS Protection** - Configurable allowed origins
- ✅ **API Rate Limiting** - Prevent abuse
- ✅ **Input Validation** - Sanitized requests

## 🌐 Deployment Ready

### Choreo Deployment
The backend is containerized and ready for WSO2 Choreo deployment with:
- Docker support (planned)
- Environment variable management  
- Production logging
- Health check endpoints

## 📱 Mobile Support

Fully responsive design tested on:
- **iOS Safari** - iPhone/iPad compatibility
- **Android Chrome** - All Android devices  
- **Desktop Browsers** - Chrome, Firefox, Safari, Edge

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Email**: support@apilageai.lk
- **Documentation**: Available in dashboard
- **GitHub Issues**: Report bugs and request features

## 🎯 Roadmap

- [ ] Docker containerization for Choreo
- [ ] Advanced rate limiting
- [ ] Analytics dashboard
- [ ] Multi-language support expansion
- [ ] Mobile app (React Native)

---

**Built with ❤️ for Sri Lankan students and developers**

🇱🇰 **අපිලගේ AI - ශ්‍රී ලංකාවේ අනාගතය**
