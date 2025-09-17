# Ayurveda Globe 🌍

A MERN stack application for Ayurvedic travel & treatments in Sri Lanka, designed for foreign visitors seeking authentic wellness experiences.

## Overview

Ayurveda Globe connects international travelers with certified Ayurvedic practitioners, clinics, and treatments across Sri Lanka. The platform offers:

- Browse authentic Ayurvedic treatments and practitioners
- Book consultations and treatments at verified clinics
- Multi-currency support (LKR, USD, EUR)
- Internationalization (English default, expandable)
- Secure payments via Stripe
- Location-based services across Sri Lankan cities

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + React Router
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Authentication**: JWT
- **Payments**: Stripe
- **Deployment**: Docker + Docker Compose + Nginx
- **CI/CD**: GitHub Actions

## Quick Start

### Prerequisites
- Node.js 20+
- MongoDB
- Docker & Docker Compose (optional)

### Local Development

1. **Environment Setup**
   ```bash
   cp .env.example backend/.env
   cp .env.example frontend/.env
   # Edit the .env files with your actual values
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Servers**
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

### Docker Development

```bash
docker-compose up --build
```
- Application: http://localhost:80
- API: http://localhost:80/api

## Environment Variables

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `4000` |
| `MONGO_URI` | MongoDB connection | `mongodb://localhost:27017/ayurveda-globe` |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key` |
| `STRIPE_SECRET_KEY` | Stripe secret key | `sk_test_...` |
| `CORS_ORIGIN` | Frontend URL | `http://localhost:5173` |

### Frontend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:4000/api/v1` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` |

## Project Structure

```
ayurveda-globe/
├── backend/          # Node.js + Express API
├── frontend/         # React + TypeScript SPA
├── infra/           # Docker configurations
├── .github/         # CI/CD workflows
└── scripts/         # Development scripts
```

## Features

### Core Functionality
- User registration and authentication
- Practitioner profiles and specialties
- Treatment catalog with pricing in LKR
- Clinic locations across Sri Lanka
- Booking system with time slots
- Order management and payment processing

### International Support
- **Timezone**: Asia/Colombo (UTC+5:30)
- **Currency**: LKR primary with USD/EUR conversion
- **Localization**: i18next ready (English default)

### Locations Covered
- Colombo, Kandy, Galle, Negombo, Ella, Nuwara Eliya, and more

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### Core Resources
- `GET /api/v1/treatments` - List treatments
- `GET /api/v1/practitioners` - List practitioners
- `GET /api/v1/clinics` - List clinics
- `POST /api/v1/bookings` - Create booking
- `POST /api/v1/orders` - Process payment

## Development Scripts

- `npm run dev` - Start both frontend and backend
- `npm run build` - Build both applications
- `npm run lint` - Lint both workspaces (TODO)
- `npm test` - Run tests (TODO)

## Deployment

The application is containerized and ready for deployment with Docker Compose. Nginx serves as a reverse proxy routing `/api` to the backend and serving the React SPA.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests (TODO: setup testing framework)
5. Submit a pull request

## TODO

- [ ] Add ESLint and Prettier configuration
- [ ] Implement comprehensive test suites
- [ ] Add real-time currency conversion API
- [ ] Implement email notifications
- [ ] Add image upload for treatments and practitioners
- [ ] Setup monitoring and logging
- [ ] Add rate limiting and security headers

## License

MIT License - see LICENSE file for details

---

**Built with ❤️ for authentic Ayurvedic wellness experiences in Sri Lanka**
