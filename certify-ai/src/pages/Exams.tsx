import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, FileText, Users } from 'lucide-react';
import { exams } from '../data/mockData';
import { Difficulty, DIFFICULTIES } from '../types';

const THUMBNAIL_GRADIENTS = [
  'from-[#1a1a2e] to-[#16213e]',
  'from-[#0f2027] to-[#203a43]',
  'from-[#1c1c3c] to-[#2d2d5e]',
  'from-[#1a1a1a] to-[#2c2c2c]',
];

export function Exams() {
  const [search, setSearch] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');

  const filtered = exams.filter((e) => {
    const matchesSearch =
      !search ||
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.courseTitle.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || e.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const difficulties: { key: Difficulty | 'all'; label: string }[] = [
    { key: 'all', label: 'All Levels' },
    ...Object.entries(DIFFICULTIES).map(([key, val]) => ({
      key: key as Difficulty,
      label: val.label,
    })),
  ];

  return (
    <div style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-1"
          style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}
        >
          Exams
        </h1>
        <p className="text-sm" style={{ color: '#8a8070' }}>
          Test your knowledge and earn certifications
        </p>
      </div>

      {/* Search + Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: '#8a8070' }}
            />
            <input
              type="text"
              placeholder="Search exams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

          <div className="flex flex-wrap gap-2">
            {difficulties.map((d) => (
              <button
                key={d.key}
                onClick={() => setSelectedDifficulty(d.key)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: selectedDifficulty === d.key ? '#e8a020' : '#f2ede4',
                  color: selectedDifficulty === d.key ? '#0f0f0f' : '#8a8070',
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length > 0 ? (
          <div
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          >
            {filtered.map((exam, i) => (
              <Link
                key={exam.id}
                to={`/exams/${exam.id}`}
                className="group rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                style={{ backgroundColor: '#ffffff', border: '1px solid #ddd8cc' }}
              >
                {/* Thumbnail */}
                <div
                  className={`relative h-[120px] bg-gradient-to-br ${THUMBNAIL_GRADIENTS[i % THUMBNAIL_GRADIENTS.length]} flex items-center justify-center`}
                >
                  <span className="text-4xl">📝</span>
                  <span
                    className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(4px)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                    }}
                  >
                    {DIFFICULTIES[exam.difficulty]?.label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3
                    className="font-bold text-sm leading-snug mb-1"
                    style={{ color: '#0f0f0f' }}
                  >
                    {exam.title}
                  </h3>
                  <p className="text-xs mb-3 line-clamp-2" style={{ color: '#8a8070' }}>
                    {exam.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs" style={{ color: '#8a8070' }}>
                    <span className="flex items-center gap-1">
                      <FileText size={12} />
                      {exam.questionCount} questions
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {exam.duration}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {exam.attempts.toLocaleString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: '#8a8070' }}>No exams found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
