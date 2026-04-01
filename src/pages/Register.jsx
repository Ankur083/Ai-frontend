import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { AuthWrapper } from '../components/shared/AuthWrapper';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <AuthWrapper 
      title="Join Us" 
      subtitle="Start your personalized learning path"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input 
          label="Full Name"
          type="text"
          required
          placeholder="Alex Johnson"
          icon={<User size={20} />}
        />

        <Input 
          label="Email Address"
          type="email"
          required
          placeholder="alex@example.com"
          icon={<Mail size={20} />}
        />

        <Input 
          label="Password"
          type="password"
          required
          placeholder="••••••••"
          icon={<Lock size={20} />}
        />

        <Button 
          type="submit" 
          className="w-full mt-2" 
          size="xl"
          rightIcon={<ArrowRight size={20} />}
        >
          Create Account
        </Button>
      </form>

      <div className="mt-8 relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-100"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-slate-400 font-medium tracking-wider">Or register with</span>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button variant="outline" className="rounded-2xl" leftIcon={<Chrome size={20} className="text-slate-600" />}>
          Google
        </Button>
        <Button variant="outline" className="rounded-2xl" leftIcon={<Github size={20} className="text-slate-600" />}>
          GitHub
        </Button>
      </div>

      <p className="mt-10 text-center text-slate-600 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
      </p>
    </AuthWrapper>
  );
}
