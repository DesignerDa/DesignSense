import { getOutcome } from '../data/mockData';

export default function Outcome({ brief, scenarioId, methodId, onReset }) {
  const outcome = getOutcome(brief, scenarioId, methodId);

  return (
    <div className="screen-container">
      <h2>Step 4: Design Analysis Summary</h2>
      
      <div className="helper-text">
        <p><strong>A cohesive strategy connects the dots.</strong> By aligning your problem statement, situational context, and a targeted design method, you ensure your next steps are purposeful and rooted in design thinking principles.</p>
      </div>

      <div className="outcome-section">
        <div className="summary-item">
          <h3>Problem Statement</h3>
          <p>{outcome.problemStatement}</p>
        </div>
        
        <div className="summary-item">
          <h3>Scenario</h3>
          <p><strong>{outcome.scenarioTitle}</strong></p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem', color: '#555' }}>{outcome.scenarioDescription}</p>
        </div>
        
        <div className="summary-item">
          <h3>Selected Tool</h3>
          <p>{outcome.methodTitle}</p>
        </div>
        
        <div className="summary-item">
          <h3>Why this tool fits</h3>
          <p>{outcome.whyItFits}</p>
        </div>
      </div>

      <div className="reflection-section">
        <h3>Reflection Prompts</h3>
        <p>{outcome.reflection}</p>
        <textarea 
          placeholder="Jot down your thoughts here..."
          rows={4}
          className="text-input"
        />
      </div>

      <div className="button-group" style={{ marginTop: '1.5rem' }}>
        <button onClick={onReset} className="btn-primary">Start Over</button>
      </div>
    </div>
  );
}
