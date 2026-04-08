import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, Home, BookOpen, ClipboardList, Newspaper } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/courses', label: 'Courses', icon: BookOpen },
    { to: '/exams', label: 'Exam', icon: ClipboardList },
    { to: '/fa', label: 'F&A', icon: Newspaper },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#faf8f4] border-b border-surface-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[76px]">
          <Link to="/" className="flex items-center group">
            <span className="font-serif text-3xl font-bold text-surface-900">
              Certify<span className="text-brand-400">AI</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    flex items-center gap-2.5 py-2 text-xl font-bold tracking-wide transition-all duration-200 border-b-3
                    ${isActive(link.to)
                      ? 'text-surface-900 border-brand-400'
                      : 'text-surface-900 border-transparent hover:text-brand-400 hover:border-brand-400'}
                  `}
                >
                  <Icon size={24} strokeWidth={2.2} />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 text-lg font-bold text-surface-700 hover:text-surface-900 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-400 flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  {user?.name}
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-surface-400 hover:text-surface-600 transition-all"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-lg font-bold text-surface-700 hover:text-surface-900 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-100"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-surface-300 bg-[#faf8f4]"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 text-base font-bold transition-all rounded-lg
                      ${isActive(link.to)
                        ? 'text-surface-900 bg-surface-100 border-l-2 border-brand-400'
                        : 'text-surface-900 hover:bg-surface-100'}
                    `}
                  >
                    <Icon size={20} strokeWidth={2.2} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-2 border-t border-surface-300">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 text-[0.875rem] font-medium text-surface-600 hover:bg-surface-100 rounded-lg"
                    >
                      <div className="w-6 h-6 rounded-full bg-brand-400 flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2.5 text-[0.875rem] font-medium text-surface-600 hover:bg-surface-100 w-full text-left rounded-lg"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 text-[0.875rem] font-medium text-surface-500 hover:text-surface-900"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
