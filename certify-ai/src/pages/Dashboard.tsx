import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Clock, BookOpen, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCertStore } from '../store/certStore';
import { Button, Badge } from '../components/ui';

export function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { getCertById } = useCertStore();

  if (!isAuthenticated || !user) {
    navigate('/login?redirect=/dashboard');
    return null;
  }

  const stats = [
    { label: 'Certifications', value: user.certifications.length, icon: Award, color: 'bg-brand-50 text-brand-600' },
    { label: 'Exams Taken', value: user.examAttempts.length, icon: BookOpen, color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Avg Score', value: user.examAttempts.length ? Math.round(user.examAttempts.reduce((a, e) => a + e.score, 0) / user.examAttempts.length) + '%' : '-', icon: TrendingUp, color: 'bg-amber-50 text-amber-600' },
    { label: 'Total Time', value: '2.5h', icon: Clock, color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 mb-10"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-2xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-surface-900">{user.name}</h1>
          <p className="text-surface-500">{user.email}</p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-surface-100 shadow-card p-5"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon size={20} />
            </div>
            <div className="text-2xl font-bold text-surface-900">{stat.value}</div>
            <div className="text-sm text-surface-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Earned Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-surface-900 mb-4">Earned Certifications</h2>
          {user.certifications.length > 0 ? (
            <div className="space-y-3">
              {user.certifications.map((uc) => {
                const cert = getCertById(uc.certificationId);
                if (!cert) return null;
                return (
                  <div key={uc.certificationId} className="bg-white rounded-xl border border-surface-100 shadow-card p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <Award size={24} className="text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-surface-900 truncate">{cert.title}</h3>
                      <p className="text-xs text-surface-400">Earned {uc.earnedAt} &middot; Score: {uc.score}%</p>
                    </div>
                    <Badge variant="success">Certified</Badge>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-100 p-8 text-center">
              <Award size={32} className="mx-auto mb-3 text-surface-300" />
              <p className="text-surface-500 mb-4">No certifications earned yet</p>
              <Link to="/explore">
                <Button variant="secondary" size="sm">Browse Certifications</Button>
              </Link>
            </div>
          )}
        </motion.div>

        {/* Exam History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-surface-900 mb-4">Exam History</h2>
          {user.examAttempts.length > 0 ? (
            <div className="space-y-3">
              {user.examAttempts.map((attempt) => {
                const cert = getCertById(attempt.certificationId);
                if (!cert) return null;
                return (
                  <div key={attempt.id} className="bg-white rounded-xl border border-surface-100 shadow-card p-4">
                    <div className="flex items-center gap-3 mb-2">
                      {attempt.passed ? (
                        <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <XCircle size={20} className="text-red-400 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-surface-900 truncate">{cert.title}</h3>
                        <p className="text-xs text-surface-400">
                          {new Date(attempt.completedAt).toLocaleDateString()} &middot;
                          Score: {attempt.score}% &middot;
                          {attempt.passed ? ' Passed' : ' Not passed'}
                        </p>
                      </div>
                      <span className={`text-lg font-bold ${attempt.passed ? 'text-emerald-600' : 'text-red-500'}`}>
                        {attempt.score}%
                      </span>
                    </div>
                    <p className="text-xs text-surface-500 ml-8">{attempt.feedback.overall}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-surface-100 p-8 text-center">
              <BookOpen size={32} className="mx-auto mb-3 text-surface-300" />
              <p className="text-surface-500">No exam attempts yet</p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 p-6 rounded-2xl gradient-brand text-white"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold">Continue your learning journey</h3>
            <p className="text-white/70 text-sm">Explore new certifications or retake exams to improve your scores.</p>
          </div>
          <Link to="/explore">
            <Button variant="secondary" className="bg-white text-surface-900 hover:bg-white/90 border-0 whitespace-nowrap">
              Explore More <ArrowRight size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
