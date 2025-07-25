import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ImageIcon, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  onClose: () => void;
}

const SidebarLink = ({ to, icon: Icon, label, onClose }: SidebarLinkProps) => {
  const handleClick = () => {
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        cn("sidebar-link", isActive && "active")
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  );
};

export const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <aside className={cn(
      "fixed top-0 left-0 h-full w-64 bg-white z-30 border-r border-gray-200/50 shadow-sm dark:bg-gray-900 dark:border-gray-800/50",
      "transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      "flex flex-col"
    )}>
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between">
        <h2 className="text-lg font-medium dark:text-white">ILoveJPG</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <ChevronLeft size={20} className="dark:text-gray-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <SidebarLink to="/" icon={Home} label="Home" onClose={onClose} />
        <SidebarLink to="/jpgtopng" icon={ImageIcon} label="JPG to PNG" onClose={onClose} />
        <SidebarLink to="/jpgtowebp" icon={ImageIcon} label="JPG to WEBP" onClose={onClose} />
      </div>

      <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 ILoveJPG</p>
      </div>
    </aside>
  );
};
