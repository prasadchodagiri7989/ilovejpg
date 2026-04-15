import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function YesNoGenerator() {
  const [result, setResult] = useState('');
  const [spinning, setSpinning] = useState(false);

  const generate = () => {
    setSpinning(true);
    
    setTimeout(() => {
      const answer = Math.random() < 0.5 ? 'YES' : 'NO';
      setResult(answer);
      setSpinning(false);
    }, 1000);
  };

  return (
    <>
      <SEO 
        title="Yes/No Generator - Random Decision Maker | ILoveJPG"
        description="Generate random Yes or No answers. Perfect for making quick decisions and settling debates."
        keywords="yes no generator, decision maker, random yes no, decision tool"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Yes/No Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Yes/No Generator</CardTitle>
                  <p className="text-sm opacity-90">Get a random Yes or No answer</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-8">
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-8">Ask a yes or no question in your mind...</p>
                
                {result && (
                  <div className={`mb-8 ${spinning ? 'animate-pulse' : 'animate-bounce'}`}>
                    <div 
                      className={`inline-block px-16 py-8 rounded-2xl text-8xl font-bold ${
                        result === 'YES' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600' 
                          : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                      }`}
                    >
                      {spinning ? '?' : result}
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={generate} 
                disabled={spinning}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-lg py-6"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                {spinning ? 'Deciding...' : 'Generate Answer'}
              </Button>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                  <div className="text-4xl mb-2">✅</div>
                  <p className="font-semibold text-green-600">YES</p>
                  <p className="text-xs text-muted-foreground">50% probability</p>
                </div>
                <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                  <div className="text-4xl mb-2">❌</div>
                  <p className="font-semibold text-red-600">NO</p>
                  <p className="text-xs text-muted-foreground">50% probability</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Yes/No Generator">
            <p className="text-muted-foreground">
              Can't make a decision? Let fate decide! This simple tool generates random Yes or No answers.
              Perfect for making quick decisions, settling debates, or just having fun. Each outcome has equal probability.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
