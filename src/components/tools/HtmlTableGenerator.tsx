import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Clipboard, Download, Table } from "lucide-react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


const HtmlTableGenerator = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [tableData, setTableData] = useState<string[][]>([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [border, setBorder] = useState("1");
  const [width, setWidth] = useState("100%");
  const [cellPadding, setCellPadding] = useState("5");
  const [cellSpacing, setCellSpacing] = useState("0");
  const [align, setAlign] = useState<"left" | "center" | "right">("center");
  const [caption, setCaption] = useState("");
  const [copied, setCopied] = useState(false);
  const [tableCode, setTableCode] = useState("");

  const updateTableSize = (newRows: number, newCols: number) => {
    if (newRows > rows) {
      const additionalRows = Array(newRows - rows).fill(null).map(() => Array(cols).fill(""));
      setTableData([...tableData, ...additionalRows]);
    } else {
      setTableData(tableData.slice(0, newRows));
    }
    
    if (newCols > cols) {
      const newTableData = tableData.map(row => [...row, ...Array(newCols - cols).fill("")]);
      setTableData(newTableData);
    } else {
      setTableData(tableData.map(row => row.slice(0, newCols)));
    }
    
    setRows(newRows);
    setCols(newCols);
  };

  const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
    const newTableData = [...tableData];
    newTableData[rowIndex][colIndex] = value;
    setTableData(newTableData);
  };

  const generateTableCode = () => {
    let code = `<table border="${border}" width="${width}" cellpadding="${cellPadding}" cellspacing="${cellSpacing}" align="${align}">\n`;
    
    if (caption) {
      code += `  <caption>${caption}</caption>\n`;
    }
    
    for (let i = 0; i < rows; i++) {
      code += "  <tr>\n";
      for (let j = 0; j < cols; j++) {
        const cellContent = tableData[i][j] || "&nbsp;";
        const tag = i === 0 ? "th" : "td";
        code += `    <${tag}>${cellContent}</${tag}>\n`;
      }
      code += "  </tr>\n";
    }
    
    code += "</table>";
    setTableCode(code);
    return code;
  };

  const copyToClipboard = () => {
    const code = generateTableCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Table code copied to clipboard", {
      description: "You can now paste it into your HTML document"
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const generateHtmlFile = () => {
    const tableCode = generateTableCode();
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Table</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    table { border-collapse: collapse; }
    th, td { padding: 8px; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  ${tableCode}
</body>
</html>
    `;
    
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "table.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded", {
      description: "Your table has been saved as HTML"
    });
  };

  const handleGenerateTable = () => {
    generateTableCode();
    toast.success("Table code generated", {
      description: "You can now copy or download the HTML"
    });
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
                  <BreadcrumbPage>HTML Table Generator</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <Card className="w-full">
      <CardHeader>
        <CardTitle>HTML Table Generator</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Tabs defaultValue="customize" className="w-full">
          <TabsList>
            <TabsTrigger value="customize">Customize</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <TabsContent value="customize">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="rows">Rows</Label>
                <Input
                  type="number"
                  id="rows"
                  value={rows}
                  onChange={(e) => {
                    const newRows = parseInt(e.target.value, 10) || 1;
                    updateTableSize(newRows, cols);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="cols">Columns</Label>
                <Input
                  type="number"
                  id="cols"
                  value={cols}
                  onChange={(e) => {
                    const newCols = parseInt(e.target.value, 10) || 1;
                    updateTableSize(rows, newCols);
                  }}
                />
              </div>
              <div>
                <Label htmlFor="border">Border</Label>
                <Input
                  type="number"
                  id="border"
                  value={border}
                  onChange={(e) => setBorder(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="width">Width</Label>
                <Input
                  type="text"
                  id="width"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cellPadding">Cell Padding</Label>
                <Input
                  type="number"
                  id="cellPadding"
                  value={cellPadding}
                  onChange={(e) => setCellPadding(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="cellSpacing">Cell Spacing</Label>
                <Input
                  type="number"
                  id="cellSpacing"
                  value={cellSpacing}
                  onChange={(e) => setCellSpacing(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="align">Align</Label>
                <Select value={align} onValueChange={(value: "left" | "center" | "right") => setAlign(value)}>
                  <SelectTrigger id="align">
                    <SelectValue placeholder="Alignment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="caption">Caption</Label>
                <Input
                  type="text"
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table border={parseInt(border, 10)} width={width} cellPadding={parseInt(cellPadding, 10)} cellSpacing={parseInt(cellSpacing, 10)} align={align}>
                {caption && <caption>{caption}</caption>}
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((col, colIndex) => (
                        <td key={colIndex}>
                          <Input
                            type="text"
                            value={col}
                            onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="code">
            <Textarea
              readOnly
              value={tableCode || generateTableCode()}
              className="min-h-[200px] font-mono text-sm"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <Button variant="secondary" onClick={copyToClipboard} disabled={copied}>
                {copied ? (
                  <>
                    <Clipboard className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Clipboard className="h-4 w-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
              <Button onClick={generateHtmlFile}>
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <Button className="w-full" onClick={handleGenerateTable}>
          Generate Table Code
        </Button>
      </CardContent>
    </Card>
    </>
  );
};

export default HtmlTableGenerator;
