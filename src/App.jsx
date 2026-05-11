import { useState } from 'react';
import Home from './components/Home';
import ProblemInput from './components/ProblemInput';
import ScenarioSelection from './components/ScenarioSelection';
import MethodSelection from './components/MethodSelection';
import Outcome from './components/Outcome';
import './index.css';

function App() {
  const [step, setStep] = useState(0);
  const [problem, setProblem] = useState('');
  const [selectedScenario, setSelectedScenario] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);
  const resetFlow = () => {
    setStep(0);
    setProblem('');
    setSelectedScenario('');
    setSelectedMethod('');
  };

  return (
    <div className="app-container">
      {step === 0 && <Home onNext={nextStep} />}
      {step === 1 && (
        <ProblemInput 
          problem={problem} 
          setProblem={setProblem} 
          onNext={nextStep} 
          onBack={prevStep} 
        />
      )}
      {step === 2 && (
        <ScenarioSelection 
          selectedScenario={selectedScenario} 
          setSelectedScenario={setSelectedScenario} 
          onNext={nextStep} 
          onBack={prevStep} 
        />
      )}
      {step === 3 && (
        <MethodSelection 
          selectedMethod={selectedMethod} 
          setSelectedMethod={setSelectedMethod} 
          onNext={nextStep} 
          onBack={prevStep} 
        />
      )}
      {step === 4 && (
        <Outcome 
          scenarioId={selectedScenario} 
          methodId={selectedMethod} 
          onReset={resetFlow} 
        />
      )}
    </div>
  );
}

export default App;
