import { Routes, Route } from 'react-router-dom';

import AdminDashboardPage from './components/pages/AdminDashboard';
import AdminUserPage from './components/pages/AdminUser';
import StaffDashboardPage from './components/pages/StaffDashboard';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import DashboardLayout from './components/layouts/Dashboard';
import PageNotFound from './components/pages/PageNotFound';

import { AuthProvider } from './hooks/useAuth';

import './App.css'

function App() {

  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          <Route path="/auth" element={<DashboardLayout />}>
            <Route path="admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="admin/dashboard/user/:id" element={<AdminUserPage />} />
            <Route path="admin/dashboard/add-user" element={<Register />} />
            <Route path="staff/dashboard" element={<StaffDashboardPage />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
