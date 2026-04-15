import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Download, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  type: 'sent' | 'received';
  text: string;
  time: string;
}

export default function FakeChatGenerator() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [senderName, setSenderName] = useState('John');
  const [receiverName, setReceiverName] = useState('Jane');
  const [newMessage, setNewMessage] = useState('');
  const [messageType, setMessageType] = useState<'sent' | 'received'>('sent');
  const [copied, setCopied] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const addMessage = () => {
    if (!newMessage.trim()) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    
    setMessages([...messages, {
      id: Date.now(),
      type: messageType,
      text: newMessage,
      time
    }]);
    
    setNewMessage('');
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  const downloadAsImage = async () => {
    if (!chatRef.current) return;
    
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(chatRef.current);
      const link = document.createElement('a');
      link.download = 'fake-chat.png';
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Downloaded!",
        description: "Chat screenshot saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download. Try the copy feature instead.",
        variant: "destructive"
      });
    }
  };

  const clearAll = () => {
    setMessages([]);
  };

  return (
    <>
      <SEO 
        title="Fake Chat Generator - Create Fake Conversations | ILoveJPG"
        description="Create realistic fake chat conversations. Perfect for pranks, screenshots, or creative projects!"
        keywords="fake chat, chat generator, fake conversation, prank chat, screenshot generator"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Fake Chat Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Fake Chat Generator</CardTitle>
                    <p className="text-sm opacity-90">Create realistic conversations</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sender Name</label>
                    <Input
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="Sender..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Receiver Name</label>
                    <Input
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                      placeholder="Receiver..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={messageType === 'sent' ? 'default' : 'outline'}
                      onClick={() => setMessageType('sent')}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Sent (Right)
                    </Button>
                    <Button
                      variant={messageType === 'received' ? 'default' : 'outline'}
                      onClick={() => setMessageType('received')}
                      className="bg-gray-500 hover:bg-gray-600 text-white"
                    >
                      Received (Left)
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                  />
                </div>

                <Button
                  onClick={addMessage}
                  className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white"
                >
                  Add Message
                </Button>

                {messages.length > 0 && (
                  <div className="space-y-2">
                    <Button
                      onClick={downloadAsImage}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download as Image
                    </Button>
                    <Button
                      onClick={clearAll}
                      variant="outline"
                      className="w-full"
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              
              <CardContent className="p-0">
                <div ref={chatRef} className="bg-[#0a1628] min-h-[600px] p-4 space-y-3">
                  {/* Header */}
                  <div className="bg-[#1e293b] p-4 rounded-t-xl sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold">
                        {receiverName[0]?.toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{receiverName}</div>
                        <div className="text-xs text-green-400">Online</div>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3 px-2">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-400 py-20">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p>No messages yet</p>
                        <p className="text-sm">Add your first message to get started</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            onClick={() => deleteMessage(msg.id)}
                            className={`max-w-[70%] p-3 rounded-2xl cursor-pointer hover:opacity-80 transition-opacity ${
                              msg.type === 'sent'
                                ? 'bg-blue-600 text-white rounded-br-sm'
                                : 'bg-gray-700 text-white rounded-bl-sm'
                            }`}
                          >
                            <div>{msg.text}</div>
                            <div className="text-xs opacity-70 mt-1">{msg.time}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <GuidanceSection title="How to Use">
            <div className="space-y-2">
              <p>• Set sender and receiver names</p>
              <p>• Choose message type (sent/received)</p>
              <p>• Type your message and click "Add Message"</p>
              <p>• Click any message to delete it</p>
              <p>• Download as image when done</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Perfect for creating screenshots for stories or pranks!
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
