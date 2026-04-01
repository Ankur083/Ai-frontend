export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  stats: {
    coursesCompleted: number;
    averageScore: number;
    learningHours: number;
    streak: number;
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  isCompleted: boolean;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  isCompleted: boolean;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: number; // 1-5 for adaptive logic
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  timeSpent: number;
  date: string;
  feedback: string;
}
