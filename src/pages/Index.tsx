import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  ImageIcon, FileText, Video, Music, Archive, PenTool, BookOpen, ArrowRightIcon, 
  Sparkles, Zap, TrendingUp, Users, Heart, Gamepad2, Target, Shield, Clock, Calculator,
  Code, Globe, RefreshCw, FolderOpen, Share2, MessageSquare
} from "lucide-react";

const toolCategories = [
  {
    title: "Image Tools",
    description: "Convert JPG, PNG, GIF, SVG and more",
    icon: ImageIcon,
    link: "/tools/image",
    gradient: "from-purple-500 to-pink-500",
    count: "35+"
  },
  {
    title: "PDF & Documents",
    description: "Convert PDF, DOCX, TXT, HTML",
    icon: FileText,
    link: "/tools/pdf",
    gradient: "from-blue-500 to-cyan-500",
    count: "24+"
  },
  {
    title: "Spreadsheets",
    description: "Handle XLS, CSV, JSON, XML",
    icon: FileText,
    link: "/tools/spreadsheet",
    gradient: "from-green-500 to-emerald-500",
    count: "15+"
  },
  {
    title: "Video Tools",
    description: "Convert MP4, MOV, AVI, WEBM",
    icon: Video,
    link: "/tools/video",
    gradient: "from-red-500 to-orange-500",
    count: "20+"
  },
  {
    title: "Developer Tools",
    description: "JSON, HTML, CSS, Regex testers",
    icon: Code,
    link: "/json-formatter",
    gradient: "from-indigo-500 to-purple-500",
    count: "11+"
  },
  {
    title: "Calculators",
    description: "BMI, EMI, Percentage, Age",
    icon: Calculator,
    link: "/percentage-calculator",
    gradient: "from-yellow-500 to-amber-500",
    count: "8+"
  },
  {
    title: "Security Tools",
    description: "Password, Hash, JWT tools",
    icon: Shield,
    link: "/password-generator-tool",
    gradient: "from-slate-500 to-gray-600",
    count: "6+"
  },
  {
    title: "Time & Date",
    description: "Timezone, Countdown, World Clock",
    icon: Clock,
    link: "/timestamp-converter",
    gradient: "from-teal-500 to-cyan-500",
    count: "6+"
  }
];

const featuredTools = [
  {
    name: "Truth or Dare",
    desc: "Ultimate party game",
    link: "/truth-or-dare",
    icon: Users,
    badge: "NEW",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Love Calculator",
    desc: "Test compatibility",
    link: "/love-calculator",
    icon: Heart,
    badge: "POPULAR",
    gradient: "from-pink-500 to-red-500"
  },
  {
    name: "Reaction Time Test",
    desc: "Test your reflexes",
    link: "/reaction-time-test",
    icon: Zap,
    badge: "NEW",
    gradient: "from-yellow-500 to-orange-500"
  },
  {
    name: "Fake Chat Generator",
    desc: "Create fake chats",
    link: "/fake-chat-generator",
    icon: MessageSquare,
    badge: "TRENDING",
    gradient: "from-green-500 to-teal-500"
  }
];

const newTools = [
  { name: "Would You Rather", link: "/would-you-rather", icon: Users },
  { name: "Never Have I Ever", link: "/never-have-i-ever", icon: Users },
  { name: "Emoji Guess Game", link: "/emoji-guess-game", icon: Sparkles },
  { name: "Number Memory", link: "/number-memory-challenge", icon: Sparkles },
  { name: "Personality Quiz", link: "/personality-quiz", icon: Users },
  { name: "Decision Wheel", link: "/decision-wheel", icon: Target },
  { name: "Excuse Generator", link: "/excuse-generator", icon: MessageSquare },
  { name: "Pickup Line Generator", link: "/pickup-line-generator", icon: Heart },
  { name: "Daily Luck Meter", link: "/daily-luck-meter", icon: Sparkles },
  { name: "Random Challenge", link: "/random-challenge-generator", icon: Target },
  { name: "Random Story", link: "/random-story-generator", icon: Sparkles },
  { name: "Future Prediction", link: "/future-prediction", icon: Sparkles }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg mb-4">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-semibold">200+ Tools & Growing!</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
            All-in-One Tool Platform
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Powerful converters, calculators, generators, and interactive games — all in one place. Fast, free, and fun!
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/jpg-to-png">
                <Zap className="mr-2 h-5 w-5" />
                Start Converting
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="shadow-lg hover:shadow-xl transition-all duration-300">
              <Link to="/truth-or-dare">
                <Gamepad2 className="mr-2 h-5 w-5" />
                Play Games
              </Link>
            </Button>
          </div>
        </div>

        {/* Featured Tools */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Featured Tools</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTools.map((tool, idx) => (
              <Link key={idx} to={tool.link} className="group">
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-transparent hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{tool.name}</CardTitle>
                        <CardDescription>{tool.desc}</CardDescription>
                      </div>
                      <Badge className="ml-2" variant={tool.badge === "NEW" ? "default" : "secondary"}>
                        {tool.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* New Additions */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Recently Added</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {newTools.map((tool, idx) => (
              <Link key={idx} to={tool.link} className="group">
                <div className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border-2 border-gray-100 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-105">
                  <tool.icon className="w-6 h-6 text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{tool.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tool Categories */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FolderOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tool Categories</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {toolCategories.map((category, idx) => (
              <Link key={idx} to={category.link} className="group">
                <Card className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-transparent hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-xl">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg mb-2">{category.title}</CardTitle>
                      <Badge variant="outline">{category.count}</Badge>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
                      <span className="text-sm">Explore</span>
                      <ArrowRightIcon className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their daily tool needs. Fast, secure, and completely free!
          </p>
          <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Link to="/jpg-to-png">
              Start Using Tools Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Index;
