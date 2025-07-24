
import React, { useState } from "react";
import { BarChart2, Trash2, Plus, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from "recharts";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface DataPoint {
  x: number;
  y: number;
  z: number;
}

export const ScatterPlot = () => {
  const [data, setData] = useState<DataPoint[]>([
    { x: 10, y: 30, z: 5 },
    { x: 20, y: 50, z: 8 },
    { x: 30, y: 40, z: 6 },
    { x: 40, y: 70, z: 9 },
    { x: 50, y: 60, z: 7 },
    { x: 60, y: 90, z: 10 },
    { x: 70, y: 20, z: 4 },
  ]);
  
  const [newX, setNewX] = useState("");
  const [newY, setNewY] = useState("");
  const [newZ, setNewZ] = useState("");
  const [chartTitle, setChartTitle] = useState("XY Scatter Plot");
  const [xAxisLabel, setXAxisLabel] = useState("X Axis");
  const [yAxisLabel, setYAxisLabel] = useState("Y Axis");
  const { toast } = useToast();

  const addDataPoint = () => {
    if (!newX || isNaN(Number(newX))) {
      toast({
        title: "Invalid X value",
        description: "Please enter a valid number for the X axis",
        variant: "destructive",
      });
      return;
    }

    if (!newY || isNaN(Number(newY))) {
      toast({
        title: "Invalid Y value",
        description: "Please enter a valid number for the Y axis",
        variant: "destructive",
      });
      return;
    }

    const z = newZ && !isNaN(Number(newZ)) ? Number(newZ) : 5; // Default size if not provided

    setData([...data, { x: Number(newX), y: Number(newY), z }]);
    setNewX("");
    setNewY("");
    setNewZ("");
    
    toast({
      title: "Data point added",
      description: `Added point (${newX}, ${newY})`,
    });
  };

  const removeDataPoint = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    
    toast({
      title: "Data point removed",
      description: "The data point has been removed from the plot",
    });
  };

  const downloadImage = () => {
    const svgElement = document.querySelector(".recharts-wrapper svg");
    if (!svgElement) {
      toast({
        title: "Download failed",
        description: "Could not generate the image",
        variant: "destructive",
      });
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      
      const downloadLink = document.createElement("a");
      downloadLink.download = `${chartTitle || "scatter-plot"}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast({
        title: "Download complete",
        description: "Your scatter plot has been downloaded",
      });
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
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
                       <BreadcrumbPage>Scatter Plot</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <BarChart2 className="mr-2 text-primary" size={24} />
            <CardTitle>XY Scatter Plot</CardTitle>
          </div>
          <CardDescription>
            Create and customize scatter plots for data visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="chart-title">Chart Title</Label>
                <Input
                  id="chart-title"
                  value={chartTitle}
                  onChange={(e) => setChartTitle(e.target.value)}
                  placeholder="Enter chart title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="x-axis">X Axis Label</Label>
                <Input
                  id="x-axis"
                  value={xAxisLabel}
                  onChange={(e) => setXAxisLabel(e.target.value)}
                  placeholder="X Axis"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="y-axis">Y Axis Label</Label>
                <Input
                  id="y-axis"
                  value={yAxisLabel}
                  onChange={(e) => setYAxisLabel(e.target.value)}
                  placeholder="Y Axis"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="border rounded-md p-4">
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid />
                  <XAxis 
                    dataKey="x" 
                    name={xAxisLabel} 
                    label={{ value: xAxisLabel, position: 'bottom', offset: 0 }} 
                  />
                  <YAxis 
                    dataKey="y" 
                    name={yAxisLabel} 
                    label={{ value: yAxisLabel, angle: -90, position: 'left' }} 
                  />
                  <ZAxis dataKey="z" range={[40, 160]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter 
                    name="Data Points" 
                    data={data} 
                    fill="#8884d8" 
                    shape="circle" 
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="data-x">X Value</Label>
                <Input
                  id="data-x"
                  type="number"
                  value={newX}
                  onChange={(e) => setNewX(e.target.value)}
                  placeholder="X value"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="data-y">Y Value</Label>
                <Input
                  id="data-y"
                  type="number"
                  value={newY}
                  onChange={(e) => setNewY(e.target.value)}
                  placeholder="Y value"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="data-z">Point Size (optional)</Label>
                <Input
                  id="data-z"
                  type="number"
                  value={newZ}
                  onChange={(e) => setNewZ(e.target.value)}
                  placeholder="Size (1-10)"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={addDataPoint} 
                  className="w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Data Point
                </Button>
              </div>
            </div>

            {data.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Data Points</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-2 text-left">X</th>
                        <th className="px-4 py-2 text-left">Y</th>
                        <th className="px-4 py-2 text-left">Size</th>
                        <th className="px-4 py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((point, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{point.x}</td>
                          <td className="px-4 py-2">{point.y}</td>
                          <td className="px-4 py-2">{point.z}</td>
                          <td className="px-4 py-2 text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDataPoint(index)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <Button onClick={downloadImage} variant="outline" className="flex gap-2">
              <Download size={16} />
              Download Plot
            </Button>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use XY Scatter Plot Maker">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the XY Scatter Plot Maker</h4>
      <p>The XY Scatter Plot Maker helps you visualize relationships between two numerical variables.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter a title for your scatter plot.</li>
        <li>Set labels for the X and Y axes.</li>
        <li>Input values for the X and Y axes.</li>
        <li>Optionally, specify a point size (1-10) for better visualization.</li>
        <li>Click "Add Data Point" to add the values to the chart.</li>
        <li>Download the scatter plot when you're satisfied with the visualization.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Customize chart titles and axis labels.</li>
        <li>Add multiple data points with adjustable sizes.</li>
        <li>Visualize trends and correlations between variables.</li>
        <li>Download the generated scatter plot for presentations or reports.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Ideal for analyzing relationships between numerical values.</li>
        <li>Great for scientific research, business analytics, and educational purposes.</li>
        <li>Provides a clear and concise visual representation of data trends.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
