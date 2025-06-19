import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./styles/globals.css";
import MedicalRecords from "./pages/MedicalRecords";
import AIService from "./pages/AIService";
import DocumentUpload from "./pages/DocumentUpload";
import Specialities from "./pages/Specialities";
import { Toaster } from "sonner";

function App() {
  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          {/* Public Routes - redirect to dashboard if already logged in */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <PublicRoute redirectTo="/dashboard">
                <Home />
              </PublicRoute>
            }
          />

          {/* Protected Routes - require authentication */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="medical-records" element={<MedicalRecords />} />
            <Route path="specialities" element={<Specialities />} />
            <Route path="ai-service" element={<AIService />} />
            <Route path="documents" element={<DocumentUpload />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
