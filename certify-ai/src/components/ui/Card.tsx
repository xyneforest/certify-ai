import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({ hover = true, padding = 'md', children, className = '', ...props }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        bg-white rounded-2xl border border-surface-100 shadow-card
        transition-all duration-300 ${paddings[padding]} ${className}
      `}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
