import { scenarios } from '../data/mockData';

export default function ScenarioSelection({ selectedScenario, setSelectedScenario, onNext, onBack }) {
  return (
    <div className="screen-container">
      <h2>Step 2: Select a Scenario</h2>
      <p>Based on your problem, choose a relevant scenario from the list below.</p>
      
      <div className="list-container">
        {scenarios.map(scenario => (
          <div 
            key={scenario.id} 
            className={`list-item ${selectedScenario === scenario.id ? 'selected' : ''}`}
            onClick={() => setSelectedScenario(scenario.id)}
          >
            <h3>{scenario.title}</h3>
            <p>{scenario.description}</p>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={onNext} disabled={!selectedScenario} className="btn-primary">Next</button>
      </div>
    </div>
  );
}
