
import React, { useState } from 'react';
import { 
  Calendar, 
  Inbox, 
  Settings, 
  Users,
  BarChart3,
  FileImage,
  Bot,
  Zap,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  Grid3X3,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Grid3X3 },
    { id: 'posts', label: 'Posts', icon: Send },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'media', label: 'Media Library', icon: FileImage },
    { id: 'ai-studio', label: 'AI Studio', icon: Bot },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'integrations', label: 'Integrations', icon: Zap },
  ];

  const bottomItems = [
    { id: 'help', label: 'Support', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut },
  ];

  return (
    <div className={cn(
      "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg gradient-text">SocialAI</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 p-0 hover:bg-sidebar-accent"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Quick Action */}
      {!isCollapsed && (
        <div className="p-4">
          <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </div>
      )}

      {/* Main Menu */}
      <nav className="flex-1 px-2 py-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
                  activeTab === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border border-cyan-500/20"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <Icon className={cn("w-5 h-5", isCollapsed ? "" : "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
                {activeTab === item.id && (
                  <div className="absolute left-0 w-1 h-8 bg-cyan-400 rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Items */}
      <div className="px-2 py-4 border-t border-sidebar-border">
        <div className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <Icon className={cn("w-5 h-5", isCollapsed ? "" : "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
