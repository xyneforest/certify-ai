import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Sparkles, Zap, Shield, Users, BookOpen, TrendingUp, FileQuestion, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui';
import { SearchBar } from '../components/ui/SearchBar';
import { CertCard } from '../components/cert/CertCard';
import { ExamCard } from '../components/cert/ExamCard';
import { courses, exams, faqItems } from '../data/mockData';
import { useCertStore } from '../store/certStore';

export function Home() {
  const featured = courses.slice(0, 4);
  const popularExams = exams.slice(0, 4);
  const topFAQ = faqItems.slice(0, 4);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { setSearchQuery } = useCertStore();

  const handleSearch = () => {
    setSearchQuery(search);
    navigate('/courses');
  };

  const stats = [
    { label: 'Courses', value: '4', icon: BookOpen },
    { label: 'Learners', value: '574+', icon: Users },
    { label: 'Exams', value: '4', icon: FileQuestion },
    { label: 'Pass Rate', value: '94%', icon: TrendingUp },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-subtle" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-300/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-sm font-medium mb-6">
              <Sparkles size={14} />
              Professional Online Learning Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 tracking-tight leading-[1.1] mb-6">
              Learn, certify, and{' '}
              <span className="text-gradient">advance your career</span>
            </h1>

            <p className="text-lg text-surface-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Access professional courses, take certification exams, and earn
              credentials recognized by employers worldwide.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto mb-8">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className="flex gap-2"
              >
                <div className="flex-1">
                  <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Search for courses..."
                  />
                </div>
                <Button size="lg" onClick={handleSearch}>
                  Search
                </Button>
              </form>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/courses">
                <Button size="lg">
                  Browse Courses
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/exams">
                <Button variant="secondary" size="lg">
                  <FileQuestion size={18} className="mr-2" />
                  Take an Exam
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-surface-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <stat.icon size={24} className="mx-auto mb-2 text-brand-600" />
                <div className="text-2xl sm:text-3xl font-bold text-surface-900">{stat.value}</div>
                <div className="text-sm text-surface-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-surface-900 mb-3">Why CertifyAI?</h2>
            <p className="text-surface-500 max-w-xl mx-auto">
              The complete platform for professional learning and certification.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Expert-Led Courses', desc: 'Comprehensive courses designed by industry experts with real-world projects and hands-on exercises.', color: 'bg-blue-50 text-blue-600' },
              { icon: Zap, title: 'Certification Exams', desc: 'Rigorous exams that validate your knowledge with instant scoring and detailed feedback.', color: 'bg-amber-50 text-amber-600' },
              { icon: Shield, title: 'Verified Credentials', desc: 'Earn industry-recognized certificates that prove your skills to employers worldwide.', color: 'bg-emerald-50 text-emerald-600' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 rounded-2xl border border-surface-100 hover:shadow-card-hover transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                  <feature.icon size={22} />
                </div>
                <h3 className="font-semibold text-surface-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Featured Courses</h2>
              <p className="text-surface-500">Start with our most popular courses</p>
            </div>
            <Link to="/courses" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Exams */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Popular Exams</h2>
              <p className="text-surface-500">Test your skills and earn certifications</p>
            </div>
            <Link to="/exams" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularExams.map((exam, i) => (
              <ExamCard key={exam.id} exam={exam} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <HelpCircle size={28} className="mx-auto mb-3 text-brand-600" />
            <h2 className="text-3xl font-bold text-surface-900 mb-2">Common Questions</h2>
            <p className="text-surface-500">Quick answers to frequently asked questions</p>
          </div>

          <div className="space-y-3 mb-8">
            {topFAQ.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-xl border border-surface-100 p-5"
              >
                <h3 className="font-medium text-surface-900 text-sm mb-1">{item.question}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/fa">
              <Button variant="secondary">
                View All FAQs <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl gradient-brand overflow-hidden p-10 sm:p-16 text-center"
          >
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            </div>
            <div className="relative">
              <Award size={40} className="mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to get certified?
              </h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Join thousands of professionals advancing their careers with industry-recognized certifications.
              </p>
              <Link to="/login?mode=signup">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-surface-900 hover:bg-white/90 border-0"
                >
                  Get Started Free
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
