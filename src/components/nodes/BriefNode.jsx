import { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export default function BriefNode({ data }) {
  const [brief, setBrief] = useState({
    context: '',
    userType: '',
    location: '',
    time: '',
    phase: ''
  });

  const isFormValid = brief.context.trim() && brief.userType.trim() && brief.location.trim() && brief.time.trim() && brief.phase;

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
      className={`bg-white rounded-xl shadow-xl border-2 w-[350px] overflow-hidden ${data.isLocked ? 'border-indigo-200' : 'border-indigo-500'}`}
    >
      <div className="bg-indigo-50 px-5 py-4 border-b border-indigo-100 flex items-center justify-between">
        <h3 className="text-indigo-900 font-sans font-semibold text-lg m-0">Design Context</h3>
        {data.isLocked && <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">LOCKED</span>}
      </div>

      <div className="p-5 flex flex-col gap-4">
        {data.isLocked ? (
          <div className="flex flex-col gap-3 font-mono text-sm text-gray-700">
            <div><strong className="text-gray-900 font-sans">Context:</strong> {brief.context}</div>
            <div><strong className="text-gray-900 font-sans">User:</strong> {brief.userType}</div>
            <div><strong className="text-gray-900 font-sans">Location:</strong> {brief.location}</div>
            <div><strong className="text-gray-900 font-sans">Time:</strong> {brief.time}</div>
            <div className="mt-2 bg-indigo-50 p-2 rounded-md border border-indigo-100">
              <strong className="text-indigo-900 font-sans block mb-1">Target Phase:</strong> 
              <span className="text-indigo-700 font-bold">{brief.phase}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 font-sans">Context</label>
              <textarea 
                value={brief.context}
                onChange={(e) => handleChange('context', e.target.value)}
                placeholder="What is the problem context?"
                rows={2}
                className="w-full text-sm font-mono p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 font-sans">Who is it for?</label>
              <input 
                type="text"
                value={brief.userType}
                onChange={(e) => handleChange('userType', e.target.value)}
                placeholder="Target audience"
                className="w-full text-sm font-mono p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 font-sans">Where?</label>
              <input 
                type="text"
                value={brief.location}
                onChange={(e) => handleChange('location', e.target.value)}
                placeholder="Location / platform"
                className="w-full text-sm font-mono p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 font-sans">When?</label>
              <input 
                type="text"
                value={brief.time}
                onChange={(e) => handleChange('time', e.target.value)}
                placeholder="Timeframe / situation"
                className="w-full text-sm font-mono p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 font-sans">Phase</label>
              <select 
                value={brief.phase}
                onChange={(e) => handleChange('phase', e.target.value)}
                className="w-full text-sm font-mono p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="" disabled>Select Phase</option>
                <option value="Empathise">Empathise</option>
                <option value="Analyse">Analyse</option>
                <option value="Ideate">Ideate</option>
              </select>
            </div>
            
            <button 
              onClick={handleGenerate} 
              disabled={!isFormValid || data.isLoading}
              className={`mt-2 w-full py-2.5 rounded font-sans font-medium text-white transition-all
                ${!isFormValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}
              `}
            >
              {data.isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Analyzing...
                </span>
              ) : 'Generate Scenarios'}
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
