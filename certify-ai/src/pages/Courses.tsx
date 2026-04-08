import { motion } from 'framer-motion';
import { CertCard } from '../components/cert/CertCard';
import { FilterBar } from '../components/cert/FilterBar';
import { useCertStore } from '../store/certStore';
import { SearchBar } from '../components/ui/SearchBar';

export function Courses() {
  const { filteredCerts, searchQuery, setSearchQuery } = useCertStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Courses</h1>
        <p className="text-surface-500">Browse all courses and start your learning journey</p>
      </motion.div>

      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search courses by title or keyword..."
        />
      </div>

      <div className="mb-8">
        <FilterBar />
      </div>

      {filteredCerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCerts.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-surface-400 text-lg">No courses found matching your criteria.</p>
          <p className="text-surface-400 text-sm mt-2">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}
