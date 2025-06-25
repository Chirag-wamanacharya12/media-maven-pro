
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Key, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface ApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  currentApiKey?: string;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySet, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      localStorage.setItem('openai_api_key', apiKey.trim());
    }
  };

  const isValidApiKey = apiKey.startsWith('sk-') && apiKey.length > 20;

  return (
    <Card className="dark-card border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Key className="w-5 h-5" />
          OpenAI API Configuration
        </CardTitle>
        <CardDescription className="text-gray-400">
          Enter your OpenAI API key to enable AI content generation.{' '}
          <a 
            href="https://platform.openai.com/api-keys" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1"
          >
            Get your API key here <ExternalLink className="w-3 h-3" />
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-200 mb-2 block">API Key</Label>
            <div className="relative">
              <Input
                type={showApiKey ? 'text' : 'password'}
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          
          <Button 
            type="submit"
            disabled={!isValidApiKey}
            className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
          >
            Save API Key
          </Button>
          
          {currentApiKey && (
            <p className="text-sm text-green-400 flex items-center gap-2">
              <Key className="w-4 h-4" />
              API key configured - ready to generate content!
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
