import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { IncidentsProvider } from './context/IncidentsContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import IncidentsTable from './components/IncidentsTable';

function App() {
  const { login } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/incidents"
          element={
            <PrivateRoute>
              <DashboardLayout>
                {/* only open/ongoing incidents are displayed */}
                <IncidentsTable filter="open" />
              </DashboardLayout>
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

const AppWrapper = () => (
  <AuthProvider>
    <IncidentsProvider>
      <App />
    </IncidentsProvider>
  </AuthProvider>
);

export default AppWrapper;
