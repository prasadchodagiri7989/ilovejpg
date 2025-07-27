import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Calculator, Percent, DivideSquare, BarChart2, GraduationCap, Package, Activity,
  Award, Home, DollarSign, TrendingUp, Weight, ChevronLeft, ArrowRightLeft, ChevronDown,
  Clock, BarChart, Calendar, Phone, Camera, FileText, MousePointer, Timer, Mic,
  Monitor, Lock, PieChart, Shuffle, Film, Smartphone, MessageSquare, Edit,
  Table, Volume2, CalendarDays, CheckSquare, Music, Ruler, Video, Wrench, Hash,
  AlignJustify, FileImage, Type, FileIcon, ImageIcon, Image, Code,
  Zap, CircuitBoard, Lightbulb, Battery, Feather, BookOpen, Workflow, Info,
  Gauge, Droplet, Flame, X, Terminal, Brush, Italic, GitBranch, Wifi, Sun, Book, Divide, Plus, Infinity, Circle, ArrowUp
} from "lucide-react";
import { Recycle, Server, Leaf } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Thermometer, Square, Wind, Bolt, Database, Compass, Fuel, BatteryCharging, Plug } from "lucide-react";
import {
  imageTools,
  pdfTools,
  spreadsheetTools,
  videoTools,
  audioTools,
  archiveTools,
  designTools,
  ebookTools,
} from "@/data/tools-data"; // Adjust path as necessary


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

  const [imageToolsOpen, setImageToolsOpen] = useState(false);
  const [pdfToolsGroupOpen, setPdfToolsGroupOpen] = useState(false);
  const [spreadsheetToolsOpen, setSpreadsheetToolsOpen] = useState(false);
  const [videoToolsOpen, setVideoToolsOpen] = useState(false);
  const [audioToolsOpen, setAudioToolsOpen] = useState(false);
  const [archiveToolsOpen, setArchiveToolsOpen] = useState(false);
  const [designToolsOpen, setDesignToolsOpen] = useState(false);
  const [ebookToolsOpen, setEbookToolsOpen] = useState(false);



  return (
    <aside className={cn(
      "fixed top-0 left-0 h-full w-64 bg-white z-30 border-r border-gray-200/50 shadow-sm dark:bg-gray-900 dark:border-gray-800/50",
      "transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      "flex flex-col"
    )}>
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between">
        <h2 className="text-lg font-medium dark:text-white">Easy Tables</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <ChevronLeft size={20} className="dark:text-gray-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-1 hide-scrollbar">
        <SidebarLink to="/" icon={Home} label="Home" onClose={onClose} />

        <div className="py-2">
          <Collapsible open={imageToolsOpen} onOpenChange={setImageToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <ImageIcon size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Image Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", imageToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {imageTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={pdfToolsGroupOpen} onOpenChange={setPdfToolsGroupOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <FileIcon size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">PDF Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", pdfToolsGroupOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {pdfTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={spreadsheetToolsOpen} onOpenChange={setSpreadsheetToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Table size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Spreadsheet Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", spreadsheetToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {spreadsheetTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={videoToolsOpen} onOpenChange={setVideoToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Video size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Video Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", videoToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {videoTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={audioToolsOpen} onOpenChange={setAudioToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Music size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Audio Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", audioToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {audioTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={archiveToolsOpen} onOpenChange={setArchiveToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Package size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Archive Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", archiveToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {archiveTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={designToolsOpen} onOpenChange={setDesignToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Brush size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Design Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", designToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {designTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={ebookToolsOpen} onOpenChange={setEbookToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Book size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">eBook Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", ebookToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {ebookTools.map((tool) => (
                <SidebarLink key={tool.slug} to={`/${tool.slug}`} icon={tool.icon} label={tool.label} onClose={onClose} />
              ))}
            </CollapsibleContent>
          </Collapsible>

        </div>
      </div>

      <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 Easy Tables</p>
      </div>
    </aside>
  );
};