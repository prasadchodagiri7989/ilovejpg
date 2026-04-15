import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

const predictions = [
  "You will receive unexpected good news within the next week!",
  "A new friendship will blossom in unexpected places.",
  "Your creative talents will be recognized soon.",
  "An opportunity you've been waiting for is just around the corner.",
  "Someone from your past will reach out with exciting news.",
  "You'll discover a hidden talent you never knew you had.",
  "A small act of kindness will lead to big rewards.",
  "Your next adventure will change your perspective forever.",
  "Financial abundance is heading your way!",
  "You'll meet someone who truly understands you."
];

export default function FuturePredictionGenerator() {
  const [prediction, setPrediction] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePrediction = () => {
    const randomIndex = Math.floor(Math.random() * predictions.length);
    setPrediction(predictions[randomIndex]);
    setCopied(false);
  };

  const copyPrediction = () => {
    if (!prediction) return;
    navigator.clipboard.writeText(prediction);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Prediction copied to clipboard" });
  };

  return (
    <>
      <SEO title="Future Prediction Generator - Fortune Teller | ILoveJPG" description="Get glimpses into your future! Fun prediction generator." keywords="future prediction, fortune teller, prediction generator, fortune" />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Future Prediction</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Future Prediction Generator</CardTitle>
                  <p className="text-sm opacity-90">What does the future hold?</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {prediction && (
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 p-8 rounded-xl border-4 border-purple-300 dark:border-purple-700">
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🔮</div>
                    <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">{prediction}</div>
                  </div>
                </div>
              )}
              
              <Button onClick={generatePrediction} className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white h-14 text-lg">
                <Sparkles className="mr-2 h-5 w-5" />See Your Future
              </Button>
              
              {prediction && (
                <Button onClick={copyPrediction} variant="outline" className="w-full">
                  {copied ? <><Check className="mr-2 h-4 w-4" />Copied!</> : <><Copy className="mr-2 h-4 w-4" />Copy Prediction</>}
                </Button>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="About Predictions">
            <div className="space-y-2">
              <p>• Get fun predictions about your future</p>
              <p>• For entertainment purposes only</p>
              <p>• Share with friends!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">💫 Remember: You create your own future!</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
