import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FileEdit, Plus, Trash, Download } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: number;
  oldName: string;
  newName: string;
}

export default function FileRenamer() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [prefix, setPrefix] = useState('');
  const [suffix, setSuffix] = useState('');
  const [startNumber, setStartNumber] = useState(1);
  const { toast } = useToast();

  const addFile = () => {
    setFiles([...files, { id: Date.now(), oldName: '', newName: '' }]);
  };

  const removeFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const updateOldName = (id: number, name: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, oldName: name } : f));
  };

  const applyPattern = () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please add some files first",
        variant: "destructive",
      });
      return;
    }

    const updated = files.map((file, index) => {
      const extension = file.oldName.includes('.') ? file.oldName.substring(file.oldName.lastIndexOf('.')) : '';
      const number = String(startNumber + index).padStart(3, '0');
      const newName = `${prefix}${number}${suffix}${extension}`;
      return { ...file, newName };
    });

    setFiles(updated);
    toast({
      title: "Applied!",
      description: "Naming pattern applied to all files",
    });
  };

  const downloadList = () => {
    const content = files.map(f => `${f.oldName} → ${f.newName}`).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rename-list.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: "Rename list downloaded",
    });
  };

  return (
    <>
      <SEO 
        title="File Renamer - Batch Rename Files | ILoveJPG"
        description="Batch rename multiple files with custom patterns. Add prefixes, suffixes, and numbering to file names."
        keywords="file renamer, batch rename, bulk rename files, rename tool"
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>File Renamer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <div className="flex items-center gap-3">
                <FileEdit className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">File Renamer</CardTitle>
                  <p className="text-sm opacity-90">Batch rename multiple files</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Prefix</label>
                  <Input
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    placeholder="File_"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Number</label>
                  <Input
                    type="number"
                    value={startNumber}
                    onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Suffix</label>
                  <Input
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    placeholder="_edited"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={addFile} variant="outline" className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add File
                </Button>
                <Button onClick={applyPattern} className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500">
                  Apply Pattern
                </Button>
                {files.length > 0 && (
                  <Button onClick={downloadList} variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download List
                  </Button>
                )}
              </div>

              {files.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Files ({files.length})</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {files.map((file) => (
                      <div key={file.id} className="flex gap-3 items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Input
                          value={file.oldName}
                          onChange={(e) => updateOldName(file.id, e.target.value)}
                          placeholder="original-name.jpg"
                          className="flex-1"
                        />
                        <span className="text-muted-foreground">→</span>
                        <Input
                          value={file.newName}
                          readOnly
                          className="flex-1 bg-white dark:bg-gray-900"
                          placeholder="New name will appear here"
                        />
                        <Button onClick={() => removeFile(file.id)} variant="ghost" size="icon">
                          <Trash className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {files.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <FileEdit className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No files added yet. Click "Add File" to start.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About File Renamer">
            <p className="text-muted-foreground">
              Batch rename multiple files with custom patterns. Add files, set your prefix, starting number, and suffix.
              The tool will generate new names automatically. Perfect for organizing photos, documents, and media files.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
