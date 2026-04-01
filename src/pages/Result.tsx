import React from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Target, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  XCircle,
  TrendingUp,
  AlertCircle,
  Play,
  Share2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StatCard } from '../components/shared/StatCard';

export default function Result() {
  const navigate = useNavigate();
  const score = 85;
  const correct = 8;
  const wrong = 2;
  const time = '12:45';

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Hero Result Section */}
      <Card className="p-8 sm:p-12 relative overflow-hidden rounded-[40px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-50 rounded-full -ml-32 -mb-32 blur-3xl opacity-50"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center text-white mb-8 shadow-xl shadow-indigo-200 rotate-3"
          >
            <Trophy size={48} />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Excellent Work!</h1>
          <p className="text-slate-500 text-lg">You've mastered the fundamentals of React Hooks.</p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-3xl">
            {[
              { label: 'Score', value: `${score}%`, icon: Target, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Correct', value: correct.toString(), icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { label: 'Incorrect', value: wrong.toString(), icon: XCircle, color: 'text-red-600', bg: 'bg-red-50' },
              { label: 'Time Spent', value: time, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <StatCard
                key={i}
                label={stat.label}
                value={stat.value}
                icon={<stat.icon size={24} />}
                color={stat.color}
                bg={stat.bg}
              />
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Adaptive Insights</h2>
          <Card className="p-8 space-y-8 rounded-3xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp size={20} className="text-indigo-600" />
                  Strength: Component Lifecycle
                </h3>
                <span className="text-emerald-600 text-sm font-bold">100% Mastery</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                You have a perfect understanding of how components mount, update, and unmount. Your knowledge of the useEffect cleanup function is particularly strong.
              </p>
            </div>

            <div className="h-px bg-slate-100"></div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <AlertCircle size={20} className="text-amber-500" />
                  Opportunity: Custom Hooks
                </h3>
                <span className="text-amber-600 text-sm font-bold">65% Mastery</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                While you understand the rules of hooks, you struggled with abstracting logic into reusable custom hooks. We recommend focusing on the next module.
              </p>
              <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-amber-800 text-xs font-medium">
                  <strong>Recommended Action:</strong> Review "Building Reusable Logic" module before proceeding to Advanced Patterns.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={() => navigate('/learning-video')}
              className="flex-1 py-4"
              icon={<ArrowRight size={20} />}
            >
              Next Learning Module
            </Button>
            <Button 
              variant="secondary"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-4"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <Card className="p-8 bg-slate-900 text-white rounded-3xl">
            <h3 className="text-xl font-bold mb-4">Share Achievement</h3>
            <p className="text-slate-400 text-sm mb-6">Show off your progress to your peers and instructors.</p>
            <div className="space-y-3">
              <Button 
                variant="ghost" 
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white"
                icon={<Share2 size={18} />}
              >
                Share on LinkedIn
              </Button>
              <Button 
                variant="ghost" 
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white"
              >
                Download Certificate
              </Button>
            </div>
          </Card>

          <Card className="p-6 rounded-3xl">
            <h3 className="font-bold text-slate-900 mb-4">Next Steps</h3>
            <div className="space-y-4">
              {[
                { title: 'Advanced State Management', duration: '45 mins', type: 'Video' },
                { title: 'Context API Deep Dive', duration: '30 mins', type: 'Reading' },
                { title: 'Performance Lab', duration: '1 hour', type: 'Practice' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Play size={14} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{step.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{step.type} • {step.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
