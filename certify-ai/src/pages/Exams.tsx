import { useState } from 'react';
import { motion } from 'framer-motion';
import { exams } from '../data/mockData';
import { ExamCard } from '../components/cert/ExamCard';
import { SearchBar } from '../components/ui/SearchBar';
import { Difficulty, DIFFICULTIES } from '../types';

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Exams</h1>
        <p className="text-surface-500">Test your knowledge and earn certifications</p>
      </motion.div>

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search exams by title or course..."
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedDifficulty('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedDifficulty === 'all'
              ? 'bg-surface-900 text-white'
              : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
          }`}
        >
          All Levels
        </button>
        {(Object.entries(DIFFICULTIES) as [Difficulty, { label: string }][]).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setSelectedDifficulty(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedDifficulty === key
                ? 'bg-surface-900 text-white'
                : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
            }`}
          >
            {val.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((exam, i) => (
            <ExamCard key={exam.id} exam={exam} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-surface-400 text-lg">No exams found.</p>
        </div>
      )}
    </div>
  );
}
