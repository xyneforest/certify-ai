import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Circle, BookOpen } from 'lucide-react';
import { Module } from '../../types';

interface ChapterListProps {
  modules: Module[];
  courseId?: string;
}

export function ChapterList({ modules, courseId }: ChapterListProps) {
  const navigate = useNavigate();
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completedLessons = modules.reduce(
    (sum, m) => sum + m.lessons.filter((l) => l.completed).length,
    0
  );
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div>
      {/* Progress Bar */}
      <div className="bg-white rounded-xl border border-surface-100 p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-medium text-surface-700">
            <BookOpen size={16} />
            Course Progress
          </div>
          <span className="text-sm font-semibold text-brand-700">{progressPercent}%</span>
        </div>
        <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full gradient-brand rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <p className="text-xs text-surface-400 mt-2">{completedLessons} of {totalLessons} lessons completed</p>
      </div>

      {/* Chapters */}
      <div className="space-y-4">
        {modules.map((module, i) => {
          const moduleCompleted = module.lessons.every((l) => l.completed);
          const moduleLessonsCompleted = module.lessons.filter((l) => l.completed).length;

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-xl border border-surface-100 overflow-hidden"
            >
              <div className="px-5 py-4 flex items-center justify-between bg-surface-50">
                <div className="flex items-center gap-3">
                  <span className={`
                    w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold
                    ${moduleCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-brand-50 text-brand-600'}
                  `}>
                    {moduleCompleted ? <CheckCircle size={16} /> : i + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-surface-900 text-sm">{module.title}</h3>
                    <p className="text-xs text-surface-400">{module.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-surface-400 flex items-center gap-1">
                    <Clock size={12} />
                    {module.duration}m
                  </span>
                  <span className="text-xs text-surface-400">
                    {moduleLessonsCompleted}/{module.lessons.length}
                  </span>
                </div>
              </div>
              <div className="px-5 py-3 space-y-1">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => courseId && navigate(`/courses/${courseId}/learn?lesson=${lesson.id}`)}
                    className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-surface-50 transition-colors cursor-pointer"
                  >
                    {lesson.completed ? (
                      <CheckCircle size={16} className="text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Circle size={16} className="text-surface-300 flex-shrink-0" />
                    )}
                    <span className={`text-sm flex-1 ${lesson.completed ? 'text-surface-500' : 'text-surface-700'}`}>
                      {lesson.title}
                    </span>
                    <span className="text-xs text-surface-400">{lesson.duration}m</span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
