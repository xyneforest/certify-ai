import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, Upload, Users, DollarSign,
  LogOut, Star, TrendingUp, UserPlus, Trophy, ChevronRight,
  Plus, Video, FileText, X, Menu,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { courses } from '../data/mockData';

type Tab = 'overview' | 'courses' | 'upload' | 'students' | 'income';

const sidebarItems: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'courses', label: 'My Courses', icon: BookOpen },
  { key: 'upload', label: 'Upload Course', icon: Upload },
  { key: 'students', label: 'Student Management', icon: Users },
  { key: 'income', label: 'Income Statistics', icon: DollarSign },
];

// Mock teacher data
const teacherStats = {
  publishedCourses: 3,
  totalStudents: 3210,
  totalIncome: 48600,
  avgRating: 4.85,
  monthlyNewStudents: 240,
  monthlyIncome: 6200,
};

const recentActivities = [
  { icon: UserPlus, text: '24 new students enrolled in "Level 3 Diploma in Business Management"', time: '2 hours ago', color: '#6b8f71' },
  { icon: Star, text: '"Level 7 Strategic Management" received a new 4.9 rating', time: '5 hours ago', color: '#e8a020' },
  { icon: DollarSign, text: 'Weekly income settled: $1,840', time: 'Yesterday', color: '#6b8f71' },
  { icon: Trophy, text: 'Your course was featured in "Top Picks This Week"', time: '2 days ago', color: '#e8a020' },
];

const mockStudents = [
  { id: 1, name: 'Emma Wilson', email: 'emma@example.com', course: 'Level 3 Diploma in Business Management', progress: 75, joinedAt: '2026-03-15', avatar: 'E' },
  { id: 2, name: 'Ryan Chen', email: 'ryan@example.com', course: 'Level 7 Strategic Management and Leadership', progress: 42, joinedAt: '2026-03-20', avatar: 'R' },
  { id: 3, name: 'Sofia Garcia', email: 'sofia@example.com', course: 'Level 3 Diploma in Business Management', progress: 90, joinedAt: '2026-02-28', avatar: 'S' },
  { id: 4, name: 'James Lee', email: 'james@example.com', course: 'Level 4 Diploma in Business Management', progress: 30, joinedAt: '2026-04-01', avatar: 'J' },
  { id: 5, name: 'Olivia Brown', email: 'olivia@example.com', course: 'Level 5 Extended Diploma in Accounting and Finance', progress: 60, joinedAt: '2026-03-10', avatar: 'O' },
  { id: 6, name: 'Liam Taylor', email: 'liam@example.com', course: 'Level 3 Diploma in Business Management', progress: 15, joinedAt: '2026-04-05', avatar: 'L' },
];

