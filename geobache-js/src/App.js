import './App.css';
import Locator from './components/Locator.js'
import Web3Engine from './components/Web3Engine.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Web3Engine>
          <Locator></Locator>
        </Web3Engine>
      </header>
    </div>
  );
}

export default App;
