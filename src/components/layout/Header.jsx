import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const {
    user: { type },
    logout
  } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navItems = useMemo(() => {
    return type === "advisor"
      ? [
          { label: "Dashboard", path: "/dashboard" },
          { label: "Patients", path: "/patients" },
          { label: "Requests", path: "/requests" },
        ]
      : [
          { label: "Medical Records", path: "/medical-records" },
          { label: "Specialities", path: "/specialities" },
          { label: "Document Upload", path: "/documents" },
        ];
  }, []);

  return (
    <section className="fixed top-0 left-0 w-full z-50 !bg-white/20 !backdrop-blur-md border-b border-white/30 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          onClick={() => navigate("/")}
          className="!text-3xl lg:!text-5xl font-bold text-[#057c8b] cursor-pointer"
        >
          Diagnopro
        </h1>

        <nav className="hidden md:flex !gap-3 md:!gap-6 text-sm lg:text-base items-center">
          {navItems.map((item) => (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`font-medium transition-all ${
                isActive(item.path)
                  ? "text-[#057c8b]"
                  : "text-gray-700 hover:text-[#057c8b]"
              }`}
            >
              {item.label}
            </div>
          ))}

          {type === "patient" && (
            <button
              onClick={() => navigate("/ai-service")}
              className="ml-4 !bg-[#057c8b] text-white px-4 py-2 !rounded-full !border-[#057c8b] text-sm font-medium !hover:bg-[#04606e] transition"
            >
              Ask CuraAI
            </button>
          )}

          <button className="btn" onClick={async()=> await logout()}>Log Out</button>
        </nav>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden !bg-[#057c8b] text-white text-xl"
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-white shadow-md overflow-hidden"
          >
            <div className="flex flex-col justify-center items-center px-6 py-4 gap-4">
              {navItems.map((item) => (
                <div
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileOpen(false);
                  }}
                  className={`text-left text-sm font-medium ${
                    isActive(item.path)
                      ? "text-[#057c8b] underline"
                      : "text-gray-700 hover:text-[#057c8b]"
                  }`}
                >
                  {item.label}
                </div>
              ))}

              <button
                onClick={() => {
                  navigate("/ai-service");
                  setMobileOpen(false);
                }}
                className="!bg-[#057c8b] text-white px-4 py-2 !rounded-full text-sm font-medium  w-65 !hover:bg-[#04606e] transition"
              >
                Ask CuraAI
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
