import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-gray-900 w-full">
      <Header />
      <main className="pt-24 w-full">
        <Outlet />
      </main>
    </div>
  );
}
