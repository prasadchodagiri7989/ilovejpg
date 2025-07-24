
import React, { useState, useEffect } from "react";
import { CheckSquare, Plus, Trash2, Save, Edit, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial render
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const { toast } = useToast();
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  
  const handleAddTodo = () => {
    if (newTodo.trim() === "") {
      toast({
        title: "Cannot add empty todo",
        description: "Please enter some text for your todo item.",
        variant: "destructive",
      });
      return;
    }
    
    const newTodoItem: Todo = {
      id: generateId(),
      text: newTodo,
      completed: false,
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo("");
    
    toast({
      title: "Todo added",
      description: "Your new todo item has been added.",
    });
  };
  
  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
    
    toast({
      title: "Todo deleted",
      description: "The todo item has been removed.",
    });
  };
  
  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const handleEditStart = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };
  
  const handleEditSave = () => {
    if (editText.trim() === "") {
      toast({
        title: "Cannot save empty todo",
        description: "Please enter some text for your todo item.",
        variant: "destructive",
      });
      return;
    }
    
    setTodos(
      todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editText } : todo
      )
    );
    
    setEditingId(null);
    setEditText("");
    
    toast({
      title: "Todo updated",
      description: "Your todo item has been updated.",
    });
  };
  
  const handleEditCancel = () => {
    setEditingId(null);
    setEditText("");
  };
  
  const handleClearCompleted = () => {
    const completedCount = todos.filter(todo => todo.completed).length;
    
    if (completedCount === 0) {
      toast({
        title: "No completed items",
        description: "There are no completed items to clear.",
      });
      return;
    }
    
    setTodos(todos.filter(todo => !todo.completed));
    
    toast({
      title: "Completed items cleared",
      description: `${completedCount} completed ${completedCount === 1 ? 'item' : 'items'} cleared.`,
    });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
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
                       <BreadcrumbPage>Todo List</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <CheckSquare className="mr-2 text-primary" size={24} />
            <CardTitle>Todo List</CardTitle>
          </div>
          <CardDescription>
            Keep track of tasks and manage your to-do list
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            <div className="flex gap-2">
              <Input
                placeholder="Add a new todo..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
              />
              <Button onClick={handleAddTodo} className="flex items-center gap-1">
                <Plus size={16} />
                Add
              </Button>
            </div>
            
            {todos.length > 0 ? (
              <div className="space-y-4">
                <ul className="space-y-2">
                  {todos.map(todo => (
                    <li key={todo.id} className="flex items-center gap-2 border rounded-md p-3">
                      {editingId === todo.id ? (
                        <div className="flex items-center gap-2 w-full">
                          <Input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleEditKeyDown}
                            autoFocus
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleEditSave}
                            className="h-8 w-8 p-0"
                          >
                            <Save size={16} />
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
                            checked={todo.completed}
                            onCheckedChange={() => handleToggleTodo(todo.id)}
                            id={`todo-${todo.id}`}
                          />
                          <label
                            htmlFor={`todo-${todo.id}`}
                            className={`flex-1 cursor-pointer ${
                              todo.completed ? 'line-through text-muted-foreground' : ''
                            }`}
                          >
                            {todo.text}
                          </label>
                          <div className="flex items-center">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditStart(todo)}
                              disabled={todo.completed}
                              className="h-8 w-8 p-0"
                            >
                              <Edit size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteTodo(todo.id)}
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
                
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    {todos.filter(todo => !todo.completed).length} items left
                  </span>
                  {todos.some(todo => todo.completed) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearCompleted}
                    >
                      Clear completed
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <CheckSquare size={48} className="mb-2 opacity-20" />
                <p>Your todo list is empty</p>
                <p className="text-sm">Add some tasks to get started</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Todo List">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Todo List</h4>
      <p>The Todo List allows you to add, track, and manage tasks efficiently.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Type a task in the input field and click "Add" to save it.</li>
        <li>Click on a task to mark it as completed.</li>
        <li>Use the delete button to remove tasks you no longer need.</li>
        <li>Your list will be saved automatically for later access.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Simple and intuitive task management.</li>
        <li>Ability to mark tasks as complete.</li>
        <li>Automatic saving of tasks for future reference.</li>
        <li>Lightweight and fast interface.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>
    </div>
    </>
  );
};
