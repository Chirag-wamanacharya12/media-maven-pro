
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { 
  Bot, 
  Wand2, 
  FileText, 
  Image, 
  MessageSquare, 
  BarChart3, 
  Sparkles, 
  Copy, 
  Download, 
  RefreshCw, 
  Settings,
  Hash,
  Calendar,
  Target,
  Zap,
  Brain,
  Eye,
  TrendingUp,
  Users,
  Clock,
  Play,
  Pause,
  Save,
  Share2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIStudio = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('post');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('professional');
  const [creativity, setCreativity] = useState([0.7]);
  const [maxLength, setMaxLength] = useState([280]);
  const { toast } = useToast();

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model for complex tasks', badge: 'Premium' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks', badge: 'Standard' },
    { id: 'claude', name: 'Claude 3', description: 'Excellent for analysis and writing', badge: 'Premium' },
    { id: 'gemini', name: 'Gemini Pro', description: 'Google\'s multimodal AI', badge: 'Standard' },
  ];

  const contentTypes = [
    { id: 'post', name: 'Social Media Post', icon: MessageSquare },
    { id: 'caption', name: 'Image Caption', icon: Image },
    { id: 'hashtags', name: 'Hashtags', icon: Hash },
    { id: 'story', name: 'Story Content', icon: FileText },
    { id: 'ad-copy', name: 'Ad Copy', icon: Target },
    { id: 'bio', name: 'Profile Bio', icon: Users },
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', color: 'bg-red-600' },
  ];

  const tones = [
    'Professional', 'Casual', 'Friendly', 'Authoritative', 
    'Enthusiastic', 'Humorous', 'Inspiring', 'Educational'
  ];

  const aiTools = [
    {
      id: 'content-generator',
      name: 'Content Generator',
      description: 'Generate engaging social media content',
      icon: Wand2,
      color: 'bg-blue-500'
    },
    {
      id: 'hashtag-research',
      name: 'Hashtag Research',
      description: 'Find trending and relevant hashtags',
      icon: Hash,
      color: 'bg-green-500'
    },
    {
      id: 'content-optimizer',
      name: 'Content Optimizer',
      description: 'Optimize existing content for better engagement',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      id: 'sentiment-analyzer',
      name: 'Sentiment Analyzer',
      description: 'Analyze the sentiment of your content',
      icon: BarChart3,
      color: 'bg-orange-500'
    },
    {
      id: 'image-analyzer',
      name: 'Image Analyzer',
      description: 'Generate captions from images',
      icon: Eye,
      color: 'bg-pink-500'
    },
    {
      id: 'trend-predictor',
      name: 'Trend Predictor',
      description: 'Predict trending topics and content',
      icon: Brain,
      color: 'bg-indigo-500'
    }
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const sampleContent = generateSampleContent();
      setGeneratedContent(sampleContent);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated",
        description: "Your AI-generated content is ready!",
      });
    }, 2000);
  };

  const generateSampleContent = () => {
    const samples = {
      post: "🚀 Excited to share our latest innovation! This breakthrough technology is set to revolutionize the way we connect and create. The future is here, and it's more amazing than we ever imagined. #Innovation #Technology #Future",
      caption: "Capturing the perfect moment where creativity meets technology. Every pixel tells a story of innovation and passion. ✨ #CreativeLife #TechArt #Innovation",
      hashtags: "#Innovation #Technology #AI #MachineLearning #DigitalTransformation #FutureTech #Automation #SmartSolutions #TechInnovation #DigitalRevolution",
      story: "Behind the scenes of our latest project! 🎬 From concept to creation, every step has been an incredible journey of discovery and innovation.",
      'ad-copy': "Transform your business with cutting-edge AI solutions. Join thousands of companies already experiencing 300% growth. Start your free trial today! 🚀",
      bio: "AI enthusiast | Tech innovator | Helping businesses transform with smart solutions | Join 50K+ followers on the journey to the future 🤖✨"
    };
    
    return samples[contentType] || samples.post;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const saveContent = () => {
    const savedContent = {
      content: generatedContent,
      type: contentType,
      platform,
      timestamp: new Date().toISOString()
    };
    
    const existing = JSON.parse(localStorage.getItem('ai-generated-content') || '[]');
    existing.push(savedContent);
    localStorage.setItem('ai-generated-content', JSON.stringify(existing));
    
    toast({
      title: "Saved!",
      description: "Content saved to your library.",
    });
  };

  return (
    <div className="p-6 animate-fade-in min-h-screen bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Studio
              </h1>
              <p className="text-muted-foreground">AI-powered content creation and optimization</p>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">1,247</p>
                    <p className="text-sm text-slate-400">Content Generated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">24h</p>
                    <p className="text-sm text-slate-400">Time Saved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">85%</p>
                    <p className="text-sm text-slate-400">Engagement Boost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="text-2xl font-bold text-white">12.5K</p>
                    <p className="text-sm text-slate-400">Reach Increased</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="generate" className="data-[state=active]:bg-purple-600">Generate</TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-purple-600">AI Tools</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600">Analytics</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-purple-600">History</TabsTrigger>
          </TabsList>

          {/* Content Generation Tab */}
          <TabsContent value="generate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configuration Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-200">AI Model</Label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {aiModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              <div className="flex items-center gap-2">
                                <span>{model.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {model.badge}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-200">Content Type</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {contentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              <div className="flex items-center gap-2">
                                <type.icon className="w-4 h-4" />
                                {type.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-200">Platform</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((platform) => (
                            <SelectItem key={platform.id} value={platform.id}>
                              {platform.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-200">Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="bg-slate-700 border-slate-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {tones.map((tone) => (
                            <SelectItem key={tone} value={tone.toLowerCase()}>
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-slate-200">Creativity: {creativity[0]}</Label>
                      <Slider
                        value={creativity}
                        onValueChange={setCreativity}
                        max={1}
                        min={0}
                        step={0.1}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-slate-200">Max Length: {maxLength[0]} chars</Label>
                      <Slider
                        value={maxLength}
                        onValueChange={setMaxLength}
                        max={2000}
                        min={50}
                        step={10}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Generation Panel */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      Content Generator
                    </CardTitle>
                    <CardDescription>
                      Describe what you want to create and let AI do the magic
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-slate-200">Prompt</Label>
                      <Textarea
                        placeholder="Describe the content you want to generate... e.g., 'Create an engaging post about sustainable technology'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-slate-700 border-slate-600 text-white min-h-[120px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleGenerate} 
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Content
                          </>
                        )}
                      </Button>
                      
                      <Button variant="outline" className="border-slate-600 text-slate-300">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Content */}
                {generatedContent && (
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <FileText className="w-5 h-5" />
                          Generated Content
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={copyToClipboard} className="border-slate-600">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={saveContent} className="border-slate-600">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-slate-600">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                        <p className="text-slate-200 whitespace-pre-wrap">{generatedContent}</p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-green-500/50 text-green-400">
                          Optimized for {platform}
                        </Badge>
                        <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                          {tone} tone
                        </Badge>
                        <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                          {generatedContent.length} characters
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiTools.map((tool) => (
                <Card key={tool.id} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                        <p className="text-sm text-slate-400 mb-4">{tool.description}</p>
                        <Button size="sm" variant="outline" className="border-slate-600">
                          Launch Tool
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Engagement Rate</span>
                      <span className="text-green-400 font-semibold">+23%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Reach Improvement</span>
                      <span className="text-blue-400 font-semibold">+45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Time Saved</span>
                      <span className="text-purple-400 font-semibold">12.5 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Content Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Top Performing Type</span>
                      <span className="text-yellow-400 font-semibold">Carousel Posts</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Best Platform</span>
                      <span className="text-pink-400 font-semibold">Instagram</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Optimal Posting Time</span>
                      <span className="text-cyan-400 font-semibold">2-4 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Generations
                </CardTitle>
                <CardDescription>
                  Your recently generated content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                      <div className="flex-1">
                        <p className="text-slate-200 mb-1">Instagram Post - Professional</p>
                        <p className="text-sm text-slate-400">Generated 2 hours ago</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-slate-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-slate-600">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIStudio;
