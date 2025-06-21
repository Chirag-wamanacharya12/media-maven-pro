import React, { useCallback, useState, useRef } from 'react';
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
  MarkerType,
  BackgroundVariant,
  Handle,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Play, Save, Settings, MessageSquare, Users, Share2, Bot, Timer, Filter, Trash2, Unlink, Copy, Edit3, Zap, Palette, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';

const TriggerNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges, setNodes } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges });
    }
  };

  const handleDuplicate = () => {
    const newId = `${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'trigger',
      position: { x: Math.random() * 400 + 300, y: Math.random() * 200 + 200 },
      data: { ...data },
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const handleEdit = () => {
    console.log('Edit trigger node:', id);
  };

  const edges = getEdges();
  const connectedOutputs = edges.filter(edge => edge.source === id);
  const showOutputHandle = connectedOutputs.length === 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 border-2 border-emerald-400/50 rounded-xl p-4 min-w-[220px] relative cursor-pointer hover:border-emerald-300/70 transition-all duration-200 shadow-xl backdrop-blur-md hover:shadow-emerald-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <data.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-emerald-200 text-sm">{data.label}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{data.description}</p>
          
          {showOutputHandle && (
            <Handle
              type="source"
              position={Position.Right}
              id="output"
              className="w-3 h-3 bg-emerald-400 border-2 border-emerald-200 hover:bg-emerald-300 transition-all duration-200 hover:scale-125 shadow-lg"
              style={{ right: '-6px', top: '50%' }}
            />
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={handleEdit} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Properties
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-300 hover:bg-emerald-500/20 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-600" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-300 hover:bg-orange-500/20 cursor-pointer">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const ActionNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges, setNodes } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges });
    }
  };

  const handleDuplicate = () => {
    const newId = `${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'action',
      position: { x: Math.random() * 400 + 300, y: Math.random() * 200 + 200 },
      data: { ...data },
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const handleEdit = () => {
    console.log('Edit action node:', id);
  };

  const handleTest = () => {
    console.log('Test action:', id);
  };

  const edges = getEdges();
  const connectedInputs = edges.filter(edge => edge.target === id);
  const connectedOutputs = edges.filter(edge => edge.source === id);
  const showInputHandle = connectedInputs.length === 0;
  const showOutputHandle = connectedOutputs.length === 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/30 border-2 border-blue-400/50 rounded-xl p-4 min-w-[220px] relative cursor-pointer hover:border-blue-300/70 transition-all duration-200 shadow-xl backdrop-blur-md hover:shadow-blue-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <data.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-blue-200 text-sm">{data.label}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{data.description}</p>
          
          {showInputHandle && (
            <Handle
              type="target"
              position={Position.Left}
              id="input"
              className="w-3 h-3 bg-blue-400 border-2 border-blue-200 hover:bg-blue-300 transition-all duration-200 hover:scale-125 shadow-lg"
              style={{ left: '-6px', top: '50%' }}
            />
          )}
          
          {showOutputHandle && (
            <Handle
              type="source"
              position={Position.Right}
              id="output"
              className="w-3 h-3 bg-blue-400 border-2 border-blue-200 hover:bg-blue-300 transition-all duration-200 hover:scale-125 shadow-lg"
              style={{ right: '-6px', top: '50%' }}
            />
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={handleEdit} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Properties
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-300 hover:bg-emerald-500/20 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem onClick={handleTest} className="text-cyan-300 hover:bg-cyan-500/20 cursor-pointer">
          <Zap className="w-4 h-4 mr-2" />
          Test Action
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-600" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-300 hover:bg-orange-500/20 cursor-pointer">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const ConditionNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges, setNodes } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges });
    }
  };

  const handleDuplicate = () => {
    const newId = `${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'condition',
      position: { x: Math.random() * 400 + 300, y: Math.random() * 200 + 200 },
      data: { ...data },
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const handleEdit = () => {
    console.log('Edit condition node:', id);
  };

  const edges = getEdges();
  const connectedInputs = edges.filter(edge => edge.target === id);
  const connectedYes = edges.filter(edge => edge.source === id && edge.sourceHandle === 'yes');
  const connectedNo = edges.filter(edge => edge.source === id && edge.sourceHandle === 'no');
  const showInputHandle = connectedInputs.length === 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/30 border-2 border-amber-400/50 rounded-2xl p-4 min-w-[200px] relative cursor-pointer hover:border-amber-300/70 transition-all duration-200 shadow-xl backdrop-blur-md transform rotate-45 hover:shadow-amber-500/20" style={{ borderRadius: '24px' }}>
          <div className="transform -rotate-45">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <data.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-amber-200 text-sm">{data.label}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{data.description}</p>
          </div>
          
          {showInputHandle && (
            <Handle
              type="target"
              position={Position.Left}
              id="input"
              className="w-3 h-3 bg-amber-400 border-2 border-amber-200 hover:bg-amber-300 transition-all duration-200 hover:scale-125 shadow-lg transform -rotate-45"
              style={{ left: '-6px', top: '50%', transform: 'translateY(-50%) rotate(-45deg)' }}
            />
          )}
          
          {connectedYes.length === 0 && (
            <Handle
              id="yes"
              type="source"
              position={Position.Top}
              className="w-3 h-3 bg-emerald-400 border-2 border-emerald-200 hover:bg-emerald-300 transition-all duration-200 hover:scale-125 shadow-lg transform -rotate-45"
              style={{ top: '-6px', left: '30%', transform: 'translateX(-50%) rotate(-45deg)' }}
            />
          )}
          {connectedNo.length === 0 && (
            <Handle
              id="no"
              type="source"
              position={Position.Bottom}
              className="w-3 h-3 bg-red-400 border-2 border-red-200 hover:bg-red-300 transition-all duration-200 hover:scale-125 shadow-lg transform -rotate-45"
              style={{ bottom: '-6px', right: '30%', transform: 'translateX(50%) rotate(-45deg)' }}
            />
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={handleEdit} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Condition
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-300 hover:bg-emerald-500/20 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-600" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-300 hover:bg-orange-500/20 cursor-pointer">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const AINode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges, setNodes } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges });
    }
  };

  const handleDuplicate = () => {
    const newId = `${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type: 'ai',
      position: { x: Math.random() * 400 + 300, y: Math.random() * 200 + 200 },
      data: { ...data },
    };
    setNodes((nodes) => [...nodes, newNode]);
  };

  const handleEdit = () => {
    console.log('Edit AI node:', id);
  };

  const handleTest = () => {
    console.log('Test AI response:', id);
  };

  const edges = getEdges();
  const connectedInputs = edges.filter(edge => edge.target === id);
  const connectedOutputs = edges.filter(edge => edge.source === id);
  const showInputHandle = connectedInputs.length === 0;
  const showOutputHandle = connectedOutputs.length === 0;

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/30 border-2 border-purple-400/50 rounded-xl p-4 min-w-[220px] relative cursor-pointer hover:border-purple-300/70 transition-all duration-200 shadow-xl backdrop-blur-md hover:shadow-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent text-sm">{data.label}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">{data.description}</p>
          <Badge variant="outline" className="text-xs border-purple-400/50 text-purple-200 bg-purple-500/20">
            {data.aiModel}
          </Badge>
          
          {showInputHandle && (
            <Handle
              type="target"
              position={Position.Left}
              id="input"
              className="w-3 h-3 bg-purple-400 border-2 border-purple-200 hover:bg-purple-300 transition-all duration-200 hover:scale-125 shadow-lg"
              style={{ left: '-6px', top: '50%' }}
            />
          )}
          
          {showOutputHandle && (
            <Handle
              type="source"
              position={Position.Right}
              id="output"
              className="w-3 h-3 bg-purple-400 border-2 border-purple-200 hover:bg-purple-300 transition-all duration-200 hover:scale-125 shadow-lg"
              style={{ right: '-6px', top: '50%' }}
            />
          )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={handleEdit} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit AI Prompt
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-300 hover:bg-emerald-500/20 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem onClick={handleTest} className="text-cyan-300 hover:bg-cyan-500/20 cursor-pointer">
          <Zap className="w-4 h-4 mr-2" />
          Test AI Response
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-600" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-300 hover:bg-orange-500/20 cursor-pointer">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: '#00D9FF', 
          strokeWidth: 3,
          filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.6))'
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#00D9FF' },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      setNodes((nds) => [...nds]);
    },
    [setEdges, setNodes],
  );

  const toolCategories = [
    {
      name: 'Triggers',
      items: [
        { id: 'new-dm', label: 'New DM', icon: MessageSquare, description: 'When someone sends a DM', color: 'green' },
        { id: 'new-comment', label: 'New Comment', icon: MessageSquare, description: 'When someone comments on your post', color: 'green' },
        { id: 'new-follower', label: 'New Follower', icon: Users, description: 'When you get a new follower', color: 'green' },
        { id: 'keyword-mention', label: 'Keyword Mention', icon: Filter, description: 'When specific keywords are mentioned', color: 'green' },
        { id: 'scheduled-time', label: 'Scheduled Time', icon: Timer, description: 'At specific times/dates', color: 'green' },
      ]
    },
    {
      name: 'Social Media Actions',
      items: [
        { id: 'send-dm', label: 'Send DM', icon: MessageSquare, description: 'Send a direct message', color: 'blue' },
        { id: 'post-content', label: 'Post Content', icon: Share2, description: 'Publish content to platforms', color: 'blue' },
        { id: 'reply-comment', label: 'Reply to Comment', icon: MessageSquare, description: 'Respond to comments', color: 'blue' },
        { id: 'follow-user', label: 'Follow User', icon: Users, description: 'Follow a user account', color: 'blue' },
      ]
    },
    {
      name: 'AI Models',
      items: [
        { id: 'gpt-4', label: 'GPT-4', icon: Bot, description: 'Generate intelligent responses', aiModel: 'GPT-4', color: 'purple' },
        { id: 'claude', label: 'Claude', icon: Bot, description: 'Anthropic Claude for analysis', aiModel: 'Claude', color: 'purple' },
        { id: 'gemini', label: 'Gemini', icon: Bot, description: 'Google Gemini for creativity', aiModel: 'Gemini', color: 'purple' },
        { id: 'sentiment-ai', label: 'Sentiment Analysis', icon: Bot, description: 'Analyze message sentiment', aiModel: 'Custom', color: 'purple' },
      ]
    },
    {
      name: 'Conditions',
      items: [
        { id: 'if-contains', label: 'If Contains', icon: Filter, description: 'Check if text contains keywords', color: 'yellow' },
        { id: 'if-sentiment', label: 'If Sentiment', icon: Filter, description: 'Check message sentiment', color: 'yellow' },
        { id: 'if-follower-count', label: 'If Follower Count', icon: Filter, description: 'Check follower count', color: 'yellow' },
      ]
    }
  ];

  const addNode = (tool: any) => {
    const nodeType = tool.aiModel ? 'ai' : 
                    toolCategories[0].items.includes(tool) ? 'trigger' :
                    toolCategories[3].items.includes(tool) ? 'condition' : 'action';

    const newNode: Node = {
      id: `${Date.now()}`,
      type: nodeType,
      position: { x: Math.random() * 400 + 300, y: Math.random() * 200 + 200 },
      data: { 
        ...tool,
        icon: tool.icon
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
      {/* Collapsible Left Panel */}
      <div className={`${isSidebarCollapsed ? 'w-0' : 'w-80'} transition-all duration-300 bg-slate-900/70 border-r border-slate-600/50 flex flex-col backdrop-blur-xl overflow-hidden`}>
        {!isSidebarCollapsed && (
          <>
            <div className="p-4 border-b border-slate-600/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-100">Automation Builder</h2>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm">
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
                    <Play className="w-4 h-4 mr-2" />
                    Test
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-6">
                {toolCategories.map((category) => (
                  <div key={category.name}>
                    <h3 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wide">
                      {category.name}
                    </h3>
                    <div className="space-y-2">
                      {category.items.map((tool) => (
                        <Card 
                          key={tool.id}
                          className="p-3 cursor-pointer hover:bg-slate-700/50 transition-all duration-200 border-slate-600/50 bg-slate-800/40 backdrop-blur-md hover:shadow-lg hover:border-slate-500/70"
                          onClick={() => addNode(tool)}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
                              tool.color === 'green' ? 'bg-emerald-500/30 text-emerald-300' :
                              tool.color === 'blue' ? 'bg-blue-500/30 text-blue-300' :
                              tool.color === 'purple' ? 'bg-purple-500/30 text-purple-300' :
                              tool.color === 'yellow' ? 'bg-amber-500/30 text-amber-300' :
                              'bg-slate-500/30 text-slate-300'
                            }`}>
                              <tool.icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm text-slate-100">{tool.label}</p>
                                {tool.aiModel && (
                                  <Badge variant="secondary" className="text-xs bg-purple-500/30 text-purple-200 border-purple-400/40">
                                    {tool.aiModel}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 mt-1">
                                {tool.description}
                              </p>
                            </div>
                            <Plus className="w-4 h-4 text-slate-500" />
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative">
        {/* Sidebar Toggle Button */}
        <Button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          size="sm"
          variant="outline"
          className="absolute top-4 left-4 z-20 bg-slate-800/80 border-slate-600/50 text-slate-300 hover:bg-slate-700/80 backdrop-blur-md"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </Button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          className="bg-gradient-to-br from-slate-950 to-slate-900"
          defaultEdgeOptions={{
            style: { stroke: '#00D9FF', strokeWidth: 3 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#00D9FF' },
          }}
          connectionLineStyle={{
            stroke: '#FF6B6B',
            strokeWidth: 4,
            strokeDasharray: '8,4',
            filter: 'drop-shadow(0 0 12px rgba(255, 107, 107, 0.8))'
          }}
          panOnScroll={false}
          zoomOnScroll={false}
          panOnDrag={true}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
        >
          <Controls className="bg-slate-900/80 border border-slate-600/50 backdrop-blur-md shadow-xl" />
          <MiniMap 
            className="bg-slate-900/80 border border-slate-600/50 backdrop-blur-md shadow-xl" 
            nodeColor={(node) => {
              switch(node.type) {
                case 'trigger': return '#10b981';
                case 'action': return '#3b82f6';
                case 'condition': return '#f59e0b';
                case 'ai': return '#8b5cf6';
                default: return '#00D9FF';
              }
            }}
            maskColor="rgba(15, 23, 42, 0.8)"
          />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#334155" />
        </ReactFlow>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6">
          <Button size="lg" className="rounded-full w-14 h-14 shadow-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600/50 backdrop-blur-md">
            <Settings className="w-6 h-6 text-slate-200" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Automation;
