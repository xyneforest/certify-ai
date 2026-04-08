import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';
import { Course, CATEGORIES, DIFFICULTIES } from '../../types';
import { Badge } from '../ui';

interface CertCardProps {
  cert: Course;
  index?: number;
}

export function CertCard({ cert, index = 0 }: CertCardProps) {
  const category = CATEGORIES[cert.category];
  const difficulty = DIFFICULTIES[cert.difficulty];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/courses/${cert.id}`} className="group block">
        <div className="bg-white rounded-2xl border border-surface-100 shadow-card overflow-hidden transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1">
          <div className="relative h-48 overflow-hidden">
            <img
              src={cert.image}
              alt={cert.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className={`px-2 py-1 rounded-lg text-xs font-medium ${category.color}`}>
                {category.icon} {category.label}
              </span>
            </div>
            {cert.featured && (
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 rounded-lg text-xs font-medium bg-amber-50 text-amber-700">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={difficulty.color}>{difficulty.label}</Badge>
            </div>
            <h3 className="font-semibold text-surface-900 mb-1.5 group-hover:text-brand-700 transition-colors line-clamp-1">
              {cert.title}
            </h3>
            <p className="text-sm text-surface-500 mb-4 line-clamp-2">{cert.shortDescription}</p>

            <div className="flex items-center justify-between text-xs text-surface-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock size={13} />
                  {cert.duration}m
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} />
                  {cert.enrolledCount.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={13} className="text-amber-400 fill-amber-400" />
                  {cert.rating}
                </span>
              </div>
              <ArrowRight size={14} className="text-surface-300 group-hover:text-brand-600 group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
