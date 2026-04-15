import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleDot, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function LieDetectorSimulator() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<'truth' | 'lie' | null>(null);
  const { toast } = useToast();

  const analyze = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    setTimeout(() => {
      const isLie = Math.random() > 0.5;
      setResult(isLie ? 'lie' : 'truth');
      setIsAnalyzing(false);
      
      toast({
        title: isLie ? "Lie Detected!" : "Telling the Truth!",
        description: isLie ? "The system detected deception" : "No deception detected",
      });
    }, 3000);
  };

  return (
    <>
      <SEO title="Lie Detector Simulator - Truth or Lie | ILoveJPG" description="Fun lie detector simulator. Is someone telling the truth?" keywords="lie detector, truth detector, lie test, polygraph simulator" />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Lie Detector Simulator</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <CircleDot className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Lie Detector Simulator</CardTitle>
                  <p className="text-sm opacity-90">Truth or Lie?</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 p-12 rounded-xl border-4 border-red-300 dark:border-red-700 min-h-[300px] flex items-center justify-center">
                {!isAnalyzing && !result && (
                  <div className="text-center">
                    <div className="text-7xl mb-4">🤥</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">Ready to Test</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2">Click "Analyze" to start</div>
                  </div>
                )}
                
                {isAnalyzing && (
                  <div className="text-center">
                    <div className="text-7xl mb-4 animate-pulse">🔍</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">Analyzing...</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2">Reading microexpressions</div>
                  </div>
                )}
                
                {result === 'truth' && (
                  <div className="text-center">
                    <div className="text-7xl mb-4">✅</div>
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">TRUTH DETECTED</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2">No signs of deception</div>
                  </div>
                )}
                
                {result === 'lie' && (
                  <div className="text-center">
                    <div className="text-7xl mb-4">❌</div>
                    <div className="text-3xl font-bold text-red-600 dark:text-red-400">LIE DETECTED</div>
                    <div className="text-gray-600 dark:text-gray-400 mt-2">Deception indicators found</div>
                  </div>
                )}
              </div>

              {!isAnalyzing && (
                <Button onClick={analyze} className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white h-14 text-lg">
                  {result ? <><RefreshCw className="mr-2 h-5 w-5" />Test Again</> : <>🔍 Start Analysis</>}
                </Button>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="Disclaimer">
            <div className="space-y-2">
              <p>⚠️ This is a fun simulator for entertainment purposes only</p>
              <p>• Results are randomly generated</p>
              <p>• Not a real lie detector</p>
              <p>• Perfect for party games!</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
