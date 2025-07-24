
import React, { useState } from "react";
import { Shuffle, Copy, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const RandomNumberGenerator = () => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [quantity, setQuantity] = useState(1);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [generatedLists, setGeneratedLists] = useState<number[][]>([]);
  const { toast } = useToast();
  
  const handleGenerateNumber = () => {
    // Validate inputs
    if (min > max) {
      toast({
        title: "Invalid range",
        description: "Minimum value cannot be greater than maximum value.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if range is smaller than quantity when duplicates not allowed
    const range = max - min + 1;
    if (!allowDuplicates && quantity > range) {
      toast({
        title: "Invalid quantity",
        description: `Cannot generate ${quantity} unique numbers in the range ${min}-${max}. Maximum is ${range}.`,
        variant: "destructive",
      });
      return;
    }
    
    let result: number[] = [];
    
    if (allowDuplicates) {
      // Generate random numbers with duplicates allowed
      for (let i = 0; i < quantity; i++) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        result.push(randomNum);
      }
    } else {
      // Generate unique random numbers
      const allNumbers = Array.from(
        { length: max - min + 1 },
        (_, i) => min + i
      );
      
      // Fisher-Yates shuffle
      for (let i = allNumbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allNumbers[i], allNumbers[j]] = [allNumbers[j], allNumbers[i]];
      }
      
      result = allNumbers.slice(0, quantity);
    }
    
    setRandomNumbers(result);
    setGeneratedLists([result, ...generatedLists].slice(0, 5));
    
    toast({
      title: "Random numbers generated",
      description: `Generated ${quantity} random number${quantity > 1 ? 's' : ''}.`,
    });
  };
  
  const handleCopyToClipboard = () => {
    const textToCopy = randomNumbers.join(", ");
    navigator.clipboard.writeText(textToCopy);
    
    toast({
      title: "Copied to clipboard",
      description: "The random numbers have been copied to your clipboard.",
    });
  };
  
  const handleReset = () => {
    setMin(1);
    setMax(100);
    setQuantity(1);
    setAllowDuplicates(true);
    setRandomNumbers([]);
    setGeneratedLists([]);
    
    toast({
      title: "Reset complete",
      description: "All settings have been reset to default values.",
    });
  };
  
  const formatNumberList = (numbers: number[]) => {
    return numbers.join(", ");
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
                       <BreadcrumbPage>Random Number Generator</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Shuffle className="mr-2 text-primary" size={24} />
            <CardTitle>Random Number Generator</CardTitle>
          </div>
          <CardDescription>
            Generate random numbers within a specified range
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <Tabs defaultValue="generator">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="generator">Generator</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="generator" className="space-y-6 pt-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-value">Minimum Value</Label>
                  <Input
                    id="min-value"
                    type="number"
                    value={min}
                    onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-value">Maximum Value</Label>
                  <Input
                    id="max-value"
                    type="number"
                    value={max}
                    onChange={(e) => setMax(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity (How many numbers)</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  min={1}
                  max={1000}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1;
                    setQuantity(Math.min(1000, Math.max(1, value)));
                  }}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allow-duplicates"
                  checked={allowDuplicates}
                  onCheckedChange={(checked) => 
                    setAllowDuplicates(checked === true)
                  }
                />
                <Label htmlFor="allow-duplicates" className="cursor-pointer">
                  Allow duplicate numbers
                </Label>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={handleGenerateNumber}
                  className="flex items-center gap-2"
                >
                  <Shuffle size={16} />
                  Generate
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reset
                </Button>
                
                {randomNumbers.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleCopyToClipboard}
                    className="flex items-center gap-2 ml-auto"
                  >
                    <Copy size={16} />
                    Copy
                  </Button>
                )}
              </div>
              
              {randomNumbers.length > 0 && (
                <div className="border rounded-md p-4 mt-4 bg-secondary/10">
                  <div className="text-sm font-medium mb-2">Generated Numbers:</div>
                  <div className="break-all">
                    {formatNumberList(randomNumbers)}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history" className="pt-4">
              {generatedLists.length > 0 ? (
                <div className="space-y-4">
                  {generatedLists.map((list, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm font-medium">
                          Set {generatedLists.length - index} ({list.length} numbers)
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            navigator.clipboard.writeText(list.join(", "));
                            toast({
                              title: "Copied to clipboard",
                              description: "The numbers have been copied to your clipboard.",
                            });
                          }}
                          className="h-8 w-8 p-0"
                        >
                          <Copy size={16} />
                        </Button>
                      </div>
                      <div className="text-sm break-all">
                        {formatNumberList(list)}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                  <Shuffle size={48} className="mb-2 opacity-20" />
                  <p>No history yet</p>
                  <p className="text-sm">Generate some random numbers to see them here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use Random Number Generator">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Random Number Generator</h4>
      <p>The Random Number Generator allows you to generate random numbers within a specified range.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter the minimum and maximum values.</li>
        <li>Specify how many random numbers you want to generate.</li>
        <li>Check or uncheck "Allow duplicate numbers" based on your preference.</li>
        <li>Click "Generate" to get random numbers instantly.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Generate single or multiple random numbers.</li>
        <li>Choose a range to control number selection.</li>
        <li>Option to allow or prevent duplicate numbers.</li>
        <li>Reset the generator to start fresh.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Quickly generate random numbers for various needs.</li>
        <li>Useful for lotteries, simulations, and testing scenarios.</li>
        <li>Ensures fair and unbiased number selection.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
