import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Circle,
  PlayCircle,
  Play,
  List,
  X,
  Clock,
  BookOpen,
} from 'lucide-react';
import { courses } from '../data/mockData';
import { Module, Lesson } from '../types';
import { Navbar } from '../components/layout/Navbar';

interface FlatLesson {
  lesson: Lesson;
  module: Module;
  moduleIndex: number;
  lessonIndex: number;
  globalIndex: number;
}

function flattenLessons(modules: Module[]): FlatLesson[] {
  const result: FlatLesson[] = [];
  modules.forEach((module, mi) => {
    module.lessons.forEach((lesson, li) => {
      result.push({ lesson, module, moduleIndex: mi, lessonIndex: li, globalIndex: result.length });
    });
  });
  return result;
}

export function Learn() {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const course = courses.find((c) => c.id === id);

  const flatLessons = useMemo(() => (course ? flattenLessons(course.modules) : []), [course]);

  // Determine active lesson
  const lessonParam = searchParams.get('lesson');
  const initialLesson = useMemo(() => {
    if (lessonParam) {
      const found = flatLessons.find((fl) => fl.lesson.id === lessonParam);
      if (found) return found;
    }
    // Default to first incomplete lesson, or first lesson
    const firstIncomplete = flatLessons.find((fl) => !fl.lesson.completed);
    return firstIncomplete || flatLessons[0] || null;
  }, [lessonParam, flatLessons]);

  const [activeLessonId, setActiveLessonId] = useState(initialLesson?.lesson.id || '');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeRef = useRef<HTMLButtonElement>(null) as React.RefObject<HTMLButtonElement>;

  const activeFlat = useMemo(
    () => flatLessons.find((fl) => fl.lesson.id === activeLessonId) || flatLessons[0],
    [activeLessonId, flatLessons]
  );

  // Auto-expand the module containing the active lesson
  useEffect(() => {
    if (activeFlat) {
      setExpandedModules((prev) => {
        const next = new Set(prev);
        next.add(activeFlat.module.id);
        return next;
      });
    }
  }, [activeFlat]);

  // Sync URL with active lesson
  useEffect(() => {
    if (activeLessonId && activeLessonId !== lessonParam) {
      setSearchParams({ lesson: activeLessonId }, { replace: true });
    }
  }, [activeLessonId, lessonParam, setSearchParams]);

  // Scroll active lesson into view
  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeLessonId]);

  if (!course || flatLessons.length === 0) {
    return (
      <div className="min-h-screen bg-surface-50 pt-16">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-center">
            <p className="text-surface-500 mb-4">Course not found</p>
            <Link to="/courses" className="text-brand-600 hover:underline">Back to courses</Link>
          </div>
        </div>
      </div>
    );
  }

  const completedCount = flatLessons.filter((fl) => fl.lesson.completed).length;
  const totalCount = flatLessons.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const prevLesson = activeFlat && activeFlat.globalIndex > 0 ? flatLessons[activeFlat.globalIndex - 1] : null;
  const nextLesson = activeFlat && activeFlat.globalIndex < flatLessons.length - 1 ? flatLessons[activeFlat.globalIndex + 1] : null;

  const handleLessonClick = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setSidebarOpen(false);
  };

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-surface-50 flex flex-col pt-16">
      <Navbar />

      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-surface-100 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 text-sm text-surface-500 min-w-0">
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="flex items-center gap-1 text-brand-600 hover:text-brand-700 flex-shrink-0"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Back</span>
          </button>
          <span className="text-surface-300">/</span>
          <Link to="/courses" className="hover:text-brand-600 flex-shrink-0 hidden sm:inline">Courses</Link>
          <span className="text-surface-300 hidden sm:inline">/</span>
          <span className="truncate font-medium text-surface-700">{course.title}</span>
        </div>
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-surface-500">
            <Clock size={14} />
            <span>{course.duration}m total</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-surface-500">
            <BookOpen size={14} />
            <span>{completedCount}/{totalCount} completed</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-xs font-medium text-brand-600">
            <span>{progressPercent}%</span>
          </div>
          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-surface-50"
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Video area */}
        <div className="flex-1 overflow-y-auto">
          {/* Video player */}
          <div className="bg-black">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video relative">
                {activeFlat?.lesson.videoUrl ? (
                  <video
                    key={activeFlat.lesson.id}
                    className="w-full h-full"
                    controls
                    autoPlay={false}
                    poster=""
                  >
                    <source src={activeFlat.lesson.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-900">
                    <div className="text-center text-white">
                      <Play size={48} className="mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium">{activeFlat?.lesson.title}</p>
                      <p className="text-sm text-white/50 mt-1">Video content coming soon</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lesson info below video */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs text-surface-400 mb-1">
                  Module {activeFlat ? activeFlat.moduleIndex + 1 : ''}: {activeFlat?.module.title}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-surface-900">
                  {activeFlat?.lesson.title}
                </h1>
              </div>
              <div className="flex items-center gap-1 text-xs text-surface-400 flex-shrink-0 mt-1">
                <Clock size={14} />
                {activeFlat?.lesson.duration}m
              </div>
            </div>

            <div className="bg-white rounded-xl border border-surface-100 p-5 mb-6">
              <p className="text-surface-600 leading-relaxed">{activeFlat?.lesson.content}</p>
            </div>

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between">
              {prevLesson ? (
                <button
                  onClick={() => handleLessonClick(prevLesson.lesson.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-surface-200 text-sm font-medium text-surface-700 hover:border-surface-300 transition-all"
                >
                  <ChevronLeft size={16} />
                  <div className="text-left">
                    <div className="text-[10px] text-surface-400 uppercase tracking-wider">Previous</div>
                    <div className="truncate max-w-[200px]">{prevLesson.lesson.title}</div>
                  </div>
                </button>
              ) : (
                <div />
              )}
              {nextLesson ? (
                <button
                  onClick={() => handleLessonClick(nextLesson.lesson.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition-all"
                >
                  <div className="text-right">
                    <div className="text-[10px] text-white/60 uppercase tracking-wider">Next</div>
                    <div className="truncate max-w-[200px]">{nextLesson.lesson.title}</div>
                  </div>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <Link
                  to={`/courses/${course.id}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-all"
                >
                  <div className="text-right">
                    <div className="text-[10px] text-white/60 uppercase tracking-wider">Completed</div>
                    <div>Back to Course</div>
                  </div>
                  <CheckCircle size={16} />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden md:flex flex-col w-80 lg:w-96 bg-white border-l border-surface-100 flex-shrink-0">
          <SidebarContent
            course={course}

            activeLessonId={activeLessonId}
            expandedModules={expandedModules}
            toggleModule={toggleModule}
            handleLessonClick={handleLessonClick}
            completedCount={completedCount}
            totalCount={totalCount}
            progressPercent={progressPercent}
            activeRef={activeRef}
          />
        </div>

        {/* Sidebar - Mobile overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 md:hidden flex flex-col shadow-2xl"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-surface-100">
                  <span className="font-semibold text-surface-900">Course Content</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg hover:bg-surface-50">
                    <X size={20} />
                  </button>
                </div>
                <SidebarContent
                  course={course}
      
                  activeLessonId={activeLessonId}
                  expandedModules={expandedModules}
                  toggleModule={toggleModule}
                  handleLessonClick={handleLessonClick}
                  completedCount={completedCount}
                  totalCount={totalCount}
                  progressPercent={progressPercent}
                  activeRef={activeRef}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ==================== Sidebar Content ==================== */

interface SidebarProps {
  course: { modules: Module[]; title: string };
  activeLessonId: string;
  expandedModules: Set<string>;
  toggleModule: (id: string) => void;
  handleLessonClick: (id: string) => void;
  completedCount: number;
  totalCount: number;
  progressPercent: number;
  activeRef: React.RefObject<HTMLButtonElement>;
}

function SidebarContent({
  course,
  activeLessonId,
  expandedModules,
  toggleModule,
  handleLessonClick,
  completedCount,
  totalCount,
  progressPercent,
  activeRef,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Progress header */}
      <div className="px-4 py-4 border-b border-surface-100 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-surface-900">Course Content</span>
          <span className="text-xs text-surface-500">{completedCount}/{totalCount}</span>
        </div>
        <div className="w-full bg-surface-100 rounded-full h-1.5">
          <div
            className="bg-brand-600 h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="text-[10px] text-surface-400 mt-1">{progressPercent}% complete</div>
      </div>

      {/* Module list */}
      <div className="flex-1 overflow-y-auto">
        {course.modules.map((module, mi) => {
          const isExpanded = expandedModules.has(module.id);
          const moduleCompleted = module.lessons.filter((l) => l.completed).length;

          return (
            <div key={module.id} className="border-b border-surface-50">
              {/* Module header */}
              <button
                onClick={() => toggleModule(module.id)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-50 transition-colors text-left"
              >
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={16} className="text-surface-400" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-surface-900 leading-tight">
                    {mi + 1}. {module.title}
                  </div>
                  <div className="text-[10px] text-surface-400 mt-0.5">
                    {moduleCompleted}/{module.lessons.length} lessons
                  </div>
                </div>
              </button>

              {/* Lessons list */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {module.lessons.map((lesson, li) => {
                      const isActive = lesson.id === activeLessonId;
                      const isCompleted = lesson.completed;
                      return (
                        <button
                          key={lesson.id}
                          ref={isActive ? activeRef : undefined}
                          onClick={() => handleLessonClick(lesson.id)}
                          className={`
                            w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all text-xs
                            ${isActive
                              ? 'bg-brand-50 border-l-2 border-brand-600 pl-[14px]'
                              : 'hover:bg-surface-50 border-l-2 border-transparent pl-[14px]'}
                          `}
                        >
                          <div className="flex-shrink-0 ml-3">
                            {isActive ? (
                              <PlayCircle size={16} className="text-brand-600" />
                            ) : isCompleted ? (
                              <CheckCircle size={16} className="text-emerald-500" />
                            ) : (
                              <Circle size={16} className="text-surface-300" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`leading-tight ${isActive ? 'text-brand-700 font-medium' : 'text-surface-600'}`}>
                              {mi + 1}.{li + 1} {lesson.title}
                            </div>
                          </div>
                          <span className="text-[10px] text-surface-400 flex-shrink-0">{lesson.duration}m</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
