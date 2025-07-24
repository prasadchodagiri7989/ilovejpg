import React, { useState, useEffect } from "react";
import { Edit, Save, Copy, Download, Clock, Trash2, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const OnlineNotepad = () => {
  const [text, setText] = useState<string>(() => {
    // Load text from localStorage
    const savedText = localStorage.getItem("onlineNotepadText");
    return savedText || "";
  });
  
  const [fileName, setFileName] = useState<string>(() => {
    // Load filename from localStorage or use default
    const savedName = localStorage.getItem("onlineNotepadFileName");
    return savedName || "my-notes.txt";
  });
  
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState<number>(0);
  const [charCount, setCharCount] = useState<number>(0);
  const [isUnsaved, setIsUnsaved] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  const { toast } = useToast();
  
  // Calculate word and character counts
  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setWordCount(words);
    setCharCount(text.length);
    
    // Mark as unsaved when text changes
    if (lastSaved !== null) {
      setIsUnsaved(true);
    }
  }, [text, lastSaved]);
  
  // Auto-save to localStorage
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      if (isUnsaved) {
        saveToLocalStorage();
      }
    }, 3000); // Auto-save after 3 seconds of inactivity
    
    return () => clearTimeout(saveTimer);
  }, [text, isUnsaved]);
  
  // Handle Ctrl+S keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveToLocalStorage();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex]);
  
  const saveToLocalStorage = () => {
    localStorage.setItem("onlineNotepadText", text);
    localStorage.setItem("onlineNotepadFileName", fileName);
    setLastSaved(new Date());
    setIsUnsaved(false);
    
    // Add to history if different from current state
    if (history.length === 0 || history[historyIndex] !== text) {
      // Limit history to 50 states to prevent memory issues
      const newHistory = [...history.slice(0, historyIndex + 1), text].slice(-50);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    
    toast({
      title: "Saved successfully",
      description: "Your notes have been saved to your browser's local storage.",
    });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: "Copied to clipboard",
      description: "Your notes have been copied to the clipboard.",
    });
  };
  
  const downloadFile = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "File downloaded",
      description: `Your notes have been downloaded as "${fileName}".`,
    });
  };
  
  const clearText = () => {
    if (text.trim() === "") return;
    
    // Add current state to history before clearing
    const newHistory = [...history.slice(0, historyIndex + 1), text];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    
    setText("");
    setIsUnsaved(true);
    
    toast({
      title: "Notepad cleared",
      description: "All text has been cleared. You can undo this action if needed.",
    });
  };
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setText(history[newIndex]);
      setHistoryIndex(newIndex);
      setIsUnsaved(true);
    }
  };
  
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setText(history[newIndex]);
      setHistoryIndex(newIndex);
      setIsUnsaved(true);
    }
  };
  
  const formatLastSaved = () => {
    if (!lastSaved) return "Never";
    
    // If saved today, show time only
    const now = new Date();
    const isToday = now.toDateString() === lastSaved.toDateString();
    
    if (isToday) {
      return `Today at ${lastSaved.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show date and time
    return lastSaved.toLocaleString();
  };

  return (
    <>
                      <Breadcrumb className="mb-4">
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink asChild>
                            <Link to="/">Home</Link>
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Online Notepad</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Edit className="mr-2 text-primary" size={24} />
            <CardTitle>Online Notepad</CardTitle>
          </div>
          <CardDescription>
            Take notes in your browser with auto-save
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <div className="flex flex-wrap gap-2 justify-between items-center">
            <div className="space-y-1">
              <Label htmlFor="filename">File Name</Label>
              <Input
                id="filename"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="max-w-[250px]"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
                className="flex items-center gap-1"
                title="Undo (Ctrl+Z)"
              >
                <RotateCcw size={14} className="rotate-90" />
                Undo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= history.length - 1}
                className="flex items-center gap-1"
                title="Redo (Ctrl+Y)"
              >
                <RotateCcw size={14} className="-rotate-90" />
                Redo
              </Button>
            </div>
          </div>
          
          <Textarea
            placeholder="Start typing your notes here..."
            className="min-h-[50vh] font-mono text-base"
            value={text}
            onChange={handleTextChange}
          />
          
          <div className="flex flex-wrap justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              Last saved: {formatLastSaved()}
              {isUnsaved && <span className="ml-2 text-yellow-500">• Unsaved changes</span>}
            </div>
            <div>
              {wordCount} {wordCount === 1 ? 'word' : 'words'} | {charCount} {charCount === 1 ? 'character' : 'characters'}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={saveToLocalStorage}
              className="flex items-center gap-2"
            >
              <Save size={16} />
              Save
            </Button>
            
            <Button
              variant="outline"
              onClick={copyToClipboard}
              className="flex items-center gap-2"
            >
              <Copy size={16} />
              Copy
            </Button>
            
            <Button
              variant="outline"
              onClick={downloadFile}
              className="flex items-center gap-2"
            >
              <Download size={16} />
              Download
            </Button>
            
            <Button
              variant="outline"
              onClick={clearText}
              className="flex items-center gap-2 ml-auto"
            >
              <Trash2 size={16} />
              Clear
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <p>Tip: Your notes are automatically saved to your browser's local storage.</p>
            <p>Keyboard shortcuts: Ctrl+S to save, Ctrl+Z to undo, Ctrl+Y to redo</p>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Online Notepad">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Online Notepad</h4>
      <p>The Online Notepad tool allows you to take and save notes directly in your browser.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Start typing your notes in the text area.</li>
        <li>Your notes are automatically saved to your browser's local storage.</li>
        <li>Use the buttons to save, copy, download, or clear your notes.</li>
        <li>Keyboard shortcuts: Ctrl+S to save, Ctrl+Z to undo, Ctrl+Y to redo.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Auto-save functionality to prevent data loss.</li>
        <li>Undo and redo options for easy editing.</li>
        <li>Download notes as a text file.</li>
        <li>Supports keyboard shortcuts for efficiency.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Quick and easy way to jot down notes.</li>
        <li>No login required—notes are stored locally.</li>
        <li>Accessible from any browser without installation.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
