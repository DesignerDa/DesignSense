import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function SummaryNode({ data }) {
  const { outcome } = data;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-indigo-900 text-white rounded-xl shadow-xl border border-indigo-700 w-[380px] overflow-hidden"
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-indigo-400 border-2 border-indigo-900"
      />
      
      <div className="bg-indigo-800 px-5 py-3 border-b border-indigo-600 flex items-center gap-2">
        <CheckCircle2 size={18} className="text-indigo-300" />
        <h3 className="font-sans font-semibold text-[15px] text-white m-0 tracking-wide uppercase">Selection Flow Summary</h3>
      </div>

      <div className="p-5 flex flex-col gap-4">
        <div>
          <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block mb-1">Chosen Context</span>
          <div className="font-sans text-sm bg-indigo-800/50 p-2 rounded border border-indigo-700/50">
            {outcome.contextLabel}
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block mb-1">Selected Scenario</span>
          <div className="font-sans text-sm bg-indigo-800/50 p-2 rounded border border-indigo-700/50">
            <strong className="block text-indigo-100 mb-1">{outcome.scenarioTitle}</strong>
            <p className="text-indigo-200/80 text-xs m-0 leading-relaxed line-clamp-3">{outcome.scenarioDescription}</p>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-widest block mb-1">Selected Tool</span>
          <div className="font-sans text-sm bg-indigo-800/50 p-2 rounded border border-indigo-700/50">
            <strong className="block text-indigo-100 mb-1">{outcome.methodTitle}</strong>
            <p className="text-emerald-300/90 text-xs m-0 leading-relaxed"><strong className="text-emerald-400">Why it fits:</strong> {outcome.whyItFits}</p>
          </div>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-indigo-500 border-2 border-indigo-900"
      />
    </motion.div>
  );
}
