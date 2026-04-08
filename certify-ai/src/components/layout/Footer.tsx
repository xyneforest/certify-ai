import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-surface-300 bg-[#faf8f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-xl font-bold text-surface-900">
                Certify<span className="text-brand-400">AI</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-surface-500 leading-relaxed">
              AI-powered professional certifications for the modern workforce.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-surface-900 mb-3">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/courses" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Courses</Link></li>
              <li><Link to="/exams" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">Exams</Link></li>
              <li><Link to="/fa" className="text-sm text-surface-500 hover:text-surface-900 transition-colors">F&A</Link></li>
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
            <p className="text-sm text-surface-500">hello@certifyai.com</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-surface-300 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-surface-400">&copy; 2024 CertifyAI. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-xs text-surface-400 hover:text-surface-600 cursor-pointer transition-colors">Privacy</span>
            <span className="text-xs text-surface-400 hover:text-surface-600 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
