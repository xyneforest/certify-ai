import { Link } from 'react-router-dom';
import { Search, Star } from 'lucide-react';
import { useCertStore } from '../store/certStore';
import { CATEGORIES, Category, DIFFICULTIES, Difficulty } from '../types';

const EMOJI_MAP: Record<string, string> = {
  'business-management': '\u{1F4CA}',
  'accounting-finance': '\u{1F4B0}',
};

const THUMBNAIL_GRADIENTS = [
  'from-[#1a1a2e] to-[#16213e]',
  'from-[#0f2027] to-[#203a43]',
  'from-[#1c1c3c] to-[#2d2d5e]',
  'from-[#1a1a1a] to-[#2c2c2c]',
];

type TabKey = 'all' | Category;

export function Courses() {
  const {
    filteredCerts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setCategory,
    selectedDifficulty,
    setDifficulty,
  } = useCertStore();

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'all', label: 'All' },
    ...Object.entries(CATEGORIES).map(([key, val]) => ({
      key: key as TabKey,
      label: val.label,
    })),
  ];

  const difficulties: { key: Difficulty | 'all'; label: string }[] = [
    { key: 'all', label: 'All Levels' },
    ...Object.entries(DIFFICULTIES).map(([key, val]) => ({
      key: key as Difficulty,
      label: val.label,
    })),
  ];

  return (
    <div style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-1"
          style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}
        >
          Courses
        </h1>
        <p className="text-sm" style={{ color: '#8a8070' }}>
          Browse all courses and start your learning journey
        </p>
      </div>

      {/* Category Tab Bar */}
      <div
        className="border-b"
        style={{ backgroundColor: '#faf8f4', borderColor: '#ddd8cc' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setCategory(tab.key === 'all' ? 'all' : tab.key)}
              className="relative py-3 text-sm font-medium whitespace-nowrap transition-colors"
              style={{
                color: selectedCategory === tab.key ? '#0f0f0f' : '#8a8070',
              }}
            >
              {tab.label}
              {selectedCategory === tab.key && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#e8a020' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Search + Difficulty Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: '#8a8070' }}
            />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm transition-colors"
              style={{
                backgroundColor: '#faf8f4',
                border: '1px solid #ddd8cc',
                color: '#0f0f0f',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#e8a020')}
              onBlur={(e) => (e.target.style.borderColor = '#ddd8cc')}
            />
          </div>

          {/* Difficulty Pills */}
          <div className="flex flex-wrap gap-2">
            {difficulties.map((d) => (
              <button
                key={d.key}
                onClick={() => setDifficulty(d.key)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor:
                    selectedDifficulty === d.key ? '#e8a020' : '#f2ede4',
                  color:
                    selectedDifficulty === d.key ? '#0f0f0f' : '#8a8070',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filteredCerts.length > 0 ? (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            }}
          >
            {filteredCerts.map((course, i) => (
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
                    {EMOJI_MAP[course.category] || '\u{1F4DA}'}
                  </span>
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
                      style={{
                        color: course.price === 0 ? '#6b8f71' : '#0f0f0f',
                      }}
                    >
                      {course.price === 0 ? 'Free' : `$${course.price}`}
                    </span>
                    <span
                      className="flex items-center gap-1 text-xs"
                      style={{ color: '#8a8070' }}
                    >
                      <Star size={12} fill="#e8a020" stroke="#e8a020" />
                      {course.rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: '#8a8070' }}>
              No courses found matching your criteria.
            </p>
            <p className="text-sm mt-2" style={{ color: '#8a8070' }}>
              Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
