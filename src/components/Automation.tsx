
import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  NodeTypes,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Save, Settings, MessageSquare, Users, Share2, Bot, Timer, Filter } from 'lucide-react';

// Custom Node Components
const TriggerNode = ({ data }: { data: any }) => (
  <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-4 min-w-[200px]">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
        <data.icon className="w-4 h-4 text-white" />
      </div>
      <span className="font-semibold text-green-400">{data.label}</span>
    </div>
    <p className="text-xs text-muted-foreground">{data.description}</p>
    <div className="flex justify-end mt-2">
      <div className="w-3 h-3 bg-green-500 rounded-full" 
           style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  </div>
);

const ActionNode = ({ data }: { data: any }) => (
  <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-4 min-w-[200px]">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <data.icon className="w-4 h-4 text-white" />
      </div>
      <span className="font-semibold text-blue-400">{data.label}</span>
    </div>
    <p className="text-xs text-muted-foreground">{data.description}</p>
    <div className="flex justify-between mt-2">
      <div className="w-3 h-3 bg-blue-500 rounded-full" 
           style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)' }} />
      <div className="w-3 h-3 bg-blue-500 rounded-full" 
           style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  </div>
);

const ConditionNode = ({ data }: { data: any }) => (
  <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-lg p-4 min-w-[200px] transform rotate-45" style={{ borderRadius: '20px' }}>
    <div className="transform -rotate-45">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <data.icon className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-yellow-400">{data.label}</span>
      </div>
      <p className="text-xs text-muted-foreground">{data.description}</p>
    </div>
  </div>
);

const AINode = ({ data }: { data: any }) => (
  <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-4 min-w-[200px]">
    <div className="flex items-center gap-2 mb-2">
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <span className="font-semibold gradient-text">{data.label}</span>
    </div>
    <p className="text-xs text-muted-foreground">{data.description}</p>
    <Badge variant="outline" className="mt-2 text-xs border-purple-500/50">
      {data.aiModel}
    </Badge>
    <div className="flex justify-between mt-2">
      <div className="w-3 h-3 bg-purple-500 rounded-full" 
           style={{ position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)' }} />
      <div className="w-3 h-3 bg-purple-500 rounded-full" 
           style={{ position: 'absolute', right: '-6px', top: '50%', transform: 'translateY(-50%)' }} />
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  trigger: TriggerNode,
  action: ActionNode,
  condition: ConditionNode,
  ai: AINode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'trigger',
    position: { x: 100, y: 100 },
    data: { 
      label: 'New DM Received',
      description: 'Triggers when a new direct message is received',
      icon: MessageSquare
    },
  },
];

const initialEdges: Edge[] = [];

const Automation = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const toolCategories = [
    {
      name: 'Triggers',
      items: [
        { id: 'new-dm', label: 'New DM', icon: MessageSquare, description: 'When someone sends a DM' },
        { id: 'new-comment', label: 'New Comment', icon: MessageSquare, description: 'When someone comments on your post' },
        { id: 'new-follower', label: 'New Follower', icon: Users, description: 'When you get a new follower' },
        { id: 'keyword-mention', label: 'Keyword Mention', icon: Filter, description: 'When specific keywords are mentioned' },
        { id: 'scheduled-time', label: 'Scheduled Time', icon: Timer, description: 'At specific times/dates' },
      ]
    },
    {
      name: 'Social Media Actions',
      items: [
        { id: 'send-dm', label: 'Send DM', icon: MessageSquare, description: 'Send a direct message' },
        { id: 'post-content', label: 'Post Content', icon: Share2, description: 'Publish content to platforms' },
        { id: 'reply-comment', label: 'Reply to Comment', icon: MessageSquare, description: 'Respond to comments' },
        { id: 'follow-user', label: 'Follow User', icon: Users, description: 'Follow a user account' },
      ]
    },
    {
      name: 'AI Models',
      items: [
        { id: 'gpt-4', label: 'GPT-4', icon: Bot, description: 'Generate intelligent responses', aiModel: 'GPT-4' },
        { id: 'claude', label: 'Claude', icon: Bot, description: 'Anthropic Claude for analysis', aiModel: 'Claude' },
        { id: 'gemini', label: 'Gemini', icon: Bot, description: 'Google Gemini for creativity', aiModel: 'Gemini' },
        { id: 'sentiment-ai', label: 'Sentiment Analysis', icon: Bot, description: 'Analyze message sentiment', aiModel: 'Custom' },
      ]
    },
    {
      name: 'Conditions',
      items: [
        { id: 'if-contains', label: 'If Contains', icon: Filter, description: 'Check if text contains keywords' },
        { id: 'if-sentiment', label: 'If Sentiment', icon: Filter, description: 'Check message sentiment' },
        { id: 'if-follower-count', label: 'If Follower Count', icon: Filter, description: 'Check follower count' },
      ]
    }
  ];

  const addNode = (tool: any) => {
    const nodeType = tool.aiModel ? 'ai' : 
                    toolCategories[0].items.includes(tool) ? 'trigger' :
                    toolCategories[3].items.includes(tool) ? 'condition' : 'action';

    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: nodeType,
      position: { x: Math.random() * 500 + 200, y: Math.random() * 300 + 200 },
      data: { 
        ...tool,
        icon: tool.icon
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-full flex animate-fade-in">
      {/* Left Panel - Tools */}
      <div className="w-80 bg-card border-r border-border p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Automation Builder</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Test
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {toolCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.items.map((tool) => (
                  <Card 
                    key={tool.id}
                    className="p-3 cursor-pointer hover:bg-accent/50 transition-colors border-border/50"
                    onClick={() => addNode(tool)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <tool.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm">{tool.label}</p>
                          {tool.aiModel && (
                            <Badge variant="secondary" className="text-xs">
                              {tool.aiModel}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {tool.description}
                        </p>
                      </div>
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-background"
          defaultEdgeOptions={{
            style: { stroke: '#00FFFF', strokeWidth: 2 },
            markerEnd: { type: 'arrowclosed', color: '#00FFFF' },
          }}
        >
          <Controls className="bg-card border border-border" />
          <MiniMap 
            className="bg-card border border-border" 
            nodeColor="#00FFFF"
            maskColor="rgba(0, 0, 0, 0.8)"
          />
          <Background variant="dots" gap={20} size={1} color="#333" />
        </ReactFlow>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6">
          <Button size="lg" className="rounded-full w-14 h-14 shadow-lg">
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Automation;
