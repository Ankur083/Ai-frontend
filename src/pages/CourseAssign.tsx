import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Plus
} from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { cn } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { CourseCard } from '../components/shared/CourseCard';

export default function CourseAssign() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const categories = ['All', 'Development', 'Design', 'Business', 'Marketing', 'Data Science'];

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Explore Courses</h1>
          <p className="text-slate-500 mt-1">Discover your next learning adventure with our adaptive curriculum.</p>
        </div>
        <div className="flex items-center gap-3">
          <Input 
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search size={20} />}
            className="sm:w-80 shadow-sm"
          />
          <Button variant="outline" className="p-3 shadow-sm" leftIcon={<Filter size={20} />} />
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border",
              selectedCategory === cat 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100" 
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, i) => (
          <CourseCard key={course.id} course={course} index={i} />
        ))}
      </div>

      {/* Load More or Empty State */}
      {filteredCourses.length === 0 && (
        <div className="py-20 text-center">
          <Card className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400 border-none">
            <Search size={32} />
          </Card>
          <h3 className="text-xl font-bold text-slate-900">No courses found</h3>
          <p className="text-slate-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
            className="mt-6 text-indigo-600 font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
