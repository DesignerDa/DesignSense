import { useState, useEffect } from 'react';
import Home from './components/Home';
import ProblemInput from './components/ProblemInput';
import ScenarioSelection from './components/ScenarioSelection';
import MethodSelection from './components/MethodSelection';
import Outcome from './components/Outcome';
import './index.css';

function App() {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState({
    context: '',
    userType: '',
    location: '',
    time: '',
    phase: ''
  });
  const [selectedScenario, setSelectedScenario] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  // If the user goes back and changes the phase, reset downstream selections
  useEffect(() => {
    setSelectedScenario('');
    setSelectedMethod('');
  }, [brief.phase]);

  // If the user goes back and changes the scenario, reset the method
  useEffect(() => {
    setSelectedMethod('');
  }, [selectedScenario]);

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  const resetFlow = () => {
    setStep(0);
    setBrief({
      context: '',
      userType: '',
      location: '',
      time: '',
      phase: ''
    });
    setSelectedScenario('');
    setSelectedMethod('');
  };

  const stepLabels = ['Brief', 'Scenario', 'Tool', 'Outcome'];

  return (
    <div className="app-container">
      {step > 0 && (
        <div className="progress-container">
          {stepLabels.map((label, index) => (
            <div 
              key={label} 
              className={`progress-step ${step === index + 1 ? 'active' : ''} ${step > index + 1 ? 'completed' : ''}`}
            >
              <div className="step-circle">{index + 1}</div>
              <div className="step-label">{label}</div>
            </div>
          ))}
        </div>
      )}

      {step === 0 && <Home onNext={nextStep} />}
      {step === 1 && (
        <ProblemInput 
          brief={brief} 
          setBrief={setBrief}
          onNext={nextStep} 
          onBack={prevStep} 
        />
      )}
      {step === 2 && (
        <ScenarioSelection 
          brief={brief}
          selectedScenario={selectedScenario} 
          setSelectedScenario={setSelectedScenario} 
          onNext={nextStep} 
          onBack={prevStep} 
        />
      )}
      {step === 3 && (
        <MethodSelection 
          brief={brief}
          selectedScenario={selectedScenario}
          selectedMethod={selectedMethod} 
          setSelectedMethod={setSelectedMethod} 
          onNext={nextStep} 
          onBack={prevStep} 
        />
      )}
      {step === 4 && (
        <Outcome 
          brief={brief}
          scenarioId={selectedScenario} 
          methodId={selectedMethod} 
          onReset={resetFlow} 
        />
      )}
    </div>
  );
}

export default App;
