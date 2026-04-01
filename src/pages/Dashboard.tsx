import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Zap, 
  ArrowRight,
  Play,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { MOCK_COURSES, MOCK_USER } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

import { cn } from '../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back, {MOCK_USER.name}! 👋</h1>
          <p className="text-slate-500 mt-1">You've completed 85% of your weekly goal. Keep it up!</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-xl font-bold">
            <Zap size={20} />
            <span>{MOCK_USER.stats.streak} Day Streak</span>
          </div>
          <button 
            onClick={() => navigate('/quiz-topics')}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all"
          >
            Continue Learning
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Courses Completed', value: MOCK_USER.stats.coursesCompleted, icon: BookOpen, color: 'bg-blue-500' },
          { label: 'Avg. Quiz Score', value: `${MOCK_USER.stats.averageScore}%`, icon: Trophy, color: 'bg-yellow-500' },
          { label: 'Learning Hours', value: MOCK_USER.stats.learningHours, icon: Clock, color: 'bg-purple-500' },
          { label: 'Knowledge Level', value: 'Pro', icon: TrendingUp, color: 'bg-emerald-500' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg", stat.color)}>
              <stat.icon size={24} />
            </div>
            <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Continue Learning</h2>
            <Link to="/courses" className="text-indigo-600 text-sm font-bold hover:underline">View All</Link>
          </div>
          
          <div className="space-y-4">
            {MOCK_COURSES.slice(0, 2).map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-3xl border border-slate-200 flex flex-col sm:flex-row gap-6 hover:border-indigo-200 transition-colors group">
                <div className="relative w-full sm:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-indigo-600 shadow-lg">
                      <Play size={20} fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded uppercase tracking-wider">
                        {course.category}
                      </span>
                      <span className="text-slate-400 text-xs">•</span>
                      <span className="text-slate-500 text-xs font-medium">{course.difficulty}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  </div>
                  
                  <div className="mt-4 sm:mt-0">
                    <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        className="h-full bg-indigo-600 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended for you */}
          <div className="pt-4">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {MOCK_COURSES.slice(2, 4).map((course) => (
                <div key={course.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group">
                  <div className="h-40 overflow-hidden relative">
                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-slate-800 shadow-sm">
                      NEW
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{course.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-4">{course.description}</p>
                    <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold text-sm hover:bg-indigo-600 hover:text-white transition-all">
                      Enroll Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          {/* Adaptive Path */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Adaptive Path</h3>
              <p className="text-indigo-100 text-sm mb-6">Based on your recent quiz, we've adjusted your curriculum.</p>
              
              <div className="space-y-4">
                {[
                  { label: 'Advanced Hooks', status: 'completed' },
                  { label: 'Performance Optimization', status: 'current' },
                  { label: 'Testing Strategies', status: 'upcoming' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold",
                      step.status === 'completed' ? "bg-indigo-400 text-white" : 
                      step.status === 'current' ? "bg-white text-indigo-600" : "bg-indigo-500/50 text-indigo-200"
                    )}>
                      {step.status === 'completed' ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      step.status === 'upcoming' ? "text-indigo-300" : "text-white"
                    )}>{step.label}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                Start Next Lesson
                <ArrowRight size={18} />
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400 rounded-full blur-3xl opacity-30"></div>
          </div>

          {/* Leaderboard Mini */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Trophy size={20} className="text-yellow-500" />
              Top Learners
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Emma Watson', points: '12,450', rank: 1 },
                { name: 'Alex Johnson', points: '11,200', rank: 2, me: true },
                { name: 'John Doe', points: '10,800', rank: 3 },
                { name: 'Sarah Connor', points: '9,500', rank: 4 },
              ].map((user, i) => (
                <div key={i} className={cn(
                  "flex items-center justify-between p-3 rounded-2xl transition-colors",
                  user.me ? "bg-indigo-50 border border-indigo-100" : "hover:bg-slate-50"
                )}>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-6 text-center font-bold text-sm",
                      user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-slate-400" : user.rank === 3 ? "text-orange-400" : "text-slate-300"
                    )}>{user.rank}</span>
                    <img src={`https://picsum.photos/seed/${user.name}/100`} alt="" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                    <span className={cn("text-sm font-semibold", user.me ? "text-indigo-600" : "text-slate-700")}>
                      {user.name} {user.me && "(You)"}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-500">{user.points} XP</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
