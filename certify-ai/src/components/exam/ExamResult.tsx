import { motion } from 'framer-motion';
import { CheckCircle, XCircle, TrendingUp, Target, ArrowRight, RotateCcw } from 'lucide-react';
import { ExamAttempt } from '../../types';
import { Button } from '../ui';

interface ExamResultProps {
  result: ExamAttempt;
  certTitle: string;
  onRetake: () => void;
  onViewDetails: () => void;
}

export function ExamResult({ result, certTitle, onRetake, onViewDetails }: ExamResultProps) {
  const { score, passed, feedback } = result;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`
            w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4
            ${passed ? 'bg-emerald-50' : 'bg-red-50'}
          `}
        >
          {passed ? (
            <CheckCircle size={48} className="text-emerald-500" />
          ) : (
            <XCircle size={48} className="text-red-400" />
          )}
        </motion.div>

        <h2 className="text-2xl font-bold text-surface-900 mb-2">
          {passed ? 'Congratulations!' : 'Keep Going!'}
        </h2>
        <p className="text-surface-500">{certTitle}</p>
      </div>

      <div className="bg-white rounded-2xl border border-surface-100 shadow-card p-6 mb-6">
        <div className="text-center mb-6">
          <div className="relative w-32 h-32 mx-auto mb-3">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#f1f3f5" strokeWidth="8" />
              <motion.circle
                cx="60" cy="60" r="54" fill="none"
                stroke={passed ? '#10b981' : '#f59e0b'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={339.29}
                initial={{ strokeDashoffset: 339.29 }}
                animate={{ strokeDashoffset: 339.29 * (1 - score / 100) }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-surface-900">{score}%</span>
            </div>
          </div>
          <p className="text-sm text-surface-500">{feedback.overall}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-emerald-50">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-emerald-600" />
              <h4 className="text-sm font-semibold text-emerald-900">Strengths</h4>
            </div>
            <ul className="space-y-1">
              {feedback.strengths.map((s, i) => (
                <li key={i} className="text-xs text-emerald-700">{s}</li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-amber-50">
            <div className="flex items-center gap-2 mb-2">
              <Target size={16} className="text-amber-600" />
              <h4 className="text-sm font-semibold text-amber-900">Areas to Improve</h4>
            </div>
            <ul className="space-y-1">
              {feedback.weaknesses.map((w, i) => (
                <li key={i} className="text-xs text-amber-700">{w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-brand-50">
          <h4 className="text-sm font-semibold text-brand-900 mb-2">Recommendations</h4>
          <ul className="space-y-1">
            {feedback.recommendations.map((r, i) => (
              <li key={i} className="text-xs text-brand-700 flex items-start gap-2">
                <ArrowRight size={12} className="mt-0.5 flex-shrink-0" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        {!passed && (
          <Button variant="secondary" onClick={onRetake}>
            <RotateCcw size={16} className="mr-2" />
            Retake Exam
          </Button>
        )}
        <Button onClick={onViewDetails}>
          {passed ? 'View Certificate' : 'Review Answers'}
        </Button>
      </div>
    </motion.div>
  );
}
