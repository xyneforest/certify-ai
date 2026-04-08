import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { FAQCategory, FAQ_CATEGORIES } from '../types';
import { faqItems } from '../data/mockData';

export function FAQ() {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = faqItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      !search ||
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: '#faf8f4', minHeight: '100vh' }}>
      {/* Header */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold mb-2"
          style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}
        >
          Frequently Asked Questions
        </h1>
        <p className="text-sm" style={{ color: '#8a8070' }}>
          Find answers to common questions about our platform, courses, and certificates.
        </p>
      </div>

      {/* Search */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: '#8a8070' }}
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-lg text-sm"
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
      </div>

      {/* Category Filters */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
            style={{
              backgroundColor: selectedCategory === 'all' ? '#e8a020' : '#f2ede4',
              color: selectedCategory === 'all' ? '#0f0f0f' : '#8a8070',
            }}
          >
            All Topics
          </button>
          {(Object.entries(FAQ_CATEGORIES) as [FAQCategory, { label: string; icon: string }][]).map(
            ([key, val]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                style={{
                  backgroundColor: selectedCategory === key ? '#e8a020' : '#f2ede4',
                  color: selectedCategory === key ? '#0f0f0f' : '#8a8070',
                }}
              >
                {val.icon} {val.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length > 0 ? (
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: '#ffffff', border: '1px solid #ddd8cc' }}
          >
            {filtered.map((item, i) => (
              <div
                key={item.id}
                style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f2ede4' : 'none' }}
              >
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#faf8f4')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <span className="text-sm font-medium pr-4" style={{ color: '#0f0f0f' }}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={16}
                    style={{
                      color: '#8a8070',
                      flexShrink: 0,
                      transform: openId === item.id ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
                {openId === item.id && (
                  <div
                    className="px-6 pb-4 text-sm leading-relaxed"
                    style={{ color: '#8a8070' }}
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p style={{ color: '#8a8070' }}>No questions found matching your search.</p>
          </div>
        )}

        {/* Contact */}
        <div
          className="mt-10 text-center p-8 rounded-xl"
          style={{ backgroundColor: '#f2ede4', border: '1px solid #ddd8cc' }}
        >
          <h3
            className="text-lg font-bold mb-2"
            style={{ color: '#0f0f0f', fontFamily: 'Georgia, serif' }}
          >
            Still have questions?
          </h3>
          <p className="text-sm mb-4" style={{ color: '#8a8070' }}>
            Can't find what you're looking for? Reach out to our support team.
          </p>
          <a
            href="mailto:support@certifyai.com"
            className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0f0f0f', color: '#faf8f4' }}
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
