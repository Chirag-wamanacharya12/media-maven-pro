
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Github,
  Globe,
  Mail,
  Check,
  Clock,
  X,
  Settings,
  RefreshCw
} from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
  features: string[];
}

interface ConnectedAccount {
  platformId: string;
  username: string;
  email: string;
  status: 'connected' | 'pending' | 'failed';
  connectedAt?: Date;
  pendingToken?: string;
}

const platforms: Platform[] = [
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'bg-blue-600',
    description: 'Connect your Facebook page to schedule posts and manage engagement',
    features: ['Post scheduling', 'Analytics', 'Comments management', 'Page insights']
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: Twitter,
    color: 'bg-black',
    description: 'Connect your Twitter account to schedule tweets and track mentions',
    features: ['Tweet scheduling', 'Thread creation', 'Mentions tracking', 'Analytics']
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    description: 'Connect your Instagram account for posts, stories, and reels',
    features: ['Post scheduling', 'Stories', 'Reels', 'Hashtag suggestions']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'bg-blue-700',
    description: 'Connect your LinkedIn profile or company page',
    features: ['Professional posts', 'Company updates', 'Network analytics', 'Lead generation']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    color: 'bg-red-600',
    description: 'Connect your YouTube channel for video management',
    features: ['Video uploads', 'Community posts', 'Analytics', 'Thumbnail management']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: Globe,
    color: 'bg-black',
    description: 'Connect your TikTok account for short-form video content',
    features: ['Video scheduling', 'Trending hashtags', 'Analytics', 'Creator tools']
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    icon: Globe,
    color: 'bg-red-500',
    description: 'Connect your Pinterest account for pin management',
    features: ['Pin scheduling', 'Board management', 'Rich pins', 'Analytics']
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: Github,
    color: 'bg-gray-800',
    description: 'Connect your GitHub for developer content and updates',
    features: ['Repository updates', 'Release notes', 'Developer community', 'Code sharing']
  }
];

