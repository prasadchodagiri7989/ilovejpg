
import React, { useState, useEffect } from "react";
import { BarChart, Hash, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const CharacterCounter = () => {
  const [text, setText] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [charNoSpacesCount, setCharNoSpacesCount] = useState(0);
  const [linesCount, setLinesCount] = useState(0);
  const [paragraphsCount, setParagraphsCount] = useState(0);
  const [sentencesCount, setSentencesCount] = useState(0);
  const [mostFrequentChar, setMostFrequentChar] = useState({ char: "", count: 0 });
  const { toast } = useToast();

  useEffect(() => {
    analyzeText(text);
  }, [text]);

  const analyzeText = (text: string) => {
    // Count all characters
    const chars = text.length;
    
    // Count characters without spaces
    const charsNoSpaces = text.replace(/\s+/g, "").length;
    
    // Count lines (split by newlines)
    const lines = text ? text.split("\n").length : 0;
    
    // Count paragraphs (groups of text separated by at least one empty line)
    const paragraphs = text.trim() ? text.trim().split(/\n\s*\n/).filter(Boolean).length : 0;
    
    // Count sentences (roughly - split by ., !, ?)
    const sentences = text.trim() ? text.trim().split(/[.!?]+/).filter(Boolean).length : 0;
    
    // Find most frequent character (excluding spaces)
    if (text.length > 0) {
      const charFrequency: Record<string, number> = {};
      for (const char of text) {
        if (char !== " " && char !== "\n" && char !== "\t") {
          charFrequency[char] = (charFrequency[char] || 0) + 1;
        }
      }
      
      let maxChar = "";
      let maxCount = 0;
      for (const char in charFrequency) {
        if (charFrequency[char] > maxCount) {
          maxChar = char;
          maxCount = charFrequency[char];
        }
      }
      
      setMostFrequentChar({ char: maxChar, count: maxCount });
    } else {
      setMostFrequentChar({ char: "", count: 0 });
    }
    
    setCharCount(chars);
    setCharNoSpacesCount(charsNoSpaces);
    setLinesCount(lines);
    setParagraphsCount(paragraphs);
    setSentencesCount(sentences);
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
    navigator.clipboard.writeText(`Characters: ${charCount}
Characters (no spaces): ${charNoSpacesCount}
Lines: ${linesCount}
Paragraphs: ${paragraphsCount}
Sentences: ${sentencesCount}
Most frequent character: "${mostFrequentChar.char}" (${mostFrequentChar.count} times)`);
    
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
                  <BreadcrumbPage>Character Counter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Hash className="mr-2 text-primary" size={24} />
            <CardTitle>Character Counter</CardTitle>
          </div>
          <CardDescription>
            Analyze characters, lines, and more in your text
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <Textarea
            placeholder="Type or paste text here to analyze characters..."
            className="min-h-[250px] font-mono text-base"
            value={text}
            onChange={handleTextChange}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Characters</span>
                  <FileText size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{charCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Characters (no spaces)</span>
                  <FileText size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{charNoSpacesCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Lines</span>
                  <BarChart size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{linesCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Paragraphs</span>
                  <FileText size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{paragraphsCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Sentences</span>
                  <FileText size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{sentencesCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Most Frequent Char</span>
                  <Hash size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">
                  {mostFrequentChar.char ? `"${mostFrequentChar.char}" (${mostFrequentChar.count}x)` : "-"}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePaste}>Paste from Clipboard</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
            <Button variant="outline" onClick={handleCopy}>Copy Statistics</Button>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Character Counter">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Character Counter</h4>
      <p>The Character Counter tool helps you analyze text by providing detailed character, line, and paragraph statistics.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Type or paste text into the input area to analyze characters instantly.</li>
        <li>View real-time statistics, including total characters, characters without spaces, lines, paragraphs, and sentences.</li>
        <li>Identify the most frequently used character in your text.</li>
        <li>Click "Paste from Clipboard" to quickly insert copied text.</li>
        <li>Use "Clear" to remove the text and start fresh.</li>
        <li>Click "Copy Statistics" to copy the analysis results for easy sharing.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Instant character, line, and paragraph analysis.</li>
        <li>Counts total characters, characters without spaces, and most frequent character.</li>
        <li>Breaks down text into lines, paragraphs, and sentences.</li>
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
