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
    const connectedEdgeIds = edges
      .filter(edge => edge.source === id || edge.target === id)
      .map(edge => edge.id);
    
    if (connectedEdgeIds.length > 0) {
      deleteElements({ edges: connectedEdgeIds.map(edgeId => ({ id: edgeId })) });
    }
  };

  const handleDuplicate = () => {
    // Will be implemented by parent component
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    // Will be implemented by parent component
    console.log('Edit node:', id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/50 rounded-lg p-4 min-w-[200px] relative cursor-pointer hover:border-green-400 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <data.icon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-green-400">{data.label}</span>
          </div>
          <p className="text-xs text-muted-foreground">{data.description}</p>
          
          {/* Multiple Output Handles */}
          <Handle
            type="source"
            position={Position.Right}
            id="output-1"
            className="w-3 h-3 bg-green-500 border-2 border-green-300 hover:bg-green-400 transition-colors"
            style={{ right: '-6px', top: '30%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output-2"
            className="w-3 h-3 bg-green-500 border-2 border-green-300 hover:bg-green-400 transition-colors"
            style={{ right: '-6px', top: '70%' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit} className="text-blue-600">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Properties
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-green-600">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-600">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-600">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-600">
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
    const connectedEdgeIds = edges
      .filter(edge => edge.source === id || edge.target === id)
      .map(edge => edge.id);
    
    if (connectedEdgeIds.length > 0) {
      deleteElements({ edges: connectedEdgeIds.map(edgeId => ({ id: edgeId })) });
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    console.log('Edit node:', id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-500/50 rounded-lg p-4 min-w-[200px] relative cursor-pointer hover:border-blue-400 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <data.icon className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-blue-400">{data.label}</span>
          </div>
          <p className="text-xs text-muted-foreground">{data.description}</p>
          
          {/* Multiple Input/Output Handles */}
          <Handle
            type="target"
            position={Position.Left}
            id="input-1"
            className="w-3 h-3 bg-blue-500 border-2 border-blue-300 hover:bg-blue-400 transition-colors"
            style={{ left: '-6px', top: '30%' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="input-2"
            className="w-3 h-3 bg-blue-500 border-2 border-blue-300 hover:bg-blue-400 transition-colors"
            style={{ left: '-6px', top: '70%' }}
          />
          
          <Handle
            type="source"
            position={Position.Right}
            id="output-1"
            className="w-3 h-3 bg-blue-500 border-2 border-blue-300 hover:bg-blue-400 transition-colors"
            style={{ right: '-6px', top: '30%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output-2"
            className="w-3 h-3 bg-blue-500 border-2 border-blue-300 hover:bg-blue-400 transition-colors"
            style={{ right: '-6px', top: '70%' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit} className="text-blue-600">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Properties
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-green-600">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-600">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuItem className="text-cyan-600">
          <Zap className="w-4 h-4 mr-2" />
          Test Action
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-600">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-600">
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
    const connectedEdgeIds = edges
      .filter(edge => edge.source === id || edge.target === id)
      .map(edge => edge.id);
    
    if (connectedEdgeIds.length > 0) {
      deleteElements({ edges: connectedEdgeIds.map(edgeId => ({ id: edgeId })) });
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    console.log('Edit node:', id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/50 rounded-lg p-4 min-w-[200px] relative cursor-pointer hover:border-yellow-400 transition-colors transform rotate-45" style={{ borderRadius: '20px' }}>
          <div className="transform -rotate-45">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <data.icon className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-yellow-400">{data.label}</span>
            </div>
            <p className="text-xs text-muted-foreground">{data.description}</p>
          </div>
          
          {/* Input Handle */}
          <Handle
            type="target"
            position={Position.Left}
            id="input"
            className="w-3 h-3 bg-yellow-500 border-2 border-yellow-300 hover:bg-yellow-400 transition-colors transform -rotate-45"
            style={{ left: '-6px', top: '50%', transform: 'translateY(-50%) rotate(-45deg)' }}
          />
          
          {/* Output Handles for Yes/No */}
          <Handle
            id="yes"
            type="source"
            position={Position.Top}
            className="w-3 h-3 bg-green-500 border-2 border-green-300 hover:bg-green-400 transition-colors transform -rotate-45"
            style={{ top: '-6px', left: '30%', transform: 'translateX(-50%) rotate(-45deg)' }}
          />
          <Handle
            id="no"
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-red-500 border-2 border-red-300 hover:bg-red-400 transition-colors transform -rotate-45"
            style={{ bottom: '-6px', right: '30%', transform: 'translateX(50%) rotate(-45deg)' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit} className="text-blue-600">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit Condition
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-green-600">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-600">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-600">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-600">
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
    const connectedEdgeIds = edges
      .filter(edge => edge.source === id || edge.target === id)
      .map(edge => edge.id);
    
    if (connectedEdgeIds.length > 0) {
      deleteElements({ edges: connectedEdgeIds.map(edgeId => ({ id: edgeId })) });
    }
  };

  const handleDuplicate = () => {
    console.log('Duplicate node:', id);
  };

  const handleEdit = () => {
    console.log('Edit node:', id);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/50 rounded-lg p-4 min-w-[200px] relative cursor-pointer hover:border-purple-400 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{data.label}</span>
          </div>
          <p className="text-xs text-muted-foreground">{data.description}</p>
          <Badge variant="outline" className="mt-2 text-xs border-purple-500/50 text-purple-400">
            {data.aiModel}
          </Badge>
          
          {/* Multiple Input/Output Handles */}
          <Handle
            type="target"
            position={Position.Left}
            id="input-1"
            className="w-3 h-3 bg-purple-500 border-2 border-purple-300 hover:bg-purple-400 transition-colors"
            style={{ left: '-6px', top: '30%' }}
          />
          <Handle
            type="target"
            position={Position.Left}
            id="input-2"
            className="w-3 h-3 bg-purple-500 border-2 border-purple-300 hover:bg-purple-400 transition-colors"
            style={{ left: '-6px', top: '70%' }}
          />
          
          <Handle
            type="source"
            position={Position.Right}
            id="output-1"
            className="w-3 h-3 bg-purple-500 border-2 border-purple-300 hover:bg-purple-400 transition-colors"
            style={{ right: '-6px', top: '30%' }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output-2"
            className="w-3 h-3 bg-purple-500 border-2 border-purple-300 hover:bg-purple-400 transition-colors"
            style={{ right: '-6px', top: '70%' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleEdit} className="text-blue-600">
          <Edit3 className="w-4 h-4 mr-2" />
          Edit AI Prompt
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDuplicate} className="text-green-600">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-600">
          <Palette className="w-4 h-4 mr-2" />
          Change Color
        </ContextMenuItem>
        <ContextMenuItem className="text-cyan-600">
          <Zap className="w-4 h-4 mr-2" />
          Test AI Response
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleDisconnect} className="text-orange-600">
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-600">
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
        animated: false, // Solid line when connection is complete
        style: { 
          stroke: '#00FFFF', 
          strokeWidth: 3,
          filter: 'drop-shadow(0 0 6px rgba(0, 255, 255, 0.6))'
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#00FFFF' },
      };
      
      setEdges((eds) => addEdge(newEdge, eds));
      setIsConnecting(false);
      setPendingConnection(null);
      connectingNodeId.current = null;
    },
    [setEdges],
  );

  const onConnectStart = useCallback((event: any, { nodeId, handleId }: { nodeId: string | null, handleId: string | null }) => {
    setIsConnecting(true);
    connectingNodeId.current = nodeId;
    if (nodeId && handleId) {
      setPendingConnection({ sourceNode: nodeId, sourceHandle: handleId });
    }
  }, []);

  const onConnectEnd = useCallback((event: any) => {
    // Check if we're over a valid target handle
    const targetElement = document.elementFromPoint(event.clientX, event.clientY);
    const targetHandle = targetElement?.closest('.react-flow__handle-target');
    
    if (targetHandle && pendingConnection) {
      const targetNodeId = targetHandle.getAttribute('data-nodeid');
      const targetHandleId = targetHandle.getAttribute('data-handleid');
      
      if (targetNodeId && targetNodeId !== pendingConnection.sourceNode) {
        // Auto-connect when hovering over a valid target
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

  // ... keep existing code (toolCategories array)
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
    <div className="h-full flex animate-fade-in overflow-hidden">
      {/* Left Panel - Tools with scroll */}
      <div className="w-80 bg-card border-r border-border flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
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

          {isConnecting && (
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-sm text-cyan-400 font-medium">🔗 Connection Mode Active</p>
              <p className="text-xs text-muted-foreground">Hover over a connection point to auto-connect</p>
            </div>
          )}
        </div>

        <div className="flex-1 p-4 overflow-y-auto scroll-hidden">
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
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          tool.color === 'green' ? 'bg-green-500/20' :
                          tool.color === 'blue' ? 'bg-blue-500/20' :
                          tool.color === 'purple' ? 'bg-purple-500/20' :
                          tool.color === 'yellow' ? 'bg-yellow-500/20' :
                          'bg-primary/20'
                        }`}>
                          <tool.icon className={`w-4 h-4 ${
                            tool.color === 'green' ? 'text-green-500' :
                            tool.color === 'blue' ? 'text-blue-500' :
                            tool.color === 'purple' ? 'text-purple-500' :
                            tool.color === 'yellow' ? 'text-yellow-500' :
                            'text-primary'
                          }`} />
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
      </div>

      {/* Main Canvas - No scroll */}
      <div className="flex-1 relative overflow-hidden">
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
          className="bg-background"
          defaultEdgeOptions={{
            style: { stroke: '#00FFFF', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#00FFFF' },
          }}
          connectionLineStyle={{
            stroke: '#FF6B6B',
            strokeWidth: 3,
            strokeDasharray: '8,4',
            filter: 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.8))'
          }}
        >
          <Controls className="bg-card border border-border" />
          <MiniMap 
            className="bg-card border border-border" 
            nodeColor={(node) => {
              switch(node.type) {
                case 'trigger': return '#22c55e';
                case 'action': return '#3b82f6';
                case 'condition': return '#eab308';
                case 'ai': return '#8b5cf6';
                default: return '#00FFFF';
              }
            }}
            maskColor="rgba(0, 0, 0, 0.8)"
          />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#333" />
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
