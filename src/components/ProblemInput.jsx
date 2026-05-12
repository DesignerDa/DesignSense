import { useState } from 'react';

export default function ProblemInput({ brief, setBrief, onNext, onBack }) {
  const isFormValid = brief.context.trim() && brief.userType.trim() && brief.location.trim() && brief.time.trim() && brief.phase;

  const handleChange = (field, value) => {
    setBrief(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="screen-container">
      <h2>Step 1: Design Brief</h2>
      <div className="helper-text">
        <p><strong>Design thinking starts with defining the right problem.</strong> A well-structured brief grounds your work in actual user needs, specific contexts, and the current phase of your design process.</p>
      </div>
      
      <div className="form-group">
        <label>Context</label>
        <textarea 
          value={brief.context}
          onChange={(e) => handleChange('context', e.target.value)}
          placeholder="What is the general context of the problem?"
          rows={3}
          className="text-input"
        />
      </div>

      <div className="form-group">
        <label>Who is it for?</label>
        <input 
          type="text"
          value={brief.userType}
          onChange={(e) => handleChange('userType', e.target.value)}
          placeholder="Target audience or user group"
          className="text-input"
        />
      </div>

      <div className="form-group">
        <label>Where is it happening?</label>
        <input 
          type="text"
          value={brief.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="Location or platform"
          className="text-input"
        />
      </div>

      <div className="form-group">
        <label>When is it happening?</label>
        <input 
          type="text"
          value={brief.time}
          onChange={(e) => handleChange('time', e.target.value)}
          placeholder="Timeframe or specific situation"
          className="text-input"
        />
      </div>

      <div className="form-group">
        <label>Design Thinking Phase</label>
        <select 
          value={brief.phase}
          onChange={(e) => handleChange('phase', e.target.value)}
          className="text-input"
        >
          <option value="" disabled>Select a phase</option>
          <option value="Empathise">Empathise</option>
          <option value="Analyse">Analyse</option>
          <option value="Ideate">Ideate</option>
        </select>
      </div>

      <div className="button-group" style={{ marginTop: '1.5rem' }}>
        <button onClick={onBack} className="btn-secondary">Back</button>
        <button onClick={onNext} disabled={!isFormValid} className="btn-primary">Next</button>
      </div>
    </div>
  );
}