const Integrations = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>([]);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [connectionForm, setConnectionForm] = useState({
    username: '',
    email: '',
    platformId: ''
  });
  const { toast } = useToast();

  const getAccountStatus = (platformId: string) => {
    return connectedAccounts.find(account => account.platformId === platformId);
  };

  const handleConnect = async (platform: Platform) => {
    setConnectionForm({ ...connectionForm, platformId: platform.id });
    setIsConnecting(platform.id);
  };

  const handleSubmitConnection = async () => {
    if (!connectionForm.username || !connectionForm.email) {
      toast({
        title: "Missing Information",
        description: "Please provide both username and email address.",
        variant: "destructive"
      });
      return;
    }

    // Generate a pending token for verification
    const pendingToken = Math.random().toString(36).substring(2, 15);
    
    // Add account as pending
    const newAccount: ConnectedAccount = {
      platformId: connectionForm.platformId,
      username: connectionForm.username,
      email: connectionForm.email,
      status: 'pending',
      pendingToken
    };

    setConnectedAccounts(prev => [...prev.filter(acc => acc.platformId !== connectionForm.platformId), newAccount]);

    // Simulate sending verification email
    await sendVerificationEmail(connectionForm.email, connectionForm.username, connectionForm.platformId, pendingToken);

    toast({
      title: "Verification Email Sent",
      description: `Check your email (${connectionForm.email}) and click the confirmation link to complete the integration.`,
    });

    setIsConnecting(null);
    setConnectionForm({ username: '', email: '', platformId: '' });
  };

  const sendVerificationEmail = async (email: string, username: string, platformId: string, token: string) => {
    // In a real application, this would send an actual email
    console.log('Sending verification email:', {
      to: email,
      subject: `Verify your ${platforms.find(p => p.id === platformId)?.name} integration`,
      body: `
        Hi ${username},
        
        Click the link below to confirm your ${platforms.find(p => p.id === platformId)?.name} account integration:
        
        ${window.location.origin}/verify-integration?token=${token}&platform=${platformId}
        
        If you didn't request this integration, please ignore this email.
        
        Best regards,
        SocialAI Team
      `
    });

    // Simulate email verification after 3 seconds (for demo purposes)
    setTimeout(() => {
      handleEmailVerification(token);
    }, 3000);
  };

  const handleEmailVerification = (token: string) => {
    setConnectedAccounts(prev => 
      prev.map(account => 
        account.pendingToken === token 
          ? { ...account, status: 'connected' as const, connectedAt: new Date(), pendingToken: undefined }
          : account
      )
    );

    const account = connectedAccounts.find(acc => acc.pendingToken === token);
    if (account) {
      const platform = platforms.find(p => p.id === account.platformId);
      toast({
        title: "Integration Successful!",
        description: `Your ${platform?.name} account has been successfully connected.`,
      });
    }
  };

  const handleDisconnect = (platformId: string) => {
    setConnectedAccounts(prev => prev.filter(account => account.platformId !== platformId));
    const platform = platforms.find(p => p.id === platformId);
    toast({
      title: "Account Disconnected",
      description: `Your ${platform?.name} account has been disconnected.`,
    });
  };

  const handleRetry = (platformId: string) => {
    const account = getAccountStatus(platformId);
    if (account) {
      setConnectionForm({
        username: account.username,
        email: account.email,
        platformId: platformId
      });
      setIsConnecting(platformId);
    }
  };

  const getStatusBadge = (account: ConnectedAccount | undefined) => {
    if (!account) {
      return <Badge variant="secondary">Not Connected</Badge>;
    }

    switch (account.status) {
      case 'connected':
        return <Badge className="bg-green-600"><Check className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">Not Connected</Badge>;
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your social media accounts and third-party tools to streamline your workflow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          const account = getAccountStatus(platform.id);
          
          return (
            <Card key={platform.id} className="glass hover:glass-hover transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${platform.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{platform.name}</CardTitle>
                      {account && (
                        <p className="text-sm text-muted-foreground">@{account.username}</p>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(account)}
                </div>
                <CardDescription className="text-sm">
                  {platform.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Features:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {platform.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1 h-1 bg-cyan-400 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-2">
                  {!account ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1" 
                          onClick={() => handleConnect(platform)}
                        >
                          Connect
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Connect {platform.name}</DialogTitle>
                          <DialogDescription>
                            Enter your {platform.name} username and the email associated with your account.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Username</label>
                            <Input
                              placeholder={`Your ${platform.name} username`}
                              value={connectionForm.username}
                              onChange={(e) => setConnectionForm({...connectionForm, username: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <Input
                              type="email"
                              placeholder="Email associated with your account"
                              value={connectionForm.email}
                              onChange={(e) => setConnectionForm({...connectionForm, email: e.target.value})}
                            />
                          </div>
                          <Button onClick={handleSubmitConnection} className="w-full">
                            <Mail className="w-4 h-4 mr-2" />
                            Send Verification Email
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <>
                      {account.status === 'connected' && (
                        <>
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDisconnect(platform.id)}
                          >
                            Disconnect
                          </Button>
                        </>
                      )}
                      {account.status === 'pending' && (
                        <Button variant="outline" size="sm" className="flex-1">
                          <Clock className="w-4 h-4 mr-2" />
                          Awaiting Verification
                        </Button>
                      )}
                      {account.status === 'failed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRetry(platform.id)}
                        >
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Retry
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {connectedAccounts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Connected Accounts Summary</h2>
          <div className="glass rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {connectedAccounts.filter(acc => acc.status === 'connected').length}
                </div>
                <div className="text-sm text-muted-foreground">Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {connectedAccounts.filter(acc => acc.status === 'pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {connectedAccounts.filter(acc => acc.status === 'failed').length}
                </div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {platforms.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Platforms</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Integrations;
