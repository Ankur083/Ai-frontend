import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Timer, 
  HelpCircle, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Loader2,
  XCircle,
  RefreshCw,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';
import { generateTopicQuiz, QuizQuestion, StudyPlan } from '../lib/gemini';

export default function Quiz() {
  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [timeLeft, setTimeLeft] = React.useState(600); // 10 minutes
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFinished, setIsFinished] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchQuiz = async () => {
      const storedPlan = localStorage.getItem('currentStudyPlan');
      const storedIndex = localStorage.getItem('currentTopicIndex');
      const difficulty = localStorage.getItem('currentDifficulty') || 'Beginner';
      
      if (!storedPlan) {
        navigate('/goal-input');
        return;
      }

      const plan: StudyPlan = JSON.parse(storedPlan);
      const index = parseInt(storedIndex || '0');
      const subTopic = plan.subTopics[index];

      try {
        const q = await generateTopicQuiz(plan.topic, subTopic.title, difficulty);
        setQuestions(q);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuiz();
  }, [navigate]);

  React.useEffect(() => {
    if (timeLeft > 0 && !isFinished && !isLoading) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, isFinished, isLoading]);

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

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(newAnswers[currentQuestion + 1] ?? null);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: number[]) => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (finalAnswers[i] === q.correctAnswer) correct++;
    });
    const finalScore = (correct / questions.length) * 100;
    setScore(finalScore);
    setIsFinished(true);
    setShowResult(true);
  };

  const handleContinue = () => {
    const storedIndex = parseInt(localStorage.getItem('currentTopicIndex') || '0');
    const storedPlan = JSON.parse(localStorage.getItem('currentStudyPlan') || '{}') as StudyPlan;

    if (score >= 80) {
      // Pass -> Next topic
      if (storedIndex < storedPlan.subTopics.length - 1) {
        localStorage.setItem('currentTopicIndex', (storedIndex + 1).toString());
        navigate('/learning-video');
      } else {
        // All topics done -> Final Result
        navigate('/result');
      }
    } else {
      // Fail -> Re-teach
      navigate('/learning-video');
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Generating your quiz...</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
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
            <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-[32px] border-slate-100">
              <div>
                <h1 className="text-xl font-extrabold text-slate-900">Module Knowledge Check</h1>
                <p className="text-slate-500 text-sm mt-1 font-medium tracking-tight">Question {currentQuestion + 1} of {questions.length}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-5 py-3 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                  <Timer size={20} className="text-indigo-600" />
                  <span className="font-mono font-black text-slate-700 text-lg tracking-tighter">{formatTime(timeLeft)}</span>
                </div>
              </div>
            </Card>

            {/* Progress Bar */}
            <ProgressBar value={progress} />

            {/* Question Card */}
            <Card className="p-10 sm:p-16 rounded-[48px] relative overflow-hidden border-slate-100 shadow-2xl shadow-indigo-500/5">
              <div className="absolute top-0 left-0 w-2.5 h-full bg-indigo-600"></div>
              
              <div className="flex items-start gap-6 mb-12">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                  <HelpCircle size={28} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-800 leading-tight tracking-tight">
                  {questions[currentQuestion].text}
                </h2>
              </div>

              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedOption(index)}
                    className={cn(
                      "w-full p-6 rounded-3xl text-left border-2 transition-all flex items-center justify-between group",
                      selectedOption === index 
                        ? "border-indigo-600 bg-indigo-50/50" 
                        : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors shadow-sm",
                        selectedOption === index ? "bg-indigo-600 text-white" : "bg-white text-slate-400 group-hover:text-slate-600"
                      )}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className={cn(
                        "font-bold text-lg",
                        selectedOption === index ? "text-indigo-900" : "text-slate-600"
                      )}>{option}</span>
                    </div>
                    {selectedOption === index && (
                      <CheckCircle2 size={24} className="text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Footer Actions */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentQuestion === 0}
                className={cn(
                  "px-8 py-6 rounded-2xl",
                  currentQuestion === 0 && "opacity-0 pointer-events-none"
                )}
                icon={<ChevronLeft size={20} />}
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={selectedOption === null}
                className="px-12 py-6 rounded-2xl shadow-xl shadow-indigo-500/20"
                icon={<ChevronRight size={20} />}
              >
                {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-16 text-center rounded-[48px] border-slate-100 shadow-2xl">
              <div className={cn(
                "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl",
                score >= 80 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
              )}>
                {score >= 80 ? <CheckCircle2 size={48} /> : <XCircle size={48} />}
              </div>
              
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                {score >= 80 ? 'Mastery Achieved!' : 'Keep Practicing!'}
              </h1>
              
              <div className="text-6xl font-black text-indigo-600 mb-6 tracking-tighter">
                {Math.round(score)}%
              </div>
              
              <p className="text-slate-500 text-lg mb-12 leading-relaxed">
                {score >= 80 
                  ? "Excellent work! You've demonstrated a strong understanding of this module. Ready to move forward?"
                  : "You're almost there! We recommend reviewing the lesson content once more to solidify your understanding."
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {score < 80 && (
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate('/learning-video')}
                    className="px-10 py-6 rounded-2xl"
                    icon={<RefreshCw size={20} />}
                  >
                    Review Lesson
                  </Button>
                )}
                <Button 
                  onClick={handleContinue}
                  className="px-12 py-6 rounded-2xl shadow-xl shadow-indigo-500/20"
                  icon={<ArrowRight size={20} />}
                >
                  {score >= 80 ? 'Next Module' : 'Try Again'}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
