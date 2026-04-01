import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MOCK_QUIZ = {
  title: 'React Fundamentals Assessment',
  questions: [
    {
      id: 'q1',
      text: 'What is the primary purpose of the useEffect hook in React?',
      options: [
        'To handle side effects in functional components',
        'To manage global state across the entire application',
        'To define the structure of a component',
        'To style components using CSS-in-JS'
      ],
      correctAnswer: 0
    },
    {
      id: 'q2',
      text: 'Which of the following is NOT a rule of hooks?',
      options: [
        'Only call hooks at the top level',
        'Only call hooks from React functions',
        'Hooks can be called inside loops or conditions',
        'Custom hooks should start with "use"'
      ],
      correctAnswer: 2
    },
    {
      id: 'q3',
      text: 'What does the "virtual DOM" help with?',
      options: [
        'Creating 3D graphics in the browser',
        'Improving performance by minimizing direct DOM manipulation',
        'Storing user data securely on the server',
        'Translating React code into machine language'
      ],
      correctAnswer: 1
    }
  ]
};

import { cn } from '../lib/utils';

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [timeLeft, setTimeLeft] = React.useState(600); // 10 minutes
  const [isFinished, setIsFinished] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (timeLeft > 0 && !isFinished) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

    if (currentQuestion < MOCK_QUIZ.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(newAnswers[currentQuestion + 1] ?? null);
    } else {
      setIsFinished(true);
      // In a real app, we'd calculate score and navigate to results
      setTimeout(() => navigate('/result'), 1500);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const progress = ((currentQuestion + 1) / MOCK_QUIZ.questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <AnimatePresence mode="wait">
        {!isFinished ? (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <h1 className="text-xl font-bold text-slate-900">{MOCK_QUIZ.title}</h1>
                <p className="text-slate-500 text-sm mt-1">Question {currentQuestion + 1} of {MOCK_QUIZ.questions.length}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-xl border border-slate-200">
                  <Timer size={18} className="text-indigo-600" />
                  <span className="font-mono font-bold text-slate-700">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-indigo-600 rounded-full"
              />
            </div>

            {/* Question Card */}
            <div className="bg-white p-8 sm:p-12 rounded-[40px] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
              
              <div className="flex items-start gap-4 mb-8">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                  <HelpCircle size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 leading-tight">
                  {MOCK_QUIZ.questions[currentQuestion].text}
                </h2>
              </div>

              <div className="space-y-4">
                {MOCK_QUIZ.questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    className={cn(
                      "w-full p-5 rounded-2xl text-left border-2 transition-all flex items-center justify-between group",
                      selectedOption === index 
                        ? "border-indigo-600 bg-indigo-50/50" 
                        : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors",
                        selectedOption === index ? "bg-indigo-600 text-white" : "bg-white text-slate-400 group-hover:text-slate-600"
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className={cn(
                        "font-medium",
                        selectedOption === index ? "text-indigo-900" : "text-slate-600"
                      )}>{option}</span>
                    </div>
                    {selectedOption === index && (
                      <CheckCircle2 size={20} className="text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-0 transition-all"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              
              <button
                onClick={handleNext}
                disabled={selectedOption === null}
                className={cn(
                  "flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg",
                  selectedOption === null 
                    ? "bg-slate-200 text-slate-400 cursor-not-allowed" 
                    : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
                )}
              >
                {currentQuestion === MOCK_QUIZ.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="finishing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-indigo-200 animate-bounce">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Quiz Completed!</h1>
            <p className="text-slate-500 text-lg max-w-md">
              Great job! We're analyzing your answers to provide personalized feedback and update your learning path.
            </p>
            <div className="mt-12 flex gap-4">
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse delay-150"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
