
import React, { useState, useEffect } from "react";
import { AlignJustify, BarChart, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const LineCounter = () => {
  const [text, setText] = useState("");
  const [lineCount, setLineCount] = useState(0);
  const [emptyLineCount, setEmptyLineCount] = useState(0);
  const [nonEmptyLineCount, setNonEmptyLineCount] = useState(0);
  const [longestLine, setLongestLine] = useState({ content: "", length: 0, lineNumber: 0 });
  const [shortestLine, setShortestLine] = useState({ content: "", length: Infinity, lineNumber: 0 });
  const [averageLineLength, setAverageLineLength] = useState(0);
  
  const { toast } = useToast();

  useEffect(() => {
    analyzeLines(text);
  }, [text]);

  const analyzeLines = (text: string) => {
    if (!text.trim()) {
      setLineCount(0);
      setEmptyLineCount(0);
      setNonEmptyLineCount(0);
      setLongestLine({ content: "", length: 0, lineNumber: 0 });
      setShortestLine({ content: "", length: Infinity, lineNumber: 0 });
      setAverageLineLength(0);
      return;
    }
    
    const lines = text.split("\n");
    const totalLines = lines.length;
    
    let emptyLines = 0;
    let totalChars = 0;
    let longest = { content: "", length: 0, lineNumber: 0 };
    let shortest = { content: "", length: Infinity, lineNumber: 0 };
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      const lineLength = line.length;
      
      // Count empty lines
      if (trimmedLine === "") {
        emptyLines++;
      } else {
        // Add to character count for average calculation
        totalChars += lineLength;
        
        // Check if this is the longest line
        if (lineLength > longest.length) {
          longest = { 
            content: line.length > 30 ? line.substring(0, 27) + "..." : line, 
            length: lineLength, 
            lineNumber: index + 1 
          };
        }
        
        // Check if this is the shortest non-empty line
        if (lineLength < shortest.length && trimmedLine !== "") {
          shortest = { 
            content: line,
            length: lineLength, 
            lineNumber: index + 1 
          };
        }
      }
    });
    
    const nonEmptyLines = totalLines - emptyLines;
    const avgLineLength = nonEmptyLines > 0 ? Math.round(totalChars / nonEmptyLines) : 0;
    
    setLineCount(totalLines);
    setEmptyLineCount(emptyLines);
    setNonEmptyLineCount(nonEmptyLines);
    setLongestLine(longest);
    
    // Only set shortest if there were non-empty lines
    if (shortest.length !== Infinity) {
      setShortestLine(shortest);
    } else {
      setShortestLine({ content: "", length: 0, lineNumber: 0 });
    }
    
    setAverageLineLength(avgLineLength);
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
    navigator.clipboard.writeText(`Total lines: ${lineCount}
Non-empty lines: ${nonEmptyLineCount}
Empty lines: ${emptyLineCount}
Average line length: ${averageLineLength} characters
Longest line: Line ${longestLine.lineNumber} (${longestLine.length} characters)
Shortest line: Line ${shortestLine.lineNumber} (${shortestLine.length} characters)`);
    
    toast({
      title: "Copied to clipboard",
      description: "Line statistics have been copied to clipboard",
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
                  <BreadcrumbPage>Line Counter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <AlignJustify className="mr-2 text-primary" size={24} />
            <CardTitle>Line Counter</CardTitle>
          </div>
          <CardDescription>
            Analyze line statistics in your text
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <Textarea
            placeholder="Type or paste text here to analyze lines..."
            className="min-h-[250px] font-mono text-base"
            value={text}
            onChange={handleTextChange}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Total Lines</span>
                  <AlignJustify size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{lineCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Non-empty Lines</span>
                  <FileText size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{nonEmptyLineCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Empty Lines</span>
                  <FileText size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{emptyLineCount}</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Average Line Length</span>
                  <BarChart size={16} className="text-primary" />
                </div>
                <p className="text-2xl font-bold">{averageLineLength} chars</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Longest Line</span>
                  <BarChart size={16} className="text-primary" />
                </div>
                <p className="text-base font-bold truncate" title={longestLine.content}>
                  {longestLine.length > 0 ? `${longestLine.length} chars (line ${longestLine.lineNumber})` : "-"}
                </p>
                <p className="text-xs text-muted-foreground truncate" title={longestLine.content}>
                  {longestLine.content}
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Shortest Line</span>
                  <BarChart size={16} className="text-primary" />
                </div>
                <p className="text-base font-bold truncate" title={shortestLine.content}>
                  {shortestLine.length > 0 ? `${shortestLine.length} chars (line ${shortestLine.lineNumber})` : "-"}
                </p>
                <p className="text-xs text-muted-foreground truncate" title={shortestLine.content}>
                  {shortestLine.content}
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
      <GuidanceSection title="How to Use the Line Counter">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Line Counter</h4>
      <p>The Line Counter tool helps analyze text by providing statistics about the total lines, empty lines, and average line length.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Type or paste text into the input area to analyze line statistics instantly.</li>
        <li>View real-time data, including total lines, empty lines, and non-empty lines.</li>
        <li>Check the average line length and identify the longest and shortest lines.</li>
        <li>Click "Paste from Clipboard" to quickly insert copied text.</li>
        <li>Use "Clear" to remove the text and start fresh.</li>
        <li>Click "Copy Statistics" to copy the analysis results for easy sharing.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Instant analysis of total, empty, and non-empty lines.</li>
        <li>Calculates the average line length.</li>
        <li>Identifies the longest and shortest lines in the text.</li>
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
