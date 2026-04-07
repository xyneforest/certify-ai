import { create } from 'zustand';
import { Certification, Category, Difficulty } from '../types';
import { certifications } from '../data/mockData';

interface CertState {
  certifications: Certification[];
  filteredCerts: Certification[];
  searchQuery: string;
  selectedCategory: Category | 'all';
  selectedDifficulty: Difficulty | 'all';
  setSearchQuery: (q: string) => void;
  setCategory: (c: Category | 'all') => void;
  setDifficulty: (d: Difficulty | 'all') => void;
  getCertBySlug: (slug: string) => Certification | undefined;
  getCertById: (id: string) => Certification | undefined;
}

const filterCerts = (
  certs: Certification[],
  query: string,
  category: Category | 'all',
  difficulty: Difficulty | 'all'
) => {
  return certs.filter((c) => {
    const matchesQuery =
      !query ||
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === 'all' || c.category === category;
    const matchesDifficulty = difficulty === 'all' || c.difficulty === difficulty;
    return matchesQuery && matchesCategory && matchesDifficulty;
  });
};

export const useCertStore = create<CertState>((set, get) => ({
  certifications,
  filteredCerts: certifications,
  searchQuery: '',
  selectedCategory: 'all',
  selectedDifficulty: 'all',
  setSearchQuery: (q) => {
    set({ searchQuery: q });
    const { selectedCategory, selectedDifficulty } = get();
    set({ filteredCerts: filterCerts(certifications, q, selectedCategory, selectedDifficulty) });
  },
  setCategory: (c) => {
    set({ selectedCategory: c });
    const { searchQuery, selectedDifficulty } = get();
    set({ filteredCerts: filterCerts(certifications, searchQuery, c, selectedDifficulty) });
  },
  setDifficulty: (d) => {
    set({ selectedDifficulty: d });
    const { searchQuery, selectedCategory } = get();
    set({ filteredCerts: filterCerts(certifications, searchQuery, selectedCategory, d) });
  },
  getCertBySlug: (slug) => certifications.find((c) => c.slug === slug),
  getCertById: (id) => certifications.find((c) => c.id === id),
}));
