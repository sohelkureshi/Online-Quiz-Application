import React, { useEffect } from 'react';
import { QuizProvider } from './context/QuizContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import QuizStart from './components/Quiz/QuizStart';
import QuizQuestion from './components/Quiz/QuizQuestion';
import QuizResults from './components/Quiz/QuizResults';
import { useQuizContext } from './context/QuizContext';
import { wakeUpServer } from './services/api';
import './styles/App.css';

// Main Quiz Flow Component
const QuizFlow = () => {
  const { quizState } = useQuizContext();

  // Keep server awake by pinging every 10 minutes
  useEffect(() => {
    // Initial ping when app loads
    wakeUpServer();

    // Set up interval to ping server every 10 minutes
    const keepAliveInterval = setInterval(() => {
      console.log('Pinging server to keep it awake');
      wakeUpServer();
    }, 10 * 60 * 1000); // 10 minutes in milliseconds

    // Cleanup interval on component unmount
    return () => {
      clearInterval(keepAliveInterval);
    };
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {/* Animated background elements */}
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>

        {/* Quiz stages based on current state */}
        {quizState === 'start' && <QuizStart />}
        {quizState === 'quiz' && <QuizQuestion />}
        {quizState === 'results' && <QuizResults />}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <QuizProvider>
      <QuizFlow />
    </QuizProvider>
  );
}

export default App;
