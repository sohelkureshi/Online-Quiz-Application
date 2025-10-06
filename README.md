# QuizMaster - Online Quiz Application

A full-stack web application for conducting online quizzes with real-time timer, dynamic question selection, and detailed performance analytics.

## Project Overview

QuizMaster is an interactive quiz platform that randomly selects 15 questions from a database of 60 questions (categorized by difficulty: easy, medium, hard) to provide a unique quiz experience each time. The application features a modern glassmorphism UI, real-time countdown timer, and comprehensive result analysis.

**Live Demo:**
-  https://online-quiz-application-xi.vercel.app/

## Features

**Core Functionality:**
- Random question selection (5 easy, 5 medium, 5 hard per quiz)
- 10-minute countdown timer with visual warnings
- Question navigation with Previous/Next buttons
- Skip questions without answering
- Clear selected answers
- Detailed results with answer review
- Automatic scoring (unanswered questions marked as incorrect)
- No negative marking


## Technology Stack

**Frontend:**
- React 18.2.0
- Context API for state management
- Axios for HTTP requests
- CSS3 with custom animations
- Deployed on Vercel

**Backend:**
- Node.js with Express.js
- SQLite database
- RESTful API architecture
- CORS enabled
- Deployed on Render

## Project Structure

```
quiz-application/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Business logic
│   ├── middleware/      # Error handling and validation
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── tests/           # Test files
│   ├── utils/           # Helper functions and database seeding
│   ├── database/        # SQLite database file
│   ├── server.js        # Entry point
│   └── package.json
│
├── frontend/
│   ├── public/          # Static files
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # Context API setup
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API service layer
│   │   ├── styles/      # CSS files
│   │   ├── utils/       # Helper functions
│   │   ├── App.jsx      # Main component
│   │   └── index.js     # Entry point
│   └── package.json
│
└── README.md
```

## Local Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Git

### Backend Setup

1. Clone the repository:
```bash
git clone https://github.com/sohelkureshi/Online-Quiz-Application.git
cd Online-Quiz-Application
```

2. Navigate to backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
npm install
```

4. Create a .env file in the backend directory:
```
PORT=5000
NODE_ENV=development
DB_PATH=./database/quiz.db
ALLOWED_ORIGINS=http://localhost:3000
QUIZ_TIME_LIMIT=600
```

5. Seed the database with 60 questions:
```bash
npm run seed
```

You should see:
```
Database seeded successfully with 60 questions!
Easy: 20 | Medium: 20 | Hard: 20
```

6. Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

1. Open a new terminal and navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:
```bash
npm start
```

The application will open at http://localhost:3000

## Running the Application

1. Ensure the backend server is running on port 5000
2. Ensure the frontend server is running on port 3000
3. Open your browser and navigate to http://localhost:3000
4. Enter your name (optional) and click "Start Quiz"
5. Answer questions, use navigation buttons to move between questions
6. Submit the quiz to see your detailed results

## Running Test Cases

### Backend Tests

The backend includes unit tests for the quiz scoring logic.

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run tests:
```bash
npm test
```


**Test Coverage:**
-Scoring logic for all correct answers
-Scoring logic for partial correct answers
-Scoring logic for all wrong answers
-Handling of unanswered questions (marked as incorrect)
-Edge cases such as empty answer submissions
-Helper function tests including time formatting and array operations
-Verification that unanswered questions count toward total score
-Percentage calculation for different score combinations


## API Endpoints

### GET /api/health
Health check endpoint
- Returns: Server status

### GET /api/quiz/questions
Fetch 15 random quiz questions
- Returns: Array of questions without correct answers
- Question distribution: 5 easy, 5 medium, 5 hard

### POST /api/quiz/submit
Submit quiz answers and get results
- Body: 
```json
{
  "answers": [{"questionId": 1, "selectedOption": "A"}],
  "questionIds": [1, 2, 3, ...],
  "userName": "John Doe",
  "timeTaken": 480
}
```
- Returns: Score, percentage, detailed results with correct/incorrect breakdown


## Design Choices and Assumptions

### Architecture Decisions

**1. Monorepo Structure:**
I chose to separate backend and frontend into distinct folders within the same repository. This simplifies development and deployment while maintaining clear separation of concerns.

**2. SQLite Database:**
Instead of MongoDB, I used SQLite for simplicity and portability. The database file is included in the repository (after seeding) to ensure questions are available immediately after deployment. For a production application with multiple users and concurrent access, PostgreSQL or MongoDB would be more appropriate.

**3. Random Question Selection:**
Questions are randomly selected from the database on each quiz attempt rather than serving a fixed set. This provides variety and prevents memorization. The selection is stratified by difficulty (5 easy, 5 medium, 5 hard) to ensure balanced quizzes.

**4. Context API for State Management:**
I used React's Context API instead of Redux for state management as the application state is relatively simple and doesn't require the complexity of Redux. This keeps the codebase lighter and easier to understand.

**5. Scoring Logic:**
- All 15 questions are counted in the final score
- Unanswered questions are marked as incorrect (0 points)
- No negative marking is applied
- The total score is always out of 15, regardless of how many questions were attempted

**6. No User Authentication:**
The application does not require user login. Users can optionally provide their name, but it's not mandatory. This lowers the barrier to entry and makes it easy to try the quiz.

**7. Single Quiz Session:**
Users can take one quiz at a time. There's no quiz history or user profile. For a production application, implementing user accounts would enable tracking progress over multiple attempts.

#### Assumptions 

**1. Free Tier Limitations:**
The Render free tier causes the backend to spin down after 15 minutes of inactivity, resulting in a 30-second cold start on the first request. This is acceptable for a demonstration project but would require a paid tier for production use.

**2. Enhanced User Experience Features:**
I implemented skip and clear answer functionality to improve quiz flexibility. Users can skip questions and return to them later, or clear their selected answer if they change their mind.




## Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Create a new Web Service on Render
3. Connect your GitHub repository
4. Configure:
   - Root Directory: backend
   - Build Command: npm install && npm run build
   - Start Command: npm start
   - Add environment variables
5. Deploy

### Frontend Deployment (Vercel)

1. Import project from GitHub
2. Configure:
   - Framework: Create React App
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: build
3. Add environment variable: REACT_APP_API_URL
4. Deploy

## Known Limitations

1. Free tier backend spins down after 15 minutes (30-second cold start)
2. No user authentication or quiz history
3. Fixed question pool (60 questions)
4. No admin panel for question management
5. Browser refresh during quiz will lose progress
6. No mobile app version

## Future Enhancements

- User authentication and profile management
- Quiz history and performance tracking over time
- Admin panel for question CRUD operations
- Question categories and topic-based filtering
- Difficulty-based quiz modes
- Timed challenges and leaderboards
- Social sharing of results
- Multi-language support
- Accessibility improvements (WCAG compliance)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Author

Sohel Kureshi
- GitHub: https://github.com/sohelkureshi
- Myportfolio : https://sohelkureshi.github.io/me/
- VNIT Nagpur, 2025 Batch

