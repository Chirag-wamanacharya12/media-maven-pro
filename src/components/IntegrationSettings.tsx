
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, 
  Bell, 
  Shield, 
  Zap, 
  Database, 
  Globe, 
  Clock,
  Save,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IntegrationSettingsProps {
  onClose: () => void;
}

const IntegrationSettings = ({ onClose }: IntegrationSettingsProps) => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      webhook: false,
      webhookUrl: ''
    },
    security: {
      twoFactor: false,
      sessionTimeout: '24',
      ipWhitelist: ''
    },
    automation: {
      autoRetry: true,
      maxRetries: '3',
      retryDelay: '5',
      errorHandling: 'continue'
    },
    api: {
      rateLimitPerMinute: '100',
      timeoutSeconds: '30',
      enableCaching: true,
      cacheExpiry: '300'
    }
  });
  
  const { toast } = useToast();

  const handleSave = () => {
    localStorage.setItem('integration-settings', JSON.stringify(settings));
    toast({
      title: "Settings Saved",
      description: "Your integration settings have been saved successfully.",
    });
    onClose();
  };

  const handleReset = () => {
    setSettings({
      notifications: {
        email: true,
        push: false,
        webhook: false,
        webhookUrl: ''
      },
      security: {
        twoFactor: false,
        sessionTimeout: '24',
        ipWhitelist: ''
      },
      automation: {
        autoRetry: true,
        maxRetries: '3',
        retryDelay: '5',
        errorHandling: 'continue'
      },
      api: {
        rateLimitPerMinute: '100',
        timeoutSeconds: '30',
        enableCaching: true,
        cacheExpiry: '300'
      }
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-slate-900 border-slate-700">
        <CardHeader className="border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="w-6 h-6 text-cyan-400" />
              <div>
                <CardTitle className="text-white">Integration Settings</CardTitle>
                <CardDescription>Configure your automation and integration preferences</CardDescription>
              </div>
            </div>
            <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white">
              ✕
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="notifications" className="h-full">
            <div className="flex h-full">
              <TabsList className="flex flex-col h-full w-48 bg-slate-800/50 rounded-none border-r border-slate-700">
                <TabsTrigger value="notifications" className="w-full justify-start gap-2 data-[state=active]:bg-slate-700">
                  <Bell className="w-4 h-4" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start gap-2 data-[state=active]:bg-slate-700">
                  <Shield className="w-4 h-4" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="automation" className="w-full justify-start gap-2 data-[state=active]:bg-slate-700">
                  <Zap className="w-4 h-4" />
                  Automation
                </TabsTrigger>
                <TabsTrigger value="api" className="w-full justify-start gap-2 data-[state=active]:bg-slate-700">
                  <Database className="w-4 h-4" />
                  API Settings
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 p-6 overflow-y-auto">
                <TabsContent value="notifications" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Notification Preferences</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-slate-200">Email Notifications</Label>
                          <p className="text-sm text-slate-400">Receive updates via email</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.email}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, email: checked }
                            }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-slate-200">Push Notifications</Label>
                          <p className="text-sm text-slate-400">Browser push notifications</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.push}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, push: checked }
                            }))
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-slate-200">Webhook Notifications</Label>
                          <p className="text-sm text-slate-400">Send notifications to external URL</p>
                        </div>
                        <Switch 
                          checked={settings.notifications.webhook}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({
                              ...prev,
                              notifications: { ...prev.notifications, webhook: checked }
                            }))
                          }
                        />
                      </div>
                      
                      {settings.notifications.webhook && (
                        <div>
                          <Label className="text-slate-200">Webhook URL</Label>
                          <Input 
                            placeholder="https://your-webhook-url.com/notify"
                            value={settings.notifications.webhookUrl}
                            onChange={(e) => 
                              setSettings(prev => ({
                                ...prev,
                                notifications: { ...prev.notifications, webhookUrl: e.target.value }
                              }))
                            }
                            className="bg-slate-800 border-slate-600 text-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="security" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-slate-200">Two-Factor Authentication</Label>
                          <p className="text-sm text-slate-400">Add extra security to your account</p>
                        </div>
                        <Switch 
                          checked={settings.security.twoFactor}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({
                              ...prev,
                              security: { ...prev.security, twoFactor: checked }
                            }))
                          }
                        />
                      </div>
                      
                      <div>
                        <Label className="text-slate-200">Session Timeout (hours)</Label>
                        <Select 
                          value={settings.security.sessionTimeout}
                          onValueChange={(value) => 
                            setSettings(prev => ({
                              ...prev,
                              security: { ...prev.security, sessionTimeout: value }
                            }))
                          }
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="8">8 hours</SelectItem>
                            <SelectItem value="24">24 hours</SelectItem>
                            <SelectItem value="168">1 week</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-slate-200">IP Whitelist</Label>
                        <Textarea 
                          placeholder="Enter IP addresses (one per line)"
                          value={settings.security.ipWhitelist}
                          onChange={(e) => 
                            setSettings(prev => ({
                              ...prev,
                              security: { ...prev.security, ipWhitelist: e.target.value }
                            }))
                          }
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                        <p className="text-sm text-slate-400 mt-1">Leave empty to allow all IPs</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="automation" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Automation Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-slate-200">Auto Retry Failed Actions</Label>
                          <p className="text-sm text-slate-400">Automatically retry failed automation steps</p>
                        </div>
                        <Switch 
                          checked={settings.automation.autoRetry}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({
                              ...prev,
                              automation: { ...prev.automation, autoRetry: checked }
                            }))
                          }
                        />
                      </div>
                      
                      <div>
                        <Label className="text-slate-200">Maximum Retries</Label>
                        <Select 
                          value={settings.automation.maxRetries}
                          onValueChange={(value) => 
                            setSettings(prev => ({
                              ...prev,
                              automation: { ...prev.automation, maxRetries: value }
                            }))
                          }
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 retry</SelectItem>
                            <SelectItem value="3">3 retries</SelectItem>
                            <SelectItem value="5">5 retries</SelectItem>
                            <SelectItem value="10">10 retries</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="text-slate-200">Retry Delay (minutes)</Label>
                        <Input 
                          type="number"
                          value={settings.automation.retryDelay}
                          onChange={(e) => 
                            setSettings(prev => ({
                              ...prev,
                              automation: { ...prev.automation, retryDelay: e.target.value }
                            }))
                          }
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-slate-200">Error Handling</Label>
                        <Select 
                          value={settings.automation.errorHandling}
                          onValueChange={(value) => 
                            setSettings(prev => ({
                              ...prev,
                              automation: { ...prev.automation, errorHandling: value }
                            }))
                          }
                        >
                          <SelectTrigger className="bg-slate-800 border-slate-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="continue">Continue on error</SelectItem>
                            <SelectItem value="stop">Stop on error</SelectItem>
                            <SelectItem value="skip">Skip failed step</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="api" className="mt-0 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">API Configuration</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-200">Rate Limit (requests per minute)</Label>
                        <Input 
                          type="number"
                          value={settings.api.rateLimitPerMinute}
                          onChange={(e) => 
                            setSettings(prev => ({
                              ...prev,
                              api: { ...prev.api, rateLimitPerMinute: e.target.value }
                            }))
                          }
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      
                      <div>
                        <Label className="text-slate-200">Request Timeout (seconds)</Label>
                        <Input 
                          type="number"
                          value={settings.api.timeoutSeconds}
                          onChange={(e) => 
                            setSettings(prev => ({
                              ...prev,
                              api: { ...prev.api, timeoutSeconds: e.target.value }
                            }))
                          }
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-slate-200">Enable Response Caching</Label>
                          <p className="text-sm text-slate-400">Cache API responses to improve performance</p>
                        </div>
                        <Switch 
                          checked={settings.api.enableCaching}
                          onCheckedChange={(checked) => 
                            setSettings(prev => ({
                              ...prev,
                              api: { ...prev.api, enableCaching: checked }
                            }))
                          }
                        />
                      </div>
                      
                      {settings.api.enableCaching && (
                        <div>
                          <Label className="text-slate-200">Cache Expiry (seconds)</Label>
                          <Input 
                            type="number"
                            value={settings.api.cacheExpiry}
                            onChange={(e) => 
                              setSettings(prev => ({
                                ...prev,
                                api: { ...prev.api, cacheExpiry: e.target.value }
                              }))
                            }
                            className="bg-slate-800 border-slate-600 text-white"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </CardContent>
        
        <div className="border-t border-slate-700 p-4 flex justify-between">
          <Button variant="outline" onClick={handleReset} className="border-slate-600 text-slate-300">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset to Defaults
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose} className="text-slate-400">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-700">
              <Save className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IntegrationSettings;
