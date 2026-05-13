import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';

export default function LoadingNode({ data }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-indigo-100 px-6 py-3 flex items-center gap-3"
    >
      <Handle type="target" position={Position.Left} className="w-1 h-1 opacity-0" />
      
      <div className="flex gap-1">
        <motion.div 
          animate={{ y: [0, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
          className="w-2 h-2 bg-indigo-500 rounded-full"
        />
        <motion.div 
          animate={{ y: [0, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
          className="w-2 h-2 bg-indigo-500 rounded-full"
        />
        <motion.div 
          animate={{ y: [0, -5, 0] }} 
          transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
          className="w-2 h-2 bg-indigo-500 rounded-full"
        />
      </div>
      <span className="font-mono text-sm text-indigo-700 font-medium">
        {data.label || 'Generating...'}
      </span>

      <Handle type="source" position={Position.Right} className="w-1 h-1 opacity-0" />
    </motion.div>
  );
}
