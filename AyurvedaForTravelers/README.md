# AyurvedaForTravelers

A comprehensive MERN stack application for Ayurvedic wellness experiences in Sri Lanka, designed specifically for international travelers.

## 🌿 Project Overview

AyurvedaForTravelers is a full-stack web application that connects international travelers with authentic Ayurvedic treatments, wellness packages, and certified practitioners in Sri Lanka. The platform offers a seamless booking experience with multi-language support, currency conversion, and travel-friendly features.

## 🚀 Features

### Core Features
- **Treatment Management**: Browse and book authentic Ayurvedic treatments
- **Package Deals**: Complete wellness packages with accommodation and meals
- **Therapist Directory**: Find and book consultations with certified practitioners
- **Multi-language Support**: English, German, and Russian
- **Multi-currency**: LKR (primary), USD, and EUR with real-time conversion
- **Booking System**: Advanced scheduling with availability management
- **Payment Integration**: Stripe payment processing
- **Content Management**: Blog, FAQ, and testimonials

### Traveler-Specific Features
- **Sri Lanka Travel Guide**: Visa info, safety tips, cultural insights
- **Timezone Support**: Asia/Colombo timezone handling
- **Emergency Contacts**: Local emergency information
- **Cultural Preparation**: Pre-treatment guidelines and cultural etiquette

## 🛠 Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Stripe** for payments
- **Joi/Zod** for validation
- **Pino** for logging
- **date-fns-tz** for timezone handling

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **i18next** for internationalization
- **Axios** for API communication
- **React Query** for data fetching

### Infrastructure
- **Docker** containerization
- **Nginx** reverse proxy
- **GitHub Actions** CI/CD
- **MongoDB Atlas** (production)

## 📁 Project Structure

```
AyurvedaForTravelers/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── i18n.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── treatmentController.js
│   │   │   ├── packageController.js
│   │   │   ├── therapistController.js
│   │   │   ├── bookingController.js
│   │   │   ├── paymentController.js
│   │   │   └── contentController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── roles.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Treatment.js
│   │   │   ├── Package.js
│   │   │   ├── Therapist.js
│   │   │   ├── Booking.js
│   │   │   ├── Payment.js
│   │   │   └── Article.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── treatments.js
│   │   │   ├── packages.js
│   │   │   ├── therapists.js
│   │   │   ├── bookings.js
│   │   │   ├── payments.js
│   │   │   └── content.js
│   │   ├── utils/
│   │   │   ├── seedData.js
│   │   │   ├── currency.js
│   │   │   └── availability.js
│   │   └── server.js
│   ├── package.json
│   └── env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── TreatmentCard.jsx
│   │   │   ├── PackageCard.jsx
│   │   │   ├── TherapistCard.jsx
│   │   │   ├── DateTimePicker.jsx
│   │   │   ├── CurrencyToggle.jsx
│   │   │   ├── LanguageSwitcher.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Treatments.jsx
│   │   │   ├── TreatmentDetail.jsx
│   │   │   ├── Packages.jsx
│   │   │   ├── PackageDetail.jsx
│   │   │   ├── Therapists.jsx
│   │   │   ├── Booking.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Orders.jsx
│   │   │   ├── OrderDetail.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Article.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── AboutSriLanka.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminTreatments.jsx
│   │   │   ├── AdminPackages.jsx
│   │   │   ├── AdminBookings.jsx
│   │   │   └── AdminArticles.jsx
│   │   ├── store/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       ├── treatmentSlice.js
│   │   │       ├── packageSlice.js
│   │   │       ├── bookingSlice.js
│   │   │       └── contentSlice.js
│   │   ├── services/
│   │   │   ├── apiClient.js
│   │   │   ├── authService.js
│   │   │   ├── treatmentService.js
│   │   │   ├── packageService.js
│   │   │   ├── bookingService.js
│   │   │   └── contentService.js
│   │   ├── i18n/
│   │   │   ├── en.json
│   │   │   ├── de.json
│   │   │   └── ru.json
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v20 or higher)
- npm (v10 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AyurvedaForTravelers
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   ```bash
   # Backend
   cd backend
   cp env.example .env
   # Edit .env with your configuration
   
   # Frontend
   cd ../frontend
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

5. **Start the development servers**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGO_URI=mongodb://localhost:27017/ayurveda-for-travelers

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d

# Server
PORT=4000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:4000/api/v1
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

## 🐳 Docker Setup

### Using Docker Compose
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Services
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:4000
- **MongoDB**: localhost:27017
- **Nginx**: http://localhost:80

## 🌍 Internationalization

The application supports multiple languages:
- **English** (en) - Default
- **German** (de)
- **Russian** (ru)

Language files are located in `frontend/src/i18n/`

## 💱 Currency Support

- **LKR** (Sri Lankan Rupee) - Primary currency
- **USD** (US Dollar)
- **EUR** (Euro)

Currency conversion rates are updated regularly and stored in the backend.

## 📅 Timezone Handling

All dates and times are handled in **Asia/Colombo** timezone using `date-fns-tz`.

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## 🚀 Deployment

### Production Build
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Environment Setup
1. Set up MongoDB Atlas
2. Configure production environment variables
3. Set up Stripe webhooks
4. Deploy using Docker or your preferred platform

## 📝 API Documentation

The API documentation is available at `/api/v1/docs` when running the backend server.

### Key Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/treatments` - Get treatments
- `GET /api/v1/packages` - Get packages
- `POST /api/v1/bookings` - Create booking
- `POST /api/v1/payments/create-payment-intent` - Create payment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@ayurveda-for-travelers.com or join our Discord community.

## 🙏 Acknowledgments

- Traditional Ayurvedic practitioners in Sri Lanka
- The open-source community
- All contributors and supporters

---

**Made with ❤️ for the wellness community**
