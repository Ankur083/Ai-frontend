import React from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Shield, 
  Settings, 
  Bell, 
  CreditCard, 
  ChevronRight,
  Camera,
  Trophy,
  BookOpen,
  Clock,
  Zap
} from 'lucide-react';
import { MOCK_USER } from '../constants';

import { cn } from '../lib/utils';

export default function Profile() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-80 shrink-0 space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-200 p-8 text-center shadow-sm">
            <div className="relative inline-block mb-6">
              <img 
                src={MOCK_USER.avatar} 
                alt={MOCK_USER.name} 
                className="w-32 h-32 rounded-[40px] border-4 border-indigo-50 object-cover"
                referrerPolicy="no-referrer"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center border-4 border-white hover:bg-indigo-700 transition-all">
                <Camera size={18} />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{MOCK_USER.name}</h2>
            <p className="text-slate-500 font-medium mt-1">{MOCK_USER.email}</p>
            <div className="mt-6 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm">
              <Shield size={16} />
              <span>Verified Student</span>
            </div>
          </div>

          <div className="bg-white rounded-[32px] border border-slate-200 p-4 shadow-sm overflow-hidden">
            {[
              { icon: User, label: 'Personal Info', active: true },
              { icon: Bell, label: 'Notifications', active: false },
              { icon: Shield, label: 'Security', active: false },
              { icon: CreditCard, label: 'Billing', active: false },
              { icon: Settings, label: 'Preferences', active: false },
            ].map((item, i) => (
              <button 
                key={i}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-2xl transition-all group",
                  item.active ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span className="font-bold text-sm">{item.label}</span>
                </div>
                <ChevronRight size={16} className={cn(item.active ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
              </button>
            ))}
          </div>
        </div>

        {/* Profile Content */}
        <div className="flex-1 space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Courses', value: MOCK_USER.stats.coursesCompleted, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Avg Score', value: `${MOCK_USER.stats.averageScore}%`, icon: Trophy, color: 'text-yellow-600', bg: 'bg-yellow-50' },
              { label: 'Hours', value: MOCK_USER.stats.learningHours, icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Streak', value: MOCK_USER.stats.streak, icon: Zap, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3", stat.bg, stat.color)}>
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white rounded-[32px] border border-slate-200 p-8 sm:p-10 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Personal Information</h3>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
                <input 
                  type="text" 
                  defaultValue="Alex"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
                <input 
                  type="text" 
                  defaultValue="Johnson"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    type="email" 
                    defaultValue={MOCK_USER.email}
                    className="w-full pl-14 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800"
                  />
                </div>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Bio</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-800 resize-none"
                />
              </div>
              <div className="sm:col-span-2 pt-4">
                <button className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
