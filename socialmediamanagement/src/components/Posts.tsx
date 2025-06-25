import React, { useState } from 'react';
import { Plus, Filter, Search, MoreHorizontal, Calendar, Eye, Heart, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostUpload from './PostUpload';

const Posts = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showUpload, setShowUpload] = useState(false);

  const posts = [
    {
      id: 1,
      content: 'Excited to share our latest AI breakthrough! Our new algorithm can now predict optimal posting times with 94% accuracy. 🚀 #AI #SocialMedia #Innovation',
      platforms: ['LinkedIn', 'Twitter', 'Facebook'],
      status: 'published',
      scheduledTime: '2024-01-15 14:30',
      engagement: { views: 12400, likes: 348, comments: 67, shares: 23 },
      image: '/placeholder.svg'
    },
    {
      id: 2,
      content: 'Behind the scenes: Building the next generation of social media automation tools. What features would you love to see? 💭',
      platforms: ['Instagram', 'TikTok'],
      status: 'scheduled',
      scheduledTime: '2024-01-16 18:00',
      engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
      image: '/placeholder.svg'
    },
    {
      id: 3,
      content: 'Just published a comprehensive guide on social media ROI measurement. Link in bio! 📊',
      platforms: ['LinkedIn', 'Twitter'],
      status: 'draft',
      scheduledTime: null,
      engagement: { views: 0, likes: 0, comments: 0, shares: 0 },
      image: null
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'scheduled': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Twitter': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'Instagram': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Facebook': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      case 'TikTok': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (showUpload) {
    return <PostUpload onBack={() => setShowUpload(false)} />;
  }

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Posts</h1>
          <p className="text-muted-foreground">Manage your content across all platforms</p>
        </div>
        <Button 
          onClick={() => setShowUpload(true)}
          className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Post
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search posts..."
            className="pl-10 bg-muted/50 border-muted focus:border-cyan-500"
          />
        </div>
        <Button variant="outline" className="border-border hover:border-cyan-500">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30">
          <TabsTrigger value="all">All Posts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {posts.map((post) => (
              <Card key={post.id} className="glass border-border/50 hover:border-cyan-500/30 transition-all duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        {post.scheduledTime && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(post.scheduledTime).toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.platforms.map((platform) => (
                          <Badge key={platform} variant="outline" className={getPlatformColor(platform)}>
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    {post.image && (
                      <div className="w-20 h-20 bg-muted/50 rounded-lg flex-shrink-0"></div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm mb-4 line-clamp-3">{post.content}</p>
                      
                      {post.status === 'published' && (
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {post.engagement.views.toLocaleString()}
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {post.engagement.likes}
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {post.engagement.comments}
                          </div>
                          <div className="flex items-center">
                            <Share2 className="w-4 h-4 mr-1" />
                            {post.engagement.shares}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Published posts will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="scheduled">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Scheduled posts will appear here</p>
          </div>
        </TabsContent>

        <TabsContent value="drafts">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Draft posts will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Posts;
