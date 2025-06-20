import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const { login: handleLogin } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState("patient");

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    await handleLogin(email, password, activeTab)
    // Simulate login
    navigate('/dashboard');
  };

    const handleSwitch = (direction) => {
    if (activeTab !== direction) {
      setActiveTab(direction);
    }
  };

  return (
    <div className="min-h-screen from-blue-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-[var(--color-primary)] rounded-2xl flex items-center justify-center shadow-lg">
            <Stethoscope className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome to MediChain</h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your healthcare provider account
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center bg-white text-[var(--color-primary)] font-montserrat px-4">
              <div className="relative bg-[#f4f4f4] rounded-[37px] p-2 w-full max-w-[316px]">
                {/* Sliding indicator */}
                <div
                  className={`absolute top-0 h-full w-1/2 rounded-[50px] bg-[var(--color-primary)] shadow-md transition-all duration-500 ease-[cubic-bezier(.88,-.35,.565,1.35)] z-0 ${
                    activeTab === "patient" ? "left-0" : "left-1/2"
                  }`}
                ></div>

                {/* Tab buttons */}
                <div className="relative z-10 flex text-center font-bold text-[16px]">
                  <div
                    className={`w-1/2 py-3 cursor-pointer select-none transition-colors ${
                      activeTab === "patient" ? "text-white" : "text-[var(--color-primary)]"
                    }`}
                    onClick={() => handleSwitch("patient")}
                  >
                    Patients
                  </div>
                  <div
                    className={`w-1/2 py-3 cursor-pointer select-none transition-colors ${
                      activeTab === "advisor" ? "text-white" : "text-[var(--color-primary)]"
                    }`}
                    onClick={() => handleSwitch("advisor")}
                  >
                    Advisor
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white btn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center">
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                  Sign up here
                </Link>
              </span>
            </div>
          </form>
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
