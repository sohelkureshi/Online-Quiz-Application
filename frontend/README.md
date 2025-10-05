## Remaining CSS Files

### 30. **src/styles/QuizQuestion.css**

```css
.quiz-question {
  max-width: 900px;
  margin: 0 auto;
}

/* Top Bar */
.quiz-top-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.progress-section {
  flex: 1;
  min-width: 250px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-sm);
}

.question-counter {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.progress-percentage {
  font-size: 0.875rem;
  color: var(--primary-light);
  font-weight: 700;
}

/* Question Card */
.question-card {
  margin-bottom: var(--spacing-xl);
  position: relative;
  overflow: visible;
}

.question-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.question-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: var(--radius-lg);
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
}

.difficulty-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.difficulty-badge.easy {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.difficulty-badge.medium {
  background: rgba(245, 158, 11, 0.2);
  color: var(--warning-color);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.difficulty-badge.hard {
  background: rgba(239, 68, 68, 0.2);
  color: var(--danger-color);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.category-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  background: rgba(59, 130, 246, 0.2);
  color: var(--info-color);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
}

.question-text {
  font-size: 1.5rem;
  line-height: 1.6;
  color: var(--text-primary);
  margin-bottom: var(--spacing-2xl);
  font-weight: 600;
}

/* Options Container */
.options-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.option-button {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  text-align: left;
  font-family: inherit;
  color: var(--text-primary);
  font-size: 1rem;
}

.option-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1));
  transition: width 0.3s ease;
}

.option-button:hover::before {
  width: 100%;
}

.option-button:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(99, 102, 241, 0.5);
  transform: translateX(5px);
}

.option-button.selected {
  background: rgba(99, 102, 241, 0.15);
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.option-indicator {
  flex-shrink: 0;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-normal);
}

.option-button.selected .option-indicator {
  background: var(--primary-color);
  transform: scale(1.1);
}

.option-letter {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-primary);
}

.option-text {
  flex: 1;
  font-size: 1rem;
  line-height: 1.5;
}

.selected-check {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background: var(--success-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  animation: scaleIn 0.3s ease;
}

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* Answer Status */
.answer-status {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: var(--radius-lg);
  margin-top: var(--spacing-lg);
  animation: slideInRight 0.3s ease;
}

.status-icon {
  font-size: 1.25rem;
  color: var(--success-color);
}

.status-text {
  color: var(--success-color);
  font-weight: 600;
  font-size: 0.938rem;
}

@media (max-width: 768px) {
  .quiz-top-bar {
    flex-direction: column;
  }

  .question-text {
    font-size: 1.25rem;
  }

  .option-button {
    padding: var(--spacing-md);
  }

  .option-indicator {
    width: 40px;
    height: 40px;
  }

  .option-letter {
    font-size: 1rem;
  }

  .option-text {
    font-size: 0.938rem;
  }
}
```

### 31. **src/styles/QuizNavigation.css**

```css
.quiz-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  margin-top: var(--spacing-xl);
  flex-wrap: wrap;
}

.navigation-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.answered-count {
  font-size: 0.938rem;
  color: var(--text-secondary);
  font-weight: 600;
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-md);
}

.navigation-buttons {
  display: flex;
  gap: var(--spacing-md);
}

.nav-button {
  min-width: 140px;
}

.submit-button {
  background: linear-gradient(135deg, var(--success-color), #059669);
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
}

.submit-button:hover:not(.disabled) {
  box-shadow: 0 6px 20px rgba(16, 185, 129, 0.6);
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  padding: var(--spacing-md);
}

.modal-content {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-xl);
  max-width: 500px;
  width: 100%;
  box-shadow: var(--shadow-xl);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-xl);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.modal-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 2rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
}

.modal-body {
  padding: var(--spacing-xl);
}

.modal-body p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.modal-body p:last-child {
  margin-bottom: 0;
}

.warning-text {
  color: var(--warning-color);
  font-weight: 600;
  margin-top: var(--spacing-md);
}

.modal-actions {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-xl);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-actions .btn {
  flex: 1;
}

@media (max-width: 640px) {
  .quiz-navigation {
    flex-direction: column;
    align-items: stretch;
  }

  .navigation-info {
    justify-content: center;
  }

  .navigation-buttons {
    width: 100%;
    flex-direction: column;
  }

  .nav-button {
    width: 100%;
  }
}
```

### 32. **src/styles/QuizTimer.css**

