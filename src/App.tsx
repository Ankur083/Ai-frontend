/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Onboarding from './pages/Onboarding';
import GoalInput from './pages/GoalInput';
import StudyPlan from './pages/StudyPlan';
import PreEvaluation from './pages/PreEvaluation';
import LearningVideo from './pages/LearningVideo';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import QuizTopicSelection from './pages/QuizTopicSelection';
import Profile from './pages/Profile';
import Result from './pages/Result';
import CourseAssign from './pages/CourseAssign';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/goal-input" element={<GoalInput />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/pre-evaluation" element={<PreEvaluation />} />
          <Route path="/learning-video" element={<LearningVideo />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<CourseAssign />} />
          <Route path="/quiz-topics" element={<QuizTopicSelection />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/result" element={<Result />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}
