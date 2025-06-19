import React, { useState } from 'react';
import { Search, Filter, Star, MessageSquare, AtSign, Heart, MoreHorizontal, Reply } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Inbox = () => {
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);

  const messages = [
    {
      id: 1,
      type: 'comment',
      platform: 'LinkedIn',
      author: 'Alex Johnson',
      avatar: '/placeholder.svg',
      content: 'This is exactly what we needed! When will the beta be available?',
      post: 'AI-powered social media automation...',
      time: '2 minutes ago',
      sentiment: 'positive',
      priority: 'high',
      unread: true
    },
    {
      id: 2,
      type: 'mention',
      platform: 'Twitter',
      author: 'Sarah Kim',
      avatar: '/placeholder.svg',
      content: 'Love what @SocialAI is building! Game changer for content creators 🚀',
      post: null,
      time: '15 minutes ago',
      sentiment: 'positive',
      priority: 'medium',
      unread: true
    },
    {
      id: 3,
      type: 'dm',
      platform: 'Instagram',
      author: 'Mike Chen',
      avatar: '/placeholder.svg',
      content: 'Hi! I saw your post about social media automation. Would love to discuss a potential partnership.',
      post: null,
      time: '1 hour ago',
      sentiment: 'neutral',
      priority: 'high',
      unread: false
    },
    {
      id: 4,
      type: 'comment',
      platform: 'Facebook',
      author: 'Emma Wilson',
      avatar: '/placeholder.svg',
      content: 'Not sure about this... seems too complicated for small businesses.',
      post: 'New features announcement...',
      time: '2 hours ago',
      sentiment: 'negative',
      priority: 'medium',
      unread: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'comment': return MessageSquare;
      case 'mention': return AtSign;
      case 'dm': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-400';
      case 'negative': return 'text-red-400';
      case 'neutral': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'LinkedIn': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Twitter': return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
      case 'Instagram': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      case 'Facebook': return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inbox</h1>
          <p className="text-muted-foreground">Manage all your social media conversations in one place</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            {messages.filter(m => m.unread).length} unread
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search conversations..."
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
          <TabsTrigger value="all">All Messages</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="dms">Direct Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Message List */}
            <div className="space-y-3">
              {messages.map((message) => {
                const TypeIcon = getTypeIcon(message.type);
                return (
                  <Card 
                    key={message.id} 
                    className={`glass border-border/50 hover:border-cyan-500/30 transition-all duration-200 cursor-pointer ${
                      selectedMessage === message.id ? 'border-cyan-500/50 bg-cyan-500/5' : ''
                    } ${message.unread ? 'border-l-4 border-l-cyan-400' : ''}`}
                    onClick={() => setSelectedMessage(message.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={message.avatar} alt={message.author} />
                          <AvatarFallback>{message.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{message.author}</span>
                              <Badge variant="outline" className={getPlatformColor(message.platform)}>
                                {message.platform}
                              </Badge>
                              <TypeIcon className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Heart className={`w-4 h-4 ${getSentimentColor(message.sentiment)}`} />
                              <span className="text-xs text-muted-foreground">{message.time}</span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-foreground mb-2 line-clamp-2">{message.content}</p>
                          
                          {message.post && (
                            <p className="text-xs text-muted-foreground italic">Reply to: {message.post}</p>
                          )}
                          
                          <div className="flex items-center justify-between mt-3">
                            <Badge 
                              className={message.priority === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}
                            >
                              {message.priority} priority
                            </Badge>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="ghost">
                                <Star className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Message Detail */}
            <Card className="glass border-border/50 lg:sticky lg:top-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
                  Conversation Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedMessage ? (
                  <div className="space-y-4">
                    {(() => {
                      const message = messages.find(m => m.id === selectedMessage);
                      if (!message) return null;
                      
                      return (
                        <>
                          <div className="flex items-start space-x-3">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={message.avatar} alt={message.author} />
                              <AvatarFallback>{message.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="font-medium">{message.author}</span>
                                <Badge variant="outline" className={getPlatformColor(message.platform)}>
                                  {message.platform}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{message.time}</p>
                            </div>
                          </div>
                          
                          <div className="bg-muted/30 p-3 rounded-lg">
                            <p className="text-sm">{message.content}</p>
                          </div>
                          
                          {message.post && (
                            <div className="bg-muted/20 p-3 rounded-lg border-l-4 border-cyan-400">
                              <p className="text-xs text-muted-foreground mb-1">Original post:</p>
                              <p className="text-sm">{message.post}</p>
                            </div>
                          )}
                          
                          <div className="space-y-3">
                            <Input 
                              placeholder="Type your reply..." 
                              className="bg-muted/50 border-muted focus:border-cyan-500"
                            />
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">Save Template</Button>
                                <Button size="sm" variant="outline">AI Suggest</Button>
                              </div>
                              <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                                <Reply className="w-4 h-4 mr-2" />
                                Reply
                              </Button>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Select a message to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Other tab contents would be similar filtered views */}
        <TabsContent value="comments">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Comments will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="mentions">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Mentions will appear here</p>
          </div>
        </TabsContent>
        
        <TabsContent value="dms">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Direct messages will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inbox;
