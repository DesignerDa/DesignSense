import { methods } from '../data/mockData';

export default function MethodSelection({ selectedMethod, setSelectedMethod, onNext, onBack }) {
  return (
    <div className="screen-container">
      <h2>Step 3: Select a Design Method</h2>
      <p>Choose a method to apply to your selected scenario.</p>
      
      <div className="list-container">
        {methods.map(method => (
          <div 
            key={method.id} 
            className={`list-item ${selectedMethod === method.id ? 'selected' : ''}`}
            onClick={() => setSelectedMethod(method.id)}
          >
            <h3>{method.title}</h3>
            <p>{method.description}</p>
          </div>
        ))}
      </div>

      <div className="button-group">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={onNext} disabled={!selectedMethod} className="btn-primary">Next</button>
      </div>
    </div>
  );
}
