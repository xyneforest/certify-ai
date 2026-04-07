export interface Certification {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: Category;
  difficulty: Difficulty;
  duration: number; // minutes
  questionCount: number;
  passingScore: number;
  price: number;
  rating: number;
  enrolledCount: number;
  image: string;
  tags: string[];
  modules: Module[];
  createdAt: string;
  featured: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: number;
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: number;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
  correctOptionId: string;
  explanation: string;
  difficulty: Difficulty;
}

export interface Option {
  id: string;
  text: string;
}

export interface ExamAttempt {
  id: string;
  certificationId: string;
  userId: string;
  answers: Record<string, string>;
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt: string;
  feedback: ExamFeedback;
}

export interface ExamFeedback {
  overall: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  certifications: UserCertification[];
  examAttempts: ExamAttempt[];
  joinedAt: string;
}

export interface UserCertification {
  certificationId: string;
  earnedAt: string;
  score: number;
  certificateUrl: string;
}

export type Category = 'technology' | 'business' | 'design' | 'data-science' | 'marketing' | 'cloud' | 'security' | 'ai-ml';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export const CATEGORIES: Record<Category, { label: string; icon: string; color: string }> = {
  'technology': { label: 'Technology', icon: '💻', color: 'bg-blue-50 text-blue-700' },
  'business': { label: 'Business', icon: '📊', color: 'bg-emerald-50 text-emerald-700' },
  'design': { label: 'Design', icon: '🎨', color: 'bg-purple-50 text-purple-700' },
  'data-science': { label: 'Data Science', icon: '📈', color: 'bg-orange-50 text-orange-700' },
  'marketing': { label: 'Marketing', icon: '📢', color: 'bg-pink-50 text-pink-700' },
  'cloud': { label: 'Cloud', icon: '☁️', color: 'bg-cyan-50 text-cyan-700' },
  'security': { label: 'Security', icon: '🔒', color: 'bg-red-50 text-red-700' },
  'ai-ml': { label: 'AI & ML', icon: '🤖', color: 'bg-violet-50 text-violet-700' },
};

export const DIFFICULTIES: Record<Difficulty, { label: string; color: string }> = {
  'beginner': { label: 'Beginner', color: 'bg-green-50 text-green-700 border-green-200' },
  'intermediate': { label: 'Intermediate', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  'advanced': { label: 'Advanced', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  'expert': { label: 'Expert', color: 'bg-red-50 text-red-700 border-red-200' },
};
