import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function BriefNode({ data }) {
  const [brief, setBrief] = useState({
    userProblemStatement: '',
    selectedPhase: 'Empathise'
  });

  const isFormValid = brief.userProblemStatement.trim().length > 10;

  const handleChange = (field, value) => {
    setBrief(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    if (data.onGenerate) {
      data.onGenerate(brief);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white rounded-xl shadow-xl border-2 w-[400px] overflow-hidden ${data.isLocked ? 'border-indigo-200' : 'border-indigo-500'}`}
    >
      <div className="bg-indigo-50 px-5 py-4 border-b border-indigo-100 flex items-center justify-between">
        <h3 className="text-indigo-900 font-sans font-semibold text-lg m-0 flex items-center gap-2">
          <Sparkles size={18} className="text-indigo-500" />
          AI Copilot
        </h3>
        {data.isLocked && <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">LOCKED</span>}
      </div>

      <div className="p-5 flex flex-col gap-4">
        {data.isLocked ? (
          <div className="flex flex-col gap-3 font-mono text-sm text-gray-700">
            <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-600 italic">
              "{brief.userProblemStatement}"
            </div>
            <div className="mt-2 bg-indigo-50 p-2 rounded-md border border-indigo-100 flex justify-between items-center">
              <strong className="text-indigo-900 font-sans block mb-1 m-0">Target Phase:</strong> 
              <span className="text-indigo-700 font-bold bg-white px-2 py-0.5 rounded shadow-sm">{brief.selectedPhase}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 font-sans">Describe your design problem or situation...</label>
              <textarea 
                value={brief.userProblemStatement}
                onChange={(e) => handleChange('userProblemStatement', e.target.value)}
                placeholder="E.g., Elderly patients living independently often forget to take medication properly at home during stressful daily routines..."
                rows={5}
                className="w-full text-[15px] leading-relaxed font-sans p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none bg-gray-50/50 placeholder:text-gray-400"
              />
            </div>
            
            <div className="flex flex-col gap-2 mt-1">
              <label className="text-sm font-semibold text-gray-700 font-sans">Design Thinking Phase</label>
              <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                {['Empathise', 'Analyse', 'Ideate'].map(p => (
                  <button
                    key={p}
                    onClick={() => handleChange('selectedPhase', p)}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${brief.selectedPhase === p ? 'bg-white shadow-sm text-indigo-700' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={handleGenerate} 
              disabled={!isFormValid || data.isLoading}
              className={`mt-3 w-full py-2.5 rounded-lg font-sans font-medium text-white transition-all
                ${!isFormValid ? 'bg-indigo-300 cursor-not-allowed opacity-70' : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg active:scale-95'}
              `}
            >
              {data.isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Analyzing prompt...
                </span>
              ) : 'Generate Exploration Canvas'}
            </button>
          </>
        )}
      </div>

      {data.isLocked && (
        <Handle 
          type="source" 
          position={Position.Right} 
          className="w-3 h-3 bg-indigo-500 border-2 border-white"
        />
      )}
    </motion.div>
  );
}
