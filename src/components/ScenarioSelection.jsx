import { useEffect, useState } from 'react';
import { generateScenarios } from '../data/mockData';

export default function ScenarioSelection({ brief, selectedScenario, setSelectedScenario, onNext, onBack }) {
  const [scenarios, setScenarios] = useState([]);

  useEffect(() => {
    if (brief) {
      setScenarios(generateScenarios(brief));
    }
  }, [brief]);

  return (
    <div className="screen-container">
      <h2>Step 2: Select a Scenario</h2>
      <div className="helper-text">
        <p><strong>Scenarios contextualize the problem.</strong> Selecting a specific scenario helps narrow down the broad problem statement into a tangible, human-centered situation that we can actively design for.</p>
      </div>
      
      <div className="list-container">
        {scenarios.map(scenario => (
          <div 
            key={scenario.id} 
            className={`list-item ${selectedScenario === scenario.id ? 'selected' : ''}`}
            onClick={() => setSelectedScenario(scenario.id)}
          >
            <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <strong>Problem:</strong> {scenario.problemStatement}
            </div>
            <h3>{scenario.title}</h3>
            <p>{scenario.descriptionTemplate}</p>
          </div>
        ))}
      </div>

      <div className="button-group" style={{ marginTop: '1.5rem' }}>
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={onNext} disabled={!selectedScenario} className="btn-primary">Next</button>
      </div>
    </div>
  );
}
