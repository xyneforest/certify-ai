import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { FAQCategory, FAQ_CATEGORIES } from '../types';
import { faqItems } from '../data/mockData';
import { FAQAccordion } from '../components/faq/FAQAccordion';
import { SearchBar } from '../components/ui/SearchBar';

export function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all');
  const [search, setSearch] = useState('');

  const filtered = faqItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div className="w-14 h-14 mx-auto rounded-2xl bg-brand-50 flex items-center justify-center mb-4">
          <HelpCircle size={28} className="text-brand-600" />
        </div>
        <h1 className="text-3xl font-bold text-surface-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-surface-500 max-w-lg mx-auto">
          Find answers to common questions about our platform, courses, exams, and certificates.
        </p>
      </motion.div>

      <div className="mb-6">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search questions..."
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-surface-900 text-white'
              : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
          }`}
        >
          All Topics
        </button>
        {(Object.entries(FAQ_CATEGORIES) as [FAQCategory, { label: string; icon: string }][]).map(
          ([key, val]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === key
                  ? 'bg-surface-900 text-white'
                  : 'bg-surface-50 text-surface-600 hover:bg-surface-100'
              }`}
            >
              {val.icon} {val.label}
            </button>
          )
        )}
      </div>

      {filtered.length > 0 ? (
        <FAQAccordion items={filtered} />
      ) : (
        <div className="text-center py-12">
          <p className="text-surface-400">No questions found matching your search.</p>
        </div>
      )}

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 text-center p-8 rounded-2xl bg-surface-50 border border-surface-100"
      >
        <h3 className="text-lg font-semibold text-surface-900 mb-2">Still have questions?</h3>
        <p className="text-sm text-surface-500 mb-4">
          Can't find what you're looking for? Reach out to our support team.
        </p>
        <a
          href="mailto:support@certifyai.com"
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-surface-900 text-white text-sm font-medium hover:bg-surface-800 transition-colors"
        >
          Contact Support
        </a>
      </motion.div>
    </div>
  );
}
