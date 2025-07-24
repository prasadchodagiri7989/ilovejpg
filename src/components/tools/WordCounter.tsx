
import React, { useState, useEffect } from "react";
import { FileText, Hash, CopyCheck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const WordCounter = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [charNoSpacesCount, setCharNoSpacesCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    countText(text);
  }, [text]);

  const countText = (text: string) => {
    // Count words (split by whitespace and filter out empty strings)
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    
    // Count all characters
    const chars = text.length;
    
    // Count characters without spaces
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    
    setWordCount(words);
    setCharCount(chars);
    setCharNoSpacesCount(charsNoSpaces);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handlePaste = () => {
    navigator.clipboard.readText()
      .then(clipText => {
        setText(clipText);
        toast({
          title: "Text pasted",
          description: "Text has been pasted from clipboard",
        });
      })
      .catch(err => {
        toast({
          title: "Failed to read clipboard",
          description: "Please check your browser permissions",
          variant: "destructive",
        });
      });
  };

  const handleClear = () => {
    setText("");
    toast({
      title: "Text cleared",
      description: "Text area has been cleared",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`Words: ${wordCount}
Characters: ${charCount}
Characters (excluding spaces): ${charNoSpacesCount}`);
    
    toast({
      title: "Copied to clipboard",
      description: "Statistics have been copied to clipboard",
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
                       <BreadcrumbPage>Word Counter</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <FileText className="mr-2 text-primary" size={24} />
            <CardTitle>Word Counter</CardTitle>
          </div>
          <CardDescription>
            Count words, characters, and more in your text
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <Textarea
            placeholder="Type or paste text here to count words and characters..."
            className="min-h-[250px] font-mono text-base"
            value={text}
            onChange={handleTextChange}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <Hash size={24} className="mb-2 text-primary" />
                <p className="text-2xl font-bold">{wordCount}</p>
                <p className="text-sm text-muted-foreground">Words</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <FileText size={24} className="mb-2 text-primary" />
                <p className="text-2xl font-bold">{charCount}</p>
                <p className="text-sm text-muted-foreground">Characters</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <CopyCheck size={24} className="mb-2 text-primary" />
                <p className="text-2xl font-bold">{charNoSpacesCount}</p>
                <p className="text-sm text-muted-foreground">Characters (no spaces)</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePaste}>Paste from Clipboard</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
            <Button variant="outline" onClick={handleCopy}>Copy Statistics</Button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Tip: You can paste text directly into the text area using Ctrl+V (or Cmd+V on Mac)
          </p>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Word Counter">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Word Counter</h4>
      <p>The Word Counter tool helps you quickly count words, characters, and more in your text.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Type or paste text into the input area to get word and character counts instantly.</li>
        <li>View real-time statistics, including word count, character count (with and without spaces).</li>
        <li>Click "Paste from Clipboard" to quickly paste copied text.</li>
        <li>Use "Clear" to remove the text and start fresh.</li>
        <li>Click "Copy Statistics" to copy the word and character counts for easy sharing.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Instant word and character count updates.</li>
        <li>Counts total words, characters, and characters without spaces.</li>
        <li>Quick shortcuts: Ctrl+V (Cmd+V on Mac) to paste text.</li>
        <li>Easy-to-use buttons for clearing and copying statistics.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
