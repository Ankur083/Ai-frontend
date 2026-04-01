import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  ArrowRight, 
  BookOpen, 
  Target, 
  Zap, 
  Sparkles,
  Edit3
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { StudyPlan as StudyPlanType } from '../lib/gemini';
import { cn } from '../lib/utils';

export default function StudyPlan() {
  const [plan, setPlan] = React.useState<StudyPlanType | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedPlan = localStorage.getItem('currentStudyPlan');
    if (storedPlan) {
      setPlan(JSON.parse(storedPlan));
    } else {
      navigate('/goal-input');
    }
  }, [navigate]);

  if (!plan) return null;

  const handleConfirm = () => {
    // Proceed to pre-evaluation
    navigate('/pre-evaluation');
  };

  const handleUpdate = () => {
    // Go back to update the goal
    navigate('/goal-input');
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold mb-4 uppercase tracking-wider"
          >
            <CheckCircle2 size={14} />
            Path Generated Successfully
          </motion.div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Your Personalized <span className="text-indigo-600">Learning Path</span>
          </h1>
          <p className="text-slate-500 text-lg mt-2">
            Review your study plan for <span className="font-bold text-slate-900 underline decoration-indigo-500/30">{plan.topic}</span>.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleUpdate} icon={<Edit3 size={18} />}>
            Update Goal
          </Button>
          <Button onClick={handleConfirm} icon={<ArrowRight size={18} />}>
            Confirm & Start
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Topics */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-indigo-600" />
            Curriculum Breakdown
          </h2>
          {plan.subTopics.map((sub, i) => (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-6 hover:border-indigo-600/30 transition-all group relative overflow-hidden rounded-[24px]">
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center font-bold text-lg group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {i + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {sub.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles size={16} className="text-indigo-200" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Sidebar: Prerequisites & Info */}
        <div className="space-y-8">
          <Card className="p-8 bg-indigo-600 text-white rounded-[32px] border-none shadow-xl shadow-indigo-500/20">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Target size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold mb-4">Prerequisites</h2>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              To get the most out of this path, we recommend you have a basic understanding of:
            </p>
            <ul className="space-y-3">
              {plan.prerequisites.map((pre, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-medium">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-300 flex-shrink-0" />
                  {pre}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 bg-slate-900 text-white rounded-[32px] border-none">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <Zap size={24} className="text-amber-400" />
            </div>
            <h2 className="text-xl font-bold mb-4">Adaptive Learning</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our system will monitor your progress. If you struggle with a topic, 
              we'll provide additional resources and adjust the difficulty in real-time.
            </p>
          </Card>
        </div>
      </div>

      <div className="mt-16 flex justify-center">
        <Button 
          size="lg" 
          onClick={handleConfirm} 
          className="px-12 py-8 text-lg rounded-2xl shadow-xl shadow-indigo-500/20"
          icon={<ArrowRight size={24} />}
        >
          Confirm & Start Pre-Evaluation
        </Button>
      </div>
    </div>
  );
}
