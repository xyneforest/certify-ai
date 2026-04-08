import { create } from 'zustand';
import { Course, Category, Difficulty } from '../types';
import { courses } from '../data/mockData';

interface CertState {
  certifications: Course[];
  filteredCerts: Course[];
  searchQuery: string;
  selectedCategory: Category | 'all';
  selectedDifficulty: Difficulty | 'all';
  setSearchQuery: (q: string) => void;
  setCategory: (c: Category | 'all') => void;
  setDifficulty: (d: Difficulty | 'all') => void;
  getCertBySlug: (slug: string) => Course | undefined;
  getCertById: (id: string) => Course | undefined;
}

const filterCerts = (
  certs: Course[],
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
  certifications: courses,
  filteredCerts: courses,
  searchQuery: '',
  selectedCategory: 'all',
  selectedDifficulty: 'all',
  setSearchQuery: (q) => {
    set({ searchQuery: q });
    const { selectedCategory, selectedDifficulty } = get();
    set({ filteredCerts: filterCerts(courses, q, selectedCategory, selectedDifficulty) });
  },
  setCategory: (c) => {
    set({ selectedCategory: c });
    const { searchQuery, selectedDifficulty } = get();
    set({ filteredCerts: filterCerts(courses, searchQuery, c, selectedDifficulty) });
  },
  setDifficulty: (d) => {
    set({ selectedDifficulty: d });
    const { searchQuery, selectedCategory } = get();
    set({ filteredCerts: filterCerts(courses, searchQuery, selectedCategory, d) });
  },
  getCertBySlug: (slug) => courses.find((c) => c.slug === slug),
  getCertById: (id) => courses.find((c) => c.id === id),
}));
