import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export default function ScenarioNode({ data, selected }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-xl shadow-lg border-2 w-[320px] transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl
        ${selected ? 'border-amber-500 ring-4 ring-amber-500/20' : 'border-gray-200'}
        ${data.isDimmed ? 'opacity-40 grayscale-[50%]' : 'opacity-100'}
      `}
      onClick={data.onSelect}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      
      <div className={`px-4 py-3 border-b
        ${selected ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-100'}
      `}>
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider">
            Scenario
          </span>
          {selected && (
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          )}
        </div>
        <div className="inline-block bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wide">
          {data.scenario.contextLabel || 'Problem Context'}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-sans font-bold text-gray-900 text-[15px] leading-tight">
          {data.scenario.title}
        </h3>
        <p className="font-mono text-sm text-gray-600 line-clamp-4 leading-relaxed">
          {data.scenario.descriptionTemplate}
        </p>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className={`w-3 h-3 border-2 border-white transition-colors ${selected ? 'bg-amber-500' : 'bg-gray-300'}`}
      />
    </motion.div>
  );
}
