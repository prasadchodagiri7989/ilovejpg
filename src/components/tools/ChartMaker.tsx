
import React, { useState } from "react";
import { BarChart2, LineChart as LineChartIcon, PieChart as PieChartIcon, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface DataItem {
  name: string;
  value: number;
}

const COLORS = [
  '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c',
  '#d0ed57', '#ffc658', '#ff8042', '#ff6361', '#bc5090'
];

export const ChartMaker = () => {
  const [chartType, setChartType] = useState<"bar" | "line" | "pie">("bar");
  const [data, setData] = useState<DataItem[]>([
    { name: "A", value: 10 },
    { name: "B", value: 20 },
    { name: "C", value: 15 },
    { name: "D", value: 25 },
  ]);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");
  const [chartTitle, setChartTitle] = useState("My Chart");
  const { toast } = useToast();

  const addDataPoint = () => {
    if (!newName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a name for the data point",
        variant: "destructive",
      });
      return;
    }

    if (!newValue || isNaN(Number(newValue))) {
      toast({
        title: "Invalid value",
        description: "Please enter a valid number for the value",
        variant: "destructive",
      });
      return;
    }

    setData([...data, { name: newName, value: Number(newValue) }]);
    setNewName("");
    setNewValue("");
    
    toast({
      title: "Data point added",
      description: `Added ${newName}: ${newValue}`,
    });
  };

  const removeDataPoint = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    
    toast({
      title: "Data point removed",
      description: "The data point has been removed from the chart",
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
      downloadLink.download = `${chartTitle || "chart"}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast({
        title: "Download complete",
        description: "Your chart has been downloaded",
      });
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  // Custom label for pie chart
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
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
                  <BreadcrumbPage>Chart Maker</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <BarChart2 className="mr-2 text-primary" size={24} />
            <CardTitle>Chart Maker</CardTitle>
          </div>
          <CardDescription>
            Create various types of charts and graphs
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
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

            <Tabs value={chartType} onValueChange={(value) => setChartType(value as "bar" | "line" | "pie")}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="bar" className="flex items-center gap-2">
                  <BarChart2 size={16} />
                  Bar Chart
                </TabsTrigger>
                <TabsTrigger value="line" className="flex items-center gap-2">
                  <LineChartIcon size={16} />
                  Line Chart
                </TabsTrigger>
                <TabsTrigger value="pie" className="flex items-center gap-2">
                  <PieChartIcon size={16} />
                  Pie Chart
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="bar" className="pt-4">
                <div className="border rounded-md p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Value" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="line" className="pt-4">
                <div className="border rounded-md p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }} 
                        name="Value"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              
              <TabsContent value="pie" className="pt-4">
                <div className="border rounded-md p-4">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={90}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}`, 'Value']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="data-name">Name/Category</Label>
                <Input
                  id="data-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="data-value">Value</Label>
                <Input
                  id="data-value"
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Enter value"
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
                        <th className="px-4 py-2 text-left">Name</th>
                        <th className="px-4 py-2 text-left">Value</th>
                        <th className="px-4 py-2 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">
                            {chartType === 'pie' && (
                              <span 
                                className="inline-block w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              ></span>
                            )}
                            {item.name}
                          </td>
                          <td className="px-4 py-2">{item.value}</td>
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
              Download Chart
            </Button>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Chart Maker Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Creating Charts</h4>
      <p>The Chart Maker tool allows you to create various types of charts and graphs.</p>
      <p className="mt-2"><strong>Steps to Create a Chart:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter a title for your chart.</li>
        <li>Select the type of chart (Bar, Line, Pie, etc.).</li>
        <li>Add data points by entering names and values.</li>
        <li>Click "Add Data Point" to include additional values.</li>
        <li>Review the generated chart.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Modifying Chart Data</h4>
      <p>You can modify the chart data dynamically.</p>
      <p className="mt-2"><strong>How to Edit Chart Data:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Update the values in the data table.</li>
        <li>Click on the chart type dropdown to switch between chart formats.</li>
        <li>Rearrange data points as needed.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Downloading the Chart</h4>
      <p>Once you have finalized your chart, you can download it.</p>
      <p className="mt-2"><strong>How to Download:</strong></p>
      <ul className="list-disc pl-5">
        <li>Click the "Download Chart" button.</li>
        <li>Choose the format you wish to save the chart in (PNG, JPG, etc.).</li>
        <li>Save the file to your device.</li>
      </ul>
    </div>
    
    <div>
      <h4 className="font-medium">Best Practices for Data Visualization</h4>
      <ul className="list-disc pl-5">
        <li>Use Bar Charts for comparing discrete categories.</li>
        <li>Use Line Charts for trends over time.</li>
        <li>Use Pie Charts for showing proportions.</li>
        <li>Ensure labels and values are clear and readable.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
