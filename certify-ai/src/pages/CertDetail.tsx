import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, BookOpen, CheckCircle, ArrowLeft, Play } from 'lucide-react';
import { useCertStore } from '../store/certStore';
import { CATEGORIES, DIFFICULTIES } from '../types';
import { useAuthStore } from '../store/authStore';
import { Button, Badge } from '../components/ui';

export function CertDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getCertBySlug } = useCertStore();
  const { isAuthenticated } = useAuthStore();
  const cert = getCertBySlug(slug || '');

  if (!cert) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-surface-900 mb-4">Certification not found</h1>
        <Link to="/explore">
          <Button variant="secondary">Browse Certifications</Button>
        </Link>
      </div>
    );
  }

  const category = CATEGORIES[cert.category];
  const difficulty = DIFFICULTIES[cert.difficulty];

  const handleStartExam = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/exam/' + cert.id);
    } else {
      navigate('/exam/' + cert.id);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-7xl mx-auto">
            <Link to="/explore" className="inline-flex items-center gap-1 text-white/70 hover:text-white text-sm mb-3 transition-colors">
              <ArrowLeft size={14} />
              Back to Explore
            </Link>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${category.color}`}>
                {category.icon} {category.label}
              </span>
              <Badge className={difficulty.color}>{difficulty.label}</Badge>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold text-white">{cert.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">About this Certification</h2>
              <p className="text-surface-600 leading-relaxed">{cert.description}</p>
            </motion.div>

            <div>
              <h2 className="text-xl font-semibold text-surface-900 mb-4">Course Modules</h2>
              <div className="space-y-3">
                {cert.modules.map((module, i) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-xl border border-surface-100 p-5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center text-sm font-semibold">
                          {i + 1}
                        </span>
                        <div>
                          <h3 className="font-medium text-surface-900">{module.title}</h3>
                          <p className="text-sm text-surface-500 mt-0.5">{module.description}</p>
                        </div>
                      </div>
                      <span className="text-xs text-surface-400 flex items-center gap-1">
                        <Clock size={12} />
                        {module.duration}m
                      </span>
                    </div>
                    <div className="ml-11 mt-3 space-y-1.5">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center gap-2 text-sm text-surface-500">
                          <CheckCircle size={14} className="text-surface-300" />
                          {lesson.title}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {cert.tags.map((tag) => (
                  <Badge key={tag} size="md">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-surface-100 shadow-card p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <Clock size={20} className="mx-auto mb-1 text-surface-400" />
                  <div className="text-sm font-semibold text-surface-900">{cert.duration} min</div>
                  <div className="text-xs text-surface-400">Duration</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <BookOpen size={20} className="mx-auto mb-1 text-surface-400" />
                  <div className="text-sm font-semibold text-surface-900">{cert.questionCount}</div>
                  <div className="text-xs text-surface-400">Questions</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <Star size={20} className="mx-auto mb-1 text-amber-400" />
                  <div className="text-sm font-semibold text-surface-900">{cert.rating}</div>
                  <div className="text-xs text-surface-400">Rating</div>
                </div>
                <div className="text-center p-3 rounded-xl bg-surface-50">
                  <Users size={20} className="mx-auto mb-1 text-surface-400" />
                  <div className="text-sm font-semibold text-surface-900">{cert.enrolledCount.toLocaleString()}</div>
                  <div className="text-xs text-surface-400">Enrolled</div>
                </div>
              </div>

              <div className="pt-2">
                <div className="text-center mb-4">
                  <span className="text-3xl font-bold text-surface-900">Free</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleStartExam}>
                  <Play size={18} className="mr-2" />
                  Start Exam
                </Button>
                <p className="text-xs text-surface-400 text-center mt-3">
                  Passing score: {cert.passingScore}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
