import React from "react";
import "../css/Menu.css";
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";

function Menu({ menuDisplay, toggleMenu }) {
  return (
    <div className={!menuDisplay ? "menu menu-show" : "menu menu-hide"}>
      {!menuDisplay && (
        <div className="links">
          <div className="close" onClick={toggleMenu}>
            <CloseIcon />
          </div>
          <Link to="./">
            <p onClick={toggleMenu}>Leaderboard</p>
          </Link>
          <Link to="./new-game">
            <p onClick={toggleMenu}>New Game</p>
          </Link>
          <Link to="./match-history">
            <p onClick={toggleMenu}>Match History</p>
          </Link>
          <Link to="./player-stats">
            <p onClick={toggleMenu}>Player Stats</p>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Menu;
