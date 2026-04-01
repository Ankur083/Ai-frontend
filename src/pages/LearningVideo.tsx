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
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function LearningVideo() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Video Player Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-[32px] overflow-hidden aspect-video relative group shadow-2xl shadow-slate-200">
            <img 
              src="https://picsum.photos/seed/learning/1280/720" 
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
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover/play:scale-110 transition-transform">
                  <Play size={32} fill="currentColor" />
                </div>
              </button>
            )}

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-1.5 bg-white/20 rounded-full mb-6 relative">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-indigo-500 rounded-full"></div>
                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-white">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>
                  <Volume2 size={24} />
                  <span className="text-sm font-medium">12:45 / 24:00</span>
                </div>
                <div className="flex items-center gap-6 text-white">
                  <button className="text-sm font-bold bg-white/10 px-3 py-1 rounded-lg">1.0x</button>
                  <Maximize size={24} />
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 rounded-[32px]">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">Module 1</span>
              <span className="text-slate-400 text-xs">•</span>
              <span className="text-slate-500 text-xs font-medium">React Hooks Deep Dive</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">Understanding useEffect & Cleanup Functions</h1>
            <p className="text-slate-500 leading-relaxed">
              In this lesson, we explore the lifecycle of a functional component and how the useEffect hook allows us to synchronize with external systems. We'll cover dependency arrays, cleanup functions, and common pitfalls.
            </p>
          </Card>
        </div>

        {/* Sidebar: Resources & Next */}
        <div className="space-y-6">
          <div className="bg-indigo-600 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-200">
            <h3 className="text-xl font-bold mb-4">Ready for the Quiz?</h3>
            <p className="text-indigo-100 text-sm mb-8">Test your knowledge on what you just learned to unlock the next module.</p>
            <Button 
              onClick={() => navigate('/quiz')}
              className="w-full bg-white text-indigo-600 hover:bg-indigo-50"
              icon={<ArrowRight size={20} />}
            >
              Take Module Quiz
            </Button>
          </div>

          <Card className="p-6 rounded-[32px]">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-indigo-600" />
              Lesson Resources
            </h3>
            <div className="space-y-3">
              {[
                { title: 'Lesson Transcript', icon: FileText },
                { title: 'Source Code (GitHub)', icon: BookOpen },
                { title: 'Discussion Forum', icon: MessageSquare },
              ].map((res, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all group text-left">
                  <div className="flex items-center gap-3">
                    <res.icon size={18} className="text-slate-400 group-hover:text-indigo-600" />
                    <span className="text-sm font-semibold text-slate-700">{res.title}</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-600" />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
