import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Play,
  List,
  X,
} from 'lucide-react';
import { courses } from '../data/mockData';
import { Module, Lesson } from '../types';

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

  const lessonParam = searchParams.get('lesson');
  const initialLesson = useMemo(() => {
    if (lessonParam) {
      const found = flatLessons.find((fl) => fl.lesson.id === lessonParam);
      if (found) return found;
    }
    const firstIncomplete = flatLessons.find((fl) => !fl.lesson.completed);
    return firstIncomplete || flatLessons[0] || null;
  }, [lessonParam, flatLessons]);

  const [activeLessonId, setActiveLessonId] = useState(initialLesson?.lesson.id || '');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studySeconds, setStudySeconds] = useState(0);
  const activeRef = useRef<HTMLButtonElement>(null) as React.RefObject<HTMLButtonElement>;

  const activeFlat = useMemo(
    () => flatLessons.find((fl) => fl.lesson.id === activeLessonId) || flatLessons[0],
    [activeLessonId, flatLessons]
  );

  // Study timer
  useEffect(() => {
    const interval = setInterval(() => setStudySeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  useEffect(() => {
    if (activeLessonId && activeLessonId !== lessonParam) {
      setSearchParams({ lesson: activeLessonId }, { replace: true });
    }
  }, [activeLessonId, lessonParam, setSearchParams]);

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeLessonId]);

  if (!course || flatLessons.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#faf8f4' }}
      >
        <div className="text-center">
          <p style={{ color: '#8a8070' }} className="mb-4">Course not found</p>
          <Link to="/courses" style={{ color: '#b87c10' }} className="hover:underline">
            Back to courses
          </Link>
        </div>
      </div>
    );
  }

  const completedCount = flatLessons.filter((fl) => fl.lesson.completed).length;
  const totalCount = flatLessons.length;

  const handleLessonClick = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#faf8f4' }}>
      {/* Top Nav Bar - Learnify style */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6"
        style={{
          backgroundColor: '#faf8f4',
          borderBottom: '1px solid #ddd8cc',
          height: '60px',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ fontFamily: "'Noto Serif SC', Georgia, serif", fontSize: '1.3rem', fontWeight: 700, color: '#0f0f0f', textDecoration: 'none' }}>
          Certify<span style={{ color: '#e8a020' }}>AI</span>
        </Link>

        {/* Course title */}
        <span className="hidden sm:block text-sm font-medium truncate max-w-md" style={{ color: '#0f0f0f' }}>
          {course.title}
        </span>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ backgroundColor: '#e8a020', color: '#0f0f0f' }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#0f0f0f', animation: 'pulse 1.5s infinite' }}
            />
            Studying {formatTime(studySeconds)}
          </div>

          {/* Back to course */}
          <button
            onClick={() => navigate(`/courses/${course.id}`)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-80"
            style={{ backgroundColor: '#0f0f0f', color: '#faf8f4' }}
          >
            Save & Exit
          </button>

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 rounded-lg"
            style={{ color: '#8a8070' }}
          >
            <List size={20} />
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Video player */}
          <div style={{ backgroundColor: '#0a0a0a' }} className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center relative" style={{ background: 'linear-gradient(135deg, #0f0f1a, #1a0f0f)' }}>
              {activeFlat?.lesson.videoUrl ? (
                <video
                  key={activeFlat.lesson.id}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay={false}
                >
                  <source src={activeFlat.lesson.videoUrl} type="video/mp4" />
                </video>
              ) : (
                <div className="text-center cursor-pointer">
                  <Play size={48} className="mx-auto mb-4" style={{ color: 'rgba(255,255,255,0.3)' }} />
                  <h3 className="text-white text-lg font-medium mb-1">
                    {activeFlat?.lesson.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    Duration: {activeFlat?.lesson.duration}m · HD Video
                  </p>
                </div>
              )}
            </div>

            {/* Video controls bar */}
            <div
              className="flex items-center gap-4 px-4 sm:px-6 py-3"
              style={{ backgroundColor: '#111' }}
            >
              <button className="text-white hover:opacity-80 transition-opacity">
                <Play size={18} />
              </button>
              {/* Progress track */}
              <div
                className="flex-1 h-1 rounded-full cursor-pointer"
                style={{ backgroundColor: '#333' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{ backgroundColor: '#e8a020', width: '0%' }}
                />
              </div>
              <span
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}
              >
                0:00 / {activeFlat?.lesson.duration}:00
              </span>
              <span className="text-xs text-white opacity-60">CC</span>
              <span className="text-xs text-white opacity-60">1x</span>
            </div>
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div
          className="hidden md:flex flex-col flex-shrink-0 overflow-y-auto"
          style={{
            width: '300px',
            backgroundColor: '#ffffff',
            borderLeft: '1px solid #ddd8cc',
          }}
        >
          <SidebarContent
            course={course}
            flatLessons={flatLessons}
            activeLessonId={activeLessonId}
            handleLessonClick={handleLessonClick}
            completedCount={completedCount}
            totalCount={totalCount}
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
                className="fixed inset-0 z-40 md:hidden"
                style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed right-0 top-0 bottom-0 w-80 z-50 md:hidden flex flex-col overflow-y-auto"
                style={{ backgroundColor: '#ffffff', boxShadow: '0 8px 40px rgba(15,15,15,0.14)' }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3"
                  style={{ borderBottom: '1px solid #ddd8cc' }}
                >
                  <span className="font-semibold text-sm" style={{ color: '#0f0f0f' }}>
                    Course Content
                  </span>
                  <button onClick={() => setSidebarOpen(false)} style={{ color: '#8a8070' }}>
                    <X size={20} />
                  </button>
                </div>
                <SidebarContent
                  course={course}
                  flatLessons={flatLessons}
                  activeLessonId={activeLessonId}
                  handleLessonClick={handleLessonClick}
                  completedCount={completedCount}
                  totalCount={totalCount}
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
  flatLessons: FlatLesson[];
  activeLessonId: string;
  handleLessonClick: (id: string) => void;
  completedCount: number;
  totalCount: number;
  activeRef: React.RefObject<HTMLButtonElement>;
}

function SidebarContent({
  flatLessons,
  activeLessonId,
  handleLessonClick,
  completedCount,
  totalCount,
  activeRef,
}: SidebarProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 py-3 text-sm font-semibold"
        style={{
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #ddd8cc',
          color: '#0f0f0f',
        }}
      >
        Course Content
        <span className="ml-2 text-xs font-normal" style={{ color: '#8a8070' }}>
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Lesson list - flat like Learnify */}
      <div className="flex-1 overflow-y-auto">
        {flatLessons.map((fl) => {
          const isActive = fl.lesson.id === activeLessonId;
          const isCompleted = fl.lesson.completed;
          const globalIdx = fl.globalIndex + 1;

          return (
            <button
              key={fl.lesson.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => handleLessonClick(fl.lesson.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
              style={{
                backgroundColor: isActive ? '#fef3dc' : 'transparent',
                borderBottom: '1px solid #f2ede4',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = '#f2ede4';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {/* Number/Status circle */}
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                style={{
                  backgroundColor: isActive
                    ? '#e8a020'
                    : isCompleted
                    ? '#6b8f71'
                    : '#f2ede4',
                  color: isActive
                    ? '#0f0f0f'
                    : isCompleted
                    ? '#ffffff'
                    : '#8a8070',
                }}
              >
                {isCompleted ? '✓' : globalIdx}
              </span>

              {/* Title */}
              <span
                className="flex-1 text-xs leading-snug"
                style={{ color: isActive ? '#0f0f0f' : '#4d4840' }}
              >
                {fl.lesson.title}
              </span>

              {/* Duration */}
              <span
                className="text-[11px] flex-shrink-0"
                style={{ color: '#8a8070', fontFamily: 'monospace' }}
              >
                {fl.lesson.duration}:00
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
