import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { AuthWrapper } from '../components/shared/AuthWrapper';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AuthWrapper 
      title="Forgot Password" 
      subtitle={isSubmitted 
        ? "Check your email for reset instructions" 
        : "Enter your email to receive a reset link"}
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            required
            placeholder="alex@example.com"
            icon={<Mail size={20} />}
          />

          <Button 
            type="submit"
            className="w-full"
            icon={<ArrowRight size={20} />}
          >
            Send Reset Link
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-sm text-center">
            We've sent a password reset link to your email address. Please check your inbox and spam folder.
          </div>
          <Button 
            variant="secondary"
            onClick={() => navigate('/login')}
            className="w-full"
          >
            Back to Login
          </Button>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link to="/login" className="text-slate-500 text-sm font-bold hover:text-indigo-600 flex items-center justify-center gap-2 transition-colors">
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>
      </div>
    </AuthWrapper>
  );
}
