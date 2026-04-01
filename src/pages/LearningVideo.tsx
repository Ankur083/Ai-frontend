import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize, 
  ArrowRight, 
  BookOpen, 
  MessageSquare,
  FileText,
  ChevronRight,
  Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StudyPlan, SubTopic } from '../lib/gemini';

export default function LearningVideo() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [plan, setPlan] = React.useState<StudyPlan | null>(null);
  const [currentTopic, setCurrentTopic] = React.useState<SubTopic | null>(null);
  const [topicIndex, setTopicIndex] = React.useState(0);

  React.useEffect(() => {
    const storedPlan = localStorage.getItem('currentStudyPlan');
    const storedIndex = localStorage.getItem('currentTopicIndex');
    
    if (storedPlan) {
      const p: StudyPlan = JSON.parse(storedPlan);
      setPlan(p);
      const index = parseInt(storedIndex || '0');
      setTopicIndex(index);
      if (p.subTopics[index]) {
        setCurrentTopic(p.subTopics[index]);
      } else {
        navigate('/result');
      }
    } else {
      navigate('/goal-input');
    }
  }, [navigate]);

  if (!currentTopic || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-8 px-6">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">
              Module {topicIndex + 1} of {plan.subTopics.length}
            </span>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">{plan.topic}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">{currentTopic.title}</h1>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Up</p>
              <p className="text-sm font-bold text-slate-700">
                {plan.subTopics[topicIndex + 1]?.title || 'Final Assessment'}
              </p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-[40px] overflow-hidden aspect-video relative group shadow-2xl shadow-indigo-500/10">
            <img 
              src={`https://picsum.photos/seed/${currentTopic.id}/1280/720`} 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            
            {/* Play Button Overlay */}
            {!isPlaying && (
              <button 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group/play"
              >
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover/play:scale-110 transition-transform shadow-2xl">
                  <Play size={40} fill="currentColor" />
                </div>
              </button>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-1.5 bg-white/20 rounded-full mb-8 relative">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-indigo-500 rounded-full"></div>
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8 text-white">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" />}
                  </button>
                  <Volume2 size={28} />
                  <span className="text-sm font-bold tracking-wider">12:45 / 24:00</span>
                </div>
                <div className="flex items-center gap-8 text-white">
                  <button className="text-xs font-black bg-white/10 px-4 py-2 rounded-xl uppercase tracking-widest">1.0x</button>
                  <Maximize size={28} />
                </div>
              </div>
            </div>
          </div>

          <Card className="p-10 rounded-[40px] border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Lesson Overview</h2>
            <p className="text-slate-500 text-lg leading-relaxed">
              {currentTopic.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Interactive Demo', 'Code Snippets', 'Cheat Sheet'].map((tag) => (
                <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-bold rounded-xl border border-slate-100">
                  {tag}
                </span>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar: Resources & Next */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-[40px] p-10 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
            <h3 className="text-2xl font-bold mb-4 relative z-10">Ready for the Quiz?</h3>
            <p className="text-indigo-100 text-sm mb-10 leading-relaxed relative z-10">
              Test your knowledge on <span className="font-bold text-white underline decoration-indigo-300">{currentTopic.title}</span> to unlock the next module.
            </p>
            <Button 
              onClick={() => navigate('/quiz')}
              className="w-full bg-white text-indigo-600 hover:bg-indigo-50 py-8 text-lg rounded-2xl shadow-xl relative z-10"
              icon={<ArrowRight size={24} />}
            >
              Take Module Quiz
            </Button>
          </div>

          <Card className="p-8 rounded-[40px] border-slate-100">
            <h3 className="font-bold text-slate-900 mb-8 flex items-center gap-3">
              <FileText size={24} className="text-indigo-600" />
              Lesson Resources
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Lesson Transcript', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
                { title: 'Source Code (GitHub)', icon: BookOpen, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { title: 'Discussion Forum', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50' },
              ].map((res, i) => (
                <button key={i} className="w-full flex items-center justify-between p-5 rounded-3xl border border-slate-50 hover:bg-slate-50 transition-all group text-left">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", res.bg, res.color)}>
                      <res.icon size={20} />
                    </div>
                    <span className="text-sm font-bold text-slate-700">{res.title}</span>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
