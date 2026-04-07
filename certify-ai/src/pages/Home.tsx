import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Award, Sparkles, Zap, Shield, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui';
import { CertCard } from '../components/cert/CertCard';
import { certifications } from '../data/mockData';

export function Home() {
  const featured = certifications.filter((c) => c.featured).slice(0, 3);
  const stats = [
    { label: 'Certifications', value: '50+', icon: Award },
    { label: 'Learners', value: '100K+', icon: Users },
    { label: 'AI-Generated', value: '1000+', icon: Sparkles },
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
              AI-Powered Certifications
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 tracking-tight leading-[1.1] mb-6">
              Prove your skills with{' '}
              <span className="text-gradient">AI-powered</span>{' '}
              certifications
            </h1>

            <p className="text-lg text-surface-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Generate custom courses, take adaptive exams, and earn professional
              certifications — all powered by cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/explore">
                <Button size="lg">
                  Explore Certifications
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link to="/ai-generate">
                <Button variant="secondary" size="lg">
                  <Sparkles size={18} className="mr-2" />
                  Generate with AI
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
              The most advanced certification platform, powered by artificial intelligence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'AI Course Generation',
                desc: 'Generate comprehensive courses on any topic instantly using advanced AI models.',
                color: 'bg-violet-50 text-violet-600',
              },
              {
                icon: Zap,
                title: 'Adaptive Exams',
                desc: 'Smart exams that adjust to your skill level with AI-generated questions.',
                color: 'bg-amber-50 text-amber-600',
              },
              {
                icon: Shield,
                title: 'Verified Credentials',
                desc: 'Earn industry-recognized certifications that validate your expertise.',
                color: 'bg-emerald-50 text-emerald-600',
              },
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

      {/* Featured Certs */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-surface-900 mb-2">Featured Certifications</h2>
              <p className="text-surface-500">Start with our most popular certifications</p>
            </div>
            <Link to="/explore" className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/explore">
              <Button variant="secondary">View All Certifications</Button>
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
              <BookOpen size={40} className="mx-auto mb-4 text-white/80" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to get certified?
              </h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">
                Join thousands of professionals who have advanced their careers with AI-powered certifications.
              </p>
              <Link to="/explore">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-surface-900 hover:bg-white/90 border-0"
                >
                  Start Now — It's Free
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
