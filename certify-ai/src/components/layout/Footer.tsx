import { Link } from 'react-router-dom';
import { Award, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-surface-100 bg-surface-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <Award size={18} className="text-white" />
              </div>
              <span className="font-bold text-lg">CertifyAI</span>
            </Link>
            <p className="mt-3 text-sm text-surface-500 leading-relaxed">
              AI-powered professional certifications for the modern workforce.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/explore" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Explore Certifications</Link></li>
              <li><Link to="/ai-generate" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">AI Course Generator</Link></li>
              <li><Link to="/dashboard" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><span className="text-sm text-surface-500">Documentation</span></li>
              <li><span className="text-sm text-surface-500">API Reference</span></li>
              <li><span className="text-sm text-surface-500">Blog</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Connect</h3>
            <div className="flex gap-3">
              <span className="p-2 rounded-lg bg-surface-100 text-surface-600 hover:text-surface-900 transition-colors cursor-pointer">
                <ExternalLink size={18} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-surface-400">&copy; 2024 CertifyAI. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-xs text-surface-400">Privacy</span>
            <span className="text-xs text-surface-400">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
