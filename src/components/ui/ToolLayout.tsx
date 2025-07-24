
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/components/SearchBar";

interface ToolLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  showSearch?: boolean;
}

const ToolLayout = ({ 
  children, 
  title, 
  description, 
  className,
  showSearch = true
}: ToolLayoutProps) => {
  return (
    <div className="container mx-auto px-4 py-8 animate-fadeIn">
      
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-primary mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-gray-500 max-w-3xl">
            {description}
          </p>
        )}
      </div>
      
      <div className={cn("tool-container", className)}>
        {children}
      </div>
    </div>
  );
};

export default ToolLayout;
