import React, { useState, useEffect } from "react";
import { FileText, Plus, Trash2, Edit, Save, X, Clock, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: number; // timestamp
}

export const OnlineNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    // Load notes from localStorage on initial render
    const savedNotes = localStorage.getItem("onlineNotes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState(false);
  const [activeTitle, setActiveTitle] = useState("");
  const [activeContent, setActiveContent] = useState("");
  const [isUnsaved, setIsUnsaved] = useState(false);
  const { toast } = useToast();
  
  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("onlineNotes", JSON.stringify(notes));
  }, [notes]);
  
  // Set active note when notes change or component mounts
  useEffect(() => {
    if (notes.length > 0 && !activeNoteId) {
      const latestNote = notes.reduce((latest, note) => 
        note.lastModified > latest.lastModified ? note : latest, notes[0]);
      setActiveNoteId(latestNote.id);
      setActiveTitle(latestNote.title);
      setActiveContent(latestNote.content);
    } else if (notes.length === 0) {
      setActiveNoteId(null);
      setActiveTitle("");
      setActiveContent("");
    }
  }, [notes]);
  
  // Update form when active note changes
  useEffect(() => {
    if (activeNoteId) {
      const note = notes.find(n => n.id === activeNoteId);
      if (note) {
        setActiveTitle(note.title);
        setActiveContent(note.content);
        setIsUnsaved(false);
      }
    }
  }, [activeNoteId, notes]);
  
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  
  const createNewNote = () => {
    // Auto-save current note if there are unsaved changes
    if (isUnsaved && activeNoteId) {
      saveNote();
    }
    
    const newNote: Note = {
      id: generateId(),
      title: "Untitled Note",
      content: "",
      lastModified: Date.now(),
    };
    
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
    setActiveTitle(newNote.title);
    setActiveContent(newNote.content);
    setIsUnsaved(false);
    
    toast({
      title: "New note created",
      description: "A new blank note has been created.",
    });
  };
  
  const deleteNote = (id: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    
    setNotes(notes.filter(note => note.id !== id));
    
    if (activeNoteId === id) {
      if (notes.length > 1) {
        // Find the next note to make active
        const index = notes.findIndex(n => n.id === id);
        const nextIndex = index === notes.length - 1 ? index - 1 : index + 1;
        setActiveNoteId(notes[nextIndex].id);
      } else {
        setActiveNoteId(null);
        setActiveTitle("");
        setActiveContent("");
      }
    }
    
    toast({
      title: "Note deleted",
      description: "The note has been permanently deleted.",
    });
  };
  
  const saveNote = () => {
    if (!activeNoteId) return;
    
    setNotes(notes.map(note => 
      note.id === activeNoteId 
        ? { ...note, title: activeTitle, content: activeContent, lastModified: Date.now() } 
        : note
    ));
    
    setIsUnsaved(false);
    
    toast({
      title: "Note saved",
      description: "Your changes have been saved.",
    });
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveTitle(e.target.value);
    setIsUnsaved(true);
  };
  
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setActiveContent(e.target.value);
    setIsUnsaved(true);
  };
  
  const handleNoteSelect = (id: string) => {
    // Auto-save current note if there are unsaved changes
    if (isUnsaved && activeNoteId) {
      saveNote();
    }
    
    setActiveNoteId(id);
  };
  
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    
    // If it's today, just show the time
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return `Today at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // If it's yesterday, show "Yesterday"
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise show the date
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const downloadNote = () => {
    if (!activeNoteId) return;
    
    const note = notes.find(n => n.id === activeNoteId);
    if (!note) return;
    
    const fileName = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    const blob = new Blob([note.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Note downloaded",
      description: `Your note has been downloaded as "${fileName}".`,
    });
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
                              <BreadcrumbPage>Online Notes</BreadcrumbPage>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
    <div className="max-w-5xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <FileText className="mr-2 text-primary" size={24} />
            <CardTitle>Online Notes</CardTitle>
          </div>
          <CardDescription>
            Create, edit, and organize your notes
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4">
            <div className="border rounded-md overflow-hidden">
              <div className="p-3 bg-muted/30 border-b flex justify-between items-center">
                <h3 className="font-medium">My Notes ({notes.length})</h3>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={createNewNote}
                  className="h-7 w-7 p-0"
                >
                  <Plus size={16} />
                </Button>
              </div>
              
              <div className="max-h-[500px] overflow-y-auto">
                {notes.length > 0 ? (
                  <ul>
                    {notes.map((note) => (
                      <li 
                        key={note.id} 
                        className={`border-b last:border-b-0 p-3 cursor-pointer hover:bg-muted/20 ${
                          activeNoteId === note.id ? 'bg-muted/40' : ''
                        }`}
                        onClick={() => handleNoteSelect(note.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 truncate">
                            <div className="font-medium truncate">{note.title}</div>
                            <div className="text-xs text-muted-foreground flex items-center mt-1">
                              <Clock size={12} className="mr-1" />
                              {formatDate(note.lastModified)}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => deleteNote(note.id, e)}
                            className="h-7 w-7 p-0 ml-1 opacity-50 hover:opacity-100"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 truncate">
                          {note.content.substring(0, 60)}{note.content.length > 60 ? '...' : ''}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-6 text-center text-muted-foreground">
                    <FileText size={32} className="mx-auto mb-2 opacity-20" />
                    <p>No notes yet</p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={createNewNote}
                      className="mt-2"
                    >
                      Create your first note
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              {activeNoteId ? (
                <div className="h-full flex flex-col">
                  <div className="p-3 bg-muted/30 border-b flex justify-between items-center">
                    {editingTitle ? (
                      <div className="flex-1 mr-2">
                        <Input
                          value={activeTitle}
                          onChange={handleTitleChange}
                          placeholder="Note title"
                          autoFocus
                          onBlur={() => setEditingTitle(false)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') setEditingTitle(false);
                            if (e.key === 'Escape') setEditingTitle(false);
                          }}
                        />
                      </div>
                    ) : (
                      <h3 className="font-medium truncate flex-1" onClick={() => setEditingTitle(true)}>
                        {activeTitle || "Untitled Note"}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTitle(true)}
                          className="h-6 w-6 p-0 ml-1 opacity-50 hover:opacity-100 inline"
                        >
                          <Edit size={12} />
                        </Button>
                      </h3>
                    )}
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={downloadNote}
                        className="h-7 w-7 p-0"
                        title="Download note"
                      >
                        <Download size={14} />
                      </Button>
                      <Button
                        variant={isUnsaved ? "default" : "ghost"}
                        size="sm"
                        onClick={saveNote}
                        className="h-7 flex items-center gap-1 px-2"
                        disabled={!isUnsaved}
                      >
                        <Save size={14} />
                        {isUnsaved ? "Save" : "Saved"}
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="edit" className="flex-1 flex flex-col">
                    <div className="px-3 pt-2 bg-muted/10">
                      <TabsList className="grid w-full max-w-[200px] grid-cols-2">
                        <TabsTrigger value="edit">Edit</TabsTrigger>
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                      </TabsList>
                    </div>
                    
                    <TabsContent value="edit" className="flex-1 m-0 p-0">
                      <Textarea
                        value={activeContent}
                        onChange={handleContentChange}
                        placeholder="Start writing your note here..."
                        className="border-0 rounded-none h-full min-h-[450px]"
                      />
                    </TabsContent>
                    
                    <TabsContent value="preview" className="flex-1 m-0 p-4 overflow-auto min-h-[450px]">
                      {activeContent ? (
                        <div className="prose max-w-none">
                          {activeContent.split('\n').map((line, i) => (
                            <p key={i}>{line || <br />}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="text-muted-foreground text-center py-8">
                          <p>No content to preview</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                  
                  <div className="p-2 text-xs text-muted-foreground border-t">
                    {isUnsaved ? (
                      <span className="text-yellow-500">• Unsaved changes</span>
                    ) : (
                      <span>Last saved: {formatDate(notes.find(n => n.id === activeNoteId)?.lastModified || Date.now())}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center p-6 text-center text-muted-foreground">
                  <div>
                    <FileText size={48} className="mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium mb-2">No note selected</h3>
                    <p className="mb-4">Select a note from the list or create a new one</p>
                    <Button onClick={createNewNote}>
                      <Plus size={16} className="mr-2" />
                      Create New Note
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use Online Notes">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using Online Notes</h4>
      <p>The Online Notes tool allows you to create, edit, and organize multiple notes efficiently.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click "Create New Note" to start a new note.</li>
        <li>Type your content in the note editor.</li>
        <li>Your notes are automatically saved to your browser's local storage.</li>
        <li>Select a note from the list to view or edit it.</li>
        <li>Use the delete option to remove unnecessary notes.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Create and manage multiple notes easily.</li>
        <li>Auto-save functionality to prevent data loss.</li>
        <li>Quickly switch between different notes.</li>
        <li>Delete notes when no longer needed.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Organize your notes efficiently.</li>
        <li>No login required—notes are stored locally.</li>
        <li>Access your notes from any browser without installation.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );

};
