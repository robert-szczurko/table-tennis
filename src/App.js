import "./App.css";
import Home from "./Components/Home";
import NewGame from "./Components/NewGame";
import Menu from "./Components/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import MatchHistory from "./Components/MatchHistory";
import PlayerStats from "./Components/PlayerStats";
import { useState } from "react";

function App() {
  const [menuDisplay, SetMenuDisplay] = useState(true);

  const toggleMenu = () => {
    SetMenuDisplay(!menuDisplay);
  };

  return (
    <div className="App">
      <Router>
        <div>
          <Menu menuDisplay={menuDisplay} toggleMenu={toggleMenu} />
        </div>
        <div className={menuDisplay ? "nav nav-show" : "nav nav-hide"}>
          <MenuIcon onClick={() => toggleMenu()} />
        </div>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/new-game" exact>
            <NewGame />
          </Route>
          <Route path="/match-history" exact>
            <MatchHistory />
          </Route>
          <Route path="/player-stats" exact>
            <PlayerStats />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
