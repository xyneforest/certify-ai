import { motion } from 'framer-motion';
import { Info, AlertTriangle, Bell } from 'lucide-react';
import { Announcement } from '../../types';

interface AnnouncementListProps {
  announcements: Announcement[];
}

const typeConfig = {
  info: { icon: Info, bg: 'bg-blue-50', border: 'border-blue-100', iconColor: 'text-blue-500', label: 'Info' },
  update: { icon: Bell, bg: 'bg-emerald-50', border: 'border-emerald-100', iconColor: 'text-emerald-500', label: 'Update' },
  important: { icon: AlertTriangle, bg: 'bg-amber-50', border: 'border-amber-100', iconColor: 'text-amber-500', label: 'Important' },
};

export function AnnouncementList({ announcements }: AnnouncementListProps) {
  if (announcements.length === 0) {
    return (
      <div className="text-center py-12">
        <Bell size={32} className="mx-auto mb-3 text-surface-300" />
        <p className="text-surface-500">No announcements yet</p>
        <p className="text-sm text-surface-400 mt-1">Check back later for course updates and notices.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((a, i) => {
        const config = typeConfig[a.type];
        const Icon = config.icon;
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={`rounded-xl border ${config.border} ${config.bg} p-5`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <Icon size={18} className={config.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-surface-900 text-sm">{a.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${config.iconColor} ${config.bg}`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-surface-600 leading-relaxed">{a.content}</p>
                <p className="text-xs text-surface-400 mt-2">{new Date(a.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
