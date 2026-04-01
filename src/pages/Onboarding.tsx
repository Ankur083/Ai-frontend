import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  ChevronRight, 
  ChevronLeft, 
  Target, 
  Zap, 
  BookOpen, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to AdaptiveLearn',
    description: 'Let\'s personalize your learning experience in just a few steps.',
    icon: Sparkles,
    color: 'bg-indigo-600'
  },
  {
    id: 'goals',
    title: 'What are your goals?',
    description: 'Select the areas you want to focus on.',
    icon: Target,
    color: 'bg-emerald-600'
  },
  {
    id: 'level',
    title: 'Your current level',
    description: 'Help us tailor the content to your expertise.',
    icon: Zap,
    color: 'bg-amber-600'
  }
];

const GOALS = [
  { id: 'dev', label: 'Web Development', icon: BookOpen },
  { id: 'design', label: 'UI/UX Design', icon: Sparkles },
  { id: 'business', label: 'Business & Strategy', icon: Target },
  { id: 'data', label: 'Data Science', icon: Zap },
];

const LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'I\'m just starting out' },
  { id: 'intermediate', label: 'Intermediate', desc: 'I have some experience' },
  { id: 'advanced', label: 'Advanced', desc: 'I\'m looking to master my skills' },
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [selectedGoals, setSelectedGoals] = React.useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/quiz-topics');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const step = STEPS[currentStep];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          {STEPS.map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === currentStep ? "w-8 bg-indigo-600" : "w-2 bg-slate-200"
              )}
            />
          ))}
        </div>

        <motion.div 
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 p-10 sm:p-16 border border-slate-100 text-center"
        >
          <div className={cn(
            "w-20 h-20 rounded-[28px] flex items-center justify-center text-white mx-auto mb-8 shadow-xl",
            step.color
          )}>
            <step.icon size={40} />
          </div>

          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{step.title}</h1>
          <p className="text-slate-500 text-lg mb-12">{step.description}</p>

          {/* Step Content */}
          <div className="min-h-[240px] flex items-center justify-center">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-left border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Personalized Path</p>
                    <p className="text-sm text-slate-500">We adjust content based on your progress.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl text-left border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <Target size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">Goal Tracking</p>
                    <p className="text-sm text-slate-500">Set milestones and track your achievements.</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {GOALS.map((goal) => (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all text-left flex items-center gap-4 group",
                      selectedGoals.includes(goal.id)
                        ? "border-indigo-600 bg-indigo-50/50"
                        : "border-slate-100 bg-slate-50 hover:border-slate-200"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                      selectedGoals.includes(goal.id) ? "bg-indigo-600 text-white" : "bg-white text-slate-400 group-hover:text-slate-600"
                    )}>
                      <goal.icon size={20} />
                    </div>
                    <span className={cn(
                      "font-bold",
                      selectedGoals.includes(goal.id) ? "text-indigo-900" : "text-slate-600"
                    )}>{goal.label}</span>
                  </button>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 w-full">
                {LEVELS.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={cn(
                      "w-full p-6 rounded-3xl border-2 transition-all text-left flex items-center justify-between group",
                      selectedLevel === level.id
                        ? "border-indigo-600 bg-indigo-50/50"
                        : "border-slate-100 bg-slate-50 hover:border-slate-200"
                    )}
                  >
                    <div>
                      <p className={cn(
                        "font-bold",
                        selectedLevel === level.id ? "text-indigo-900" : "text-slate-800"
                      )}>{level.label}</p>
                      <p className="text-sm text-slate-500">{level.desc}</p>
                    </div>
                    {selectedLevel === level.id && (
                      <CheckCircle2 size={24} className="text-indigo-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="mt-16 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-slate-500 hover:bg-slate-100 transition-all",
                currentStep === 0 && "opacity-0 pointer-events-none"
              )}
            >
              <ChevronLeft size={20} />
              Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && selectedGoals.length === 0) ||
                (currentStep === 2 && !selectedLevel)
              }
              className={cn(
                "flex items-center gap-2 px-10 py-4 rounded-2xl font-bold transition-all shadow-lg",
                ((currentStep === 1 && selectedGoals.length === 0) || (currentStep === 2 && !selectedLevel))
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200"
              )}
            >
              {currentStep === STEPS.length - 1 ? 'Get Started' : 'Continue'}
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
