import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Copy, CheckCircle, MessageSquareText } from 'lucide-react';
import { useState } from 'react';

export default function DiscussionNode({ data }) {
  const [discussionReflection, setDiscussionReflection] = useState('');
  const [copied, setCopied] = useState(false);
  const { outcome } = data;

  const summaryText = `DESIGN REFLECTION SUMMARY
-------------------------
PHASE: ${data.brief.phase}
CHOSEN CONTEXT: ${outcome.contextLabel}

ORIGINAL INPUT:
"${outcome.originalInput}"

SELECTED SCENARIO:
${outcome.scenarioTitle}
${outcome.scenarioDescription}

SELECTED METHOD:
${outcome.methodTitle}
Why it fits: ${outcome.whyItFits}

USER DISCUSSION & REFLECTION:
${discussionReflection || '(No reflection provided)'}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, x: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
      className="bg-white text-slate-800 rounded-xl shadow-2xl border-2 border-slate-200 w-[500px] overflow-hidden"
    >
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-slate-400 border-2 border-white"
      />
      
      <div className="bg-slate-50 px-5 py-4 border-b border-slate-200 flex items-center justify-between">
        <h3 className="font-sans font-semibold text-lg text-slate-800 m-0 flex items-center gap-2">
          <MessageSquareText size={18} className="text-blue-500" />
          Design Reflection Discussion
        </h3>
      </div>

      <div className="p-5 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="font-sans text-[14px] leading-relaxed text-slate-600 font-medium">
            Why did you choose this scenario and tool combination? What insights or opportunities did you identify from this design direction?
          </p>
          <ul className="text-xs font-sans text-slate-500 list-disc pl-4 space-y-1 mt-1 mb-2">
            <li>What user pain points stood out most?</li>
            <li>How could this method help uncover deeper insights?</li>
            <li>What alternative approaches did you consider?</li>
            <li>What surprised you during the process?</li>
          </ul>
          
          <textarea
            value={discussionReflection}
            onChange={(e) => setDiscussionReflection(e.target.value)}
            placeholder="Type your reflection here..."
            className="w-full h-[150px] bg-slate-50 text-slate-800 font-sans text-sm p-3 rounded-md border border-slate-300 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all custom-scrollbar"
          />
        </div>

        <div className="pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wide font-bold">Recorded Actions Summary</h4>
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border transition-all
                ${copied ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-800'}`}
            >
              {copied ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
              {copied ? 'COPIED TO CLIPBOARD' : 'COPY FULL SUMMARY'}
            </button>
          </div>
        </div>
        
        <button 
          onClick={data.onReset}
          className="w-full py-2.5 rounded font-sans font-medium text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 hover:border-slate-300 transition-all active:scale-95"
        >
          Start New Exploration
        </button>
      </div>
    </motion.div>
  );
}
