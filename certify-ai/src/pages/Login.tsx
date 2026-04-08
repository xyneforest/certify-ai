import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';


type Role = 'student' | 'teacher';

export function Login() {
  const [searchParams] = useSearchParams();
  const [isSignup, setIsSignup] = useState(searchParams.get('mode') === 'signup');
  const [role, setRole] = useState<Role>('student');
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
      success = await signup(name, email, password, role);
    } else {
      success = await login(email, password, role);
    }
    setLoading(false);
    if (success) {
      navigate(role === 'teacher' ? '/teacher' : redirect);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-16 bg-gradient-to-br from-surface-100 to-surface-50 overflow-hidden">
      {/* Diagonal stripe background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(232,160,32,0.04) 40px, rgba(232,160,32,0.04) 80px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm bg-white border border-surface-300 rounded-2xl shadow-lg p-8"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <span className="font-serif text-2xl font-bold text-surface-900">
              Certify<span className="text-brand-400">AI</span>
            </span>
          </Link>
          <h1 className="text-xl font-bold text-surface-900">
            {isSignup ? 'Create your account' : 'Welcome back'}
          </h1>
          <p className="text-sm text-surface-500 mt-1">
            Sign in to continue learning
          </p>
        </div>

        {/* Role toggle */}
        <div className="flex bg-[#f2ede4] rounded-lg p-1 mb-6">
          <button
            type="button"
            onClick={() => setRole('student')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'student'
                ? 'bg-white text-surface-900 shadow-sm'
                : 'text-surface-500 hover:text-surface-700'
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole('teacher')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
              role === 'teacher'
                ? 'bg-white text-surface-900 shadow-sm'
                : 'text-surface-500 hover:text-surface-700'
            }`}
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-[0.8rem] font-medium text-surface-500 uppercase tracking-wide mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Alex Morgan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-2.5 bg-[#faf8f4] border border-surface-300 rounded-lg text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-brand-400 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[0.8rem] font-medium text-surface-500 uppercase tracking-wide mb-1.5">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                <Mail size={16} />
              </div>
              <input
                type="email"
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-[#faf8f4] border border-surface-300 rounded-lg text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-brand-400 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[0.8rem] font-medium text-surface-500 uppercase tracking-wide mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400">
                <Lock size={16} />
              </div>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-2.5 bg-[#faf8f4] border border-surface-300 rounded-lg text-sm text-surface-900 placeholder:text-surface-400 focus:outline-none focus:border-brand-400 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#0f0f0f] text-[#faf8f4] rounded-lg text-sm font-medium hover:bg-surface-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-surface-500 mt-6">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-amber-700 font-medium hover:text-amber-800"
          >
            {isSignup ? 'Sign in' : 'Sign up'}
          </button>
        </p>

        {/* Demo hint box */}
        <div className="mt-4 p-3 bg-amber-50 rounded-lg">
          <p className="text-xs text-amber-700 text-center">
            Demo: any email/password works
          </p>
        </div>
      </motion.div>
    </div>
  );
}
