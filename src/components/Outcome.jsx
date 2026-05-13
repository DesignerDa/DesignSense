import { useState } from 'react';
import { getOutcome } from '../data/mockData';

export default function Outcome({ brief, scenarioId, methodId, onReset }) {
  const outcome = getOutcome(brief, scenarioId, methodId) || {};
  const [reflectionText, setReflectionText] = useState('');
  const [copyFeedback, setCopyFeedback] = useState('');

  const generateSummary = () => {
    return `DESIGN PROCESS SUMMARY

Context:
${brief?.context || 'N/A'}

Who is it for:
${brief?.userType || 'N/A'}

Where is it happening:
${brief?.location || 'N/A'}

When is it happening:
${brief?.time || 'N/A'}

Phase:
${brief?.phase || 'N/A'}

Problem Statement:
${outcome.problemStatement || 'N/A'}

Selected Scenario:
${outcome.scenarioTitle || 'N/A'}

Scenario Description:
${outcome.scenarioDescription || 'N/A'}

Selected Tool:
${outcome.methodTitle || 'N/A'}

Why This Tool Fits:
${outcome.whyItFits || 'N/A'}

Reflection:
${reflectionText || 'None'}`;
  };

  const handleCopy = async () => {
    const summary = generateSummary();
    try {
      await navigator.clipboard.writeText(summary);
      setCopyFeedback('Summary copied successfully.');
      setTimeout(() => setCopyFeedback(''), 3000);
    } catch (err) {
      setCopyFeedback('Failed to copy. Please copy manually.');
      setTimeout(() => setCopyFeedback(''), 3000);
    }
  };

  return (
    <div className="screen-container">
      <h2>Step 4: Design Analysis Summary</h2>
      
      <div className="helper-text">
        <p><strong>A cohesive strategy connects the dots.</strong> By aligning your problem statement, situational context, and a targeted design method, you ensure your next steps are purposeful and rooted in design thinking principles.</p>
      </div>

      <div className="outcome-section">
        <div className="summary-item">
          <h3>Problem Statement</h3>
          <p>{outcome.problemStatement || 'N/A'}</p>
        </div>
        
        <div className="summary-item">
          <h3>Scenario</h3>
          <p><strong>{outcome.scenarioTitle || 'N/A'}</strong></p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#555' }}>{outcome.scenarioDescription || 'N/A'}</p>
        </div>
        
        <div className="summary-item">
          <h3>Selected Tool</h3>
          <p>{outcome.methodTitle || 'N/A'}</p>
        </div>
        
        <div className="summary-item">
          <h3>Why this tool fits</h3>
          <p>{outcome.whyItFits || 'N/A'}</p>
        </div>
      </div>

      <div className="reflection-section">
        <h3>Reflection Prompts</h3>
        <p>{outcome.reflection || 'N/A'}</p>
        <textarea 
          placeholder="Jot down your thoughts here..."
          rows={4}
          className="text-input"
          value={reflectionText}
          onChange={(e) => setReflectionText(e.target.value)}
        />
      </div>

      <div className="outcome-section">
        <h3>Recorded Actions Summary</h3>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Please copy and save this summary for your records before leaving the application.
        </p>
        <textarea
          readOnly
          value={generateSummary()}
          className="text-input"
          style={{ width: '100%', height: '250px', backgroundColor: '#f9f9f9', fontFamily: 'monospace', fontSize: '0.9rem' }}
        />
        <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={handleCopy} className="btn-secondary">Copy Summary</button>
          {copyFeedback && <span style={{ color: '#2e7d32', fontSize: '0.9rem', fontWeight: '600' }}>{copyFeedback}</span>}
        </div>
      </div>

      <div className="button-group" style={{ marginTop: '1.5rem' }}>
        <button onClick={onReset} className="btn-primary">Start Over</button>
      </div>
    </div>
  );
}
