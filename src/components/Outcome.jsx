import { getOutcome } from '../data/mockData';

export default function Outcome({ scenarioId, methodId, onReset }) {
  const outcome = getOutcome(scenarioId, methodId);

  return (
    <div className="screen-container">
      <h2>Step 4: Outcome & Reflection</h2>
      
      <div className="outcome-section">
        <h3>Outcome</h3>
        <p>{outcome.text}</p>
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

      <div className="button-group">
        <button onClick={onReset} className="btn-primary">Start Over</button>
      </div>
    </div>
  );
}
