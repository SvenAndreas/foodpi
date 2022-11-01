
import './App.css';
import {Route} from "react-router-dom"
import LandingPage from './components/landingPage/landingPage.js';

function App() {
  return (
    <div>
      <Route path="/" component={LandingPage}/>
      <Route/>
      <Route/>
      <Route/>
    </div>
  );
}

export default App;
