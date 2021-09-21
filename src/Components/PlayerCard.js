import React from "react";
import "../css/PlayerCard.css";
import buu from "../imgs/buu.png";
import goku from "../imgs/goku.png";
import vegeta from "../imgs/vegeta.png";

function PlayerCard({ player, winRatio }) {
  let img = "";
  if (player === "phil") {
    img = vegeta;
  }
  if (player === "rob") {
    img = goku;
  }
  if (player === "lemphers") {
    img = buu;
  }

  return (
    <div className="player-card">
      <img src={img} alt="logo" />
      <div className="player-name player-center"> {player}</div>
      <div className="win-ratio player-center">{winRatio}</div>
    </div>
  );
}

export default PlayerCard;
