
import React, { useState } from 'react';
import { ArrowLeft, Upload, Image, Calendar, Globe, Users, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface PostUploadProps {
  onBack: () => void;
}

interface PostData {
  content: string;
  platforms: string[];
  scheduledTime: string;
  images: File[];
}

const PostUpload = ({ onBack }: PostUploadProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [postContent, setPostContent] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const platforms = [
    { id: 'instagram', name: 'Instagram', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' },
    { id: 'facebook', name: 'Facebook', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'twitter', name: 'Twitter', color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
    { id: 'linkedin', name: 'LinkedIn', color: 'bg-blue-600/20 text-blue-300 border-blue-600/30' },
    { id: 'tiktok', name: 'TikTok', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'youtube', name: 'YouTube', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  ];

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(id => id !== platformId)
        : [...prev, platformId]
    );
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    const validFiles = Array.from(files).filter(file => {
      const isImage = file.type.startsWith('image/');
      const isUnder10MB = file.size <= 10 * 1024 * 1024; // 10MB limit
      
      if (!isImage) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file`,
          variant: "destructive",
        });
      }
      
      if (!isUnder10MB) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
      }
      
      return isImage && isUnder10MB;
    });

    if (selectedImages.length + validFiles.length > 10) {
      toast({
        title: "Too many files",
        description: "Maximum 10 images allowed per post",
        variant: "destructive",
      });
      return;
    }

    setSelectedImages(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      toast({
        title: "Images uploaded",
        description: `${validFiles.length} image(s) added successfully`,
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const validatePost = (): boolean => {
    if (!postContent.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your post",
        variant: "destructive",
      });
      return false;
    }

    if (selectedPlatforms.length === 0) {
      toast({
        title: "Platform required",
        description: "Please select at least one platform",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const createPost = async (postData: PostData, publishNow: boolean = false) => {
    if (!validatePost()) return;

    setIsUploading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(publishNow ? 'Publishing post now:' : 'Scheduling post:', postData);
      
      toast({
        title: publishNow ? "Post published!" : "Post scheduled!",
        description: publishNow 
          ? `Your post has been published to ${postData.platforms.length} platform(s)`
          : `Your post has been scheduled for ${new Date(postData.scheduledTime).toLocaleString()}`,
      });
      
      // Reset form and go back
      setPostContent('');
      setSelectedPlatforms([]);
      setScheduledTime('');
      setSelectedImages([]);
      onBack();
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process your post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSchedulePost = () => {
    if (!scheduledTime) {
      toast({
        title: "Schedule time required",
        description: "Please select a date and time for scheduling",
        variant: "destructive",
      });
      return;
    }

    const postData: PostData = {
      content: postContent,
      platforms: selectedPlatforms,
      scheduledTime,
      images: selectedImages
    };

    createPost(postData, false);
  };

  const handlePublishNow = () => {
    const postData: PostData = {
      content: postContent,
      platforms: selectedPlatforms,
      scheduledTime: '',
      images: selectedImages
    };

    createPost(postData, true);
  };

  const saveDraft = () => {
    const draftData = {
      content: postContent,
      platforms: selectedPlatforms,
      scheduledTime,
      images: selectedImages.map(img => img.name) // Save just names for demo
    };
    
    localStorage.setItem('post_draft', JSON.stringify(draftData));
    
    toast({
      title: "Draft saved",
      description: "Your post has been saved as a draft",
    });
    
    onBack();
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="hover:bg-muted/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">Compose and schedule your content across platforms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Post Content */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2 text-cyan-400" />
                Post Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="What's on your mind? Share your thoughts..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-32 bg-muted/30 border-muted focus:border-cyan-500 resize-none"
                maxLength={2200}
              />
              
              {/* Character Count */}
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>Characters: {postContent.length}/2200</span>
                <span className="text-cyan-400">✨ AI suggestions available</span>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="w-5 h-5 mr-2 text-cyan-400" />
                Media ({selectedImages.length}/10)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive 
                      ? 'border-cyan-500 bg-cyan-500/10' 
                      : 'border-muted hover:border-cyan-500/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-2">Drag and drop your images here</p>
                  <p className="text-sm text-muted-foreground mb-4">or</p>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="hidden"
                    />
                    <Button variant="outline" className="border-cyan-500/30 hover:border-cyan-500">
                      Browse Files
                    </Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supports: JPG, PNG, GIF, WebP (Max: 10MB each, 10 files total)
                  </p>
                </div>

                {/* Selected Images */}
                {selectedImages.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-muted/50 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1 truncate">
                          {image.name}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Platform Selection */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-cyan-400" />
                Platforms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                {platforms.map((platform) => (
                  <Badge
                    key={platform.id}
                    variant="outline"
                    className={`cursor-pointer p-2 justify-center transition-all ${
                      selectedPlatforms.includes(platform.id)
                        ? platform.color
                        : 'bg-muted/30 text-muted-foreground border-muted hover:border-cyan-500/30'
                    }`}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    {platform.name}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Selected: {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
              </p>
            </CardContent>
          </Card>

          {/* Scheduling */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-cyan-400" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Schedule for later</label>
                <Input
                  type="datetime-local"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="bg-muted/30 border-muted focus:border-cyan-500"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                <Zap className="w-3 h-3 inline mr-1" />
                Best time to post: Today at 2:00 PM
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handlePublishNow}
              className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
              disabled={!postContent.trim() || selectedPlatforms.length === 0 || isUploading}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  Publish Now
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleSchedulePost}
              variant="outline"
              className="w-full border-cyan-500/30 hover:border-cyan-500"
              disabled={!postContent.trim() || selectedPlatforms.length === 0 || !scheduledTime || isUploading}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Post
            </Button>
            
            <Button 
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={saveDraft}
              disabled={isUploading}
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostUpload;
