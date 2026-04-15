import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Download } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function FakeNotificationGenerator() {
  const [app, setApp] = useState('whatsapp');
  const [title, setTitle] = useState('John Doe');
  const [message, setMessage] = useState('Hey! How are you?');
  const [time, setTime] = useState('now');

  const apps = {
    whatsapp: { name: 'WhatsApp', color: 'from-green-500 to-teal-500', icon: '💬' },
    instagram: { name: 'Instagram', color: 'from-pink-500 to-purple-500', icon: '📷' },
    twitter: { name: 'Twitter', color: 'from-blue-400 to-blue-600', icon: '🐦' },
    facebook: { name: 'Facebook', color: 'from-blue-500 to-indigo-500', icon: '📘' }
  };

  return (
    <>
      <SEO title="Fake Notification Generator - Create Fake Notifications | ILoveJPG" description="Create realistic fake notifications for pranks and screenshots!" keywords="fake notification, notification generator, prank notification" />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Fake Notification Generator</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className={`bg-gradient-to-r ${apps[app as keyof typeof apps].color} text-white`}>
                <div className="flex items-center gap-3">
                  <Bell className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Fake Notification Generator</CardTitle>
                    <p className="text-sm opacity-90">Create realistic notifications</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">App</label>
                  <Select value={app} onValueChange={setApp}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {Object.entries(apps).map(([key, val]) => (
                        <SelectItem key={key} value={key}>{val.icon} {val.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Title/Name</label>
                  <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Message</label>
                  <Input value={message} onChange={(e) => setMessage(e.target.value)} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Time</label>
                  <Input value={time} onChange={(e) => setTime(e.target.value)} placeholder="now, 2m ago, etc." />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gray-800 text-white">
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 bg-gray-900 min-h-[400px] flex items-start justify-center pt-12">
                <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-4 space-y-2">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${apps[app as keyof typeof apps].color} flex items-center justify-center text-2xl`}>
                      {apps[app as keyof typeof apps].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-gray-900 dark:text-gray-100">{title}</div>
                        <div className="text-xs text-gray-500">{time}</div>
                      </div>
                      <div className="text-sm text-gray-700 dark:text-gray-300">{message}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <GuidanceSection title="How to Use">
            <div className="space-y-2">
              <p>• Select your app</p>
              <p>• Customize the notification details</p>
              <p>• Take a screenshot for sharing!</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
