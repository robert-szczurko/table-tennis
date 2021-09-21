import React, { useEffect, useState } from "react";
import PlayerCard from "./PlayerCard";
import "../css/Home.css";
import { Howl, Howler } from "howler";
import theme from "../audio/home.mp3";
import { Link } from "react-router-dom";
import { db } from "../firebase";

function Home() {
  const [players, setPlayers] = useState([]);

  var sound = new Howl({
    src: [theme],
  });
  // useEffect(() => {
  //   sound.play();
  // }, []);

  useEffect(() => {
    db.collection("stats")
      .orderBy("ratio", "desc")
      .onSnapshot((snapshot) => {
        setPlayers(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="home">
      <div className="home-container">
        <header>
          <h1>Flops Manor</h1>
          <h3>Leader Board</h3>
        </header>
        <div className="leaderboard">
          {players.map((player) => (
            <PlayerCard
              key={player.name}
              player={player.name}
              winRatio={player.ratio.toFixed(2)}
            />
          ))}
        </div>
        <Link to="./new-game">
          <button
            className="btn new-game-btn"
            onClick={() => sound.fade(1.0, 0.0, 1000)}>
            New Game
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
