export default function Home({ onNext }) {
  return (
    <div className="screen-container">
      <h1>Design-Method Scenario Reflection</h1>
      <p>Welcome to the prototype. This tool will help you reflect on different design methods applied to various scenarios.</p>
      <button onClick={onNext} className="btn-primary">Start</button>
    </div>
  );
}
