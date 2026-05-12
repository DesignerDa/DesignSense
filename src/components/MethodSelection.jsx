import { useEffect, useState } from 'react';
import { generateMethods } from '../data/mockData';

export default function MethodSelection({ brief, selectedScenario, selectedMethod, setSelectedMethod, onNext, onBack }) {
  const [methods, setMethods] = useState([]);

  useEffect(() => {
    if (brief && brief.phase) {
      setMethods(generateMethods(brief.phase, selectedScenario));
    }
  }, [brief, selectedScenario]);

  return (
    <div className="screen-container">
      <h2>Step 3: Select a Design Method</h2>
      <div className="helper-text">
        <p><strong>Methods are structured tools for discovery and creation.</strong> The right method depends heavily on your current phase—whether you are trying to uncover deep insights, analyze existing data, or ideate novel solutions.</p>
      </div>
      
      <div className="list-container">
        {methods.map(method => (
          <div 
            key={method.id} 
            className={`list-item ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <h3>{method.title}</h3>
            <p>{method.description}</p>
            <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: '#444', backgroundColor: '#f0f4f8', padding: '0.5rem 0.75rem', borderRadius: '4px', borderLeft: '3px solid #646cff' }}>
              <strong>Why it fits:</strong> {method.whyFits}
            </div>
          </div>
        ))}
      </div>

      <div className="button-group" style={{ marginTop: '1.5rem' }}>
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={onNext} disabled={!selectedMethod} className="btn-primary">Next</button>
      </div>
    </div>
  );
}
