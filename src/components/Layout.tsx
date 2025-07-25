import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "./SearchBar";
import { useTheme } from "@/hooks/use-theme";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile menu button */}
      {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="sidebar-trigger-button md:hidden fixed top-4 left-4 z-40 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} className="text-gray-700 dark:text-gray-200" />
        </button>
      )}

      {/* Main layout container */}
      <div
        className={cn(
          "flex flex-col flex-1 min-h-screen transition-all duration-300 ease-in-out",
          "md:ml-64",
          "dark:bg-gray-900 dark:text-white"
        )}
      >
        {/* Top bar */}
        <header className="max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 pt-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex-1">
              <SearchBar />
            </div>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 pb-10">
          {children}
        </main>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </div>
  );
};
