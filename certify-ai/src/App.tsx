import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Courses } from './pages/Courses';
import { CourseDetail } from './pages/CourseDetail';
import { Learn } from './pages/Learn';
import { Exams } from './pages/Exams';
import { ExamDetail } from './pages/ExamDetail';
import { FAQ } from './pages/FAQ';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Learn page - full screen, no footer */}
        <Route path="courses/:id/learn" element={<Learn />} />

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="exams" element={<Exams />} />
          <Route path="exams/:examId" element={<ExamDetail />} />
          <Route path="fa" element={<FAQ />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
