import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Award, User, LogOut, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Button } from '../ui';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();

  const links = [
    { to: '/explore', label: 'Explore' },
    { to: '/ai-generate', label: 'AI Generate', icon: <Sparkles size={14} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <Award size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-surface-900 group-hover:text-brand-700 transition-colors">
              CertifyAI
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive(link.to)
                    ? 'bg-surface-900 text-white'
                    : 'text-surface-600 hover:text-surface-900 hover:bg-surface-50'}
                `}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-surface-600 hover:text-surface-900 hover:bg-surface-50 transition-all"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  {user?.name}
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-surface-400 hover:text-surface-600 hover:bg-surface-50 transition-all"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/login?mode=signup">
                  <Button size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-surface-600 hover:bg-surface-50"
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
            className="md:hidden border-t border-surface-100 bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive(link.to) ? 'bg-surface-900 text-white' : 'text-surface-600 hover:bg-surface-50'}
                  `}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-surface-100">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50"
                    >
                      <User size={16} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-surface-600 hover:bg-surface-50 w-full text-left"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setMobileOpen(false)}>
                    <Button className="w-full" size="sm">Get Started</Button>
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
