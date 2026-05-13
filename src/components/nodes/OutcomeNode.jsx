import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function OutcomeNode({ data }) {
  const [copied, setCopied] = useState(false);
  const { outcome } = data;

  const summaryText = `DESIGN REFLECTION SUMMARY
-------------------------
PHASE: ${data.brief.phase}
CONTEXT: ${data.brief.context}
USER: ${data.brief.userType}
LOCATION: ${data.brief.location}
TIME: ${data.brief.time}

SELECTED SCENARIO:
${outcome.scenarioTitle}
${outcome.scenarioDescription}

SELECTED METHOD:
${outcome.methodTitle}
Why it fits: ${outcome.whyItFits}

REFLECTION:
${outcome.reflection}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="bg-gray-900 text-white rounded-xl shadow-2xl border border-gray-700 w-[450px] overflow-hidden"
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-gray-500 border-2 border-gray-900"
      />
      
      <div className="bg-gray-800 px-5 py-4 border-b border-gray-700 flex items-center justify-between">
        <h3 className="font-sans font-semibold text-lg text-white m-0">Synthesis & Reflection</h3>
        <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-2 py-1 rounded">FINAL</span>
      </div>

      <div className="p-5 flex flex-col gap-6">
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h4 className="text-sm font-sans text-gray-400 mb-2 uppercase tracking-wide">Reflection Prompt</h4>
          <p className="font-sans text-[15px] leading-relaxed text-blue-100">
            {outcome.reflection}
          </p>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <h4 className="text-sm font-sans text-gray-400 uppercase tracking-wide">Recorded Summary</h4>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-mono bg-gray-800 hover:bg-gray-700 transition-colors px-3 py-1.5 rounded border border-gray-600 text-gray-300"
            >
              {copied ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} />}
              {copied ? 'COPIED' : 'COPY'}
            </button>
          </div>
          <textarea
            readOnly
            className="w-full h-[200px] bg-[#0d1117] text-[#c9d1d9] font-mono text-xs p-3 rounded-md border border-gray-700 resize-none outline-none custom-scrollbar"
            value={summaryText}
          />
        </div>
        
        <button 
          onClick={data.onReset}
          className="w-full py-2.5 rounded font-sans font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all active:scale-95"
        >
          Start New Exploration
        </button>
      </div>
    </motion.div>
  );
}
