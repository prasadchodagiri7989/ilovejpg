import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { TestTube, Copy, Check, X } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState('g');
  const [matches, setMatches] = useState<string[]>([]);
  const [isValid, setIsValid] = useState(true);
  const { toast } = useToast();

  const testRegex = () => {
    if (!pattern) {
      toast({ title: "Error", description: "Please enter a regex pattern", variant: "destructive" });
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const results = testString.match(regex);
      setMatches(results || []);
      setIsValid(true);
      toast({ title: "Success", description: `Found ${results?.length || 0} matches` });
    } catch (error) {
      setIsValid(false);
      setMatches([]);
      toast({ title: "Invalid Regex", description: "Please check your pattern", variant: "destructive" });
    }
  };

  return (
    <>
      <SEO title="Regex Tester - Test Regular Expressions Online" description="Test and validate regular expressions with instant results. Free regex tester with match highlighting and pattern validation." keywords="regex tester, regular expression, regex validator" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Regex Tester</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <TestTube className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Regex Tester</CardTitle><p className="text-sm text-green-100">Test and validate regular expressions</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2"><label className="text-sm font-medium">Regex Pattern</label><Input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="^[a-z]+$" className="font-mono" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Flags</label><Input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g, i, m" className="font-mono" /></div>
              <div className="space-y-2"><label className="text-sm font-medium">Test String</label><Textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against regex" className="min-h-[100px] font-mono text-sm" /></div>
              <Button onClick={testRegex} className="bg-gradient-to-r from-green-500 to-teal-500"><TestTube className="w-4 h-4 mr-2" />Test Regex</Button>
              {matches.length > 0 && (
                <div className="space-y-2 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2"><Check className="w-5 h-5 text-green-600" /><span className="font-medium text-green-700 dark:text-green-400">Matches Found: {matches.length}</span></div>
                  <div className="space-y-1">{matches.map((match, i) => (<div key={i} className="font-mono text-sm p-2 bg-white dark:bg-gray-800 rounded">{match}</div>))}</div>
                </div>
              )}
            </CardContent>
          </Card>
          <GuidanceSection title="About Regex Tester">
            <p className="text-muted-foreground">
              Test and validate regular expressions instantly. Enter your regex pattern and test string to see matches highlighted.
              Perfect for developers working with pattern matching and validation.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
