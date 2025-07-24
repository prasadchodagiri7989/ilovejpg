import React, { useState, useEffect } from "react";
import { BarChart2, FileText, ArrowUpDown, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface WordFrequencyItem {
  word: string;
  count: number;
  percentage: number;
}

export const WordFrequency = () => {
  const [text, setText] = useState("");
  const [wordFrequency, setWordFrequency] = useState<WordFrequencyItem[]>([]);
  const [totalWords, setTotalWords] = useState(0);
  const [uniqueWords, setUniqueWords] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"frequency" | "alphabetical">("frequency");
  const { toast } = useToast();

  useEffect(() => {
    analyzeWordFrequency(text);
  }, [text]);

  const analyzeWordFrequency = (text: string) => {
    if (!text.trim()) {
      setWordFrequency([]);
      setTotalWords(0);
      setUniqueWords(0);
      return;
    }
    
    // Remove punctuation and convert to lowercase for better counting
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    
    // Split into words and filter out empty strings
    const words = cleanText.split(/\s+/).filter(Boolean);
    const total = words.length;
    
    // Count word frequencies
    const frequency: Record<string, number> = {};
    
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    // Convert to array for sorting and filtering
    const frequencyArray: WordFrequencyItem[] = Object.keys(frequency).map(word => ({
      word,
      count: frequency[word],
      percentage: (frequency[word] / total) * 100
    }));
    
    // Set state
    setWordFrequency(frequencyArray);
    setTotalWords(total);
    setUniqueWords(Object.keys(frequency).length);
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
    setSearchTerm("");
    toast({
      title: "Text cleared",
      description: "Text area has been cleared",
    });
  };

  const handleCopy = () => {
    // Format the word frequency data as a string
    const header = "Word,Count,Percentage\n";
    const rows = filteredAndSortedWords.map(item => 
      `${item.word},${item.count},${item.percentage.toFixed(2)}%`
    ).join("\n");
    
    navigator.clipboard.writeText(header + rows);
    
    toast({
      title: "Copied to clipboard",
      description: "Word frequency data has been copied to clipboard",
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "frequency" ? "alphabetical" : "frequency");
  };

  // Filter and sort word frequency data
  const filteredAndSortedWords = wordFrequency
    .filter(item => item.word.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "frequency") {
        return b.count - a.count;
      } else {
        return a.word.localeCompare(b.word);
      }
    });

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
                       <BreadcrumbPage>Word Frequency Analyzer</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <BarChart2 className="mr-2 text-primary" size={24} />
            <CardTitle>Word Frequency Analyzer</CardTitle>
          </div>
          <CardDescription>
            Analyze the frequency of words in your text
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <Textarea
            placeholder="Type or paste text here to analyze word frequency..."
            className="min-h-[200px] font-mono text-base"
            value={text}
            onChange={handleTextChange}
          />
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handlePaste}>Paste from Clipboard</Button>
            <Button variant="outline" onClick={handleClear}>Clear</Button>
            <Button variant="outline" onClick={handleCopy}>Copy Results</Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <FileText size={24} className="mb-2 text-primary" />
                <p className="text-2xl font-bold">{totalWords}</p>
                <p className="text-sm text-muted-foreground">Total Words</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <FileText size={24} className="mb-2 text-primary" />
                <p className="text-2xl font-bold">{uniqueWords}</p>
                <p className="text-sm text-muted-foreground">Unique Words</p>
              </CardContent>
            </Card>
            
            <Card className="bg-primary/5">
              <CardContent className="p-4 flex flex-col items-center justify-center">
                <BarChart2 size={24} className="mb-2 text-primary" />
                <p className="text-2xl font-bold">
                  {uniqueWords > 0 ? (totalWords / uniqueWords).toFixed(2) : "0"}
                </p>
                <p className="text-sm text-muted-foreground">Repetition Index</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search words..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-8"
                />
              </div>
              <Button 
                variant="outline" 
                onClick={toggleSortOrder}
                className="flex items-center gap-1"
              >
                <ArrowUpDown size={16} />
                Sort: {sortOrder === "frequency" ? "By Frequency" : "Alphabetical"}
              </Button>
            </div>
            
            {wordFrequency.length > 0 ? (
              <div className="border rounded-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Word</TableHead>
                      <TableHead className="text-right">Count</TableHead>
                      <TableHead className="text-right">Percentage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedWords.length > 0 ? (
                      filteredAndSortedWords.slice(0, 100).map((item) => (
                        <TableRow key={item.word}>
                          <TableCell>{item.word}</TableCell>
                          <TableCell className="text-right">{item.count}</TableCell>
                          <TableCell className="text-right">{item.percentage.toFixed(2)}%</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
                          No words found matching your search
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {filteredAndSortedWords.length > 100 && (
                  <div className="px-4 py-2 text-sm text-muted-foreground bg-muted/30 border-t">
                    Showing top 100 results of {filteredAndSortedWords.length} words
                  </div>
                )}
              </div>
            ) : (
              <div className="border rounded-md p-8 text-center">
                <FileText size={48} className="mx-auto mb-4 text-muted-foreground/30" />
                <p className="text-muted-foreground">Enter text to see word frequency analysis</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Word Frequency Analyzer">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Word Frequency Analyzer</h4>
      <p>The Word Frequency Analyzer helps you identify the most common words in your text, providing insights into word usage patterns.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Type or paste text into the input area to analyze word frequency instantly.</li>
        <li>View real-time data, including total words, unique words, and repetition index.</li>
        <li>Use the search box to find specific words in the analysis.</li>
        <li>Sort words by frequency to identify commonly repeated words.</li>
        <li>Click "Paste from Clipboard" to quickly insert copied text.</li>
        <li>Use "Clear" to remove the text and start fresh.</li>
        <li>Click "Copy Results" to save and share the analysis.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Instant word frequency analysis.</li>
        <li>Calculates total and unique words.</li>
        <li>Includes a repetition index to measure word recurrence.</li>
        <li>Search and sort functionality for better insights.</li>
        <li>Quick shortcuts: Ctrl+V (Cmd+V on Mac) to paste text.</li>
        <li>Easy-to-use buttons for clearing and copying results.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
