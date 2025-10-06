# Quiz Application - Backend API

A robust RESTful API for an online quiz application built with Node.js, Express, and SQLite.

## Features

- ✅ Fetch quiz questions without revealing correct answers
- ✅ Submit answers and get detailed scoring
- ✅ View which questions were answered correctly/incorrectly
- ✅ Store quiz results with timestamps
- ✅ Comprehensive error handling
- ✅ Input validation
- ✅ Unit tests for scoring logic

## Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** SQLite3
- **Testing:** Jest
- **Other:** CORS, dotenv

## Setup Instructions

### 1. Install Dependencies



### **Backend Setup** 

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
echo "PORT=5000
NODE_ENV=development
DB_PATH=./database/quiz.db
ALLOWED_ORIGINS=http://localhost:3000" > .env

# Seed database
npm run seed

# Start backend server
npm run dev
```

Backend will run on: `http://localhost:5000`


