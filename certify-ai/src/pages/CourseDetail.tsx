import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowLeft, BookOpen, Target, UserCheck, Play } from 'lucide-react';
import { useCertStore } from '../store/certStore';
import { useAuthStore } from '../store/authStore';
import { CATEGORIES, DIFFICULTIES } from '../types';
import { sampleQuestions } from '../data/mockData';
import { Button, Badge } from '../components/ui';
import { Tabs } from '../components/ui/Tabs';
import { ChapterList } from '../components/course/ChapterList';
import { AnnouncementList } from '../components/course/AnnouncementList';
import { QuizSection } from '../components/course/QuizSection';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCertById } = useCertStore();
  const { isAuthenticated } = useAuthStore();
  const course = getCertById(id || '');

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">Course not found</h1>
        <Link to="/courses">
          <Button variant="secondary">Browse Courses</Button>
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[course.category];
  const difficulty = DIFFICULTIES[course.difficulty];
  const questions = sampleQuestions[course.id] || [];

  const tabs = [
    { id: 'intro', label: 'Introduction', icon: <BookOpen size={15} /> },
    { id: 'chapters', label: 'Chapters', icon: <Target size={15} /> },
    { id: 'announcements', label: 'Announcements', icon: <UserCheck size={15} /> },
    { id: 'quiz', label: 'Quiz / Test', icon: <Play size={15} /> },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <Link to="/courses" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft size={14} />
              All Courses
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${category.color}`}>
                {category.icon} {category.label}
              </span>
              <Badge className={difficulty.color}>{difficulty.label}</Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{course.title}</h1>
            <p className="text-white/60 text-sm">Instructor: {course.instructor}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs tabs={tabs} defaultTab="intro">
              {(activeTab) => (
                <>
                  {activeTab === 'intro' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                      {/* Overview */}
                      <div>
                        <h2 className="text-lg font-semibold text-surface-900 mb-3">Course Overview</h2>
                        <p className="text-surface-600 leading-relaxed">{course.description}</p>
                      </div>

                      {/* Learning Objectives */}
                      <div>
                        <h2 className="text-lg font-semibold text-surface-900 mb-3">What You'll Learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {course.learningObjectives.map((obj, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                              <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <span className="text-sm text-surface-700">{obj}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Target Audience */}
                      <div>
                        <h2 className="text-lg font-semibold text-surface-900 mb-3">Who This Course is For</h2>
                        <ul className="space-y-2">
                          {course.targetAudience.map((audience, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-surface-600">
                              <UserCheck size={15} className="text-brand-500 flex-shrink-0" />
                              {audience}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags */}
                      <div>
                        <h2 className="text-lg font-semibold text-surface-900 mb-3">Topics Covered</h2>
                        <div className="flex flex-wrap gap-2">
                          {course.tags.map((tag) => (
                            <Badge key={tag} size="md">{tag}</Badge>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'chapters' && (
                    <ChapterList modules={course.modules} courseId={course.id} />
                  )}

                  {activeTab === 'announcements' && (
                    <AnnouncementList announcements={course.announcements} />
                  )}

                  {activeTab === 'quiz' && (
                    <QuizSection questions={questions} passingScore={course.passingScore} />
                  )}
                </>
              )}
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-surface-100 shadow-card p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <Clock size={18} className="mx-auto mb-1 text-surface-400" />
                  <div className="text-sm font-semibold text-surface-900">{course.duration}m</div>
                  <div className="text-xs text-surface-400">Duration</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <BookOpen size={18} className="mx-auto mb-1 text-surface-400" />
                  <div className="text-sm font-semibold text-surface-900">{course.modules.length}</div>
                  <div className="text-xs text-surface-400">Modules</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <Star size={18} className="mx-auto mb-1 text-amber-400" />
                  <div className="text-sm font-semibold text-surface-900">{course.rating}</div>
                  <div className="text-xs text-surface-400">Rating</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <Users size={18} className="mx-auto mb-1 text-surface-400" />
                  <div className="text-sm font-semibold text-surface-900">{course.enrolledCount.toLocaleString()}</div>
                  <div className="text-xs text-surface-400">Enrolled</div>
                </div>
              </div>

              <div className="text-center">
                <span className="text-2xl font-bold text-surface-900">Free</span>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={() => {
                  if (!isAuthenticated) navigate('/login?redirect=/courses/' + course.id + '/learn');
                  else navigate(`/courses/${course.id}/learn`);
                }}
              >
                <Play size={16} className="mr-2" />
                Start Learning
              </Button>

              <p className="text-xs text-surface-400 text-center">
                Pass score: {course.passingScore}% &middot; {course.questionCount} exam questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
