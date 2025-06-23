
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wand2, 
  Video, 
  Image, 
  FileText, 
  BarChart3, 
  Clock, 
  Target, 
  Sparkles,
  Upload,
  Play,
  Scissors,
  Download,
  Copy,
  RefreshCw,
  TrendingUp,
  Users,
  Heart,
  MessageCircle,
  Share,
  Eye
} from 'lucide-react';
import { ContentGenerationService, type ContentGenerationParams } from '@/services/contentGenerationService';

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState('content-gen');
  const [contentGenerationService] = useState(() => new ContentGenerationService());
  
  // Content Generation State
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState('post');
  const [platform, setPlatform] = useState('instagram');
  const [tone, setTone] = useState('professional');
  const [creativity, setCreativity] = useState([0.7]);
  const [maxLength, setMaxLength] = useState([280]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);

  // Video Processing State
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoProcessing, setVideoProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [generatedClips, setGeneratedClips] = useState<any[]>([]);

  // Analytics State
  const [analyticsData] = useState({
    totalPosts: 156,
    totalReach: 45230,
    engagement: 8.7,
    followers: 12450,
    growth: 15.3
  });

  const handleGenerateContent = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      const params: ContentGenerationParams = {
        prompt,
        contentType,
        platform,
        tone,
        creativity: creativity[0],
        maxLength: maxLength[0]
      };

      const result = await contentGenerationService.generateContent(params);
      setGeneratedContent(result.content);
      setCharacterCount(result.characterCount);
    } catch (error) {
      console.error('Failed to generate content:', error);
      setGeneratedContent('Failed to generate content. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      console.log('Video uploaded:', file.name);
    }
  };

  const handleVideoSplit = () => {
    if (!videoFile) return;
    
    setVideoProcessing(true);
    setProcessingProgress(0);
    
    // Simulate video processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setVideoProcessing(false);
          // Simulate generated clips
          setGeneratedClips([
            { id: 1, title: 'Clip 1: Introduction', duration: '0:30', thumbnail: '/placeholder.svg' },
            { id: 2, title: 'Clip 2: Main Content', duration: '0:45', thumbnail: '/placeholder.svg' },
            { id: 3, title: 'Clip 3: Call to Action', duration: '0:25', thumbnail: '/placeholder.svg' }
          ]);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Content copied to clipboard');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            AI Content Studio
          </h1>
          <p className="text-gray-400 text-lg">
            Create, optimize, and analyze your content with the power of AI
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full bg-gray-900 border-gray-800">
            <TabsTrigger value="content-gen" className="data-[state=active]:bg-cyan-600">
              <Wand2 className="w-4 h-4 mr-2" />
              Content Generation
            </TabsTrigger>
            <TabsTrigger value="video-tools" className="data-[state=active]:bg-purple-600">
              <Video className="w-4 h-4 mr-2" />
              Video Tools
            </TabsTrigger>
            <TabsTrigger value="ai-tools" className="data-[state=active]:bg-pink-600">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Tools
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-green-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Content Generation Tab */}
          <TabsContent value="content-gen" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Wand2 className="w-5 h-5 text-cyan-400" />
                    Prompt to Content
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Generate engaging content from your ideas using AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-200">Content Prompt</Label>
                    <Textarea
                      placeholder="Describe what content you want to create..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white mt-2"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-200">Platform</Label>
                      <Select value={platform} onValueChange={setPlatform}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-gray-200">Content Type</Label>
                      <Select value={contentType} onValueChange={setContentType}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="post">Post</SelectItem>
                          <SelectItem value="reel">Reel</SelectItem>
                          <SelectItem value="carousel">Carousel</SelectItem>
                          <SelectItem value="story">Story</SelectItem>
                          <SelectItem value="caption">Caption</SelectItem>
                          <SelectItem value="hashtags">Hashtags</SelectItem>
                          <SelectItem value="ad-copy">Ad Copy</SelectItem>
                          <SelectItem value="bio">Bio</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-200">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="inspiring">Inspiring</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-200">Creativity Level: {creativity[0]}</Label>
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
                    <Label className="text-gray-200">Max Length: {maxLength[0]} characters</Label>
                    <Slider
                      value={maxLength}
                      onValueChange={setMaxLength}
                      max={2000}
                      min={50}
                      step={10}
                      className="mt-2"
                    />
                  </div>

                  <Button 
                    onClick={handleGenerateContent}
                    disabled={!prompt.trim() || isGenerating}
                    className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate Content
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-green-400" />
                    Generated Content
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your AI-generated content will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedContent ? (
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <p className="text-white whitespace-pre-wrap">{generatedContent}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Characters: {characterCount}</span>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(generatedContent)}
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleGenerateContent}
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                      <p>Enter a prompt and click "Generate Content" to get started</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Video Tools Tab */}
          <TabsContent value="video-tools" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Scissors className="w-5 h-5 text-purple-400" />
                    Video Splitter
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Split long-form videos into engaging short clips
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-200">Upload Video</Label>
                    <div className="mt-2">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                        id="video-upload"
                      />
                      <label
                        htmlFor="video-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-700 rounded-lg cursor-pointer hover:border-purple-500 transition-colors"
                      >
                        <div className="text-center">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                          <p className="text-gray-500">
                            {videoFile ? videoFile.name : 'Click to upload video'}
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {videoFile && (
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Video className="w-6 h-6 text-purple-400" />
                          <div>
                            <p className="text-white font-medium">{videoFile.name}</p>
                            <p className="text-gray-400 text-sm">
                              Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                      </div>

                      {videoProcessing && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Processing video...</span>
                            <span className="text-purple-400">{processingProgress}%</span>
                          </div>
                          <Progress value={processingProgress} className="bg-gray-800" />
                        </div>
                      )}

                      <Button
                        onClick={handleVideoSplit}
                        disabled={videoProcessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        {videoProcessing ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Scissors className="w-4 h-4 mr-2" />
                            Split into Shorts
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Play className="w-5 h-5 text-green-400" />
                    Generated Clips
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your AI-generated video clips
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedClips.length > 0 ? (
                    <div className="space-y-3">
                      {generatedClips.map((clip) => (
                        <div key={clip.id} className="bg-gray-800 p-4 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{clip.title}</p>
                              <p className="text-gray-400 text-sm">{clip.duration}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-700 text-gray-300 hover:bg-gray-800"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Video className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                      <p>Upload and process a video to see generated clips</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Tools Tab */}
          <TabsContent value="ai-tools" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Caption Generator', icon: FileText, color: 'cyan', description: 'Generate engaging captions for your posts' },
                { title: 'Hashtag Research', icon: Target, color: 'purple', description: 'Find trending hashtags for maximum reach' },
                { title: 'Content Optimizer', icon: TrendingUp, color: 'green', description: 'Optimize your content for better engagement' },
                { title: 'Trend Analysis', icon: BarChart3, color: 'pink', description: 'Analyze current trends in your niche' },
                { title: 'Competitor Analysis', icon: Users, color: 'orange', description: 'Analyze your competitors\' strategies' },
                { title: 'Content Calendar', icon: Clock, color: 'blue', description: 'Plan and schedule your content' }
              ].map((tool, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-${tool.color}-600/20 flex items-center justify-center mb-4`}>
                      <tool.icon className={`w-6 h-6 text-${tool.color}-400`} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-400 text-sm">{tool.description}</p>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => console.log(`${tool.title} clicked`)}
                    >
                      Launch Tool
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Posts</p>
                      <p className="text-2xl font-bold text-white">{analyticsData.totalPosts}</p>
                    </div>
                    <FileText className="w-8 h-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Total Reach</p>
                      <p className="text-2xl font-bold text-white">{analyticsData.totalReach.toLocaleString()}</p>
                    </div>
                    <Eye className="w-8 h-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Engagement Rate</p>
                      <p className="text-2xl font-bold text-white">{analyticsData.engagement}%</p>
                    </div>
                    <Heart className="w-8 h-8 text-pink-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Followers</p>
                      <p className="text-2xl font-bold text-white">{analyticsData.followers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Performance Overview</CardTitle>
                <CardDescription className="text-gray-400">
                  Your content performance metrics over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p>Analytics chart will be displayed here</p>
                  </div>
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
