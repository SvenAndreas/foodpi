
import './App.css';
import {Route,Switch} from "react-router-dom"
import LandingPage from './components/landingPage/landingPage.js';
import Home from './components/home/home';
import CreateRecipe from './components/createRecipes/CreateRecipe';
import RecipeDetail from './components/RecipeDetail.js/RecipeDetail';
import NotFound from './components/notFound/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/createrecipes" component={CreateRecipe}/>
        <Route exact path="/details/:id" component={RecipeDetail}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