const monthlyIncomeData = [
  { month: 'Nov', income: 3200 },
  { month: 'Dec', income: 4100 },
  { month: 'Jan', income: 3800 },
  { month: 'Feb', income: 5200 },
  { month: 'Mar', income: 6200 },
  { month: 'Apr', income: 4800 },
];

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated || !user || user.role !== 'teacher') {
    navigate('/login');
    return null;
  }
  const displayUser = user;

  return (
    <div className="flex h-screen" style={{ background: '#faf8f4' }}>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-white border-r flex flex-col
        transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `} style={{ borderColor: '#ddd8cc' }}>
        {/* Logo */}
        <div className="flex items-center justify-between h-[76px] px-5 border-b" style={{ borderColor: '#ddd8cc' }}>
          <Link to="/" className="font-serif text-2xl font-bold" style={{ color: '#0f0f0f' }}>
            Certify<span style={{ color: '#e8a020' }}>AI</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        {/* Nav label */}
        <div className="px-5 pt-5 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#8a8070' }}>Navigation</span>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { setActiveTab(item.key); setSidebarOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: active ? '#fef3dc' : 'transparent',
                  color: active ? '#b87c10' : '#0f0f0f',
                  fontWeight: active ? 700 : 500,
                }}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 2} />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t" style={{ borderColor: '#ddd8cc' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: '#e8a020' }}>
              {displayUser.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold truncate" style={{ color: '#0f0f0f' }}>{displayUser.name}</div>
              <div className="text-xs truncate" style={{ color: '#8a8070' }}>Teacher</div>
            </div>
          </div>
          <button
            onClick={() => { logout(); navigate('/'); }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors"
            style={{ color: '#8a8070' }}
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="flex items-center justify-between h-[76px] px-6 bg-white border-b" style={{ borderColor: '#ddd8cc' }}>
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-bold" style={{ color: '#0f0f0f' }}>Teacher Console</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: '#e8a020' }}>
              {displayUser.name.charAt(0)}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'courses' && <MyCoursesTab />}
          {activeTab === 'upload' && <UploadCourseTab />}
          {activeTab === 'students' && <StudentsTab />}
          {activeTab === 'income' && <IncomeTab />}
        </main>
      </div>
    </div>
  );
}

/* ==================== OVERVIEW TAB ==================== */
function OverviewTab() {
  const stats = [
    { label: 'Published Courses', value: teacherStats.publishedCourses.toString(), sub: `+1 this month`, icon: BookOpen, color: '#e8a020' },
    { label: 'Total Students', value: teacherStats.totalStudents.toLocaleString(), sub: `+${teacherStats.monthlyNewStudents} this month`, icon: Users, color: '#6b8f71' },
    { label: 'Total Income', value: `$${teacherStats.totalIncome.toLocaleString()}`, sub: `+$${teacherStats.monthlyIncome.toLocaleString()} this month`, icon: DollarSign, color: '#e8a020' },
    { label: 'Average Rating', value: teacherStats.avgRating.toFixed(2), sub: 'Excellent', icon: Star, color: '#e8a020', isStar: true },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f0f0f', fontFamily: '"Noto Serif SC", Georgia, serif' }}>
        Data Overview
      </h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border p-5"
              style={{ borderColor: '#ddd8cc' }}
            >
              <div className="text-3xl font-bold mb-1" style={{ color: '#0f0f0f' }}>{stat.value}</div>
              <div className="text-sm mb-2" style={{ color: '#8a8070' }}>{stat.label}</div>
              <div className="flex items-center gap-1 text-xs font-medium" style={{ color: stat.color }}>
                {stat.isStar ? <Star size={12} fill={stat.color} /> : <TrendingUp size={12} />}
                {stat.sub}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent activities */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white rounded-2xl border p-6"
        style={{ borderColor: '#ddd8cc' }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: '#0f0f0f' }}>Recent Course Activity</h3>
        <div className="space-y-0">
          {recentActivities.map((activity, i) => {
            const Icon = activity.icon;
            return (
              <div key={i} className="flex items-center gap-4 py-4 border-b last:border-0" style={{ borderColor: '#f2ede4' }}>
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#fef3dc' }}>
                  <Icon size={18} style={{ color: activity.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-sm" style={{ color: '#0f0f0f' }}>{activity.text}</span>
                </div>
                <span className="text-xs whitespace-nowrap flex-shrink-0" style={{ color: '#8a8070' }}>{activity.time}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

/* ==================== MY COURSES TAB ==================== */
function MyCoursesTab() {
  const teacherCourses = courses.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#0f0f0f', fontFamily: '"Noto Serif SC", Georgia, serif' }}>
          My Courses
        </h2>
        <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: '#fef3dc', color: '#b87c10' }}>
          {teacherCourses.length} courses
        </span>
      </div>

      <div className="space-y-4">
        {teacherCourses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border overflow-hidden"
            style={{ borderColor: '#ddd8cc' }}
          >
            <div className="flex flex-col sm:flex-row">
              {/* Thumbnail */}
              <div className="sm:w-48 h-32 sm:h-auto flex-shrink-0 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' }}>
                <span className="text-4xl">{course.category === 'accounting-finance' ? '💰' : '📊'}</span>
              </div>
              {/* Info */}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#e8a020' }}>
                      {course.category === 'accounting-finance' ? 'ACCOUNTING & FINANCE' : 'BUSINESS MANAGEMENT'}
                    </span>
                    <h3 className="text-lg font-bold mt-1" style={{ color: '#0f0f0f' }}>{course.title}</h3>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 rounded-full flex-shrink-0" style={{ background: '#e8f5e9', color: '#2e7d32' }}>
                    Published
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm" style={{ color: '#8a8070' }}>
                  <span className="flex items-center gap-1"><Users size={14} /> {course.enrolledCount} students</span>
                  <span className="flex items-center gap-1"><Star size={14} fill="#e8a020" stroke="#e8a020" /> {course.rating}</span>
                  <span className="flex items-center gap-1"><FileText size={14} /> {course.modules.length} modules</span>
                  <span>{course.duration}h total</span>
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                    style={{ background: '#0f0f0f', color: '#faf8f4' }}
                  >
                    View Course
                  </Link>
                  <button className="text-sm font-semibold px-4 py-2 rounded-lg border transition-colors hover:bg-gray-50" style={{ borderColor: '#ddd8cc', color: '#0f0f0f' }}>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ==================== UPLOAD COURSE TAB ==================== */
function UploadCourseTab() {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f0f0f', fontFamily: '"Noto Serif SC", Georgia, serif' }}>
        Upload Course
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course info form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border p-6"
          style={{ borderColor: '#ddd8cc' }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: '#0f0f0f' }}>Course Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#8a8070' }}>Course Title</label>
              <input
                type="text"
                placeholder="e.g. Level 3 Diploma in Business Management"
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors"
                style={{ background: '#faf8f4', borderColor: '#ddd8cc', color: '#0f0f0f' }}
                onFocus={(e) => e.target.style.borderColor = '#e8a020'}
                onBlur={(e) => e.target.style.borderColor = '#ddd8cc'}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#8a8070' }}>Category</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors"
                style={{ background: '#faf8f4', borderColor: '#ddd8cc', color: '#0f0f0f' }}
              >
                <option>Business Management</option>
                <option>Accounting & Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#8a8070' }}>Difficulty</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors"
                style={{ background: '#faf8f4', borderColor: '#ddd8cc', color: '#0f0f0f' }}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: '#8a8070' }}>Description</label>
              <textarea
                rows={4}
                placeholder="Describe your course..."
                className="w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors resize-none"
                style={{ background: '#faf8f4', borderColor: '#ddd8cc', color: '#0f0f0f' }}
                onFocus={(e) => e.target.style.borderColor = '#e8a020'}
                onBlur={(e) => e.target.style.borderColor = '#ddd8cc'}
              />
            </div>
          </div>
        </motion.div>

        {/* Video upload area */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl border p-6"
          style={{ borderColor: '#ddd8cc' }}
        >
          <h3 className="text-lg font-bold mb-4" style={{ color: '#0f0f0f' }}>Upload Video Lessons</h3>

          {/* Drag & drop area */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all"
            style={{
              borderColor: dragOver ? '#e8a020' : '#ddd8cc',
              background: dragOver ? '#fef3dc' : '#faf8f4',
            }}
          >
            <input ref={fileInputRef} type="file" accept="video/*" multiple className="hidden" />
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: '#fef3dc' }}>
              <Video size={28} style={{ color: '#e8a020' }} />
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#0f0f0f' }}>
              Drag & drop video files here
            </p>
            <p className="text-xs mb-4" style={{ color: '#8a8070' }}>
              or click to browse. Supports MP4, MOV, AVI (max 2GB)
            </p>
            <button
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{ background: '#e8a020', color: '#fff' }}
            >
              Select Files
            </button>
          </div>

          {/* Lesson list builder */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold" style={{ color: '#0f0f0f' }}>Lesson Structure</span>
              <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors" style={{ color: '#e8a020', background: '#fef3dc' }}>
                <Plus size={14} /> Add Lesson
              </button>
            </div>
            <div className="space-y-2">
              {['Introduction to the Course', 'Module 1: Core Concepts', 'Module 2: Practical Application'].map((lesson, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg border" style={{ borderColor: '#f2ede4' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#fef3dc', color: '#b87c10' }}>
                    {i + 1}
                  </div>
                  <span className="flex-1 text-sm" style={{ color: '#0f0f0f' }}>{lesson}</span>
                  <Video size={14} style={{ color: '#8a8070' }} />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Submit */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex justify-end gap-3"
      >
        <button className="px-6 py-2.5 rounded-lg text-sm font-semibold border transition-colors hover:bg-gray-50" style={{ borderColor: '#ddd8cc', color: '#0f0f0f' }}>
          Save as Draft
        </button>
        <button className="px-6 py-2.5 rounded-lg text-sm font-bold transition-colors" style={{ background: '#e8a020', color: '#fff' }}>
          Publish Course
        </button>
      </motion.div>
    </div>
  );
}

/* ==================== STUDENTS TAB ==================== */
function StudentsTab() {
  const [search, setSearch] = useState('');
  const filtered = mockStudents.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.course.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold" style={{ color: '#0f0f0f', fontFamily: '"Noto Serif SC", Georgia, serif' }}>
          Student Management
        </h2>
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search students or courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none transition-colors"
            style={{ background: '#faf8f4', borderColor: '#ddd8cc', color: '#0f0f0f' }}
            onFocus={(e) => e.target.style.borderColor = '#e8a020'}
            onBlur={(e) => e.target.style.borderColor = '#ddd8cc'}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: '#ddd8cc' }}
      >
        {/* Table header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider border-b" style={{ color: '#8a8070', borderColor: '#f2ede4', background: '#faf8f4' }}>
          <div className="col-span-3">Student</div>
          <div className="col-span-4">Course</div>
          <div className="col-span-2">Progress</div>
          <div className="col-span-2">Joined</div>
          <div className="col-span-1"></div>
        </div>

        {/* Rows */}
        {filtered.map((student, i) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.04 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-6 py-4 border-b last:border-0 hover:bg-gray-50/50 transition-colors items-center"
            style={{ borderColor: '#f2ede4' }}
          >
            {/* Student */}
            <div className="col-span-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: '#e8a020' }}>
                {student.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: '#0f0f0f' }}>{student.name}</div>
                <div className="text-xs truncate" style={{ color: '#8a8070' }}>{student.email}</div>
              </div>
            </div>
            {/* Course */}
            <div className="col-span-4">
              <span className="text-sm" style={{ color: '#0f0f0f' }}>{student.course}</span>
            </div>
            {/* Progress */}
            <div className="col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: '#f2ede4' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${student.progress}%`,
                      background: student.progress >= 80 ? '#6b8f71' : student.progress >= 50 ? '#e8a020' : '#ddd8cc',
                    }}
                  />
                </div>
                <span className="text-xs font-semibold w-8 text-right" style={{ color: '#8a8070' }}>{student.progress}%</span>
              </div>
            </div>
            {/* Joined */}
            <div className="col-span-2">
              <span className="text-sm" style={{ color: '#8a8070' }}>{student.joinedAt}</span>
            </div>
            {/* Action */}
            <div className="col-span-1 flex justify-end">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" style={{ color: '#8a8070' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Users size={32} className="mx-auto mb-3" style={{ color: '#ddd8cc' }} />
            <p className="text-sm" style={{ color: '#8a8070' }}>No students found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

