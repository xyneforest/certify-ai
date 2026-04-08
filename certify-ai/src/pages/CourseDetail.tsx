import { useParams, Link, useNavigate } from 'react-router-dom';
import { Clock, Users, Star, ArrowLeft, BookOpen, User, CheckCircle } from 'lucide-react';
import { useCertStore } from '../store/certStore';
import { useAuthStore } from '../store/authStore';
import { CATEGORIES } from '../types';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCertById } = useCertStore();
  const { isAuthenticated } = useAuthStore();
  const course = getCertById(id || '');

  if (!course) {
    return (
      <div
        className="max-w-7xl mx-auto px-4 py-20 text-center"
        style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}
        >
          Course not found
        </h1>
        <Link
          to="/courses"
          className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          style={{ backgroundColor: '#f2ede4', color: '#0f0f0f' }}
        >
          Browse Courses
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[course.category];

  // Flatten all lessons across modules for the syllabus
  const allLessons = course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleTitle: m.title }))
  );
  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => l.completed).length;
  const progressPercent =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
      {/* Dark Hero */}
      <section style={{ backgroundColor: '#0f0f0f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Back link */}
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm mb-6 transition-colors"
            style={{ color: 'rgba(255,255,255,0.5)' }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')
            }
          >
            <ArrowLeft size={14} />
            Back to Courses
          </Link>

          {/* Category label */}
          <p
            className="text-[11px] font-semibold uppercase tracking-wider mb-2"
            style={{ color: '#e8a020' }}
          >
            {category.icon} {category.label}
          </p>

          {/* Title */}
          <h1
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: '#faf8f4', fontFamily: 'Georgia, serif' }}
          >
            {course.title}
          </h1>

          {/* Description */}
          <p
            className="text-sm sm:text-base leading-relaxed max-w-2xl mb-6"
            style={{ color: 'rgba(255,255,255,0.7)' }}
          >
            {course.shortDescription}
          </p>

          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-5 text-sm"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {course.instructor}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {course.duration}h
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen size={14} />
              {totalLessons} lessons
            </span>
            <span className="flex items-center gap-1.5">
              <Star size={14} fill="#e8a020" stroke="#e8a020" />
              {course.rating}
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={14} />
              {course.enrolledCount.toLocaleString()} enrolled
            </span>
          </div>
        </div>
      </section>

      {/* Tags */}
      {course.tags.length > 0 && (
        <div
          className="border-b"
          style={{ borderColor: '#ddd8cc' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ backgroundColor: '#f2ede4', color: '#8a8070' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Two-column body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Syllabus */}
          <div className="flex-1 min-w-0">
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: '#ffffff', border: '1px solid #ddd8cc' }}
            >
              {/* Header */}
              <div
                className="px-6 py-4 border-b"
                style={{ borderColor: '#ddd8cc' }}
              >
                <h2
                  className="text-lg font-bold"
                  style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}
                >
                  Course Outline{' '}
                  <span
                    className="font-normal text-sm"
                    style={{ color: '#8a8070' }}
                  >
                    &middot; {course.modules.length} sections
                  </span>
                </h2>
              </div>

              {/* Lessons list */}
              <div>
                {course.modules.map((mod) => (
                  <div key={mod.id}>
                    {/* Module header */}
                    <div
                      className="px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        backgroundColor: '#faf8f4',
                        color: '#8a8070',
                        borderBottom: '1px solid #ddd8cc',
                      }}
                    >
                      {mod.title}
                    </div>

                    {/* Lessons */}
                    {mod.lessons.map((lesson) => {
                      const globalIdx =
                        allLessons.findIndex((l) => l.id === lesson.id) + 1;
                      return (
                        <button
                          key={lesson.id}
                          onClick={() =>
                            navigate(
                              `/courses/${course.id}/learn?lesson=${lesson.id}`
                            )
                          }
                          className="w-full flex items-center gap-3 px-6 py-3.5 text-left transition-colors border-b"
                          style={{ borderColor: '#f2ede4' }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = '#f2ede4')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                              'transparent')
                          }
                        >
                          {/* Status icon */}
                          {lesson.completed ? (
                            <CheckCircle
                              size={20}
                              style={{ color: '#6b8f71' }}
                              className="flex-shrink-0"
                            />
                          ) : (
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0"
                              style={{
                                border: '1.5px solid #ddd8cc',
                                color: '#8a8070',
                              }}
                            >
                              {globalIdx}
                            </span>
                          )}

                          {/* Title */}
                          <span
                            className="flex-1 text-sm"
                            style={{ color: '#0f0f0f' }}
                          >
                            {lesson.title}
                          </span>

                          {/* Duration */}
                          <span
                            className="text-xs flex-shrink-0"
                            style={{
                              color: '#8a8070',
                              fontFamily: 'ui-monospace, monospace',
                            }}
                          >
                            {lesson.duration}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="w-full lg:w-[320px] flex-shrink-0">
            <div
              className="sticky top-20 rounded-xl p-6 space-y-5"
              style={{ backgroundColor: '#ffffff', border: '1px solid #ddd8cc' }}
            >
              {/* Price */}
              <div>
                <span
                  className="text-2xl font-bold"
                  style={{
                    color: course.price === 0 ? '#6b8f71' : '#0f0f0f',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </span>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: '#8a8070' }}>
                    Progress
                  </span>
                  <span className="text-xs font-semibold" style={{ color: '#0f0f0f' }}>
                    {progressPercent}% Complete
                  </span>
                </div>
                <div
                  className="w-full h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: '#f2ede4' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPercent}%`,
                      backgroundColor: '#e8a020',
                    }}
                  />
                </div>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  if (!isAuthenticated)
                    navigate('/login?redirect=/courses/' + course.id + '/learn');
                  else navigate(`/courses/${course.id}/learn`);
                }}
                className="w-full py-3 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: '#e8a020', color: '#0f0f0f' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = '#b87c10')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = '#e8a020')
                }
              >
                Continue Learning &rarr;
              </button>

              {/* Features */}
              <ul className="space-y-3 pt-2">
                {[
                  { icon: '\u{267E}\uFE0F', text: 'Lifetime Access' },
                  { icon: '\u{1F4F1}', text: 'Mobile & Desktop' },
                  { icon: '\u{1F3C6}', text: 'Certificate on Completion' },
                  { icon: '\u{1F465}', text: 'Community Access' },
                ].map((f) => (
                  <li
                    key={f.text}
                    className="flex items-center gap-2.5 text-sm"
                    style={{ color: '#0f0f0f' }}
                  >
                    <span className="text-base">{f.icon}</span>
                    {f.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
