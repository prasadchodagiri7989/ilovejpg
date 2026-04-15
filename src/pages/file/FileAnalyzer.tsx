import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileBarChart, Upload } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function FileAnalyzer() {
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const analyzeFile = (file: File) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n').length;
      const chars = content.length;
      const words = content.trim().split(/\s+/).length;
      const bytes = new Blob([content]).size;

      const result = {
        name: file.name,
        size: file.size,
        type: file.type || 'text/plain',
        lines: lines,
        characters: chars,
        words: words,
        bytes: bytes,
        encoding: 'UTF-8',
        readableSize: formatFileSize(file.size),
      };

      setAnalysis(result);
      toast({
        title: "Analyzed!",
        description: "File analysis complete",
      });
    };

    if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md') || file.name.endsWith('.json')) {
      reader.readAsText(file);
    } else {
      setAnalysis({
        name: file.name,
        size: file.size,
        type: file.type,
        readableSize: formatFileSize(file.size),
        binary: true,
      });
      toast({
        title: "Analyzed!",
        description: "Binary file detected",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) analyzeFile(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  return (
    <>
      <SEO 
        title="File Analyzer - Analyze File Content | ILoveJPG"
        description="Analyze files to get detailed statistics including lines, words, characters, and file size. Perfect for text analysis."
        keywords="file analyzer, file analysis, text analyzer, file statistics"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>File Analyzer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <FileBarChart className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">File Analyzer</CardTitle>
                  <p className="text-sm opacity-90">Analyze file content and statistics</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-muted-foreground mb-4">Upload a file to analyze</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white hover:file:opacity-90"
                />
              </div>

              {analysis && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Analysis Results</h3>
                  
                  {analysis.binary ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">File Name</p>
                        <p className="font-semibold break-all">{analysis.name}</p>
                      </div>
                      <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">File Size</p>
                        <p className="font-semibold">{analysis.readableSize}</p>
                      </div>
                      <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg md:col-span-2">
                        <p className="text-sm text-muted-foreground">File Type</p>
                        <p className="font-semibold">{analysis.type}</p>
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">Binary file - text analysis not available</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Lines</p>
                        <p className="text-2xl font-bold text-purple-600">{analysis.lines.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Words</p>
                        <p className="text-2xl font-bold text-pink-600">{analysis.words.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Characters</p>
                        <p className="text-2xl font-bold text-rose-600">{analysis.characters.toLocaleString()}</p>
                      </div>
                      <div className="p-4 bg-fuchsia-50 dark:bg-fuchsia-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">File Size</p>
                        <p className="text-2xl font-bold text-fuchsia-600">{analysis.readableSize}</p>
                      </div>
                      <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Encoding</p>
                        <p className="text-2xl font-bold text-violet-600">{analysis.encoding}</p>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <p className="text-sm text-muted-foreground">Type</p>
                        <p className="text-lg font-bold text-purple-600">{analysis.type}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About File Analyzer">
            <p className="text-muted-foreground">
              Analyze text files to get detailed statistics including line count, word count, character count, and file size.
              Perfect for writers, developers, and content creators. Binary files show basic metadata.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
