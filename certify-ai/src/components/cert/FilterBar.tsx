import { Search, SlidersHorizontal } from 'lucide-react';
import { Category, Difficulty, CATEGORIES, DIFFICULTIES } from '../../types';
import { useCertStore } from '../../store/certStore';

export function FilterBar() {
  const {
    searchQuery, setSearchQuery,
    selectedCategory, setCategory,
    selectedDifficulty, setDifficulty,
  } = useCertStore();

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
        <input
          type="text"
          placeholder="Search certifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-200 bg-white text-sm
            placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
            transition-all duration-200"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 text-xs text-surface-500 mr-1">
          <SlidersHorizontal size={14} />
          Filters:
        </div>

        <button
          onClick={() => setCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-surface-900 text-white'
              : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
          }`}
        >
          All
        </button>
        {(Object.entries(CATEGORIES) as [Category, { label: string; icon: string }][]).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setCategory(key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedCategory === key
                ? 'bg-surface-900 text-white'
                : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
            }`}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setDifficulty('all')}
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
            onClick={() => setDifficulty(key)}
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
    </div>
  );
}
