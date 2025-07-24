
import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, Trash2, Save, Edit, X, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface GroceryItem {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
}

export const GroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>(() => {
    // Load items from localStorage on initial render
    const savedItems = localStorage.getItem("groceryItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const { toast } = useToast();
  
  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("groceryItems", JSON.stringify(items));
  }, [items]);
  
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  
  const handleAddItem = () => {
    if (newItemName.trim() === "") {
      toast({
        title: "Cannot add empty item",
        description: "Please enter a name for your grocery item.",
        variant: "destructive",
      });
      return;
    }
    
    const newItem: GroceryItem = {
      id: generateId(),
      name: newItemName.trim(),
      quantity: newItemQuantity.trim(),
      completed: false,
    };
    
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemQuantity("");
    
    toast({
      title: "Item added",
      description: "Your new grocery item has been added.",
    });
  };
  
  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    
    toast({
      title: "Item deleted",
      description: "The grocery item has been removed.",
    });
  };
  
  const handleToggleItem = (id: string) => {
    setItems(
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const handleEditStart = (item: GroceryItem) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQuantity(item.quantity);
  };
  
  const handleEditSave = () => {
    if (editName.trim() === "") {
      toast({
        title: "Cannot save empty item",
        description: "Please enter a name for your grocery item.",
        variant: "destructive",
      });
      return;
    }
    
    setItems(
      items.map(item =>
        item.id === editingId ? { ...item, name: editName.trim(), quantity: editQuantity.trim() } : item
      )
    );
    
    setEditingId(null);
    setEditName("");
    setEditQuantity("");
    
    toast({
      title: "Item updated",
      description: "Your grocery item has been updated.",
    });
  };
  
  const handleEditCancel = () => {
    setEditingId(null);
    setEditName("");
    setEditQuantity("");
  };
  
  const handleClearCompleted = () => {
    const completedCount = items.filter(item => item.completed).length;
    
    if (completedCount === 0) {
      toast({
        title: "No completed items",
        description: "There are no completed items to clear.",
      });
      return;
    }
    
    setItems(items.filter(item => !item.completed));
    
    toast({
      title: "Completed items cleared",
      description: `${completedCount} completed ${completedCount === 1 ? 'item' : 'items'} cleared.`,
    });
  };
  
  const handleClearAll = () => {
    if (items.length === 0) {
      toast({
        title: "List already empty",
        description: "There are no items to clear.",
      });
      return;
    }
    
    setItems([]);
    
    toast({
      title: "List cleared",
      description: "All items have been removed from your grocery list.",
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddItem();
    }
  };
  
  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
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
                  <BreadcrumbPage>Grocery List</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 text-primary" size={24} />
            <CardTitle>Grocery List</CardTitle>
          </div>
          <CardDescription>
            Make your shopping list and check off items
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
              <div className="md:col-span-3">
                <Label htmlFor="item-name">Item</Label>
                <Input
                  id="item-name"
                  placeholder="Add a grocery item..."
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-1">
                <Label htmlFor="item-quantity">Quantity</Label>
                <Input
                  id="item-quantity"
                  placeholder="Qty"
                  value={newItemQuantity}
                  onChange={(e) => setNewItemQuantity(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-1 flex items-end">
                <Button onClick={handleAddItem} className="w-full mt-1 flex items-center gap-1">
                  <Plus size={16} />
                  Add
                </Button>
              </div>
            </div>
            
            {items.length > 0 ? (
              <div className="space-y-4">
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item.id} className="flex items-center gap-2 border rounded-md p-3">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                            <div className="md:col-span-3">
                              <Input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={handleEditKeyDown}
                                autoFocus
                                placeholder="Item name"
                              />
                            </div>
                            <div className="md:col-span-1">
                              <Input
                                value={editQuantity}
                                onChange={(e) => setEditQuantity(e.target.value)}
                                onKeyDown={handleEditKeyDown}
                                placeholder="Quantity"
                              />
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleEditSave}
                            className="h-8 w-8 p-0"
                          >
                            <Check size={16} />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleEditCancel}
                            className="h-8 w-8 p-0"
                          >
                            <X size={16} />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => handleToggleItem(item.id)}
                            id={`item-${item.id}`}
                          />
                          <label
                            htmlFor={`item-${item.id}`}
                            className={`flex-1 cursor-pointer ${
                              item.completed ? 'line-through text-muted-foreground' : ''
                            }`}
                          >
                            <div className="flex justify-between">
                              <span>{item.name}</span>
                              {item.quantity && (
                                <span className="text-sm text-muted-foreground bg-muted/40 px-2 py-0.5 rounded">
                                  {item.quantity}
                                </span>
                              )}
                            </div>
                          </label>
                          <div className="flex items-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditStart(item)}
                              disabled={item.completed}
                              className="h-8 w-8 p-0"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteItem(item.id)}
                              className="h-8 w-8 p-0 text-destructive"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </>
                      )}
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    {items.filter(item => !item.completed).length} items left
                  </span>
                  <div className="flex gap-2">
                    {items.some(item => item.completed) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearCompleted}
                      >
                        Clear completed
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleClearAll}
                    >
                      Clear all
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <ShoppingCart size={48} className="mb-2 opacity-20" />
                <p>Your grocery list is empty</p>
                <p className="text-sm">Add some items to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Grocery List Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Creating Your Grocery List</h4>
      <p>The Grocery List tool helps you organize and track your shopping items efficiently.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter the name of the grocery item in the input field.</li>
        <li>Specify the quantity needed.</li>
        <li>Click "Add" to add the item to your list.</li>
        <li>Check off items as you purchase them.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Managing Your List</h4>
      <ul className="list-disc pl-5">
        <li>Remove items from the list once purchased.</li>
        <li>Modify quantities as needed.</li>
        <li>Use the list as a reference while shopping to ensure you don't forget anything.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Benefits of Using This Tool</h4>
      <ul className="list-disc pl-5">
        <li>Stay organized and avoid missing essential items.</li>
        <li>Reduce impulse buying by sticking to a planned list.</li>
        <li>Save time and effort by checking off purchased items.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
