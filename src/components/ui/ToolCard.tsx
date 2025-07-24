
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  className?: string;
  isNew?: boolean;
}

const ToolCard = ({
  title,
  description,
  icon: Icon,
  href,
  className,
  isNew = false,
}: ToolCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex flex-col p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
      
      <div className="flex items-center mb-4">
        <div className="p-3 rounded-xl bg-secondary text-primary group-hover:bg-primary/10 transition-colors duration-300">
          <Icon size={20} />
        </div>
        {isNew && (
          <span className="ml-auto px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-600">
            New
          </span>
        )}
      </div>
      
      <h3 className="text-lg font-medium text-primary mb-2 group-hover:translate-x-0.5 transition-transform duration-300">
        {title}
      </h3>
      
      <p className="text-sm text-gray-500 mb-4 group-hover:text-gray-600 transition-colors duration-300">
        {description}
      </p>
      
      <div className="mt-auto text-xs font-medium text-primary/80 group-hover:text-primary transition-colors duration-300">
        Open tool →
      </div>
    </Link>
  );
};

export default ToolCard;
