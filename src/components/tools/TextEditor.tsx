
import React, { useState, useEffect } from "react";
import { Edit, Save, Download, Copy, FileText, Trash2, FileUp, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Link } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";


export const TextEditor = () => {
  const [content, setContent] = useState<string>("");
  const [filename, setFilename] = useState<string>("document.txt");
  const [savedContent, setSavedContent] = useState<string>("");
  const [isUnsaved, setIsUnsaved] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<{start: number, end: number} | null>(null);
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);
  const { toast } = useToast();

  // Check if content is unsaved
  useEffect(() => {
    setIsUnsaved(content !== savedContent);
  }, [content, savedContent]);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("textEditorContent");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setContent(parsed.content || "");
        setSavedContent(parsed.content || "");
        setFilename(parsed.filename || "document.txt");
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const saveDocument = () => {
    localStorage.setItem("textEditorContent", JSON.stringify({
      content,
      filename
    }));
    setSavedContent(content);
    setIsUnsaved(false);
    
    toast({
      title: "Document saved",
      description: "Your document has been saved to browser storage",
    });
  };

  const downloadDocument = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `Your document is being downloaded as "${filename}"`,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    
    toast({
      title: "Copied to clipboard",
      description: "Document content has been copied to clipboard",
    });
  };

  const clearDocument = () => {
    if (window.confirm("Are you sure you want to clear the document? All content will be lost.")) {
      setContent("");
      
      toast({
        title: "Document cleared",
        description: "Your document has been cleared",
      });
    }
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Update filename from the uploaded file
    setFilename(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const text = event.target.result as string;
        setContent(text);
        
        toast({
          title: "File loaded",
          description: `"${file.name}" has been loaded successfully`,
        });
      }
    };
    reader.readAsText(file);
    
    // Reset the input so the same file can be uploaded again if needed
    e.target.value = '';
  };

  // Get text selection in textarea
  const handleTextareaSelect = () => {
    if (!textareaRef) return;
    
    setSelectedText({
      start: textareaRef.selectionStart,
      end: textareaRef.selectionEnd
    });
  };

  // Apply formatting to selected text
  const applyFormatting = (formatType: string) => {
    if (!textareaRef || !selectedText) return;
    
    const start = selectedText.start;
    const end = selectedText.end;
    const selectedContent = content.substring(start, end);
    
    if (start === end) {
      // No text selected, show toast
      toast({
        title: "No text selected",
        description: "Please select text to apply formatting",
        variant: "destructive",
      });
      return;
    }
    
    let formattedText = selectedContent;
    let newCursorPos = end;
    
    switch (formatType) {
      case 'bold':
        formattedText = `**${selectedContent}**`;
        newCursorPos += 4;
        break;
      case 'italic':
        formattedText = `*${selectedContent}*`;
        newCursorPos += 2;
        break;
      case 'underline':
        formattedText = `_${selectedContent}_`;
        newCursorPos += 2;
        break;
      case 'link':
        formattedText = `[${selectedContent}](url)`;
        newCursorPos += 6;
        break;
      case 'h1':
        formattedText = `# ${selectedContent}`;
        newCursorPos += 2;
        break;
      case 'h2':
        formattedText = `## ${selectedContent}`;
        newCursorPos += 3;
        break;
      case 'h3':
        formattedText = `### ${selectedContent}`;
        newCursorPos += 4;
        break;
      case 'ul':
        formattedText = `- ${selectedContent}`;
        newCursorPos += 2;
        break;
      case 'ol':
        formattedText = `1. ${selectedContent}`;
        newCursorPos += 3;
        break;
      case 'alignLeft':
        formattedText = selectedContent;
        break;
      case 'alignCenter':
        formattedText = `<center>${selectedContent}</center>`;
        newCursorPos += 17;
        break;
      case 'alignRight':
        formattedText = `<div style="text-align: right;">${selectedContent}</div>`;
        newCursorPos += 31;
        break;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    
    // Set cursor position
    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus();
        textareaRef.setSelectionRange(start, newCursorPos);
      }
    }, 0);
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
                       <BreadcrumbPage>Text Editor</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Edit className="mr-2 text-primary" size={24} />
            <CardTitle>Text Editor</CardTitle>
          </div>
          <CardDescription>
            Create and edit text documents
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 justify-between items-center">
              <div className="flex-1">
                <Input
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  placeholder="Filename"
                  className="max-w-xs"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="flex items-center gap-1"
                >
                  <FileUp size={14} />
                  Open
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.md,.html,.css,.js,.json,.csv"
                  onChange={uploadFile}
                  className="hidden"
                />
                
                <Button
                  variant={isUnsaved ? "default" : "outline"}
                  size="sm"
                  onClick={saveDocument}
                  className="flex items-center gap-1"
                >
                  <Save size={14} />
                  Save
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadDocument}
                  className="flex items-center gap-1"
                >
                  <Download size={14} />
                  Download
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md overflow-hidden">
              <div className="bg-muted/30 p-2 border-b flex flex-wrap gap-2">
                <ToggleGroup type="single">
                  <ToggleGroupItem value="bold" onClick={() => applyFormatting('bold')} title="Bold">
                    <Bold size={16} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" onClick={() => applyFormatting('italic')} title="Italic">
                    <Italic size={16} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" onClick={() => applyFormatting('underline')} title="Underline">
                    <Underline size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <div className="w-px h-6 bg-border mx-1"></div>
                
                <ToggleGroup type="single">
                  <ToggleGroupItem value="alignLeft" onClick={() => applyFormatting('alignLeft')} title="Align Left">
                    <AlignLeft size={16} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="alignCenter" onClick={() => applyFormatting('alignCenter')} title="Align Center">
                    <AlignCenter size={16} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="alignRight" onClick={() => applyFormatting('alignRight')} title="Align Right">
                    <AlignRight size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <div className="w-px h-6 bg-border mx-1"></div>
                
                <ToggleGroup type="single">
                  <ToggleGroupItem value="list" onClick={() => applyFormatting('ul')} title="Bullet List">
                    <List size={16} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="listOrdered" onClick={() => applyFormatting('ol')} title="Numbered List">
                    <ListOrdered size={16} />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="link" onClick={() => applyFormatting('link')} title="Insert Link">
                    <Link size={16} />
                  </ToggleGroupItem>
                </ToggleGroup>
                
                <div className="w-px h-6 bg-border mx-1"></div>
                
                <ToggleGroup type="single">
                  <ToggleGroupItem value="h1" onClick={() => applyFormatting('h1')} title="Heading 1">
                    H1
                  </ToggleGroupItem>
                  <ToggleGroupItem value="h2" onClick={() => applyFormatting('h2')} title="Heading 2">
                    H2
                  </ToggleGroupItem>
                  <ToggleGroupItem value="h3" onClick={() => applyFormatting('h3')} title="Heading 3">
                    H3
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
              
              <Tabs defaultValue="edit">
                <TabsList className="ml-2 mt-2">
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                
                <TabsContent value="edit" className="mt-0">
                  <textarea
                    value={content}
                    onChange={handleContentChange}
                    onSelect={handleTextareaSelect}
                    ref={setTextareaRef}
                    className="w-full min-h-[400px] p-4 font-mono text-sm border-0 focus:outline-none resize-y"
                    placeholder="Start typing your document here..."
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="mt-0">
                  <div className="p-4 min-h-[400px] prose max-w-none">
                    {content ? (
                      content.split('\n').map((line, i) => (
                        <div key={i} dangerouslySetInnerHTML={{ __html: line || '<br>' }} />
                      ))
                    ) : (
                      <div className="text-muted-foreground flex flex-col items-center justify-center h-full">
                        <FileText size={48} className="mb-2 opacity-20" />
                        <p>No content to preview</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="flex justify-between items-center text-sm">
              <div className="text-muted-foreground">
                {content.length} characters | {content.split(/\s+/).filter(Boolean).length} words
                {isUnsaved && <span className="ml-2 text-yellow-500">• Unsaved changes</span>}
              </div>
              
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  disabled={!content}
                  className="flex items-center gap-1"
                >
                  <Copy size={14} />
                  Copy
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearDocument}
                  disabled={!content}
                  className="flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Text Editor">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Text Editor</h4>
      <p>The Text Editor allows you to create and edit text documents directly in your browser.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Start typing in the editor to create your document.</li>
        <li>Use the toolbar to format text with headings (H1, H2, H3).</li>
        <li>Click "Save" to store your document locally.</li>
        <li>Click "Download" to save your document as a text file.</li>
        <li>Use "Clear" to erase all text and start fresh.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Simple and user-friendly interface.</li>
        <li>Supports basic text formatting.</li>
        <li>Auto-saves your work to local storage.</li>
        <li>Quick download option to save files.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Perfect for taking quick notes and drafting text.</li>
        <li>Works offline with auto-save functionality.</li>
        <li>No need to install additional software.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
