import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { CertDetail } from './pages/CertDetail';
import { Exam } from './pages/Exam';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { AIGenerate } from './pages/AIGenerate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="cert/:slug" element={<CertDetail />} />
          <Route path="exam/:certId" element={<Exam />} />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ai-generate" element={<AIGenerate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
