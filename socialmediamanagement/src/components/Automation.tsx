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
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Plus, 
  Play, 
  Save, 
  Settings, 
  MessageSquare, 
  Users, 
  Share2, 
  Bot, 
  Timer, 
  Filter, 
  Trash2, 
  Unlink,
  Copy, 
  Edit3, 
  Zap, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  MoreHorizontal
} from 'lucide-react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from '@/components/ui/context-menu';
import { useToast } from '@/hooks/use-toast';

// Node configuration interface
interface NodeConfig {
  message?: string;
  condition?: string;
  operator?: string;
  value?: string;
  platform?: string;
  aiModel?: string;
  prompt?: string;
}

// =============================================================================
// Node Components: TriggerNode, ActionNode, ConditionNode, AINode
// =============================================================================

function TriggerNode({ data, id }: { data: any; id: string }) {
  const { deleteElements, getEdges, setNodes, getNodes, setEdges } = useReactFlow(); 
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<NodeConfig>(data.config || {});
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false); 

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    setEdges((eds) => eds.filter(edge => edge.source !== id && edge.target !== id));
  };

  const handleSave = () => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
    setIsOpen(false);
  };

  const handleDuplicate = (withConfig: boolean) => {
    const currentNode = getNodes().find(node => node.id === id);
    if (!currentNode) return;

    const newId = `${Date.now()}`;
    const newPosition = {
      x: currentNode.position.x + 100, 
      y: currentNode.position.y + 100,
    };

    const duplicatedNode: Node = {
      id: newId,
      type: currentNode.type,
      position: newPosition,
      data: {
        ...currentNode.data,
        config: withConfig ? JSON.parse(JSON.stringify(currentNode.data.config)) : {},
      },
    };

    setNodes((nds) => [...nds, duplicatedNode]);
    setIsDuplicateDialogOpen(false);
  };

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

          <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Edit3 className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Configure {data.label}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-200">Trigger Type</Label>
                    <Select value={config.platform} onValueChange={(value) => setConfig({...config, platform: value})}>
                      <SelectTrigger className="bg-slate-800 border-slate-600">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleSave} className="w-full">Save Configuration</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
              <Eye className="w-3 h-3 text-white" />
            </Button>
            <Dialog open={isDuplicateDialogOpen} onOpenChange={setIsDuplicateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Copy className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Duplicate Node</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-slate-300">How would you like to duplicate this node?</p>
                  <Button onClick={() => handleDuplicate(true)} className="w-full">Duplicate with Current Configuration</Button>
                  <Button onClick={() => handleDuplicate(false)} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50">Duplicate as Fresh Node (No Config)</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40" onClick={handleDelete}>
              <Trash2 className="w-3 h-3 text-white" />
            </Button>
          </div>

          <Handle
            type="source"
            position={Position.Right}
            id="output"
            className="w-3 h-3 bg-emerald-400 border-2 border-emerald-200 hover:bg-emerald-300 transition-all duration-200 hover:scale-125 shadow-lg"
            style={{ right: '-6px', top: '50%' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={() => setIsOpen(true)} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Configure
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDisconnect} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer"> 
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => setIsDuplicateDialogOpen(true)} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const ActionNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, setNodes, setEdges, getEdges, getNodes } = useReactFlow(); 
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<NodeConfig>(data.config || {});
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false); 
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    setEdges((eds) => eds.filter(edge => edge.source !== id && edge.target !== id));
  };

  const handleSave = () => {
    setNodes((nodes) => 
      nodes.map((node) => 
        node.id === id 
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
    setIsOpen(false);
  };

  const handleDuplicate = (withConfig: boolean) => {
    const currentNode = getNodes().find(node => node.id === id);
    if (!currentNode) return;

    const newId = `${Date.now()}`;
    const newPosition = {
      x: currentNode.position.x + 100, 
      y: currentNode.position.y + 100,
    };

    const duplicatedNode: Node = {
      id: newId,
      type: currentNode.type,
      position: newPosition,
      data: {
        ...currentNode.data,
        config: withConfig ? JSON.parse(JSON.stringify(currentNode.data.config)) : {}, 
      },
    };

    setNodes((nds) => [...nds, duplicatedNode]);

    if (withConfig) {
      const incomingEdges = getEdges().filter(edge => edge.target === id);
      setEdges((eds) => {
        const newEdges = incomingEdges.map(edge => ({
          ...edge,
          id: `edge-${edge.source}-${newId}-${Date.now()}`, 
          target: newId, 
        }));
        return [...eds, ...newEdges];
      });
    }
    
    setIsDuplicateDialogOpen(false);
  };

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
          
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Edit3 className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Configure {data.label}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {data.id === 'send-dm' && (
                    <>
                      <div>
                        <Label className="text-slate-200">Platform</Label>
                        <Select value={config.platform} onValueChange={(value) => setConfig({...config, platform: value})}>
                          <SelectTrigger className="bg-slate-800 border-slate-600">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-200">Message</Label>
                        <Textarea 
                          placeholder="Enter the message to send..."
                          value={config.message || ''}
                          onChange={(e) => setConfig({...config, message: e.target.value})}
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                    </>
                  )}
                  {data.id === 'post-content' && (
                    <>
                      <div>
                        <Label className="text-slate-200">Platform</Label>
                        <Select value={config.platform} onValueChange={(value) => setConfig({...config, platform: value})}>
                          <SelectTrigger className="bg-slate-800 border-slate-600">
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="instagram">Instagram</SelectItem>
                            <SelectItem value="twitter">Twitter</SelectItem>
                            <SelectItem value="facebook">Facebook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-200">Content</Label>
                        <Textarea 
                          placeholder="Enter the content to post..."
                          value={config.message || ''}
                          onChange={(e) => setConfig({...config, message: e.target.value})}
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                    </>
                  )}
                  <Button onClick={handleSave} className="w-full">Save Configuration</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
              <Eye className="w-3 h-3 text-white" />
            </Button>
            <Dialog open={isDuplicateDialogOpen} onOpenChange={setIsDuplicateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Copy className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Duplicate Node</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-slate-300">How would you like to duplicate this node?</p>
                  <Button onClick={() => handleDuplicate(true)} className="w-full">Duplicate with Current Configuration</Button>
                  <Button onClick={() => handleDuplicate(false)} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50">Duplicate as Fresh Node (No Config)</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40" onClick={handleDelete}>
              <Trash2 className="w-3 h-3 text-white" />
            </Button>
          </div>
          
          <Handle
            type="target"
            position={Position.Left}
            id="input"
            className="w-3 h-3 bg-blue-400 border-2 border-blue-200 hover:bg-blue-300 transition-all duration-200 hover:scale-125 shadow-lg"
            style={{ left: '-6px', top: '50%' }}
          />
          
          <Handle
            type="source"
            position={Position.Right}
            id="output"
            className="w-3 h-3 bg-blue-400 border-2 border-blue-200 hover:bg-blue-300 transition-all duration-200 hover:scale-125 shadow-lg"
            style={{ right: '-6px', top: '50%' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={() => setIsOpen(true)} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Configure
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDisconnect} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer"> 
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => setIsDuplicateDialogOpen(true)} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const ConditionNode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, setNodes, getNodes, setEdges, getEdges } = useReactFlow(); 
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<NodeConfig>(data.config || {});
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false); 
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    setEdges((eds) => eds.filter(edge => edge.source !== id && edge.target !== id));
  };

  const handleSave = () => {
    setNodes((nodes) => 
      nodes.map((node) => 
        node.id === id 
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
    setIsOpen(false);
  };

  const handleDuplicate = (withConfig: boolean) => {
    const currentNode = getNodes().find(node => node.id === id);
    if (!currentNode) return;

    const newId = `${Date.now()}`;
    const newPosition = {
      x: currentNode.position.x + 100, 
      y: currentNode.position.y + 100,
    };

    const duplicatedNode: Node = {
      id: newId,
      type: currentNode.type,
      position: newPosition,
      data: {
        ...currentNode.data,
        config: withConfig ? JSON.parse(JSON.stringify(currentNode.data.config)) : {}, 
      },
    };

    setNodes((nds) => [...nds, duplicatedNode]);

    if (withConfig) {
      const incomingEdges = getEdges().filter(edge => edge.target === id);
      setEdges((eds) => {
        const newEdges = incomingEdges.map(edge => ({
          ...edge,
          id: `edge-${edge.source}-${newId}-${Date.now()}`, 
          target: newId, 
        }));
        return [...eds, ...newEdges];
      });
    }

    setIsDuplicateDialogOpen(false);
  };

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
          
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity transform -rotate-45">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Edit3 className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Configure Condition</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-200">Condition Type</Label>
                    <Select value={config.operator} onValueChange={(value) => setConfig({...config, operator: value})}>
                      <SelectTrigger className="bg-slate-800 border-slate-600">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contains">Contains</SelectItem>
                        <SelectItem value="equals">Equals</SelectItem>
                        <SelectItem value="greater">Greater than</SelectItem>
                        <SelectItem value="less">Less than</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-200">Value</Label>
                    <Input 
                      placeholder="Enter value to compare..."
                      value={config.value || ''}
                      onChange={(e) => setConfig({...config, value: e.target.value})}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">Save Configuration</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
              <Eye className="w-3 h-3 text-white" />
            </Button>
            <Dialog open={isDuplicateDialogOpen} onOpenChange={setIsDuplicateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Copy className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Duplicate Node</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-slate-300">How would you like to duplicate this node?</p>
                  <Button onClick={() => handleDuplicate(true)} className="w-full">Duplicate with Current Configuration</Button>
                  <Button onClick={() => handleDuplicate(false)} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50">Duplicate as Fresh Node (No Config)</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40" onClick={handleDelete}>
              <Trash2 className="w-3 h-3 text-white" />
            </Button>
          </div>
          
          <Handle
            type="target"
            position={Position.Left}
            id="input"
            className="w-3 h-3 bg-amber-400 border-2 border-amber-200 hover:bg-amber-300 transition-all duration-200 hover:scale-125 shadow-lg transform -rotate-45"
            style={{ left: '-6px', top: '50%', transform: 'translateY(-50%) rotate(-45deg)' }}
          />
          
          <Handle
            id="yes"
            type="source"
            position={Position.Top}
            className="w-3 h-3 bg-emerald-400 border-2 border-emerald-200 hover:bg-emerald-300 transition-all duration-200 hover:scale-125 shadow-lg transform -rotate-45"
            style={{ top: '-6px', left: '30%', transform: 'translateX(-50%) rotate(-45deg)' }}
          />
          <Handle
            id="no"
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-red-400 border-2 border-red-200 hover:bg-red-300 transition-all duration-200 hover:scale-125 shadow-lg transform -rotate-45"
            style={{ bottom: '-6px', right: '30%', transform: 'translateX(50%) rotate(-45deg)' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={() => setIsOpen(true)} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Configure
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDisconnect} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer"> 
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => setIsDuplicateDialogOpen(true)} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

const AINode = ({ data, id }: { data: any; id: string }) => {
  const { deleteElements, setNodes, getNodes, setEdges, getEdges } = useReactFlow(); 
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<NodeConfig>(data.config || {});
  const [isDuplicateDialogOpen, setIsDuplicateDialogOpen] = useState(false); 
  
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  const handleDisconnect = () => {
    setEdges((eds) => eds.filter(edge => edge.source !== id && edge.target !== id));
  };

  const handleSave = () => {
    setNodes((nodes) => 
      nodes.map((node) => 
        node.id === id 
          ? { ...node, data: { ...node.data, config } }
          : node
      )
    );
    setIsOpen(false);
  };

  const handleDuplicate = (withConfig: boolean) => {
    const currentNode = getNodes().find(node => node.id === id);
    if (!currentNode) return;

    const newId = `${Date.now()}`;
    const newPosition = {
      x: currentNode.position.x + 100, 
      y: currentNode.position.y + 100,
    };

    const duplicatedNode: Node = {
      id: newId,
      type: currentNode.type,
      position: newPosition,
      data: {
        ...currentNode.data,
        config: withConfig ? JSON.parse(JSON.stringify(currentNode.data.config)) : {}, 
      },
    };

    setNodes((nds) => [...nds, duplicatedNode]);

    if (withConfig) {
      const incomingEdges = getEdges().filter(edge => edge.target === id);
      setEdges((eds) => {
        const newEdges = incomingEdges.map(edge => ({
          ...edge,
          id: `edge-${edge.source}-${newId}-${Date.now()}`, 
          target: newId, 
        }));
        return [...eds, ...newEdges];
      });
    }

    setIsDuplicateDialogOpen(false);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/30 border-2 border-purple-400/50 rounded-xl p-4 min-w-[220px] relative cursor-pointer hover:border-purple-300/70 transition-all duration-200 shadow-xl backdrop-blur-md hover:hover:shadow-purple-500/20">
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
          
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Edit3 className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Configure AI Model</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-200">AI Model</Label>
                    <Select value={config.aiModel} onValueChange={(value) => setConfig({...config, aiModel: value})}>
                      <SelectTrigger className="bg-slate-800 border-slate-600">
                        <SelectValue placeholder="Select AI model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-200">Prompt</Label>
                    <Textarea 
                      placeholder="Enter the AI prompt..."
                      value={config.prompt || ''}
                      onChange={(e) => setConfig({...config, prompt: e.target.value})}
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <Button onClick={handleSave} className="w-full">Save Configuration</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
              <Eye className="w-3 h-3 text-white" />
            </Button>
            <Dialog open={isDuplicateDialogOpen} onOpenChange={setIsDuplicateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40">
                  <Copy className="w-3 h-3 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Duplicate Node</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-slate-300">How would you like to duplicate this node?</p>
                  <Button onClick={() => handleDuplicate(true)} className="w-full">Duplicate with Current Configuration</Button>
                  <Button onClick={() => handleDuplicate(false)} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50">Duplicate as Fresh Node (No Config)</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 bg-black/20 hover:bg-black/40" onClick={handleDelete}>
              <Trash2 className="w-3 h-3 text-white" />
            </Button>
          </div>
          
          <Handle
            type="target"
            position={Position.Left}
            id="input"
            className="w-3 h-3 bg-purple-400 border-2 border-purple-200 hover:bg-purple-300 transition-all duration-200 hover:scale-125 shadow-lg"
            style={{ left: '-6px', top: '50%' }}
          />
          
          <Handle
            type="source"
            position={Position.Right}
            id="output"
            className="w-3 h-3 bg-purple-400 border-2 border-purple-200 hover:bg-purple-300 transition-all duration-200 hover:scale-125 shadow-lg"
            style={{ right: '-6px', top: '50%' }}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48 bg-slate-900/95 border-slate-600 backdrop-blur-md shadow-xl">
        <ContextMenuItem onClick={() => setIsOpen(true)} className="text-blue-300 hover:bg-blue-500/20 cursor-pointer">
          <Edit3 className="w-4 h-4 mr-2" />
          Configure
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete} className="text-red-300 hover:bg-red-500/20 cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDisconnect} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer"> 
          <Unlink className="w-4 h-4 mr-2" />
          Disconnect All
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => setIsDuplicateDialogOpen(true)} className="text-slate-300 hover:bg-slate-700/50 cursor-pointer">
          <Copy className="w-4 h-4 mr-2" />
          Duplicate
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

// =============================================================================
// New Sidebar Component
// =============================================================================
interface SidebarProps {
  isCollapsed: boolean;
  handleSave: () => void;
  handleTest: () => void;
  toolCategories: any[];
  addNode: (tool: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, handleSave, handleTest, toolCategories, addNode }) => {
  if (isCollapsed) return null; // Render nothing if collapsed

  return (
    <div className="w-80 h-full transition-all duration-300 bg-slate-900/70 border-r border-slate-600/50 flex flex-col backdrop-blur-xl flex-shrink-0 overflow-hidden">
      <div className="p-4 border-b border-slate-600/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-100">Automation Builder</h2>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={handleSave} className="border-slate-600 text-slate-300 hover:bg-slate-700/50 backdrop-blur-sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={handleTest} className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg">
              <Play className="w-4 h-4 mr-2" />
              Test
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto min-h-0">
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
    </div>
  );
};

// =============================================================================
// New MainCanvas Component
// =============================================================================
interface MainCanvasProps {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: any;
  onEdgesChange: any;
  onConnect: (connection: Connection) => void;
  nodeTypes: NodeTypes;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const MainCanvas: React.FC<MainCanvasProps> = ({ 
  nodes, 
  edges, 
  onNodesChange, 
  onEdgesChange, 
  onConnect, 
  nodeTypes,
  isSidebarCollapsed,
  setIsSidebarCollapsed
}) => {
  return (
    <div className="flex-1 relative h-full min-h-0">
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
        className="bg-gradient-to-br from-slate-950 to-slate-900 h-full"
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
        zoomOnScroll={true}
        panOnDrag={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={false}
        preventScrolling={true}
      >
        <Controls className="bg-white text-gray-900 border border-gray-300 shadow-xl mt-20" position="top-left" />
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
          position="bottom-left"
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
  );
};

// =============================================================================
// Main Automation Component (Parent)
// =============================================================================
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
      icon: MessageSquare,
      config: {}
    },
  },
];

const initialEdges: Edge[] = [];

function Automation() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const { toast } = useToast();

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
    },
    [setEdges],
  );

  const handleSave = () => {
    const workflow = {
      nodes,
      edges,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('automation-workflow', JSON.stringify(workflow));
    toast({
      title: "Workflow Saved",
      description: "Your automation workflow has been saved successfully.",
    });
  };

  const handleTest = () => {
    toast({
      title: "Testing Workflow",
      description: "Running test execution of your automation workflow...",
    });
    setTimeout(() => {
      toast({
        title: "Test Complete",
        description: "Workflow test completed successfully!",
      });
    }, 2000);
  };

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
    let nodeType: string;
    if (tool.aiModel) {
      nodeType = 'ai';
    } else if (toolCategories[0].items.some((item: any) => item.id === tool.id)) {
      nodeType = 'trigger';
    } else if (toolCategories[3].items.some((item: any) => item.id === tool.id)) {
      nodeType = 'condition';
    } else {
      nodeType = 'action';
    }

    const newNode: Node = {
      id: `${Date.now()}`,
      type: nodeType,
      position: { x: Math.random() * 400 + 300, y: Math.random() * 200 + 200 },
      data: {
        ...tool,
        icon: tool.icon,
        config: {}
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <ReactFlowProvider> 
      <div className="h-full flex bg-gradient-to-br from-slate-950 to-slate-900 overflow-hidden">
        {/* Sidebar Component */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          handleSave={handleSave}
          handleTest={handleTest}
          toolCategories={toolCategories}
          addNode={addNode}
        />

        {/* Main Canvas Component */}
        <MainCanvas
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
      </div>
    </ReactFlowProvider>
  );
};

export default Automation;
