import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  ArrowRight, 
  BookOpen, 
  CheckCircle2, 
  Loader2,
  Lightbulb,
  FileText,
  Youtube,
  RefreshCw
} from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { StudyPlan, generateTopicContent, TopicContent } from '../lib/gemini';

export default function LearningEngine() {
  const [plan, setPlan] = React.useState<StudyPlan | null>(null);
  const [currentTopicIndex, setCurrentTopicIndex] = React.useState(0);
  const [content, setContent] = React.useState<TopicContent | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const storedPlan = localStorage.getItem('currentStudyPlan');
    const storedIndex = localStorage.getItem('currentTopicIndex');
    const isReteach = localStorage.getItem('isReteach') === 'true';
    
    if (storedPlan) {
      const parsedPlan = JSON.parse(storedPlan);
      setPlan(parsedPlan);
      const index = parseInt(storedIndex || '0');
      setCurrentTopicIndex(index);
      fetchContent(parsedPlan.topic, parsedPlan.subTopics[index].title, isReteach);
    } else {
      navigate('/goal-input');
    }
  }, [navigate]);

  const fetchContent = async (topic: string, subTopic: string, isReteach: boolean) => {
    setIsLoading(true);
    try {
      // In a real RAG system, we'd pass the isReteach flag to the backend
      const data = await generateTopicContent(topic, subTopic);
      setContent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!plan || !content) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Preparing your lesson...</p>
          </div>
        </div>
      );
    }
    return null;
  }

  const currentSubTopic = plan.subTopics[currentTopicIndex];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-grow space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
                <BookOpen size={16} />
                Topic {currentTopicIndex + 1} of {plan.subTopics.length}
              </div>
              {localStorage.getItem('isReteach') === 'true' && (
                <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-1">
                  <RefreshCw size={12} className="animate-spin-slow" />
                  Review Mode
                </div>
              )}
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">
              {currentSubTopic.title}
            </h1>
            <p className="text-slate-500 text-lg">
              {currentSubTopic.description}
            </p>
          </div>

          {/* Video Section */}
          <Card className="aspect-video bg-slate-900 rounded-[40px] overflow-hidden relative group shadow-2xl shadow-indigo-500/10">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
              <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform cursor-pointer">
                <Play size={32} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Recommended Video</h3>
              <p className="text-slate-400 max-w-md">
                Search YouTube for: <span className="text-indigo-400 italic">"{content.videoSearchQuery}"</span>
              </p>
              <Button 
                variant="outline" 
                className="mt-8 border-white/20 text-white hover:bg-white/10"
                onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(content.videoSearchQuery)}`, '_blank')}
                icon={<Youtube size={20} />}
              >
                Watch on YouTube
              </Button>
            </div>
          </Card>

          {/* Text Explanation */}
          <Card className="p-10 rounded-[40px] border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <FileText className="text-indigo-600" />
              Deep Dive
            </h2>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                {content.text}
              </p>
            </div>
          </Card>

          {/* Examples */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.examples.map((example, i) => (
              <Card key={i} className="p-8 rounded-[32px] bg-slate-50 border-slate-100">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-4 shadow-sm">
                  <Lightbulb size={20} className="text-amber-500" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Example {i + 1}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {example}
                </p>
              </Card>
            ))}
          </div>

          <div className="pt-8 flex justify-end">
            <Button 
              size="lg" 
              onClick={() => navigate('/quiz')}
              className="px-12 py-8 text-lg rounded-2xl shadow-xl shadow-indigo-500/20"
              icon={<ArrowRight size={24} />}
            >
              Take Topic Quiz
            </Button>
          </div>
        </div>

        {/* Sidebar: Progress */}
        <div className="w-full md:w-80 shrink-0">
          <Card className="p-8 rounded-[32px] sticky top-8">
            <h3 className="font-bold text-slate-900 mb-6">Learning Path</h3>
            <div className="space-y-4">
              {plan.subTopics.map((sub, i) => (
                <div 
                  key={sub.id} 
                  className={`flex items-center gap-3 p-3 rounded-2xl transition-colors ${
                    i === currentTopicIndex 
                      ? 'bg-indigo-50 text-indigo-600' 
                      : i < currentTopicIndex 
                      ? 'text-emerald-600' 
                      : 'text-slate-400'
                  }`}
                >
                  {i < currentTopicIndex ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                      i === currentTopicIndex ? 'border-indigo-600' : 'border-slate-200'
                    }`}>
                      {i + 1}
                    </div>
                  )}
                  <span className="text-sm font-bold truncate">{sub.title}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
