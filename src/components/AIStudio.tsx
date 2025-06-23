
import React, { useState, useRef } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
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
  Share2,
  Video,
  Scissors,
  Upload,
  Grid,
  ChevronDown,
  ChevronUp,
  Star,
  Layers,
  Film,
  Edit3,
  ImageIcon,
  Type,
  Mic,
  Volume2,
  Timer,
  Shuffle,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Loader2
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
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoSegments, setVideoSegments] = useState<any[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const aiModels = [
    { id: 'gpt-4', name: 'GPT-4', description: 'Most capable model for complex tasks', badge: 'Premium' },
    { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast and efficient for most tasks', badge: 'Standard' },
    { id: 'claude', name: 'Claude 3', description: 'Excellent for analysis and writing', badge: 'Premium' },
    { id: 'gemini', name: 'Gemini Pro', description: 'Google\'s multimodal AI', badge: 'Standard' },
  ];

  const contentTypes = [
    { id: 'post', name: 'Social Media Post', icon: MessageSquare },
    { id: 'reel', name: 'Instagram Reel', icon: Video },
    { id: 'carousel', name: 'Carousel Post', icon: Layers },
    { id: 'story', name: 'Story Content', icon: Film },
    { id: 'caption', name: 'Image Caption', icon: Image },
    { id: 'hashtags', name: 'Hashtags', icon: Hash },
    { id: 'ad-copy', name: 'Ad Copy', icon: Target },
    { id: 'bio', name: 'Profile Bio', icon: Users },
  ];

  const platforms = [
    { id: 'instagram', name: 'Instagram', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-black' },
    { id: 'youtube', name: 'YouTube', color: 'bg-red-600' },
    { id: 'twitter', name: 'Twitter', color: 'bg-blue-500' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-600' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-700' },
  ];

  const tones = [
    'Professional', 'Casual', 'Friendly', 'Authoritative', 
    'Enthusiastic', 'Humorous', 'Inspiring', 'Educational'
  ];

  const videoTools = [
    {
      id: 'video-splitter',
      name: 'Video Splitter',
      description: 'Split long videos into short clips',
      icon: Scissors,
      color: 'bg-blue-600'
    },
    {
      id: 'auto-highlights',
      name: 'Auto Highlights',
      description: 'AI-generated video highlights',
      icon: Sparkles,
      color: 'bg-purple-600'
    },
    {
      id: 'caption-generator',
      name: 'Caption Generator',
      description: 'Auto-generate captions for videos',
      icon: Type,
      color: 'bg-green-600'
    },
    {
      id: 'thumbnail-maker',
      name: 'Thumbnail Maker',
      description: 'Create engaging thumbnails',
      icon: ImageIcon,
      color: 'bg-orange-600'
    }
  ];

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
      toast({
        title: "Video Uploaded",
        description: `${file.name} uploaded successfully!`,
      });
    } else {
      toast({
        title: "Error",
        description: "Please upload a valid video file.",
        variant: "destructive",
      });
    }
  };

  const handleVideoSplit = async () => {
    if (!uploadedVideo) {
      toast({
        title: "Error",
        description: "Please upload a video first.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setVideoProgress(0);

    // Simulate video processing
    const interval = setInterval(() => {
      setVideoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          // Generate mock segments
          const segments = Array.from({ length: 8 }, (_, i) => ({
            id: i + 1,
            startTime: i * 15,
            endTime: (i + 1) * 15,
            thumbnail: `/api/placeholder/160/90`,
            title: `Segment ${i + 1}`,
            duration: '00:15',
            score: Math.floor(Math.random() * 40) + 60
          }));
          
          setVideoSegments(segments);
          
          toast({
            title: "Video Split Complete",
            description: `Generated ${segments.length} short clips from your video!`,
          });
          
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

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
      post: "🚀 Revolutionizing the digital landscape with cutting-edge AI technology! Every pixel, every interaction, every moment crafted for maximum engagement. Join us on this incredible journey! #Innovation #AI #TechRevolution #DigitalTransformation",
      reel: "🎬 REEL SCRIPT:\nHook: \"This AI trick will blow your mind!\"\nContent: Show before/after transformation\nCTA: \"Follow for more AI secrets!\"\n\n📝 Caption: Mind = blown 🤯 This AI feature just changed everything! What should we automate next? #AIRevolution #TechTips",
      carousel: "📱 CAROUSEL POST (5 slides):\n\nSlide 1: \"5 AI Tools That Will Transform Your Business\"\nSlide 2: \"Tool 1: Content Generation → Save 10 hours/week\"\nSlide 3: \"Tool 2: Video Editing → Professional results instantly\"\nSlide 4: \"Tool 3: Analytics → Data-driven decisions\"\nSlide 5: \"Ready to transform? Link in bio! 🚀\"",
      story: "📱 STORY SEQUENCE:\n\n1. Behind-the-scenes of AI creation\n2. Poll: \"Which feature excites you most?\"\n3. Quick tip reveal\n4. Swipe up for full tutorial! ✨",
      caption: "✨ When innovation meets creativity, magic happens. This breakthrough represents countless hours of passion, dedication, and the relentless pursuit of excellence. #CreativeLife #Innovation #TechArt",
      hashtags: "#AI #ArtificialIntelligence #MachineLearning #TechInnovation #DigitalTransformation #Automation #FutureTech #Innovation #Technology #SmartSolutions #DeepLearning #DataScience #TechTrends #DigitalRevolution #AITools",
      'ad-copy': "🎯 Transform Your Content Strategy with AI\n\n✅ Generate viral content in seconds\n✅ Split long videos into engaging clips\n✅ 10x your engagement rates\n✅ Save 20+ hours per week\n\nJoin 50,000+ creators already winning with AI.\n\n👆 Start your free trial today!",
      bio: "🤖 AI Content Creator & Tech Innovator\n🚀 Helping creators scale with smart automation\n📊 50K+ creators transformed\n🎬 Video → Viral clips in 1 click\n👇 Free AI tools below"
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

  const exportSegment = (segment: any) => {
    toast({
      title: "Exporting...",
      description: `Exporting ${segment.title} in high quality.`,
    });
  };

  const selectSegment = (segmentId: number) => {
    setSelectedSegments(prev => 
      prev.includes(segmentId) 
        ? prev.filter(id => id !== segmentId)
        : [...prev, segmentId]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI Studio Pro
              </h1>
              <p className="text-gray-400 text-lg">Professional AI-powered content creation & video editing suite</p>
            </div>
          </div>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="dark-card border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">2,847</p>
                    <p className="text-sm text-gray-400">Content Generated</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark-card border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <Video className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">1,234</p>
                    <p className="text-sm text-gray-400">Videos Processed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark-card border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">95%</p>
                    <p className="text-sm text-gray-400">Engagement Boost</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="dark-card border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">156h</p>
                    <p className="text-sm text-gray-400">Time Saved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="content-generator" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 border-gray-800 mb-8">
            <TabsTrigger value="content-generator" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600">
              Content Generator
            </TabsTrigger>
            <TabsTrigger value="video-editor" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600">
              Video Editor
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600">
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-purple-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Content Generator Tab */}
          <TabsContent value="content-generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configuration Panel */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="dark-card border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-200 mb-2 block">AI Model</Label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {aiModels.map((model) => (
                            <SelectItem key={model.id} value={model.id} className="text-white hover:bg-gray-700">
                              <div className="flex items-center gap-2">
                                <span>{model.name}</span>
                                <Badge variant="outline" className="text-xs border-cyan-500 text-cyan-400">
                                  {model.badge}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-200 mb-2 block">Content Type</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {contentTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id} className="text-white hover:bg-gray-700">
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
                      <Label className="text-gray-200 mb-2 block">Platform</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {platforms.map((platform) => (
                            <SelectItem key={platform.id} value={platform.id} className="text-white hover:bg-gray-700">
                              {platform.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-200 mb-2 block">Tone</Label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {tones.map((tone) => (
                            <SelectItem key={tone} value={tone.toLowerCase()} className="text-white hover:bg-gray-700">
                              {tone}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-200 mb-3 block">Creativity: {creativity[0]}</Label>
                      <Slider
                        value={creativity}
                        onValueChange={setCreativity}
                        max={1}
                        min={0}
                        step={0.1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-gray-200 mb-3 block">Max Length: {maxLength[0]} chars</Label>
                      <Slider
                        value={maxLength}
                        onValueChange={setMaxLength}
                        max={2000}
                        min={50}
                        step={10}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Generation Panel */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="dark-card border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      AI Content Generator
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Describe what you want to create and let AI do the magic
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="text-gray-200 mb-2 block">Prompt</Label>
                      <Textarea
                        placeholder="Describe your content... e.g., 'Create an engaging Instagram reel about AI productivity tips with a hook that grabs attention in the first 3 seconds'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white min-h-[140px]"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        onClick={handleGenerate} 
                        disabled={isGenerating}
                        className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 flex-1"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate Content
                          </>
                        )}
                      </Button>
                      
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Content */}
                {generatedContent && (
                  <Card className="dark-card border-gray-800">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          Generated Content
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={copyToClipboard} className="border-gray-600 hover:bg-gray-800">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                            <Save className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 hover:bg-gray-800">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
                        <pre className="text-gray-200 whitespace-pre-wrap font-sans">{generatedContent}</pre>
                      </div>
                      
                      <div className="mt-6 flex flex-wrap gap-2">
                        <Badge className="bg-green-900/50 border-green-500/50 text-green-400">
                          Optimized for {platform}
                        </Badge>
                        <Badge className="bg-blue-900/50 border-blue-500/50 text-blue-400">
                          {tone} tone
                        </Badge>
                        <Badge className="bg-purple-900/50 border-purple-500/50 text-purple-400">
                          {generatedContent.length} characters
                        </Badge>
                        <Badge className="bg-orange-900/50 border-orange-500/50 text-orange-400">
                          {contentType} format
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Video Editor Tab */}
          <TabsContent value="video-editor" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upload Section */}
              <div className="lg:col-span-1">
                <Card className="dark-card border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Upload Video
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Video className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-300 mb-2">Click to upload video</p>
                      <p className="text-sm text-gray-500">MP4, MOV, AVI up to 2GB</p>
                    </div>
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    
                    {uploadedVideo && (
                      <div className="bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <Film className="w-8 h-8 text-cyan-400" />
                          <div className="flex-1">
                            <p className="text-white font-medium">{uploadedVideo.name}</p>
                            <p className="text-sm text-gray-400">
                              {(uploadedVideo.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Button 
                      onClick={handleVideoSplit}
                      disabled={!uploadedVideo || isProcessing}
                      className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Scissors className="w-4 h-4 mr-2" />
                          Split into Short Videos
                        </>
                      )}
                    </Button>
                    
                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Processing...</span>
                          <span className="text-cyan-400">{videoProgress}%</span>
                        </div>
                        <Progress value={videoProgress} className="h-2" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Video Segments */}
              <div className="lg:col-span-2">
                <Card className="dark-card border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Grid className="w-5 h-5" />
                        Video Segments ({videoSegments.length})
                      </span>
                      {selectedSegments.length > 0 && (
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <Download className="w-4 h-4 mr-2" />
                            Export Selected ({selectedSegments.length})
                          </Button>
                        </div>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {videoSegments.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {videoSegments.map((segment) => (
                          <div 
                            key={segment.id}
                            className={`bg-gray-800 rounded-lg p-4 border-2 transition-all cursor-pointer ${
                              selectedSegments.includes(segment.id) 
                                ? 'border-cyan-500 bg-cyan-900/20' 
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                            onClick={() => selectSegment(segment.id)}
                          >
                            <div className="aspect-video bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                              <Play className="w-8 h-8 text-gray-400" />
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h3 className="font-medium text-white">{segment.title}</h3>
                                <Badge 
                                  className={`${
                                    segment.score >= 80 ? 'bg-green-900/50 border-green-500/50 text-green-400' :
                                    segment.score >= 70 ? 'bg-yellow-900/50 border-yellow-500/50 text-yellow-400' :
                                    'bg-red-900/50 border-red-500/50 text-red-400'
                                  }`}
                                >
                                  {segment.score}% match
                                </Badge>
                              </div>
                              
                              <div className="flex justify-between text-sm text-gray-400">
                                <span>{segment.duration}</span>
                                <span>{segment.startTime}s - {segment.endTime}s</span>
                              </div>
                              
                              <div className="flex gap-2 mt-3">
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="flex-1 border-gray-600 hover:bg-gray-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    exportSegment(segment);
                                  }}
                                >
                                  <Download className="w-3 h-3 mr-1" />
                                  Export
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline" 
                                  className="border-gray-600 hover:bg-gray-700"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Video className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg mb-2">No video segments yet</p>
                        <p className="text-gray-500">Upload a video and click "Split into Short Videos" to get started</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="ai-tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoTools.map((tool) => (
                <Card key={tool.id} className="dark-card border-gray-800 hover:border-gray-600 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform`}>
                        <tool.icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-2">{tool.name}</h3>
                        <p className="text-sm text-gray-400 mb-4">{tool.description}</p>
                        <Button size="sm" className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="dark-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Engagement Rate</span>
                    <span className="text-green-400 font-semibold">+47%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Reach Improvement</span>
                    <span className="text-blue-400 font-semibold">+78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Time Saved</span>
                    <span className="text-purple-400 font-semibold">156 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Content Generated</span>
                    <span className="text-cyan-400 font-semibold">2,847 pieces</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Content Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Top Performing Type</span>
                    <span className="text-yellow-400 font-semibold">Reels</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Best Platform</span>
                    <span className="text-pink-400 font-semibold">Instagram</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Optimal Posting Time</span>
                    <span className="text-cyan-400 font-semibold">2-4 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Avg. Processing Time</span>
                    <span className="text-green-400 font-semibold">2.3 minutes</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark-card border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Model Accuracy</span>
                    <span className="text-green-400 font-semibold">94.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Processing Speed</span>
                    <span className="text-blue-400 font-semibold">3.2x faster</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-purple-400 font-semibold">97.8%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">User Satisfaction</span>
                    <span className="text-cyan-400 font-semibold">4.9/5</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIStudio;
