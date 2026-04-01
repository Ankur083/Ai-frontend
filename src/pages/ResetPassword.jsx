import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AuthWrapper } from '../components/shared/AuthWrapper';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => navigate('/login'), 2000);
  };

  return (
    <AuthWrapper 
      title="Reset Password" 
      subtitle="Create a new secure password for your account"
    >
      {!isSuccess ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="New Password"
            type="password"
            required
            placeholder="••••••••"
            icon={<Lock size={20} />}
          />

          <Input
            label="Confirm New Password"
            type="password"
            required
            placeholder="••••••••"
            icon={<Lock size={20} />}
          />

          <Button 
            type="submit"
            className="w-full"
            icon={<ArrowRight size={20} />}
          >
            Update Password
          </Button>
        </form>
      ) : (
        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle2 size={32} />
          </div>
          <p className="text-emerald-700 font-bold text-lg">Password Updated!</p>
          <p className="text-slate-500 text-sm text-center">
            Your password has been successfully reset. Redirecting you to login...
          </p>
        </div>
      )}
    </AuthWrapper>
  );
}
