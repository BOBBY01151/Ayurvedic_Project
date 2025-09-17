#!/bin/bash

# Ayurveda Globe Development Script
# This script starts both frontend and backend in development mode

set -e

echo "🌿 Starting Ayurveda Globe Development Environment..."

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed. Please install npm first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Error: Node.js version 20+ is required. Current version: $(node -v)"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing root dependencies..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend && npm install && cd ..
fi

# Check for environment files
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env not found. Copying from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example backend/.env
        echo "✅ Created backend/.env - please update with your actual values"
    else
        echo "❌ Error: .env.example not found. Please create backend/.env manually."
        exit 1
    fi
fi

if [ ! -f "frontend/.env" ]; then
    echo "⚠️  Warning: frontend/.env not found. Copying from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example frontend/.env
        echo "✅ Created frontend/.env - please update with your actual values"
    else
        echo "❌ Error: .env.example not found. Please create frontend/.env manually."
        exit 1
    fi
fi

# Check if MongoDB is running (optional)
if command -v mongosh &> /dev/null; then
    if ! mongosh --eval "db.runCommand('ping')" --quiet &> /dev/null; then
        echo "⚠️  Warning: MongoDB connection failed. Make sure MongoDB is running or update MONGO_URI in backend/.env"
    else
        echo "✅ MongoDB connection successful"
    fi
elif command -v mongo &> /dev/null; then
    if ! mongo --eval "db.runCommand('ping')" --quiet &> /dev/null; then
        echo "⚠️  Warning: MongoDB connection failed. Make sure MongoDB is running or update MONGO_URI in backend/.env"
    else
        echo "✅ MongoDB connection successful"
    fi
else
    echo "⚠️  Warning: MongoDB client not found. Install MongoDB or use a cloud database."
fi

# Start development servers
echo ""
echo "🚀 Starting development servers..."
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo "   API Docs: http://localhost:4000/api/v1"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Use concurrently to run both servers
npm run dev
