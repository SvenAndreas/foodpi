
import './App.css';
import {Route,Switch} from "react-router-dom"
import LandingPage from './components/landingPage/landingPage.js';
import Home from './components/home/home';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" component={Home}/>
        <Route/>
        <Route/>
      </Switch>
    </div>
  );
}

export default App;
