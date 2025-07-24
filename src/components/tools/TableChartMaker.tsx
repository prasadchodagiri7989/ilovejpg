
import React, { useState } from "react";
import { Table, Plus, Trash2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const TableChartMaker = () => {
  const [tableTitle, setTableTitle] = useState("My Table");
  const [tableData, setTableData] = useState<string[][]>([
    ["Header 1", "Header 2", "Header 3"],
    ["Row 1, Cell 1", "Row 1, Cell 2", "Row 1, Cell 3"],
    ["Row 2, Cell 1", "Row 2, Cell 2", "Row 2, Cell 3"],
  ]);
  const [editingCell, setEditingCell] = useState<{row: number, col: number} | null>(null);
  const [editValue, setEditValue] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [hasRowNumbers, setHasRowNumbers] = useState(false);
  const [showBorders, setShowBorders] = useState(true);
  const [alternateRows, setAlternateRows] = useState(true);
  const [cellPadding, setCellPadding] = useState<"sm" | "md" | "lg">("md");
  const { toast } = useToast();

  const addRow = () => {
    const newRow = Array(tableData[0].length).fill("");
    setTableData([...tableData, newRow]);
    
    toast({
      title: "Row added",
      description: "A new row has been added to the table",
    });
  };

  const addColumn = () => {
    const newData = tableData.map(row => [...row, ""]);
    setTableData(newData);
    
    toast({
      title: "Column added",
      description: "A new column has been added to the table",
    });
  };

  const deleteRow = (rowIndex: number) => {
    if (tableData.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "Table must have at least one row",
        variant: "destructive",
      });
      return;
    }
    
    const newData = tableData.filter((_, index) => index !== rowIndex);
    setTableData(newData);
    
    toast({
      title: "Row deleted",
      description: "The row has been removed from the table",
    });
  };

  const deleteColumn = (colIndex: number) => {
    if (tableData[0].length <= 1) {
      toast({
        title: "Cannot delete",
        description: "Table must have at least one column",
        variant: "destructive",
      });
      return;
    }
    
    const newData = tableData.map(row => row.filter((_, index) => index !== colIndex));
    setTableData(newData);
    
    toast({
      title: "Column deleted",
      description: "The column has been removed from the table",
    });
  };

  const moveRow = (rowIndex: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && rowIndex === 0) ||
        (direction === 'down' && rowIndex === tableData.length - 1)) {
      return;
    }
    
    const newData = [...tableData];
    const targetIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1;
    
    // Swap rows
    [newData[rowIndex], newData[targetIndex]] = [newData[targetIndex], newData[rowIndex]];
    setTableData(newData);
  };

  const moveColumn = (colIndex: number, direction: 'left' | 'right') => {
    if ((direction === 'left' && colIndex === 0) ||
        (direction === 'right' && colIndex === tableData[0].length - 1)) {
      return;
    }
    
    const targetIndex = direction === 'left' ? colIndex - 1 : colIndex + 1;
    
    const newData = tableData.map(row => {
      const newRow = [...row];
      [newRow[colIndex], newRow[targetIndex]] = [newRow[targetIndex], newRow[colIndex]];
      return newRow;
    });
    
    setTableData(newData);
  };

  const startEditing = (row: number, col: number) => {
    setEditingCell({ row, col });
    setEditValue(tableData[row][col]);
  };

  const saveEditing = () => {
    if (!editingCell) return;
    
    const { row, col } = editingCell;
    const newData = [...tableData];
    newData[row][col] = editValue;
    
    setTableData(newData);
    setEditingCell(null);
  };

  const cancelEditing = () => {
    setEditingCell(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      saveEditing();
    } else if (e.key === 'Escape') {
      cancelEditing();
    }
  };

  const downloadCSV = () => {
    // Convert table data to CSV
    const csv = tableData.map(row => 
      row.map(cell => {
        // Escape quotes and wrap cells with commas or quotes in double quotes
        const escaped = cell.replace(/"/g, '""');
        return /[,"]/.test(escaped) ? `"${escaped}"` : escaped;
      }).join(',')
    ).join('\n');
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${tableTitle.replace(/\s+/g, '_')}.csv`);
    link.click();
    
    toast({
      title: "CSV downloaded",
      description: `The table has been downloaded as "${tableTitle.replace(/\s+/g, '_')}.csv"`,
    });
  };

  const downloadHTML = () => {
    // Generate HTML table
    let html = `<table border="${showBorders ? '1' : '0'}" cellpadding="${
      cellPadding === 'sm' ? '4' : cellPadding === 'md' ? '8' : '12'
    }" cellspacing="0" style="border-collapse: collapse; width: 100%;">\n`;
    
    if (tableTitle) {
      html += `  <caption style="caption-side: top; text-align: left; font-weight: bold; margin-bottom: 10px;">${tableTitle}</caption>\n`;
    }
    
    if (hasHeader && tableData.length > 0) {
      html += '  <thead>\n    <tr>\n';
      
      if (hasRowNumbers) {
        html += '      <th style="text-align: center; font-weight: bold; background-color: #f3f4f6;">#</th>\n';
      }
      
      tableData[0].forEach(header => {
        html += `      <th style="text-align: left; font-weight: bold; background-color: #f3f4f6;">${header}</th>\n`;
      });
      
      html += '    </tr>\n  </thead>\n';
    }
    
    html += '  <tbody>\n';
    
    const startRow = hasHeader ? 1 : 0;
    for (let i = startRow; i < tableData.length; i++) {
      const rowStyle = alternateRows && (i - startRow) % 2 === 1 
        ? ' style="background-color: #f9fafb;"' 
        : '';
      
      html += `    <tr${rowStyle}>\n`;
      
      if (hasRowNumbers) {
        html += `      <td style="text-align: center;">${i - startRow + 1}</td>\n`;
      }
      
      tableData[i].forEach(cell => {
        html += `      <td>${cell}</td>\n`;
      });
      
      html += '    </tr>\n';
    }
    
    html += '  </tbody>\n</table>';
    
    // Create download link
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${tableTitle.replace(/\s+/g, '_')}.html`);
    link.click();
    
    toast({
      title: "HTML table downloaded",
      description: `The table has been downloaded as "${tableTitle.replace(/\s+/g, '_')}.html"`,
    });
  };

  // Get CSS class for table cell padding
  const getPaddingClass = () => {
    switch (cellPadding) {
      case 'sm': return 'px-2 py-1';
      case 'lg': return 'px-6 py-4';
      default: return 'px-4 py-2';
    }
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
                       <BreadcrumbPage>Table Chart Maker</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Table className="mr-2 text-primary" size={24} />
            <CardTitle>Table Chart Maker</CardTitle>
          </div>
          <CardDescription>
            Create and customize tables for your documents
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            <div>
              <Label htmlFor="table-title">Table Title</Label>
              <Input
                id="table-title"
                value={tableTitle}
                onChange={(e) => setTableTitle(e.target.value)}
                placeholder="Enter table title"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="has-header"
                  checked={hasHeader}
                  onCheckedChange={setHasHeader}
                />
                <Label htmlFor="has-header">Header Row</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="row-numbers"
                  checked={hasRowNumbers}
                  onCheckedChange={setHasRowNumbers}
                />
                <Label htmlFor="row-numbers">Row Numbers</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-borders"
                  checked={showBorders}
                  onCheckedChange={setShowBorders}
                />
                <Label htmlFor="show-borders">Show Borders</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="alternate-rows"
                  checked={alternateRows}
                  onCheckedChange={setAlternateRows}
                />
                <Label htmlFor="alternate-rows">Alternate Rows</Label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="cell-padding">Cell Padding</Label>
              <div className="flex space-x-2 mt-1">
                <Button
                  variant={cellPadding === 'sm' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCellPadding('sm')}
                >
                  Small
                </Button>
                <Button
                  variant={cellPadding === 'md' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCellPadding('md')}
                >
                  Medium
                </Button>
                <Button
                  variant={cellPadding === 'lg' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCellPadding('lg')}
                >
                  Large
                </Button>
              </div>
            </div>

            <div className={`overflow-x-auto border rounded-md ${showBorders ? '' : 'border-dashed'}`}>
              <table className={`w-full ${showBorders ? 'border-collapse' : 'border-separate border-spacing-0'}`}>
                {tableTitle && (
                  <caption className="caption-top text-left font-medium p-2">
                    {tableTitle}
                  </caption>
                )}
                
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      className={
                        hasHeader && rowIndex === 0 
                          ? 'bg-muted font-medium' 
                          : alternateRows && rowIndex % 2 === 1 
                            ? 'bg-muted/30' 
                            : ''
                      }
                    >
                      {hasRowNumbers && (
                        <td className={`text-center ${getPaddingClass()} ${showBorders ? 'border' : ''}`}>
                          {rowIndex === 0 && hasHeader ? '#' : rowIndex}
                        </td>
                      )}
                      
                      {row.map((cell, colIndex) => (
                        <td 
                          key={colIndex} 
                          className={`${getPaddingClass()} ${showBorders ? 'border' : ''}`}
                          onClick={() => startEditing(rowIndex, colIndex)}
                        >
                          {editingCell?.row === rowIndex && editingCell?.col === colIndex ? (
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onBlur={saveEditing}
                              onKeyDown={handleKeyDown}
                              autoFocus
                              className="min-w-[100px]"
                            />
                          ) : (
                            cell || <span className="text-muted-foreground">(empty)</span>
                          )}
                        </td>
                      ))}
                      
                      <td className="px-2">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveRow(rowIndex, 'up')}
                            disabled={rowIndex === 0}
                            className="h-7 w-7 p-0"
                          >
                            <ArrowUp size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveRow(rowIndex, 'down')}
                            disabled={rowIndex === tableData.length - 1}
                            className="h-7 w-7 p-0"
                          >
                            <ArrowDown size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteRow(rowIndex)}
                            className="h-7 w-7 p-0 text-destructive"
                            disabled={tableData.length <= 1}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  
                  <tr>
                    {hasRowNumbers && <td></td>}
                    {tableData[0].map((_, colIndex) => (
                      <td key={colIndex} className="p-1">
                        <div className="flex justify-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveColumn(colIndex, 'left')}
                            disabled={colIndex === 0}
                            className="h-7 w-7 p-0"
                          >
                            <ArrowLeft size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveColumn(colIndex, 'right')}
                            disabled={colIndex === tableData[0].length - 1}
                            className="h-7 w-7 p-0"
                          >
                            <ArrowRight size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteColumn(colIndex)}
                            className="h-7 w-7 p-0 text-destructive"
                            disabled={tableData[0].length <= 1}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    ))}
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                onClick={addRow}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Row
              </Button>
              
              <Button 
                variant="outline" 
                onClick={addColumn}
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Add Column
              </Button>
              
              <div className="flex gap-2 ml-auto">
                <Button 
                  variant="outline" 
                  onClick={downloadCSV}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Download CSV
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={downloadHTML}
                  className="flex items-center gap-2"
                >
                  <Download size={16} />
                  Download HTML
                </Button>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Tip: Click on any cell to edit its content. Press Enter to save or Escape to cancel.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Table Chart Maker">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Table Chart Maker</h4>
      <p>The Table Chart Maker allows you to create and edit tables directly in your browser.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click on any cell to edit its content.</li>
        <li>Use the toolbar to format your table.</li>
        <li>Click "Add Row" or "Add Column" to expand your table.</li>
        <li>Toggle options like borders, row numbers, and padding.</li>
        <li>Click "Download CSV" or "Download HTML" to save your table.</li>
      </ol>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
