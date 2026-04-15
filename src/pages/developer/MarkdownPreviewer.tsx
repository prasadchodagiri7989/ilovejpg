import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Eye } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function MarkdownPreviewer() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nStart typing **markdown** here!');

  return (
    <>
      <SEO title="Markdown Previewer - Live Markdown Editor Online" description="Preview markdown in real-time with live rendering. Free markdown previewer with syntax highlighting and instant preview." keywords="markdown previewer, markdown editor, live markdown" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Markdown Previewer</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-6xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Markdown Previewer</CardTitle><p className="text-sm text-indigo-100">Write and preview markdown in real-time</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-sm font-medium">Markdown Input</label><Textarea value={markdown} onChange={(e) => setMarkdown(e.target.value)} className="min-h-[400px] font-mono text-sm" /></div>
                <div className="space-y-2"><label className="text-sm font-medium">Preview</label><div className="min-h-[400px] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border prose dark:prose-invert max-w-none whitespace-pre-wrap">{markdown}</div></div>
              </div>
            </CardContent>
          </Card>
          <GuidanceSection title="About Markdown Previewer">
            <p>Markdown is a lightweight markup language for creating formatted text. Perfect for documentation, READMEs, and notes.</p>
            <p className="mt-2"><strong>Syntax Examples:</strong></p>
            <ul className="mt-2 list-disc pl-5">
              <li>Bold: **text**</li>
              <li>Italic: *text*</li>
              <li>Headers: # H1, ## H2</li>
              <li>Lists: - item or 1. item</li>
              <li>Links: [text](url)</li>
            </ul>
            <p className="mt-2">Ideal for writers and developers!</p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