/* ==================== INCOME TAB ==================== */
function IncomeTab() {
  const maxIncome = Math.max(...monthlyIncomeData.map(d => d.income));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ color: '#0f0f0f', fontFamily: '"Noto Serif SC", Georgia, serif' }}>
        Income Statistics
      </h2>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Earnings', value: `$${teacherStats.totalIncome.toLocaleString()}`, sub: 'All time' },
          { label: 'This Month', value: `$${teacherStats.monthlyIncome.toLocaleString()}`, sub: '+18% vs last month' },
          { label: 'Average Per Course', value: `$${Math.round(teacherStats.totalIncome / teacherStats.publishedCourses).toLocaleString()}`, sub: `${teacherStats.publishedCourses} courses` },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl border p-5"
            style={{ borderColor: '#ddd8cc' }}
          >
            <div className="text-sm mb-1" style={{ color: '#8a8070' }}>{card.label}</div>
            <div className="text-3xl font-bold mb-1" style={{ color: '#0f0f0f' }}>{card.value}</div>
            <div className="text-xs font-medium" style={{ color: '#6b8f71' }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl border p-6"
        style={{ borderColor: '#ddd8cc' }}
      >
        <h3 className="text-lg font-bold mb-6" style={{ color: '#0f0f0f' }}>Monthly Income</h3>
        <div className="flex items-end gap-3 h-48">
          {monthlyIncomeData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: '#0f0f0f' }}>${(d.income / 1000).toFixed(1)}k</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.income / maxIncome) * 100}%` }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className="w-full rounded-t-lg"
                style={{ background: i === monthlyIncomeData.length - 2 ? '#e8a020' : '#fef3dc', minHeight: 8 }}
              />
              <span className="text-xs" style={{ color: '#8a8070' }}>{d.month}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Transaction history */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl border p-6 mt-6"
        style={{ borderColor: '#ddd8cc' }}
      >
        <h3 className="text-lg font-bold mb-4" style={{ color: '#0f0f0f' }}>Recent Transactions</h3>
        <div className="space-y-0">
          {[
            { desc: 'Level 3 Diploma - 12 new enrollments', amount: '+$480', date: 'Apr 7, 2026' },
            { desc: 'Level 7 Strategic Management - 5 new enrollments', amount: '+$350', date: 'Apr 6, 2026' },
            { desc: 'Weekly payout to bank account', amount: '-$1,840', date: 'Apr 5, 2026', isWithdraw: true },
            { desc: 'Level 4 Diploma - 8 new enrollments', amount: '+$320', date: 'Apr 4, 2026' },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0" style={{ borderColor: '#f2ede4' }}>
              <div>
                <div className="text-sm" style={{ color: '#0f0f0f' }}>{tx.desc}</div>
                <div className="text-xs" style={{ color: '#8a8070' }}>{tx.date}</div>
              </div>
              <span className="text-sm font-bold" style={{ color: tx.isWithdraw ? '#0f0f0f' : '#6b8f71' }}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
