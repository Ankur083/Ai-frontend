import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  ChevronRight, 
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProgressBar } from '../components/ui/ProgressBar';

const MOCK_QUESTIONS = [
  {
    id: 'p1',
    text: 'How familiar are you with React Hooks?',
    options: ['Never heard of them', 'Know what they are', 'Used them in projects', 'Expert level'],
  },
  {
    id: 'p2',
    text: 'What is your preferred way to manage state?',
    options: ['useState/useReducer', 'Redux/Zustand', 'Context API', 'Prop drilling'],
  },
  {
    id: 'p3',
    text: 'Have you worked with TypeScript before?',
    options: ['No', 'A little', 'Regularly', 'Daily'],
  }
];

export default function PreEvaluation() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState<number | null>(null);
  const [isFinished, setIsFinished] = React.useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedOption === null) return;
    
    if (currentQuestion < MOCK_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      setTimeout(() => navigate('/learning-video'), 1500);
    }
  };

  const progress = ((currentQuestion + 1) / MOCK_QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="eval"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="p-10 sm:p-16 rounded-[40px]">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                      <Brain size={24} />
                    </div>
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Pre-Evaluation</h1>
                      <p className="text-slate-500 text-sm">Question {currentQuestion + 1} of {MOCK_QUESTIONS.length}</p>
                    </div>
                  </div>
                  <div className="w-32">
                    <ProgressBar value={progress} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-800 mb-8 leading-tight">
                  {MOCK_QUESTIONS[currentQuestion].text}
                </h2>

                <div className="space-y-4">
                  {MOCK_QUESTIONS[currentQuestion].options.map((option, index) => (
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
                      <span className={cn(
                        "font-medium",
                        selectedOption === index ? "text-indigo-900" : "text-slate-600"
                      )}>{option}</span>
                      {selectedOption === index && (
                        <CheckCircle2 size={20} className="text-indigo-600" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="mt-12 flex justify-end">
                  <Button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className="px-10"
                    icon={<ChevronRight size={20} />}
                  >
                    {currentQuestion === MOCK_QUESTIONS.length - 1 ? 'Finish Assessment' : 'Next Question'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="p-16 text-center rounded-[40px]">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 size={40} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">Assessment Complete</h1>
                <p className="text-slate-500 text-lg">
                  We've analyzed your responses. Redirecting you to your first learning module...
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
