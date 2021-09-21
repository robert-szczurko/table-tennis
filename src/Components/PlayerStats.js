import React, { useState } from "react";
import "../css/PlayerStats.css";
import Player from "./Player";
import buu from "../imgs/buu.png";
import goku from "../imgs/goku.png";
import vegeta from "../imgs/vegeta.png";

function PlayerStats() {
  const [player, SetPlayer] = useState("");

  return (
    <div className="player-stats">
      <div className="player-stats-container">
        <h3>Select Player</h3>
        <div className="player-names">
          <p
            onClick={() => SetPlayer("phil")}
            className={
              player === "phil" ? "select-player active" : "select-player"
            }>
            Phil
          </p>
          <p
            onClick={() => SetPlayer("lemphers")}
            className={
              player === "lemphers" ? "select-player active" : "select-player"
            }>
            Lemphers
          </p>
          <p
            onClick={() => SetPlayer("rob")}
            className={
              player === "rob" ? "select-player active" : "select-player"
            }>
            Rob
          </p>
        </div>
        {player === "phil" && <Player img={vegeta} name="phil" key="phil" />}
        {player === "lemphers" && (
          <Player img={buu} name="lemphers" key="lemphers" />
        )}
        {player === "rob" && <Player img={goku} name="rob" key="rob" />}
      </div>
    </div>
  );
}

export default PlayerStats;
