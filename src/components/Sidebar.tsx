import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Calculator, Percent, DivideSquare, BarChart2, GraduationCap, Package, Activity,
  Award, Home, DollarSign, TrendingUp, Weight, ChevronLeft, ArrowRightLeft, ChevronDown,
  Clock, BarChart, Calendar, Phone, Camera, FileText, MousePointer, Timer, Mic,
  Monitor, Lock, PieChart, Shuffle, Film, Smartphone, Edit,
  Table, Volume2, CalendarDays, CheckSquare, Music, Ruler, Video, Wrench, Hash,
  AlignJustify, FileImage, Type, FileIcon, ImageIcon, Image, Code,
  Zap, CircuitBoard, Lightbulb, Battery, Feather, BookOpen, Workflow, Info,
  Gauge, Droplet, Flame, X, Terminal, Brush, Italic, GitBranch, Wifi, Sun, Book, Divide, Plus, Infinity, Circle, ArrowUp,
  Shield, FolderOpen, Sparkles, Gamepad2
} from "lucide-react";
import { Recycle, Server, Leaf } from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Thermometer, Square, Wind, Bolt, Database, Compass, Fuel, BatteryCharging, Plug, Users, Heart, Target, MessageSquare } from "lucide-react";
import {
  imageTools,
  pdfTools,
  spreadsheetTools,
  videoTools,
  audioTools,
  archiveTools,
  designTools,
  ebookTools,
  utilityTools,
  textDevTools,
  calculatorTools,
  dataConverterTools,
  timeDateTools,
  securityTools,
  webUtilities,
  socialMediaTools,
  fileTools,
  funTools,
  funGames,
  interactiveGames,
  funGenerators,
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

interface SidebarLinkProps {
  to: string;
  icon: React.ElementType;
  label: string;
  onClose: () => void;
  comingSoon?: boolean;
}

const SidebarLink = ({ to, icon: Icon, label, onClose, comingSoon }: SidebarLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (comingSoon) {
      e.preventDefault();
      return;
    }
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <NavLink
      to={comingSoon ? "#" : to}
      onClick={handleClick}
      className={({ isActive }) =>
        cn(
          "sidebar-link",
          isActive && !comingSoon && "active",
          comingSoon && "opacity-60 cursor-not-allowed"
        )
      }
    >
      <Icon size={18} />
      <span className="flex-1">{label}</span>
      {comingSoon && (
        <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-0.5 rounded">
          Soon
        </span>
      )}
    </NavLink>
  );
};

export const Sidebar = ({ open, onClose }: SidebarProps) => {

  const [imageToolsOpen, setImageToolsOpen] = useState(false);
  const [utilityToolsOpen, setUtilityToolsOpen] = useState(false);
  const [pdfToolsGroupOpen, setPdfToolsGroupOpen] = useState(false);
  const [spreadsheetToolsOpen, setSpreadsheetToolsOpen] = useState(false);
  const [videoToolsOpen, setVideoToolsOpen] = useState(false);
  const [audioToolsOpen, setAudioToolsOpen] = useState(false);
  const [archiveToolsOpen, setArchiveToolsOpen] = useState(false);
  const [designToolsOpen, setDesignToolsOpen] = useState(false);
  const [ebookToolsOpen, setEbookToolsOpen] = useState(false);
  const [textDevToolsOpen, setTextDevToolsOpen] = useState(false);
  const [calculatorToolsOpen, setCalculatorToolsOpen] = useState(false);
  const [dataConverterToolsOpen, setDataConverterToolsOpen] = useState(false);
  const [timeDateToolsOpen, setTimeDateToolsOpen] = useState(false);
  const [securityToolsOpen, setSecurityToolsOpen] = useState(false);
  const [webUtilitiesOpen, setWebUtilitiesOpen] = useState(false);
  const [socialMediaToolsOpen, setSocialMediaToolsOpen] = useState(false);
  const [fileToolsOpen, setFileToolsOpen] = useState(false);
  const [funToolsOpen, setFunToolsOpen] = useState(false);
  const [funGamesOpen, setFunGamesOpen] = useState(false);
  const [interactiveGamesOpen, setInteractiveGamesOpen] = useState(false);
  const [funGeneratorsOpen, setFunGeneratorsOpen] = useState(false);



  return (
    <aside className={cn(
      "fixed top-0 left-0 h-full w-64 bg-white z-30 border-r border-gray-200/50 shadow-sm dark:bg-gray-900 dark:border-gray-800/50",
      "transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
      "flex flex-col"
    )}>
      <div className="p-4 border-b border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between">
        <h2 className="text-lg font-medium dark:text-white">I Love JPG</h2>
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
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
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={utilityToolsOpen} onOpenChange={setUtilityToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Wrench size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Utility Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", utilityToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {utilityTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={textDevToolsOpen} onOpenChange={setTextDevToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Code size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Text & Developer Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", textDevToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {textDevTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={calculatorToolsOpen} onOpenChange={setCalculatorToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Calculator size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Calculator Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", calculatorToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {calculatorTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={tool.comingSoon || false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={dataConverterToolsOpen} onOpenChange={setDataConverterToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <ArrowRightLeft size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Data Converter Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", dataConverterToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {dataConverterTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={timeDateToolsOpen} onOpenChange={setTimeDateToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Clock size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Time & Date Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", timeDateToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {timeDateTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={securityToolsOpen} onOpenChange={setSecurityToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Lock size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Security Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", securityToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {securityTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={webUtilitiesOpen} onOpenChange={setWebUtilitiesOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Monitor size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Web Utilities</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", webUtilitiesOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {webUtilities.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={socialMediaToolsOpen} onOpenChange={setSocialMediaToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <MessageSquare size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Social Media Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", socialMediaToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {socialMediaTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={fileToolsOpen} onOpenChange={setFileToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <FolderOpen size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">File Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", fileToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {fileTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={funToolsOpen} onOpenChange={setFunToolsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Sparkles size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Fun Tools</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", funToolsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {funTools.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={funGamesOpen} onOpenChange={setFunGamesOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Gamepad2 size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Fun Games</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", funGamesOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {funGames.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={interactiveGamesOpen} onOpenChange={setInteractiveGamesOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Users size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Party  Games</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", interactiveGamesOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {interactiveGames.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={funGeneratorsOpen} onOpenChange={setFunGeneratorsOpen} className="w-full mt-2">
            <CollapsibleTrigger className="flex items-center justify-between w-full px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left">
              <div className="flex items-center">
                <Heart size={18} className="mr-2 dark:text-gray-300" />
                <span className="text-sm font-medium dark:text-gray-300">Fun Generators</span>
              </div>
              <ChevronDown size={16} className={cn("transition-transform duration-200 dark:text-gray-300", funGeneratorsOpen ? "rotate-180" : "")} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-6 space-y-1 mt-1">
              {funGenerators.map((tool) => (
                <SidebarLink 
                  key={tool.slug} 
                  to={`/${tool.slug}`} 
                  icon={tool.icon} 
                  label={tool.label} 
                  onClose={onClose}
                  comingSoon={false}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>

        </div>
      </div>

      <div className="p-4 border-t border-gray-200/50 dark:border-gray-800/50 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2025 I Love JPG</p>
      </div>
    </aside>
  );
};