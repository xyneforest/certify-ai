import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, FileQuestion, Users, ArrowRight } from 'lucide-react';
import { ExamInfo, DIFFICULTIES } from '../../types';
import { Badge } from '../ui';

interface ExamCardProps {
  exam: ExamInfo;
  index?: number;
}

export function ExamCard({ exam, index = 0 }: ExamCardProps) {
  const difficulty = DIFFICULTIES[exam.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/exams/${exam.id}`} className="group block">
        <div className="bg-white rounded-2xl border border-surface-100 shadow-card overflow-hidden transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1">
          <div className="relative h-40 overflow-hidden">
            <img
              src={exam.image}
              alt={exam.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-3 left-3">
              <Badge className={difficulty.color}>{difficulty.label}</Badge>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-surface-900 mb-1 group-hover:text-brand-700 transition-colors line-clamp-1">
              {exam.title}
            </h3>
            <p className="text-xs text-surface-400 mb-3">Course: {exam.courseTitle}</p>
            <p className="text-sm text-surface-500 mb-4 line-clamp-2">{exam.description}</p>
            <div className="flex items-center justify-between text-xs text-surface-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <FileQuestion size={13} />
                  {exam.questionCount} questions
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {exam.duration}m
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} />
                  {exam.attempts.toLocaleString()}
                </span>
              </div>
              <ArrowRight size={14} className="text-surface-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
