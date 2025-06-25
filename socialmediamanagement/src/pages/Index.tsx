
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Dashboard from '@/components/Dashboard';
import Posts from '@/components/Posts';
import Calendar from '@/components/Calendar';
import Inbox from '@/components/Inbox';
import Analytics from '@/components/Analytics';
import Automation from '@/components/Automation';
import Integrations from '@/components/Integrations';
import AIStudio from '@/components/AIStudio';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'posts':
        return <Posts />;
      case 'calendar':
        return <Calendar />;
      case 'inbox':
        return <Inbox />;
      case 'automation':
        return <Automation />;
      case 'analytics':
        return <Analytics />;
      case 'integrations':
        return <Integrations />;
      case 'media':
        return (
          <div className="p-6 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Media Library</h1>
            <p className="text-muted-foreground mb-8">Organize and manage your visual content</p>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Media library coming soon...</p>
            </div>
          </div>
        );
      case 'ai-studio':
        return <AIStudio />;
      case 'clients':
        return (
          <div className="p-6 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Clients & Workspaces</h1>
            <p className="text-muted-foreground mb-8">Manage multiple client accounts and team access</p>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Client management coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-6 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground mb-8">Configure your account and preferences</p>
            <div className="text-center py-12">
              <p className="text-muted-foreground">Settings coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
