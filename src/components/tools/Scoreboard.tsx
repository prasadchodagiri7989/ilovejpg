
import React, { useState, useEffect } from "react";
import { Trophy, Plus, Minus, RotateCcw, Trash2, ArrowUp, ArrowDown, Edit, Check, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

export const Scoreboard = () => {
  const [teams, setTeams] = useState<Team[]>(() => {
    const savedTeams = localStorage.getItem("scoreboardTeams");
    return savedTeams ? JSON.parse(savedTeams) : [
      { id: "team1", name: "Team A", score: 0, color: "#4f46e5" },
      { id: "team2", name: "Team B", score: 0, color: "#ef4444" },
    ];
  });
  
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamColor, setNewTeamColor] = useState("#22c55e");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("");
  const { toast } = useToast();
  
  // Save teams to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("scoreboardTeams", JSON.stringify(teams));
  }, [teams]);
  
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  };
  
  const addTeam = () => {
    if (newTeamName.trim() === "") {
      toast({
        title: "Team name required",
        description: "Please enter a name for the team",
        variant: "destructive",
      });
      return;
    }
    
    const newTeam: Team = {
      id: generateId(),
      name: newTeamName.trim(),
      score: 0,
      color: newTeamColor,
    };
    
    setTeams([...teams, newTeam]);
    setNewTeamName("");
    
    toast({
      title: "Team added",
      description: `"${newTeamName}" has been added to the scoreboard`,
    });
  };
  
  const removeTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
    
    toast({
      title: "Team removed",
      description: "The team has been removed from the scoreboard",
    });
  };
  
  const changeScore = (id: string, delta: number) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, score: Math.max(0, team.score + delta) } : team
    ));
  };
  
  const resetScores = () => {
    setTeams(teams.map(team => ({ ...team, score: 0 })));
    
    toast({
      title: "Scores reset",
      description: "All team scores have been reset to zero",
    });
  };
  
  const resetAll = () => {
    setTeams([
      { id: "team1", name: "Team A", score: 0, color: "#4f46e5" },
      { id: "team2", name: "Team B", score: 0, color: "#ef4444" },
    ]);
    
    toast({
      title: "Scoreboard reset",
      description: "The scoreboard has been reset to default",
    });
  };
  
  const startEditing = (team: Team) => {
    setEditingId(team.id);
    setEditName(team.name);
    setEditColor(team.color);
  };
  
  const saveEdit = () => {
    if (editName.trim() === "") {
      toast({
        title: "Team name required",
        description: "Please enter a name for the team",
        variant: "destructive",
      });
      return;
    }
    
    setTeams(teams.map(team => 
      team.id === editingId ? { ...team, name: editName.trim(), color: editColor } : team
    ));
    
    setEditingId(null);
    
    toast({
      title: "Team updated",
      description: "The team information has been updated",
    });
  };
  
  const cancelEdit = () => {
    setEditingId(null);
  };
  
  const moveTeam = (id: string, direction: 'up' | 'down') => {
    const index = teams.findIndex(team => team.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === teams.length - 1)) {
      return;
    }
    
    const newTeams = [...teams];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap positions
    [newTeams[index], newTeams[targetIndex]] = [newTeams[targetIndex], newTeams[index]];
    setTeams(newTeams);
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
                       <BreadcrumbPage>Scoreboard</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Trophy className="mr-2 text-primary" size={24} />
            <CardTitle>Scoreboard</CardTitle>
          </div>
          <CardDescription>
            Keep track of scores for games and competitions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            {teams.length > 0 ? (
              <div className="space-y-4">
                {teams.map((team) => (
                  <div key={team.id} className="border rounded-md overflow-hidden">
                    {editingId === team.id ? (
                      <div className="p-4 space-y-3">
                        <div className="grid grid-cols-4 gap-2">
                          <div className="col-span-3">
                            <Label htmlFor={`edit-name-${team.id}`}>Team Name</Label>
                            <Input
                              id={`edit-name-${team.id}`}
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor={`edit-color-${team.id}`}>Color</Label>
                            <div className="flex mt-1">
                              <Input
                                id={`edit-color-${team.id}`}
                                type="color"
                                value={editColor}
                                onChange={(e) => setEditColor(e.target.value)}
                                className="w-12 h-10 p-1"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={cancelEdit}
                            className="flex items-center gap-1"
                          >
                            <X size={14} />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={saveEdit}
                            className="flex items-center gap-1"
                          >
                            <Check size={14} />
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-[auto_1fr_auto] items-center">
                        <div 
                          className="w-2 h-full self-stretch" 
                          style={{ backgroundColor: team.color }}
                        ></div>
                        <div className="p-4 flex justify-between items-center">
                          <div className="font-medium text-lg">{team.name}</div>
                          <div className="text-4xl font-bold">{team.score}</div>
                        </div>
                        <div className="p-2 flex flex-col items-center gap-1 border-l bg-muted/10">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => changeScore(team.id, 1)}
                            className="h-8 w-8 p-0"
                          >
                            <Plus size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => changeScore(team.id, -1)}
                            disabled={team.score <= 0}
                            className="h-8 w-8 p-0"
                          >
                            <Minus size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEditing(team)}
                            className="h-8 w-8 p-0"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveTeam(team.id, 'up')}
                            disabled={teams.indexOf(team) === 0}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowUp size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveTeam(team.id, 'down')}
                            disabled={teams.indexOf(team) === teams.length - 1}
                            className="h-8 w-8 p-0"
                          >
                            <ArrowDown size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTeam(team.id)}
                            className="h-8 w-8 p-0 text-destructive"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={resetScores}
                    className="flex items-center gap-2"
                  >
                    <RotateCcw size={16} />
                    Reset Scores
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={resetAll}
                    className="flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Reset All
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center text-muted-foreground">
                <Trophy size={48} className="mb-2 opacity-20" />
                <p>No teams on the scoreboard</p>
                <p className="text-sm mb-4">Add teams to get started</p>
              </div>
            )}
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-3">Add New Team</h3>
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                <div className="md:col-span-4">
                  <Label htmlFor="new-team-name">Team Name</Label>
                  <Input
                    id="new-team-name"
                    placeholder="Enter team name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="new-team-color">Team Color</Label>
                  <div className="flex mt-1">
                    <Input
                      id="new-team-color"
                      type="color"
                      value={newTeamColor}
                      onChange={(e) => setNewTeamColor(e.target.value)}
                      className="w-12 h-10 p-1"
                    />
                    <div
                      className="ml-2 flex-1 rounded-md"
                      style={{ backgroundColor: newTeamColor }}
                    ></div>
                  </div>
                </div>
                <div className="md:col-span-1 flex items-end">
                  <Button
                    onClick={addTeam}
                    className="w-full mt-1"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use Scoreboard">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Scoreboard</h4>
      <p>The Scoreboard tool helps you track scores for games and competitions effortlessly.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Add teams by entering a name and selecting a team color.</li>
        <li>Adjust scores for each team using the score buttons.</li>
        <li>Click "Reset Scores" to reset all scores to zero.</li>
        <li>Click "Reset All" to clear all teams and start fresh.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Add multiple teams with unique names and colors.</li>
        <li>Easily increase or decrease scores in real time.</li>
        <li>Reset scores for a fresh game session.</li>
        <li>Simple and user-friendly interface.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Perfect for tracking game scores in sports, competitions, and classroom activities.</li>
        <li>Easy to manage and update scores on the go.</li>
        <li>Customizable with team names and colors for better organization.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
