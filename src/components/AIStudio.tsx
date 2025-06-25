
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
import { useToast } from '@/hooks/use-toast';
import { generateDezgoImage } from '@/services/contentGenerationService';
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
  Eye,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { ContentGenerationService, type ContentGenerationParams } from '@/services/contentGenerationService';

const AIStudio = () => {
  const [activeTab, setActiveTab] = useState('content-gen');
  const [contentGenerationService] = useState(() => new ContentGenerationService());
  const { toast } = useToast();

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
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isImageGenerating, setIsImageGenerating] = useState(false);
  const [slideCount, setSlideCount] = useState(4); // Initialize slideCount here

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

  const handleGenerateImages = async () => {
    try {
      setIsImageGenerating(true);
      const allSlideLines = generatedContent
      .split('\n')
      .filter(line => line.trim().startsWith('**Slide'));

      const slidePrompts: string[] = [];

      for (let i = 0; i < slideCount; i++) {
        const line = allSlideLines[i] || '';
        const match = line.match(/^\*\*Slide\s*\d+:\*\*\s*(.*)/); // The improved regex
        const text = match && match[1] ? match[1].trim() : `Slide ${i + 1} visual for topic: ${prompt.slice(0, 50)}...`;

        // Add the cleaning logic here:
        let cleanText = text.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, ''); // Remove common emojis
        cleanText = cleanText.replace(/\s+/g, ' ').trim(); // Replace multiple spaces with single space

        slidePrompts.push(cleanText); // Push the cleaned text
      }

      const urls: string[] = [];

      for (const slidePrompt of slidePrompts) {
        // Add a check to ensure prompt is not empty or too short
        if (slidePrompt.length > 5) { // Basic check for meaningful prompt
          const blob = await generateDezgoImage(slidePrompt);
          const url = URL.createObjectURL(blob);
          urls.push(url);
        } else {
          console.warn(`Skipping image generation for short/empty prompt: "${slidePrompt}"`);
          urls.push('/placeholder.svg'); // Add a placeholder if prompt is bad
        }
      }

      setGeneratedImages(urls);
    } catch (error) {
      console.error('Image generation failed:', error);
      toast({
        title: "Image Generation Failed",
        description: "Could not generate images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsImageGenerating(false);
    }
  };

  const handleGenerateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationSuccess(false);

    try {
      const params: ContentGenerationParams = {
        prompt: prompt.trim(),
        contentType,
        platform,
        tone,
        creativity: creativity[0],
        maxLength: maxLength[0],
        slideCount: contentType === 'carousel' ? slideCount : undefined // Only include if content type is carousel
      };

      console.log('Starting content generation with params:', params);

      const result = await contentGenerationService.generateContent(params);

      setGeneratedContent(result.content);
      setCharacterCount(result.characterCount);
      setGenerationSuccess(true);

      toast({
        title: "Content Generated Successfully!",
        description: `Generated ${result.contentType} for ${result.platform} (${result.characterCount} characters)`,
      });

    } catch (error) {
      console.error('Failed to generate content:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setGeneratedContent(`Error: ${errorMessage}`);
      setGenerationSuccess(false);

      toast({
        title: "Generation Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setVideoFile(file);
        toast({
          title: "Video Uploaded",
          description: `${file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a valid video file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleVideoSplit = () => {
    if (!videoFile) {
      toast({
        title: "No Video Selected",
        description: "Please upload a video file first.",
        variant: "destructive",
      });
      return;
    }

    setVideoProcessing(true);
    setProcessingProgress(0);
    setGeneratedClips([]);

    // Simulate video processing with realistic progress
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setVideoProcessing(false);
          // Generate realistic clips
          const clips = [
            {
              id: 1,
              title: 'Opening Hook',
              duration: '0:15',
              thumbnail: '/placeholder.svg',
              description: 'Attention-grabbing opening segment'
            },
            {
              id: 2,
              title: 'Main Content',
              duration: '0:45',
              thumbnail: '/placeholder.svg',
              description: 'Core message and value delivery'
            },
            {
              id: 3,
              title: 'Call to Action',
              duration: '0:20',
              thumbnail: '/placeholder.svg',
              description: 'Engagement and next steps'
            }
          ];
          setGeneratedClips(clips);

          toast({
            title: "Video Processing Complete!",
            description: `Successfully generated ${clips.length} short clips from your video.`,
          });
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to Clipboard",
        description: "Content has been copied to your clipboard.",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy content to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadClip = (clip: any) => {
    toast({
      title: "Download Started",
      description: `Downloading ${clip.title}...`,
    });
    // In a real implementation, this would trigger the actual download
  };

  // Function to render content with formatting (e.g., bold, italic, strikethrough, inline code)
  const renderFormattedContent = (text: string) => {
    // Split by bold (**...**, __...__), italic (*...*, _..._), strikethrough (~~...~~), and inline code (`...`) markers
    // The order in regex matters: longer patterns (e.g., **) should be matched before shorter ones (e.g., *)
    const parts = text.split(/(\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_|~~.*?~~|`.*?`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        // Double asterisks for bold
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('__') && part.endsWith('__')) {
        // Double underscores for bold
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        // Single asterisks for italic (changed from bold to align with standard Markdown)
        return <em key={index}>{part.slice(1, -1)}</em>;
      } else if (part.startsWith('_') && part.endsWith('_')) {
        // Single underscores for italic
        return <em key={index}>{part.slice(1, -1)}</em>;
      } else if (part.startsWith('~~') && part.endsWith('~~')) {
        // Double tildes for strikethrough
        return <s key={index}>{part.slice(2, -2)}</s>;
      } else if (part.startsWith('`') && part.endsWith('`')) {
        // Backticks for inline code
        return <code key={index} className="bg-gray-700 text-yellow-300 px-1 py-0.5 rounded text-sm">{part.slice(1, -1)}</code>;
      }
      return part; // Render as plain text
    });
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
                      placeholder="Example: Create a post about sustainable living tips for beginners..."
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

                  {contentType === 'carousel' && (
                    <div className="mb-4 max-w-md">
                      <Label className="text-gray-200">Number of Slides</Label>
                      <Select value={String(slideCount)} onValueChange={(val) => setSlideCount(Number(val))}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {[...Array(9)].map((_, i) => (
                            <SelectItem key={i} value={String(i + 2)}>{i + 2}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}


                  <div>
                    <Label className="text-gray-200">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="aesthetic ">Aesthetic </SelectItem>
                        <SelectItem value="funny">Funny</SelectItem>
                        <SelectItem value="inspiring">Inspiring</SelectItem>
                        <SelectItem value="motivational ">Motivational </SelectItem>
                        <SelectItem value="reality">Real</SelectItem>
                        <SelectItem value="confident ">Confident </SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="friendly">Friendly</SelectItem>
                        <SelectItem value="sarcastic">Sarcastic</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="optimistic">Optimistic</SelectItem>
                        <SelectItem value="serious">Serious</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="humorous">Humorous</SelectItem>
                        <SelectItem value="informative">Informative</SelectItem>
                        <SelectItem value="persuasive">Persuasive</SelectItem>
                        <SelectItem value="hopeful">Hopeful</SelectItem>
                        <SelectItem value="humble">Humble</SelectItem>
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
                    {generationSuccess && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your AI-generated content will appear here
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedContent ? (
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-cyan-400">
                        <p className="text-white whitespace-pre-wrap">{renderFormattedContent(generatedContent)}</p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                          <span>Characters: {characterCount}/{maxLength[0]}</span>
                          <Badge variant={characterCount <= maxLength[0] ? "default" : "destructive"}>
                            {characterCount <= maxLength[0] ? "Within limit" : "Over limit"}
                          </Badge>
                        </div>
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
                            disabled={!prompt.trim() || isGenerating}
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <RefreshCw className="w-4 h-4 mr-1" />
                            Regenerate
                          </Button>
                        </div>
                      </div>
                      {/* {generatedContent && (
                        <Button onClick={handleGenerateImages} disabled={isImageGenerating} className="mt-4">
                          {isImageGenerating ? 'Generating Images...' : 'Generate Carousel Images'}
                        </Button>
                      )} */}

                      {generatedImages.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                          {generatedImages.map((url, idx) => (
                            <div key={idx} className="bg-gray-900 p-4 rounded">
                              <img src={url} alt={`Slide ${idx + 1}`} className="w-full h-auto rounded" />
                              <p className="text-center text-gray-400 mt-2">Slide {idx + 1}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                      <p className="mb-2">Enter a prompt and click "Generate Content" to get started</p>
                      <p className="text-sm text-gray-600">
                        Try: "Create an Instagram post about morning routines for productivity"
                      </p>
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
                            {videoFile ? videoFile.name : 'Click to upload video (MP4, MOV, AVI)'}
                          </p>
                          {videoFile && (
                            <p className="text-sm text-gray-600 mt-1">
                              Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                  </div>

                  {videoFile && (
                    <div className="space-y-4">
                      <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-purple-400">
                        <div className="flex items-center gap-3">
                          <Video className="w-6 h-6 text-purple-400" />
                          <div className="flex-1">
                            <p className="text-white font-medium">{videoFile.name}</p>
                            <p className="text-gray-400 text-sm">
                              Size: {(videoFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for processing
                            </p>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      </div>

                      {videoProcessing && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">Processing video...</span>
                            <span className="text-purple-400">{processingProgress}%</span>
                          </div>
                          <Progress value={processingProgress} className="bg-gray-800" />
                          <p className="text-xs text-gray-500">
                            {processingProgress < 30 && "Analyzing video content..."}
                            {processingProgress >= 30 && processingProgress < 60 && "Identifying key segments..."}
                            {processingProgress >= 60 && processingProgress < 90 && "Creating short clips..."}
                            {processingProgress >= 90 && "Finalizing clips..."}
                          </p>
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
                            Processing... {processingProgress}%
                          </>
                        ) : (
                          <>
                            <Scissors className="w-4 h-4 mr-2" />
                            Split into Short Clips
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
                    {generatedClips.length > 0 && (
                      <Badge className="bg-green-600">{generatedClips.length}</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Your AI-generated video clips ready for use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {generatedClips.length > 0 ? (
                    <div className="space-y-3">
                      {generatedClips.map((clip) => (
                        <div key={clip.id} className="bg-gray-800 p-4 rounded-lg border-l-4 border-green-400">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-12 bg-gray-700 rounded flex items-center justify-center">
                              <Play className="w-6 h-6 text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-medium">{clip.title}</p>
                              <p className="text-gray-400 text-sm">{clip.duration} • {clip.description}</p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => downloadClip(clip)}
                              className="border-gray-700 text-gray-300 hover:bg-gray-800"
                            >
                              <Download className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-gray-800">
                        <p className="text-sm text-green-400 text-center">
                          ✅ All clips generated successfully! Ready for download and use.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Video className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                      <p className="mb-2">Upload and process a video to see generated clips</p>
                      <p className="text-sm text-gray-600">
                        Supported formats: MP4, MOV, AVI • Max size: 100MB
                      </p>
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
                { title: 'Caption Generator', icon: FileText, color: 'cyan', description: 'Generate engaging captions for your posts', action: () => toast({ title: "Caption Generator", description: "Coming soon! This will generate captions for your images." }) },
                { title: 'Hashtag Research', icon: Target, color: 'purple', description: 'Find trending hashtags for maximum reach', action: () => toast({ title: "Hashtag Research", description: "Coming soon! This will find the best hashtags for your content." }) },
                { title: 'Content Optimizer', icon: TrendingUp, color: 'green', description: 'Optimize your content for better engagement', action: () => toast({ title: "Content Optimizer", description: "Coming soon! This will analyze and optimize your content." }) },
                { title: 'Trend Analysis', icon: BarChart3, color: 'pink', description: 'Analyze current trends in your niche', action: () => toast({ title: "Trend Analysis", description: "Coming soon! This will show you trending topics in your industry." }) },
                { title: 'Competitor Analysis', icon: Users, color: 'orange', description: 'Analyze your competitors\' strategies', action: () => toast({ title: "Competitor Analysis", description: "Coming soon! This will analyze your competitors' content strategies." }) },
                { title: 'Content Calendar', icon: Clock, color: 'blue', description: 'Plan and schedule your content', action: () => toast({ title: "Content Calendar", description: "Coming soon! This will help you plan your content schedule." }) }
              ].map((tool, index) => (
                <Card key={index} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-${tool.color}-600/20 flex items-center justify-center mb-4`}>
                      <tool.icon className={`w-6 h-6 text-${tool.color}-400`} />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{tool.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{tool.description}</p>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={tool.action}
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
                      <p className="text-xs text-green-400 mt-1">+12 this month</p>
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
                      <p className="text-xs text-green-400 mt-1">+8.2% this week</p>
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
                      <p className="text-xs text-green-400 mt-1">+1.2% this week</p>
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
                      <p className="text-xs text-green-400 mt-1">+{analyticsData.growth}% growth</p>
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
                    <p className="mb-2">Analytics chart will be displayed here</p>
                    <p className="text-sm text-gray-600">Connect your social media accounts to see detailed analytics</p>
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
