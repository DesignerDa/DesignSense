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
import OutcomeNode from './components/nodes/OutcomeNode';
import LoadingNode from './components/nodes/LoadingNode';
import { generateScenarios, generateMethods, getOutcome } from './data/mockData';

const nodeTypes = {
  brief: BriefNode,
  scenario: ScenarioNode,
  method: MethodNode,
  outcome: OutcomeNode,
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
    
    // Lock the brief node and show loading state
    setNodes((nds) => nds.map(n => {
      if (n.id === 'brief') return { ...n, data: { ...n.data, isLocked: true, isLoading: true } };
      return n;
    }));

    // Add loading node
    const loadingId = 'loading-scenarios';
    setNodes((nds) => [
      ...nds, 
      { id: loadingId, type: 'loading', position: { x: 450, y: 150 }, data: { label: 'Generating Scenarios...' } }
    ]);
    
    setEdges((eds) => [
      ...eds,
      { id: 'e-brief-loading', source: 'brief', target: loadingId, ...defaultEdgeOptions }
    ]);

    // Simulate AI Delay
    setTimeout(() => {
      const scenarios = generateScenarios(brief);
      
      setNodes((nds) => {
        // Remove loading node and brief loading state
        const filtered = nds.filter(n => n.id !== loadingId).map(n => 
          n.id === 'brief' ? { ...n, data: { ...n.data, isLoading: false } } : n
        );
        
        // Add new scenario nodes spread vertically
        const startY = -150;
        const spacingY = 220;
        
        const scenarioNodes = scenarios.map((sc, idx) => ({
          id: `scenario-${sc.id}`,
          type: 'scenario',
          position: { x: 500, y: startY + (idx * spacingY) },
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

    }, 1500);
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
      { id: loadingId, type: 'loading', position: { x: 880, y: yPos + 20 }, data: { label: 'Analyzing Methods...' } }
    ]);

    setEdges((eds) => [
      ...eds.filter(e => !e.target.startsWith('method') && !e.target.startsWith('outcome') && e.id !== 'e-scenario-loading'),
      { id: 'e-scenario-loading', source: `scenario-${scenarioId}`, target: loadingId, ...defaultEdgeOptions }
    ]);

    setTimeout(() => {
      const methods = generateMethods(phase, scenarioId);
      
      setNodes((nds) => {
        const filtered = nds.filter(n => n.id !== loadingId);
        
        const startY = yPos - ((methods.length * 200) / 2) + 100;
        const spacingY = 200;
        
        const methodNodes = methods.map((m, idx) => ({
          id: `method-${m.id}`,
          type: 'method',
          position: { x: 950, y: startY + (idx * spacingY) },
          data: { 
            method: m,
            isDimmed: false,
            onSelect: () => handleSelectMethod(m.id, scenarioId, startY + (idx * spacingY))
          }
        }));

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
      ...nds.filter(n => n.type !== 'outcome' && n.id !== loadingId), 
      { id: loadingId, type: 'loading', position: { x: 1280, y: yPos + 20 }, data: { label: 'Generating Reflection...' } }
    ]);

    setEdges((eds) => [
      ...eds.filter(e => !e.target.startsWith('outcome') && e.id !== 'e-method-loading'),
      { id: 'e-method-loading', source: `method-${methodId}`, target: loadingId, ...defaultEdgeOptions }
    ]);

    setTimeout(() => {
      setNodes((nds) => {
        const filtered = nds.filter(n => n.id !== loadingId);
        // We need the briefState here. Since we can't reliably read it without dependencies, 
        // we'll extract it from the BriefNode or use the state.
        
        // Let's get outcome data
        const currentBrief = briefState;
        const outcome = getOutcome(currentBrief, scenarioId, methodId);
        
        const outcomeNode = {
          id: `outcome-${methodId}`,
          type: 'outcome',
          position: { x: 1350, y: yPos - 100 },
          data: { 
            outcome,
            brief: currentBrief,
            onReset: handleReset
          }
        };

        return [...filtered, outcomeNode];
      });

      setEdges((eds) => {
        const filtered = eds.filter(e => e.id !== 'e-method-loading');
        const edge = {
          id: `e-method-${methodId}-outcome`,
          source: `method-${methodId}`,
          target: `outcome-${methodId}`,
          ...defaultEdgeOptions,
          style: { stroke: '#3b82f6', strokeWidth: 3 },
          animated: false
        };
        return [...filtered, edge];
      });
    }, 1500);

  }, [briefState]);

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
        <Controls className="bg-white shadow-md border border-slate-200 rounded-lg" />
        <MiniMap 
          nodeColor={(n) => {
            if (n.type === 'brief') return '#6366f1';
            if (n.type === 'scenario') return '#f59e0b';
            if (n.type === 'method') return '#10b981';
            if (n.type === 'outcome') return '#3b82f6';
            return '#cbd5e1';
          }}
          maskColor="rgba(248, 250, 252, 0.7)"
          className="border-2 border-slate-200 rounded-lg shadow-md bg-white"
        />
      </ReactFlow>
    </div>
  );
}
