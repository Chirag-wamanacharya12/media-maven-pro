
import React from 'react';
import { TrendingUp, Users, MessageSquare, BarChart, Eye, Heart, Share2, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-400'
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+2.1%',
      icon: Heart,
      color: 'text-pink-400'
    },
    {
      title: 'Posts This Week',
      value: '47',
      change: '+8',
      icon: Share2,
      color: 'text-cyan-400'
    },
    {
      title: 'Revenue Generated',
      value: '$12.8K',
      change: '+18.2%',
      icon: DollarSign,
      color: 'text-green-400'
    }
  ];

  const recentPosts = [
    {
      id: 1,
      content: 'Just launched our new AI-powered content strategy! 🚀',
      platform: 'LinkedIn',
      engagement: '2.4K',
      status: 'published',
      time: '2 hours ago'
    },
    {
      id: 2,
      content: 'Behind the scenes: Building the future of social media automation',
      platform: 'Instagram',
      engagement: '1.8K',
      status: 'scheduled',
      time: 'Tomorrow 2:00 PM'
    },
    {
      id: 3,
      content: 'Thread: 10 essential tips for growing your personal brand online',
      platform: 'X (Twitter)',
      engagement: '894',
      status: 'published',
      time: '5 hours ago'
    }
  ];

  const topClients = [
    { name: 'TechCorp Inc.', posts: 23, engagement: '12.4K', growth: '+15%' },
    { name: 'Fashion Forward', posts: 18, engagement: '8.7K', growth: '+22%' },
    { name: 'Startup Studio', posts: 15, engagement: '6.2K', growth: '+8%' }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Good morning, Sarah! 👋</h1>
        <p className="text-muted-foreground">Here's what's happening with your social media presence today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass border-border/50 hover:border-cyan-500/30 transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">{stat.change}</span>
                  <span className="text-muted-foreground ml-1">from last week</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Posts */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-cyan-400" />
              Recent Posts
            </CardTitle>
            <CardDescription>Your latest content performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{post.content}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <Badge variant="outline" className="text-xs">{post.platform}</Badge>
                    <span className="text-xs text-muted-foreground">{post.time}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-cyan-400">{post.engagement}</p>
                  <Badge 
                    className={`text-xs ${post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}
                  >
                    {post.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Clients */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-cyan-400" />
              Top Performing Clients
            </CardTitle>
            <CardDescription>This month's client performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topClients.map((client, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">{client.posts} posts</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-cyan-400">{client.engagement}</p>
                    <p className="text-sm text-green-400">{client.growth}</p>
                  </div>
                </div>
                <Progress value={75 + index * 5} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to get you started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition-all cursor-pointer">
              <Share2 className="w-8 h-8 text-cyan-400 mb-2" />
              <h3 className="font-medium mb-1">Schedule Post</h3>
              <p className="text-sm text-muted-foreground">Create and schedule new content</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all cursor-pointer">
              <BarChart className="w-8 h-8 text-pink-400 mb-2" />
              <h3 className="font-medium mb-1">View Analytics</h3>
              <p className="text-sm text-muted-foreground">Check your performance metrics</p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40 transition-all cursor-pointer">
              <MessageSquare className="w-8 h-8 text-green-400 mb-2" />
              <h3 className="font-medium mb-1">Manage Inbox</h3>
              <p className="text-sm text-muted-foreground">Respond to messages and comments</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