```css
.quiz-timer {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.timer-container {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  background: rgba(30, 41, 59, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  min-width: 180px;
}

.timer-icon {
  font-size: 1.5rem;
  animation: tick 1s ease-in-out infinite;
}

@keyframes tick {
  0%, 100% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(10deg);
  }
}

.timer-display {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.timer-value {
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Courier New', monospace;
  line-height: 1;
  transition: color var(--transition-fast);
}

.timer-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.timer-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  transition: width 1s linear, background-color 0.3s ease;
}

.timer-warning {
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: var(--radius-md);
  color: var(--danger-color);
  font-size: 0.875rem;
  font-weight: 600;
  text-align: center;
}

@media (max-width: 640px) {
  .timer-container {
    min-width: 150px;
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .timer-value {
    font-size: 1.25rem;
  }
}
```

### 33. **src/styles/QuizResults.css**

```css
.quiz-results {
  max-width: 900px;
  margin: 0 auto;
  padding: var(--spacing-md);
}

/* Results Header Card */
.results-header-card {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  position: relative;
  overflow: hidden;
}

.results-celebration {
  margin-bottom: var(--spacing-lg);
}

.celebration-icon {
  font-size: 5rem;
  animation: bounce 1s ease-in-out 3;
}

.results-title {
  font-size: 2rem;
  margin-bottom: var(--spacing-xl);
  color: var(--text-primary);
}

/* Score Display */
.score-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.score-circle {
  width: 200px;
  height: 200px;
  border: 8px solid;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: scaleIn 0.5s ease;
}

.score-inner {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
}

.score-value {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-primary);
}

.score-divider {
  font-size: 2rem;
  color: var(--text-muted);
}

.score-total {
  font-size: 2.5rem;
  color: var(--text-secondary);
}

.percentage-display {
  font-size: 3rem;
  font-weight: 800;
  animation: countUp 1s ease;
}

@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.status-label {
  font-size: 1.5rem;
  font-weight: 700;
}

/* Quick Stats */
.quick-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
  margin-top: var(--spacing-2xl);
}

.stat-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-3px);
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.stat-icon.correct {
  background: rgba(16, 185, 129, 0.2);
  color: var(--success-color);
}

.stat-icon.incorrect {
  background: rgba(239, 68, 68, 0.2);
  color: var(--danger-color);
}

.stat-icon.time {
  background: rgba(59, 130, 246, 0.2);
  color: var(--info-color);
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: var(--spacing-xs);
}

/* Detailed Results */
.detailed-results-card {
  margin-bottom: var(--spacing-xl);
}

.detailed-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.detailed-title {
  font-size: 1.75rem;
  margin-bottom: var(--spacing-sm);
}

.detailed-subtitle {
  color: var(--text-secondary);
  margin: 0;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Result Item */
.result-item {
  padding: var(--spacing-xl);
  background: rgba(255, 255, 255, 0.03);
  border-radius: var(--radius-lg);
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all var(--transition-normal);
}

.result-item.correct {
  border-color: rgba(16, 185, 129, 0.3);
  background: rgba(16, 185, 129, 0.05);
}

.result-item.incorrect {
  border-color: rgba(239, 68, 68, 0.3);
  background: rgba(239, 68, 68, 0.05);
}

.result-header {
  display: flex;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
}

.result-number {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  flex-shrink: 0;
}

.result-number span {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-secondary);
}

.result-status {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  color: white;
}

.result-status.correct {
  background: var(--success-color);
}

.result-status.incorrect {
  background: var(--danger-color);
}

.result-question {
  flex: 1;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.5;
}

/* Result Answers */
.result-answers {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.answer-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
}

.answer-option.correct-answer {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.3);
}

.answer-option.wrong-answer {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
}

.answer-option.user-correct {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(16, 185, 129, 0.4);
}

.answer-letter {
  width: 35px;
  height: 35px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}

.answer-text {
  flex: 1;
  color: var(--text-secondary);
  font-size: 0.938rem;
}

.answer-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(16, 185, 129, 0.2);
  color: var(--success-color);
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.answer-badge.wrong {
  background: rgba(239, 68, 68, 0.2);
  color: var(--danger-color);
  border: 1px solid rgba(239, 68, 68, 0.3);
}

/* Actions */
.results-actions {
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-xl);
}

.restart-button {
  min-width: 250px;
}

/* Motivation Card */
.motivation-card {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 1px solid rgba(99, 102, 241, 0.2);
  text-align: center;
}

.motivation-text {
  font-size: 1.125rem;
  color: var(--text-primary);
  margin: 0;
  font-weight: 500;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .results-title {
    font-size: 1.5rem;
  }

  .celebration-icon {
    font-size: 3.5rem;
  }

  .score-circle {
    width: 150px;
    height: 150px;
    border-width: 6px;
  }

  .score-value {
    font-size: 2.5rem;
  }

  .score-total {
    font-size: 1.75rem;
  }

  .percentage-display {
    font-size: 2rem;
  }

  .quick-stats {
    grid-template-columns: 1fr;
  }

  .result-header {
    flex-direction: column;
    gap: var(--spacing-md);
  }

  .result-question {
    font-size: 1rem;
  }

  .restart-button {
    width: 100%;
  }
}
```

