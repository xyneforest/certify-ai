export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: Category;
  difficulty: Difficulty;
  duration: number;
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
  instructor: string;
  learningObjectives: string[];
  targetAudience: string[];
  announcements: Announcement[];
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
  completed?: boolean;
  videoUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'info' | 'update' | 'important';
}

export interface ExamInfo {
  id: string;
  title: string;
  courseId: string;
  courseTitle: string;
  description: string;
  difficulty: Difficulty;
  questionCount: number;
  duration: number;
  passingScore: number;
  image: string;
  attempts: number;
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

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
}

export type FAQCategory = 'account' | 'courses' | 'exams' | 'certificates' | 'technical';

export const FAQ_CATEGORIES: Record<FAQCategory, { label: string; icon: string }> = {
  account: { label: 'Account', icon: '👤' },
  courses: { label: 'Courses', icon: '📚' },
  exams: { label: 'Exams', icon: '📝' },
  certificates: { label: 'Certificates', icon: '🏆' },
  technical: { label: 'Technical Support', icon: '🔧' },
};

export type Category = 'business-management' | 'accounting-finance';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export const CATEGORIES: Record<Category, { label: string; icon: string; color: string }> = {
  'business-management': { label: 'Business Management', icon: '📊', color: 'bg-amber-50 text-amber-700' },
  'accounting-finance': { label: 'Accounting & Finance', icon: '💰', color: 'bg-emerald-50 text-emerald-700' },
};

export const DIFFICULTIES: Record<Difficulty, { label: string; color: string }> = {
  'beginner': { label: 'Beginner', color: 'bg-green-50 text-green-700 border-green-200' },
  'intermediate': { label: 'Intermediate', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  'advanced': { label: 'Advanced', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  'expert': { label: 'Expert', color: 'bg-red-50 text-red-700 border-red-200' },
};
