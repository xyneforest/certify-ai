import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Button, Input } from '../components/ui';

export function Login() {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuthStore();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let success: boolean;
    if (isSignup) {
      success = await signup(name, email, password);
    } else {
      success = await login(email, password);
    }
    setLoading(false);
    if (success) navigate(redirect);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center">
              <Award size={22} className="text-white" />
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-surface-900">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-surface-500 mt-1">
            {isSignup ? 'Start your certification journey' : 'Sign in to continue learning'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <Input
              label="Full Name"
              placeholder="Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User size={16} />}
              required
            />
          )}
          <Input
            label="Email"
            type="email"
            placeholder="alex@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail size={16} />}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock size={16} />}
            required
          />

          <Button className="w-full" size="lg" loading={loading}>
            {isSignup ? 'Create Account' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-brand-600 font-medium hover:text-brand-700"
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </p>

        <p className="text-center text-xs text-surface-400 mt-4">
          Demo: any email/password works
        </p>
      </motion.div>
    </div>
  );
}
