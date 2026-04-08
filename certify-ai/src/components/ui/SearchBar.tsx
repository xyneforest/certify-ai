import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...', className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-4 py-3 rounded-xl border border-surface-200 bg-white text-sm
          text-surface-900 placeholder-surface-400 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500
          shadow-sm hover:shadow-card"
      />
    </div>
  );
}
