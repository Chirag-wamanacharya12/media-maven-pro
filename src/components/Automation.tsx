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
import { Plus, Play, Save, Settings, MessageSquare, Users, Share2, Bot, Timer, Filter, Trash2, Unlink, Copy, Edit3, Zap, Palette } from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';

// Custom Node Components
const TriggerNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges.map(edge => ({ id: edge.id })) });
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    console.log('Edit node:', id);
  };

  // Get connected edges to determine how many dots to show
  const edges = useReactFlow().getEdges();
  const connectedOutputs = edges.filter(edge => edge.source === id);
  const maxOutputs = Math.max(3, connectedOutputs.length + 1);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/20 border-2 border-emerald-500/30 rounded-xl p-4 min-w-[220px] relative cursor-pointer hover:border-emerald-400/50 transition-all duration-200 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <data.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-emerald-300 text-sm">{data.label}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{data.description}</p>
          
          {/* Dynamic Output Handles */}
          {Array.from({ length: maxOutputs }, (_, index) => (
            <Handle
              key={`output-${index + 1}`}
              type="source"
              position={Position.Right}
              id={`output-${index + 1}`}
              className="w-3 h-3 bg-emerald-500 border-2 border-emerald-300 hover:bg-emerald-400 transition-all duration-200 hover:scale-110"
              style={{ 
                right: '-6px', 
                top: `${30 + (index * 15)}%`,
                opacity: index < connectedOutputs.length + 1 ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-700 backdrop-blur-sm">
        <ContextMenuItem onClick={handleEdit} className="text-blue-400 hover:bg-blue-500/20">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Properties
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-400 hover:bg-emerald-500/20">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-400 hover:bg-purple-500/20">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-700" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-400 hover:bg-orange-500/20">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-400 hover:bg-red-500/20">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const ActionNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges.map(edge => ({ id: edge.id })) });
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    console.log('Edit node:', id);
  };

  // Dynamic handle management
  const edges = useReactFlow().getEdges();
  const connectedInputs = edges.filter(edge => edge.target === id);
  const connectedOutputs = edges.filter(edge => edge.source === id);
  const maxInputs = Math.max(3, connectedInputs.length + 1);
  const maxOutputs = Math.max(3, connectedOutputs.length + 1);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border-2 border-blue-500/30 rounded-xl p-4 min-w-[220px] relative cursor-pointer hover:border-blue-400/50 transition-all duration-200 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              <data.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-blue-300 text-sm">{data.label}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{data.description}</p>
          
          {/* Dynamic Input Handles */}
          {Array.from({ length: maxInputs }, (_, index) => (
            <Handle
              key={`input-${index + 1}`}
              type="target"
              position={Position.Left}
              id={`input-${index + 1}`}
              className="w-3 h-3 bg-blue-500 border-2 border-blue-300 hover:bg-blue-400 transition-all duration-200 hover:scale-110"
              style={{ 
                left: '-6px', 
                top: `${30 + (index * 15)}%`,
                opacity: index < connectedInputs.length + 1 ? 1 : 0.3
              }}
            />
          ))}
          
          {/* Dynamic Output Handles */}
          {Array.from({ length: maxOutputs }, (_, index) => (
            <Handle
              key={`output-${index + 1}`}
              type="source"
              position={Position.Right}
              id={`output-${index + 1}`}
              className="w-3 h-3 bg-blue-500 border-2 border-blue-300 hover:bg-blue-400 transition-all duration-200 hover:scale-110"
              style={{ 
                right: '-6px', 
                top: `${30 + (index * 15)}%`,
                opacity: index < connectedOutputs.length + 1 ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-700 backdrop-blur-sm">
        <ContextMenuItem onClick={handleEdit} className="text-blue-400 hover:bg-blue-500/20">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Properties
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-400 hover:bg-emerald-500/20">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-400 hover:bg-purple-500/20">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuItem className="text-cyan-400 hover:bg-cyan-500/20">
          <Zap className="w-4 h-4 mr-2" />
          Test Action
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-700" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-400 hover:bg-orange-500/20">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-400 hover:bg-red-500/20">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const ConditionNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges.map(edge => ({ id: edge.id })) });
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    console.log('Edit node:', id);
  };

  // Dynamic handle management
  const edges = useReactFlow().getEdges();
  const connectedInputs = edges.filter(edge => edge.target === id);
  const maxInputs = Math.max(2, connectedInputs.length + 1);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/20 border-2 border-amber-500/30 rounded-2xl p-4 min-w-[200px] relative cursor-pointer hover:border-amber-400/50 transition-all duration-200 shadow-lg backdrop-blur-sm transform rotate-45" style={{ borderRadius: '24px' }}>
          <div className="transform -rotate-45">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                <data.icon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-amber-300 text-sm">{data.label}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{data.description}</p>
          </div>
          
          {/* Dynamic Input Handles */}
          {Array.from({ length: maxInputs }, (_, index) => (
            <Handle
              key={`input-${index + 1}`}
              type="target"
              position={Position.Left}
              id={`input-${index + 1}`}
              className="w-3 h-3 bg-amber-500 border-2 border-amber-300 hover:bg-amber-400 transition-all duration-200 hover:scale-110 transform -rotate-45"
              style={{ 
                left: '-6px', 
                top: `${40 + (index * 20)}%`, 
                transform: 'translateY(-50%) rotate(-45deg)',
                opacity: index < connectedInputs.length + 1 ? 1 : 0.3
              }}
            />
          ))}
          
          {/* Output Handles for Yes/No/Maybe */}
          <Handle
            id="yes"
            type="source"
            position={Position.Top}
            className="w-3 h-3 bg-emerald-500 border-2 border-emerald-300 hover:bg-emerald-400 transition-all duration-200 hover:scale-110 transform -rotate-45"
            style={{ top: '-6px', left: '30%', transform: 'translateX(-50%) rotate(-45deg)' }}
          />
          <Handle
            id="no"
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-red-500 border-2 border-red-300 hover:bg-red-400 transition-all duration-200 hover:scale-110 transform -rotate-45"
            style={{ bottom: '-6px', right: '30%', transform: 'translateX(50%) rotate(-45deg)' }}
          />
          <Handle
            id="maybe"
            type="source"
            position={Position.Right}
            className="w-3 h-3 bg-orange-500 border-2 border-orange-300 hover:bg-orange-400 transition-all duration-200 hover:scale-110 transform -rotate-45"
            style={{ right: '-6px', top: '50%', transform: 'translateY(-50%) rotate(-45deg)' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-700 backdrop-blur-sm">
        <ContextMenuItem onClick={handleEdit} className="text-blue-400 hover:bg-blue-500/20">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Condition
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-400 hover:bg-emerald-500/20">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-400 hover:bg-purple-500/20">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-700" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-400 hover:bg-orange-500/20">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-400 hover:bg-red-500/20">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const AINode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, getEdges } = useReactFlow();
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    const edges = getEdges();
    const connectedEdges = edges.filter(edge => edge.source === id || edge.target === id);
    
    if (connectedEdges.length > 0) {
      deleteElements({ edges: connectedEdges.map(edge => ({ id: edge.id })) });
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    console.log('Edit node:', id);
  };

  // Dynamic handle management
  const edges = useReactFlow().getEdges();
  const connectedInputs = edges.filter(edge => edge.target === id);
  const connectedOutputs = edges.filter(edge => edge.source === id);
  const maxInputs = Math.max(3, connectedInputs.length + 1);
  const maxOutputs = Math.max(3, connectedOutputs.length + 1);

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border-2 border-purple-500/30 rounded-xl p-4 min-w-[220px] relative cursor-pointer hover:border-purple-400/50 transition-all duration-200 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent text-sm">{data.label}</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-2">{data.description}</p>
          <Badge variant="outline" className="text-xs border-purple-500/50 text-purple-300 bg-purple-500/10">
            {data.aiModel}
          </Badge>
          
          {/* Dynamic Input Handles */}
          {Array.from({ length: maxInputs }, (_, index) => (
            <Handle
              key={`input-${index + 1}`}
              type="target"
              position={Position.Left}
              id={`input-${index + 1}`}
              className="w-3 h-3 bg-purple-500 border-2 border-purple-300 hover:bg-purple-400 transition-all duration-200 hover:scale-110"
              style={{ 
                left: '-6px', 
                top: `${30 + (index * 15)}%`,
                opacity: index < connectedInputs.length + 1 ? 1 : 0.3
              }}
            />
          ))}
          
          {/* Dynamic Output Handles */}
          {Array.from({ length: maxOutputs }, (_, index) => (
            <Handle
              key={`output-${index + 1}`}
              type="source"
              position={Position.Right}
              id={`output-${index + 1}`}
              className="w-3 h-3 bg-purple-500 border-2 border-purple-300 hover:bg-purple-400 transition-all duration-200 hover:scale-110"
              style={{ 
                right: '-6px', 
                top: `${30 + (index * 15)}%`,
                opacity: index < connectedOutputs.length + 1 ? 1 : 0.3
              }}
            />
          ))}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-700 backdrop-blur-sm">
        <ContextMenuItem onClick={handleEdit} className="text-blue-400 hover:bg-blue-500/20">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit AI Prompt
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-emerald-400 hover:bg-emerald-500/20">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-400 hover:bg-purple-500/20">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuItem className="text-cyan-400 hover:bg-cyan-500/20">
          <Zap className="w-4 h-4 mr-2" />
          Test AI Response
        </ContextMenuItem>
        <ContextMenuSeparator className="bg-slate-700" />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-400 hover:bg-orange-500/20">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-400 hover:bg-red-500/20">
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
  const [isConnecting, setIsConnecting] = useState(false);
  const [pendingConnection, setPendingConnection] = useState<{sourceNode: string, sourceHandle: string} | null>(null);
  const connectingNodeId = useRef<string | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        type: 'smoothstep',
        animated: false,
        style: { 
          stroke: '#00D9FF', 
          strokeWidth: 2,
          filter: 'drop-shadow(0 0 8px rgba(0, 217, 255, 0.4))'
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#00D9FF' },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      setIsConnecting(false);
      setPendingConnection(null);
      connectingNodeId.current = null;
      
      // Force re-render of nodes to update handle visibility
      setNodes((nds) => [...nds]);
    },
    [setEdges, setNodes],
  );

  const onConnectStart = useCallback((event: any, { nodeId, handleId }: { nodeId: string | null, handleId: string | null }) => {
    setIsConnecting(true);
    connectingNodeId.current = nodeId;
    if (nodeId && handleId) {
      setPendingConnection({ sourceNode: nodeId, sourceHandle: handleId });
    }
  }, []);

  const onConnectEnd = useCallback((event: any) => {
    const targetElement = document.elementFromPoint(event.clientX, event.clientY);
    const targetHandle = targetElement?.closest('.react-flow__handle-target');
    
    if (targetHandle && pendingConnection) {
      const targetNodeId = targetHandle.getAttribute('data-nodeid');
      const targetHandleId = targetHandle.getAttribute('data-handleid');
      
      if (targetNodeId && targetNodeId !== pendingConnection.sourceNode) {
        const connection: Connection = {
          source: pendingConnection.sourceNode,
          target: targetNodeId,
          sourceHandle: pendingConnection.sourceHandle,
          targetHandle: targetHandleId
        };
        onConnect(connection);
        return;
      }
    }
    
    setIsConnecting(false);
    setPendingConnection(null);
    connectingNodeId.current = null;
  }, [pendingConnection, onConnect]);

  // ... keep existing code (toolCategories and addNode function)
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
    <div className="h-screen flex bg-slate-950 overflow-hidden">
      {/* Left Panel - Tools with scroll */}
      <div className="w-80 bg-slate-900/50 border-r border-slate-700/50 flex flex-col backdrop-blur-sm">
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-100">Automation Builder</h2>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Play className="w-4 h-4 mr-2" />
                Test
              </Button>
            </div>
          </div>

          {isConnecting && (
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg backdrop-blur-sm">
              <p className="text-sm text-cyan-300 font-medium">🔗 Connection Mode Active</p>
              <p className="text-xs text-slate-400">Hover over a connection point to auto-connect</p>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-6">
            {toolCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-semibold text-slate-400 mb-3 uppercase tracking-wide">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.items.map((tool) => (
                    <Card 
                      key={tool.id}
                      className="p-3 cursor-pointer hover:bg-slate-800/50 transition-all duration-200 border-slate-700/50 bg-slate-800/30 backdrop-blur-sm"
                      onClick={() => addNode(tool)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tool.color === 'green' ? 'bg-emerald-500/20 text-emerald-400' :
                          tool.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                          tool.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                          tool.color === 'yellow' ? 'bg-amber-500/20 text-amber-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          <tool.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-slate-200">{tool.label}</p>
                            {tool.aiModel && (
                              <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-300 border-purple-500/30">
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
      </div>

      {/* Main Canvas - No scroll */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          nodeTypes={nodeTypes}
          fitView
          className="bg-slate-950"
          defaultEdgeOptions={{
            style: { stroke: '#00D9FF', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#00D9FF' },
          }}
          connectionLineStyle={{
            stroke: '#FF6B6B',
            strokeWidth: 3,
            strokeDasharray: '8,4',
            filter: 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.8))'
          }}
        >
          <Controls className="bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm" />
          <MiniMap 
            className="bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm" 
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
          <Button size="lg" className="rounded-full w-14 h-14 shadow-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 backdrop-blur-sm">
            <Settings className="w-6 h-6 text-slate-300" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Automation;
