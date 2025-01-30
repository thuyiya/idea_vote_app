import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/dashboardLayout';
import Dashboard from './pages/dashboard/dashboard';
import UserManagement from './pages/dashboard/user-mangement';
import Settings from './pages/dashboard/settings/settings';
import IdeaManagement from './pages/dashboard/idea-management';
import LoginPage from './pages/auth/login';
import ProtectedRoutes from './utils/ProtectedRoutes';
import Profile from './pages/dashboard/settings/profile';
import Notification from './pages/dashboard/settings/notifications';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/user" element={<UserManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/idea" element={<IdeaManagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notification />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;