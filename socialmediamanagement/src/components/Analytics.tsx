
import React from 'react';
import { TrendingUp, Users, Eye, Heart, MessageSquare, Share2, Download, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  const metrics = [
    {
      title: 'Total Reach',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      description: 'People reached this month'
    },
    {
      title: 'Engagement Rate',
      value: '4.8%',
      change: '+2.1%',
      trend: 'up',
      icon: Heart,
      description: 'Average across all platforms'
    },
    {
      title: 'New Followers',
      value: '12.3K',
      change: '+8.7%',
      trend: 'up',
      icon: Users,
      description: 'Growth this month'
    },
    {
      title: 'Total Interactions',
      value: '89.2K',
      change: '+15.3%',
      trend: 'up',
      icon: MessageSquare,
      description: 'Likes, comments, shares'
    }
  ];

  const platformMetrics = [
    {
      platform: 'LinkedIn',
      followers: '45.2K',
      engagement: '6.2%',
      reach: '850K',
      posts: 23,
      color: 'bg-blue-500',
      growth: '+15%'
    },
    {
      platform: 'Instagram',
      followers: '32.8K',
      engagement: '4.5%',
      reach: '680K',
      posts: 31,
      color: 'bg-pink-500',
      growth: '+22%'
    },
    {
      platform: 'Twitter',
      followers: '28.1K',
      engagement: '3.8%',
      reach: '520K',
      posts: 45,
      color: 'bg-sky-500',
      growth: '+8%'
    },
    {
      platform: 'Facebook',
      followers: '18.5K',
      engagement: '2.9%',
      reach: '390K',
      posts: 18,
      color: 'bg-indigo-500',
      growth: '+12%'
    }
  ];

  const topPosts = [
    {
      id: 1,
      content: 'The future of AI in social media automation is here...',
      platform: 'LinkedIn',
      engagement: '2.4K',
      reach: '85K',
      date: '2024-01-10'
    },
    {
      id: 2,
      content: 'Behind the scenes: Building our AI algorithm 🤖',
      platform: 'Instagram',
      engagement: '1.8K',
      reach: '62K',
      date: '2024-01-08'
    },
    {
      id: 3,
      content: 'Thread: 10 social media automation tips that actually work',
      platform: 'Twitter',
      engagement: '1.2K',
      reach: '45K',
      date: '2024-01-05'
    }
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics</h1>
          <p className="text-muted-foreground">Track your social media performance across all platforms</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-border hover:border-cyan-500">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="glass border-border/50 hover:border-cyan-500/30 transition-all duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <Icon className="h-4 w-4 text-cyan-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{metric.value}</div>
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400">{metric.change}</span>
                  <span className="text-muted-foreground ml-1">vs last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{metric.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Performance */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Share2 className="w-5 h-5 mr-2 text-cyan-400" />
              Platform Performance
            </CardTitle>
            <CardDescription>Breakdown by social media platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {platformMetrics.map((platform, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${platform.color}`} />
                    <span className="font-medium">{platform.platform}</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {platform.growth}
                  </Badge>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Followers</p>
                    <p className="font-medium">{platform.followers}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Engagement</p>
                    <p className="font-medium">{platform.engagement}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Reach</p>
                    <p className="font-medium">{platform.reach}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Posts</p>
                    <p className="font-medium">{platform.posts}</p>
                  </div>
                </div>
                <Progress value={60 + index * 10} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Top Performing Posts */}
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-cyan-400" />
              Top Performing Posts
            </CardTitle>
            <CardDescription>Your best content this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={post.id} className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-cyan-400">#{index + 1}</span>
                    <Badge variant="outline" className={
                      post.platform === 'LinkedIn' ? 'border-blue-500/30 text-blue-400' :
                      post.platform === 'Instagram' ? 'border-pink-500/30 text-pink-400' :
                      'border-sky-500/30 text-sky-400'
                    }>
                      {post.platform}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <p className="text-sm mb-3 line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-muted-foreground">
                      <Heart className="w-4 h-4 mr-1" />
                      {post.engagement}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Eye className="w-4 h-4 mr-1" />
                      {post.reach}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Engagement Trends Chart */}
      <Card className="glass border-border/50">
        <CardHeader>
          <CardTitle>Engagement Trends</CardTitle>
          <CardDescription>Daily engagement over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {/* Simplified chart representation */}
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm flex-1 opacity-70 hover:opacity-100 transition-opacity"
                style={{ height: `${Math.random() * 80 + 20}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-4">
            <span>30 days ago</span>
            <span>15 days ago</span>
            <span>Today</span>
          </div>
        </CardContent>
      </Card>

      {/* Audience Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { country: 'United States', percentage: 45 },
              { country: 'United Kingdom', percentage: 18 },
              { country: 'Canada', percentage: 12 },
              { country: 'Australia', percentage: 8 },
              { country: 'Germany', percentage: 7 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.country}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={item.percentage} className="w-20 h-2" />
                  <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Age Groups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { age: '18-24', percentage: 22 },
              { age: '25-34', percentage: 38 },
              { age: '35-44', percentage: 25 },
              { age: '45-54', percentage: 12 },
              { age: '55+', percentage: 3 }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.age}</span>
                <div className="flex items-center space-x-2">
                  <Progress value={item.percentage} className="w-20 h-2" />
                  <span className="text-sm text-muted-foreground w-8">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-border/50">
          <CardHeader>
            <CardTitle>Best Posting Times</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { time: '9:00 AM', engagement: '12.5%' },
              { time: '1:00 PM', engagement: '10.8%' },
              { time: '5:00 PM', engagement: '9.2%' },
              { time: '8:00 PM', engagement: '7.5%' },
              { time: '11:00 AM', engagement: '6.8%' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{item.time}</span>
                <span className="text-sm font-medium text-cyan-400">{item.engagement}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
