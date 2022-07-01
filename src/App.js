import NavBar from './components/NavBar/NavBar'
import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from './pages/Home/Home'


function App() {
  return (
      <>
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

          </Switch>
        </div>
      </>
  );
}

export default App;
