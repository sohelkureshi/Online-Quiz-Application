### README.md (Frontend)

```markdown
# QuizMaster - Frontend

A modern, responsive React application for an interactive online quiz platform with a beautiful glassmorphism UI.

## 🚀 Features

- **Modern UI Design** - Glassmorphism effects with smooth animations
- **Real-time Timer** - Countdown timer with visual warnings
- **Progress Tracking** - Visual progress bar and question counter
- **Interactive Questions** - Smooth transitions and hover effects
- **Fully Responsive** - Works seamlessly on all devices
- **Beautiful Results** - Detailed score breakdown with answer review
- **State Management** - Context API for efficient state handling


## 🛠️ Tech Stack

- **React 18** - Latest version with hooks
- **Context API** - Global state management
- **Axios** - HTTP client for API calls
- **CSS3** - Modern styling with animations
- **Custom Hooks** - Reusable logic (useTimer, useQuiz)

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on http://localhost:5000

### Setup Steps

1. **Navigate to frontend directory**
```
cd frontend
```

2. **Install dependencies**
```
npm install
```

3. **Create environment file**
```
# Create .env file in frontend root
touch .env
```

Add the following to `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start development server**
```
npm start
```

The app will open at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   ├── Quiz/
│   │   │   ├── QuizStart.jsx
│   │   │   ├── QuizQuestion.jsx
│   │   │   ├── QuizNavigation.jsx
│   │   │   ├── QuizTimer.jsx
│   │   │   └── QuizResults.jsx
│   │   │
│   │   ├── UI/
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── ProgressBar.jsx
│   │   │
│   │   └── Layout/
│   │       ├── Header.jsx
│   │       └── Footer.jsx
│   │
│   ├── context/
│   │   └── QuizContext.jsx
│   │
│   ├── hooks/
│   │   └── useTimer.js
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── styles/
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Footer.css
│   │   ├── Card.css
│   │   ├── Button.css
│   │   ├── Loader.css
│   │   ├── ProgressBar.css
│   │   ├── QuizStart.css
│   │   ├── QuizQuestion.css
│   │   ├── QuizNavigation.css
│   │   ├── QuizTimer.css
│   │   └── QuizResults.css
│   │
│   ├── App.jsx
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
└── README.md


### Quiz Settings
Modify settings in `src/utils/constants.js`:
```
export const QUIZ_TIME_LIMIT = 600; // 10 minutes
export const PASSING_PERCENTAGE = 60;
```


### API Connection Issues
```
# Check if backend is running
curl http://localhost:5000/api/health

# Verify REACT_APP_API_URL in .env
echo $REACT_APP_API_URL
```

### Port Already in Use
```
# Run on different port
PORT=3001 npm start
```

### Clear Cache
```
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Use ES6+ features
- Follow React best practices
- Write meaningful component names
- Add comments for complex logic
- Keep components small and focused

## 👨‍💻 Author

**Sohel Kureshi**
- GitHub: [@sohelkureshi](https://github.com/sohelkureshi)
- LinkedIn: [Sohel Kureshi](https://linkedin.com/in/sohelkureshi/)
- Portfolio: [mywebsite.com](https://sohelkureshi.github.io/me)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern web applications
- Icons and emojis for better UX
- React community for amazing tools and libraries

---

**Made with ❤️ for learning and fun!**
```


