import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { courses } from '../data/mockData';
import { CATEGORIES, Category } from '../types';

const EMOJI_MAP: Record<string, string> = {
  'business-management': '📊',
  'accounting-finance': '💰',
};

const THUMBNAIL_GRADIENTS = [
  'from-[#1a1a2e] to-[#16213e]',
  'from-[#0f2027] to-[#203a43]',
  'from-[#1c1c3c] to-[#2d2d5e]',
  'from-[#1a1a1a] to-[#2c2c2c]',
];

type TabKey = 'all' | Category;

export function Home() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');

  const enrolledCount = courses.length;
  const totalHours = courses.reduce((sum, c) => sum + c.duration, 0);
  const completedCount = 1;

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All' },
    ...Object.entries(CATEGORIES).map(([key, val]) => ({
      key: key as TabKey,
      label: val.label,
    })),
  ];

  const filtered =
    activeTab === 'all'
      ? courses
      : courses.filter((c) => c.category === activeTab);

  return (
    <div>
      {/* Hero Banner */}
      <section style={{ backgroundColor: '#0f0f0f' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left */}
          <div>
            <h1
              className="text-3xl sm:text-4xl font-bold mb-2"
              style={{ color: '#faf8f4', fontFamily: 'Georgia, serif' }}
            >
              Welcome back!
            </h1>
            <p className="text-base mb-4" style={{ color: 'rgba(250,248,244,0.6)' }}>
              Continue your learning journey and reach your goals.
            </p>
            <p className="text-sm" style={{ color: 'rgba(250,248,244,0.5)' }}>
              Today's study time:{' '}
              <span
                className="font-semibold"
                style={{ color: '#e8a020', fontFamily: 'Georgia, serif' }}
              >
                1h 24m
              </span>
            </p>
          </div>

          {/* Right - Stats */}
          <div className="flex gap-10 sm:gap-14">
            {[
              { value: enrolledCount, label: 'Enrolled Courses' },
              { value: `${totalHours}h`, label: 'Total Study Hours' },
              { value: completedCount, label: 'Completed' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl sm:text-3xl font-bold"
                  style={{ color: '#e8a020', fontFamily: 'Georgia, serif' }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <div
        className="border-b"
        style={{ backgroundColor: '#faf8f4', borderColor: '#ddd8cc' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="relative py-3 text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                color: activeTab === tab.key ? '#0f0f0f' : '#8a8070',
              }}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#e8a020' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <section style={{ backgroundColor: '#faf8f4' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            }}
          >
            {filtered.map((course, i) => (
              <Link
                key={course.id}
                to={`/courses/${course.id}`}
                className="group rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #ddd8cc',
                }}
              >
                {/* Thumbnail */}
                <div
                  className={`relative h-[130px] bg-gradient-to-br ${THUMBNAIL_GRADIENTS[i % THUMBNAIL_GRADIENTS.length]} flex items-center justify-center`}
                >
                  <span className="text-4xl">
                    {EMOJI_MAP[course.category] || '📚'}
                  </span>
                  {i === 0 && (
                    <span
                      className="absolute top-3 left-3 text-xs font-medium px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: 'rgba(232,160,32,0.9)',
                        color: '#0f0f0f',
                      }}
                    >
                      Enrolled
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p
                    className="text-[11px] font-semibold uppercase tracking-wider mb-1"
                    style={{ color: '#b87c10' }}
                  >
                    {CATEGORIES[course.category]?.label ?? course.category}
                  </p>
                  <h3
                    className="font-bold text-sm leading-snug mb-2 line-clamp-2"
                    style={{ color: '#0f0f0f' }}
                  >
                    {course.title}
                  </h3>
                  <p className="text-xs mb-2" style={{ color: '#8a8070' }}>
                    {course.instructor} &middot; {course.duration}h
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: course.price === 0 ? '#6b8f71' : '#0f0f0f' }}
                    >
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: '#8a8070' }}
                    >
                      <Star
                        size={12}
                        fill="#e8a020"
                        stroke="#e8a020"
                      />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
