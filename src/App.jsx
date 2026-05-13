import { useState, useCallback, useRef } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import BriefNode from './components/nodes/BriefNode';
import ScenarioNode from './components/nodes/ScenarioNode';
import MethodNode from './components/nodes/MethodNode';
import SummaryNode from './components/nodes/SummaryNode';
import DiscussionNode from './components/nodes/DiscussionNode';
import LoadingNode from './components/nodes/LoadingNode';
import { generateScenarios, generateMethods, getOutcome } from './data/mockData';

const nodeTypes = {
  brief: BriefNode,
  scenario: ScenarioNode,
  method: MethodNode,
  summary: SummaryNode,
  discussion: DiscussionNode,
  loading: LoadingNode
};

const defaultEdgeOptions = {
  type: 'smoothstep',
  animated: true,
  style: { stroke: '#9ca3af', strokeWidth: 2 },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: '#9ca3af',
  },
};

export default function App() {
  const [briefState, setBriefState] = useState(null);
  const briefRef = useRef(null);
  
  const initialNodes = [
    {
      id: 'brief',
      type: 'brief',
      position: { x: 50, y: 100 },
      data: { onGenerate: (brief) => handleGenerateScenarios(brief), isLocked: false, isLoading: false }
    }
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleGenerateScenarios = useCallback((brief) => {
    setBriefState(brief);
    briefRef.current = brief;
    
    // Lock the brief node and show loading state
    setNodes((nds) => nds.map(n => {
      if (n.id === 'brief') return { ...n, data: { ...n.data, isLocked: true, isLoading: true } };
      return n;
    }));

    // Add loading node
    const loadingId = 'loading-scenarios';
    setNodes((nds) => [
      ...nds, 
      { id: loadingId, type: 'loading', position: { x: 500, y: 150 }, data: { label: 'Analyzing context...' } }
    ]);
    
    setEdges((eds) => [
      ...eds,
      { id: 'e-brief-loading', source: 'brief', target: loadingId, ...defaultEdgeOptions }
    ]);

    // Simulate multi-stage AI Delay
    setTimeout(() => {
      setNodes(nds => nds.map(n => n.id === loadingId ? { ...n, data: { label: 'Identifying stakeholders...' } } : n));
    }, 1000);

    setTimeout(() => {
      setNodes(nds => nds.map(n => n.id === loadingId ? { ...n, data: { label: 'Generating design pathways...' } } : n));
    }, 2000);

    setTimeout(() => {
      const scenarios = generateScenarios(brief);
      
      setNodes((nds) => {
        // Remove loading node and brief loading state
        const filtered = nds.filter(n => n.id !== loadingId).map(n => 
          n.id === 'brief' ? { ...n, data: { ...n.data, isLoading: false } } : n
        );
        
        // Add new scenario nodes spread vertically
        const startY = -((scenarios.length * 240) / 2) + 200;
        const spacingY = 240;
        
        const scenarioNodes = scenarios.map((sc, idx) => ({
          id: `scenario-${sc.id}`,
          type: 'scenario',
          position: { x: 550, y: startY + (idx * spacingY) },
          data: { 
            scenario: sc, 
            isDimmed: false,
            onSelect: () => handleSelectScenario(sc.id, brief.phase, startY + (idx * spacingY))
          }
        }));

        return [...filtered, ...scenarioNodes];
      });

      setEdges((eds) => {
        const filtered = eds.filter(e => e.id !== 'e-brief-loading');
        const newEdges = scenarios.map(sc => ({
          id: `e-brief-${sc.id}`,
          source: 'brief',
          target: `scenario-${sc.id}`,
          ...defaultEdgeOptions
        }));
        return [...filtered, ...newEdges];
      });

    }, 3000);
  }, []);

  const handleSelectScenario = useCallback((scenarioId, phase, yPos) => {
    // Dim other scenarios and select this one
    setNodes((nds) => nds.map(n => {
      if (n.type === 'scenario') {
        const isSelected = n.id === `scenario-${scenarioId}`;
        return { 
          ...n, 
          selected: isSelected,
          data: { ...n.data, isDimmed: !isSelected }
        };
      }
      return n;
    }));

    // Add loading node for methods
    const loadingId = 'loading-methods';
    setNodes((nds) => [
      ...nds.filter(n => n.type !== 'method' && n.type !== 'outcome' && n.id !== loadingId), 
      { id: loadingId, type: 'loading', position: { x: 930, y: yPos + 20 }, data: { label: 'Analyzing Methods...' } }
    ]);

    setEdges((eds) => [
      ...eds.filter(e => !e.target.startsWith('method') && !e.target.startsWith('outcome') && e.id !== 'e-scenario-loading'),
      { id: 'e-scenario-loading', source: `scenario-${scenarioId}`, target: loadingId, ...defaultEdgeOptions }
    ]);

    setTimeout(() => {
      const methods = generateMethods(phase, scenarioId);
      
      setNodes((nds) => {
        const filtered = nds.filter(n => n.id !== loadingId);
        
        const rows = Math.ceil(methods.length / 2);
        const startY = yPos - ((rows * 180) / 2) + 90;
        
        const methodNodes = methods.map((m, idx) => {
          const col = idx % 2;
          const row = Math.floor(idx / 2);
          return {
            id: `method-${m.id}`,
            type: 'method',
            position: { x: 1000 + (col * 320), y: startY + (row * 180) },
            data: { 
              method: m,
              isDimmed: false,
              onSelect: () => handleSelectMethod(m.id, scenarioId, startY + (row * 180))
            }
          };
        });

        return [...filtered, ...methodNodes];
      });

      setEdges((eds) => {
        const filtered = eds.filter(e => e.id !== 'e-scenario-loading');
        const newEdges = methods.map(m => ({
          id: `e-scenario-${scenarioId}-method-${m.id}`,
          source: `scenario-${scenarioId}`,
          target: `method-${m.id}`,
          ...defaultEdgeOptions
        }));
        return [...filtered, ...newEdges];
      });
    }, 1500);

  }, []);

  const handleSelectMethod = useCallback((methodId, scenarioId, yPos) => {
    // Dim other methods
    setNodes((nds) => nds.map(n => {
      if (n.type === 'method') {
        const isSelected = n.id === `method-${methodId}`;
        return { 
          ...n, 
          selected: isSelected,
          data: { ...n.data, isDimmed: !isSelected }
        };
      }
      return n;
    }));

    const loadingId = 'loading-outcome';
    setNodes((nds) => [
      ...nds.filter(n => n.type !== 'summary' && n.type !== 'discussion' && n.id !== loadingId), 
      { id: loadingId, type: 'loading', position: { x: 1350, y: yPos + 20 }, data: { label: 'Constructing design reasoning...' } }
    ]);

    setEdges((eds) => [
      ...eds.filter(e => !e.target.startsWith('summary') && !e.target.startsWith('discussion') && e.id !== 'e-method-loading'),
      { id: 'e-method-loading', source: `method-${methodId}`, target: loadingId, ...defaultEdgeOptions }
    ]);

    // Simulate multi-stage AI Delay
    setTimeout(() => {
      setNodes(nds => nds.map(n => n.id === loadingId ? { ...n, data: { label: 'Generating reflective prompts...' } } : n));
    }, 1000);

    setTimeout(() => {
      setNodes(nds => nds.map(n => n.id === loadingId ? { ...n, data: { label: 'Preparing discussion space...' } } : n));
    }, 2000);

    setTimeout(() => {
      setNodes((nds) => {
        const filtered = nds.filter(n => n.id !== loadingId);
        
        const currentBrief = briefRef.current;
        const outcome = getOutcome(currentBrief, scenarioId, methodId);
        
        const summaryNode = {
          id: `summary-${methodId}`,
          type: 'summary',
          position: { x: 1400, y: yPos - 120 },
          data: { outcome }
        };

        const discussionNode = {
          id: `discussion-${methodId}`,
          type: 'discussion',
          position: { x: 1850, y: yPos - 120 },
          data: { 
            outcome,
            brief: currentBrief,
            onReset: handleReset
          }
        };

        return [...filtered, summaryNode, discussionNode];
      });

      setEdges((eds) => {
        const filtered = eds.filter(e => e.id !== 'e-method-loading');
        const edge1 = {
          id: `e-method-${methodId}-summary`,
          source: `method-${methodId}`,
          target: `summary-${methodId}`,
          ...defaultEdgeOptions,
          style: { stroke: '#6366f1', strokeWidth: 3 },
          animated: false
        };
        const edge2 = {
          id: `e-summary-${methodId}-discussion`,
          source: `summary-${methodId}`,
          target: `discussion-${methodId}`,
          ...defaultEdgeOptions,
          style: { stroke: '#3b82f6', strokeWidth: 3 },
          animated: false
        };
        return [...filtered, edge1, edge2];
      });
    }, 3000);

  }, []);

  const handleReset = useCallback(() => {
    setBriefState(null);
    setNodes([{
      id: 'brief',
      type: 'brief',
      position: { x: 50, y: 100 },
      data: { onGenerate: (brief) => handleGenerateScenarios(brief), isLocked: false, isLoading: false }
    }]);
    setEdges([]);
  }, [handleGenerateScenarios]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.2}
        className="bg-slate-50"
      >
        <Background color="#cbd5e1" gap={20} size={2} />
        <Controls className="bg-white shadow-md border border-slate-200 rounded-lg mb-16" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'brief') return '#6366f1';
            if (n.type === 'scenario') return '#f59e0b';
            if (n.type === 'method') return '#10b981';
            if (n.type === 'outcome') return '#3b82f6';
            return '#cbd5e1';
          }}
          maskColor="rgba(248, 250, 252, 0.7)"
          className="border-2 border-slate-200 rounded-lg shadow-md bg-white mb-16"
        />
      </ReactFlow>

      {/* Persistent Bottom Bar */}
      {briefState && briefState.prompt && (
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] p-4 flex flex-col items-center justify-center z-10 transition-all duration-500 transform translate-y-0">
          <div className="max-w-4xl w-full text-center">
            <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-widest block mb-1">Your Input</span>
            <p className="text-sm font-sans text-slate-700 italic m-0">"{briefState.prompt}"</p>
          </div>
        </div>
      )}
    </div>
  );
}
