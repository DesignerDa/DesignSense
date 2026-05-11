import { useState } from 'react';

export default function ProblemInput({ problem, setProblem, onNext, onBack }) {
  return (
    <div className="screen-container">
      <h2>Step 1: Describe the Problem</h2>
      <p>Briefly describe the design problem you are facing.</p>
      <textarea 
        value={problem}
        onChange={(e) => setProblem(e.target.value)}
        placeholder="e.g., Users are struggling to find the settings menu..."
        rows={5}
        className="text-input"
      />
      <div className="button-group">
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={onNext} disabled={!problem.trim()} className="btn-primary">Next</button>
      </div>
    </div>
  );
}
