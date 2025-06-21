
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Settings, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink,
  Trash2,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import IntegrationSettings from './IntegrationSettings';

interface ConnectedAccount {
  username: string;
  connectedAt: string;
  posts: string;
  followers: string;
}

interface Platform {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  status: 'connected' | 'disconnected' | 'pending' | 'failed';
  connectedAccount?: ConnectedAccount;
  pendingAccount?: string;
}

const initialPlatforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Share photos and stories with your audience',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    status: 'connected',
    connectedAccount: {
      username: '@socialbrand',
      connectedAt: '2024-01-15',
      posts: '234',
      followers: '12.5K'
    }
  },
  {
    id: 'twitter',
    name: 'Twitter',
    description: 'Share thoughts and engage in real-time conversations',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    color: 'bg-blue-500',
    status: 'pending',
    pendingAccount: '@mybrand'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Connect with friends and share your story',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'bg-blue-600',
    status: 'disconnected'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    description: 'Build professional relationships and grow your network',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: 'bg-blue-700',
    status: 'connected',
    connectedAccount: {
      username: 'Professional Brand',
      connectedAt: '2024-01-10',
      posts: '89',
      followers: '3.2K'
    }
  },
  {
    id: 'youtube',
    name: 'YouTube',
    description: 'Share videos and build your subscriber base',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: 'bg-red-600',
    status: 'failed'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Create short-form videos and reach younger audiences',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    color: 'bg-black',
    status: 'disconnected'
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    description: 'Share visual content and drive traffic to your website',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
      </svg>
    ),
    color: 'bg-red-500',
    status: 'disconnected'
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    description: 'Share moments through photos and videos',
    icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
      </svg>
    ),
    color: 'bg-yellow-400',
    status: 'disconnected'
  }
];

const Integrations = () => {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [showConnectDialog, setShowConnectDialog] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (platformId: string, username: string) => {
    setIsConnecting(platformId);
    
    try {
      // Simulate API call to start verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setPlatforms(prev => prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, status: 'pending', pendingAccount: username }
          : platform
      ));

      // Simulate sending verification email
      toast({
        title: "Verification Email Sent",
        description: `Check your email linked to ${username} and click the confirmation link to complete the integration.`,
      });

      // Simulate email confirmation after 5 seconds (for demo)
      setTimeout(() => {
        setPlatforms(prev => prev.map(platform => 
          platform.id === platformId 
            ? { 
                ...platform, 
                status: 'connected',
                connectedAccount: {
                  username: username,
                  connectedAt: new Date().toISOString().split('T')[0],
                  posts: Math.floor(Math.random() * 500).toString(),
                  followers: `${(Math.random() * 50).toFixed(1)}K`
                },
                pendingAccount: undefined
              }
            : platform
        ));
        
        toast({
          title: "Integration Successful",
          description: `${username} has been successfully connected!`,
        });
      }, 5000);

    } catch (error) {
      setPlatforms(prev => prev.map(platform => 
        platform.id === platformId 
          ? { ...platform, status: 'failed' }
          : platform
      ));
      
      toast({
        title: "Connection Failed",
        description: "Failed to connect account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(null);
      setShowConnectDialog(null);
      setUsername('');
    }
  };

  const handleDisconnect = (platformId: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { 
            ...platform, 
            status: 'disconnected',
            connectedAccount: undefined,
            pendingAccount: undefined
          }
        : platform
    ));
    
    toast({
      title: "Account Disconnected",
      description: "The social media account has been disconnected successfully.",
    });
  };

  if (showSettings) {
    return <IntegrationSettings onClose={() => setShowSettings(false)} />;
  }

  return (
    <div className="p-4 md:p-6 animate-fade-in min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Social Media Integrations</h1>
            <p className="text-muted-foreground">Connect and manage your social media accounts</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowSettings(true)}
              className="border-slate-300 hover:bg-slate-50"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-emerald-600">
                    {platforms.filter(p => p.status === 'connected').length}
                  </p>
                  <p className="text-sm text-slate-600">Connected</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-amber-600">
                    {platforms.filter(p => p.status === 'pending').length}
                  </p>
                  <p className="text-sm text-slate-600">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-slate-600">
                    {platforms.filter(p => p.status === 'disconnected').length}
                  </p>
                  <p className="text-sm text-slate-600">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-red-600">
                    {platforms.filter(p => p.status === 'failed').length}
                  </p>
                  <p className="text-sm text-slate-600">Failed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Platform Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {platforms.map((platform) => (
            <Card key={platform.id} className="bg-white/70 backdrop-blur-sm border-slate-200 hover:shadow-lg transition-all duration-200 group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${platform.color}`}>
                    <platform.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        platform.status === 'connected' ? 'default' :
                        platform.status === 'pending' ? 'secondary' :
                        platform.status === 'failed' ? 'destructive' : 'outline'
                      }
                      className={
                        platform.status === 'connected' ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100' :
                        platform.status === 'pending' ? 'bg-amber-100 text-amber-700 hover:bg-amber-100' :
                        platform.status === 'failed' ? 'bg-red-100 text-red-700 hover:bg-red-100' :
                        'bg-slate-100 text-slate-700 hover:bg-slate-100'
                      }
                    >
                      {platform.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-lg">{platform.name}</CardTitle>
                <CardDescription className="text-sm">
                  {platform.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {platform.status === 'connected' && platform.connectedAccount && (
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="font-medium">Account:</span>
                      <span className="truncate">{platform.connectedAccount.username}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="font-medium">Connected:</span>
                      <span>{platform.connectedAccount.connectedAt}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-slate-600">{platform.connectedAccount.posts} posts</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-slate-600">{platform.connectedAccount.followers} followers</span>
                      </div>
                    </div>
                  </div>
                )}

                {platform.status === 'pending' && (
                  <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-sm text-amber-700">
                      Check your email to confirm the integration for <strong>{platform.pendingAccount}</strong>
                    </p>
                  </div>
                )}

                {platform.status === 'failed' && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700">
                      Connection failed. Please try again.
                    </p>
                  </div>
                )}

                <div className="flex gap-2">
                  {platform.status === 'disconnected' && (
                    <Dialog open={showConnectDialog === platform.id} onOpenChange={(open) => setShowConnectDialog(open ? platform.id : null)}>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
                          disabled={isConnecting === platform.id}
                        >
                          {isConnecting === platform.id ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Connect {platform.name}</DialogTitle>
                          <DialogDescription>
                            Enter your {platform.name} username to connect your account. We'll send a confirmation email to verify.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              placeholder={`Enter your ${platform.name} username`}
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              className="flex-1"
                              onClick={() => {
                                setShowConnectDialog(null);
                                setUsername('');
                              }}
                            >
                              Cancel
                            </Button>
                            <Button 
                              className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700"
                              onClick={() => handleConnect(platform.id, username)}
                              disabled={!username.trim() || isConnecting === platform.id}
                            >
                              {isConnecting === platform.id ? (
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              ) : (
                                <Plus className="w-4 h-4 mr-2" />
                              )}
                              Connect
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                  {platform.status === 'connected' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open(`https://${platform.name.toLowerCase()}.com/${platform.connectedAccount?.username}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDisconnect(platform.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}

                  {platform.status === 'pending' && (
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleDisconnect(platform.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  )}

                  {platform.status === 'failed' && (
                    <Button 
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white"
                      onClick={() => setShowConnectDialog(platform.id)}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations;