***

## Configuration Files

### 34. **.env**

```env
# API Configuration
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=QuizMaster
REACT_APP_VERSION=1.0.0

# Quiz Settings (Optional - can be hardcoded in constants)
REACT_APP_QUIZ_TIME_LIMIT=600
```

### 35. **.gitignore**

```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
Thumbs.db
```

### 36. **README.md**

```markdown
# QuizMaster - Frontend

A modern, responsive React application for an interactive online quiz platform with a beautiful glassmorphism UI.

## 🚀 Features

- ✨ **Modern UI Design** - Glassmorphism effects with smooth animations
- ⏱️ **Real-time Timer** - Countdown timer with visual warnings
- 📊 **Progress Tracking** - Visual progress bar and question counter
- 🎯 **Interactive Questions** - Smooth transitions and hover effects
- 📱 **Fully Responsive** - Works seamlessly on all devices
- 🎨 **Beautiful Results** - Detailed score breakdown with answer review
- 🔄 **State Management** - Context API for efficient state handling
- ⚡ **Fast Performance** - Optimized React components

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
```

## 🎮 Available Scripts

### `npm start`
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.
Optimizes the build for best performance.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
**Note: this is a one-way operation!**
Ejects from Create React App for full configuration control.

## 🎨 UI Features

### Glassmorphism Design
- Semi-transparent backgrounds with blur effects
- Smooth color gradients
- Modern card designs with shadows

### Animations
- Smooth page transitions
- Hover effects on interactive elements
- Progress animations
- Celebration effects on quiz completion

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly interface

## 🔧 Configuration

### API URL
Update the API URL in `.env` file:
```
REACT_APP_API_URL=http://your-api-url/api
```

### Quiz Settings
Modify settings in `src/utils/constants.js`:
```
export const QUIZ_TIME_LIMIT = 600; // 10 minutes
export const PASSING_PERCENTAGE = 60;
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🎯 Key Components

### QuizContext
Global state management for:
- Quiz flow state
- Questions data
- User answers
- Results

### useTimer Hook
Custom hook for timer functionality:
- Countdown timer
- Auto-submit on time up
- Pause/resume capabilities

### API Service
Centralized API calls with:
- Error handling
- Request/response interceptors
- Loading states

## 🐛 Troubleshooting

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

## 📈 Performance Tips

1. **Build for Production**
   ```
   npm run build
   ```

2. **Analyze Bundle Size**
   ```
   npm run build -- --stats
   ```

3. **Enable Gzip Compression** on your server

4. **Use CDN** for static assets in production

## 🚀 Deployment

### Build Production Bundle
```
npm run build
```

### Deploy to Netlify
```
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### Deploy to Vercel
```
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Deploy to GitHub Pages
```
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json
"homepage": "https://yourusername.github.io/quiz-app",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
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
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Sohel Kureshi](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from modern web applications
- Icons and emojis for better UX
- React community for amazing tools and libraries

---

**Made with ❤️ for learning and fun!**
```

***

## 🎯 Complete Setup & Run Instructions

### **Step 1: Backend Setup** (if not already done)

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

### **Step 2: Frontend Setup**

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start frontend
npm start
```

Frontend will open automatically at: `http://localhost:3000`

### **Step 3: Test the Application**

1. Open browser at `http://localhost:3000`
2. Enter Sohel Kureshi (optional)
3. Click "Start Quiz"
4. Answer questions using the options
5. Navigate between questions
6. Submit quiz when done
7. View detailed results

---

## 🎨 UI Preview Features

✅ **Glassmorphism effects** throughout the app  
✅ **Smooth animations** and transitions  
✅ **Responsive design** for all screen sizes  
✅ **Real-time timer** with visual warnings  
✅ **Progress tracking** with percentage  
✅ **Interactive question cards** with hover effects  
✅ **Beautiful results page** with detailed breakdown  
✅ **Professional color scheme** with gradients  
✅ **Modern typography** using Inter & Poppins fonts  
✅ **Accessibility** features with proper focus states  

***

Your **QuizMaster** application is now complete with a professional, modern, and sexy UI! 🚀🎉