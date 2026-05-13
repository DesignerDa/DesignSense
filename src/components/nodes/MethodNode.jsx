import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export default function MethodNode({ data, selected }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-xl shadow-lg border-2 w-[280px] transition-all cursor-pointer hover:-translate-y-1 hover:shadow-xl
        ${selected ? 'border-emerald-500 ring-4 ring-emerald-500/20' : 'border-gray-200'}
        ${data.isDimmed ? 'opacity-40 grayscale-[50%]' : 'opacity-100'}
      `}
      onClick={data.onSelect}
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-gray-400 border-2 border-white"
      />
      
      <div className={`px-4 py-3 border-b flex justify-between items-center
        ${selected ? 'bg-emerald-50 border-emerald-200' : 'bg-gray-50 border-gray-100'}
      `}>
        <span className="text-xs font-mono font-semibold text-gray-500 uppercase tracking-wider">
          Method
        </span>
        {selected && (
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-sans font-bold text-gray-900 text-[15px] leading-tight">
          {data.method.title}
        </h3>
        <p className="font-mono text-sm text-gray-600 line-clamp-3">
          {data.method.description}
        </p>
        <div className="mt-2 bg-slate-50 p-2 rounded border border-slate-100 text-xs font-mono text-slate-600">
          <strong className="text-emerald-700">Why: </strong>
          {data.method.whyFits}
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className={`w-3 h-3 border-2 border-white transition-colors ${selected ? 'bg-emerald-500' : 'bg-gray-300'}`}
      />
    </motion.div>
  );
}
