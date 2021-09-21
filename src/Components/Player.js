import React, { useEffect, useState } from "react";
import "../css/Player.css";
import { db } from "../firebase";

function Player({ img, name }) {
  const [recentGames, SetRecentGames] = useState([]);
  const [avgMargin, SetAvgMargin] = useState([]);
  const [totalGames, SetTotalGames] = useState(0);
  const [wins, SetWins] = useState(0);
  const [loses, SetLoses] = useState(0);
  const [WLRatio, SetWLRatio] = useState(0);
  const [playerRank, setPlayerRank] = useState([]);

  useEffect(() => {
    db.collection("games")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let recentArr = [];
        let marginArr = [];
        snapshot.docs.map((doc) => {
          if (doc.data().p1 === `${name}` || doc.data().p2 === `${name}`) {
            if (doc.data().winner === `${name}`) {
              recentArr.push({
                result: "W",
                key: doc.data().timestamp,
              });
            } else {
              recentArr.push({
                result: "L",
                key: doc.data().timestamp,
              });
            }
            marginArr.push(doc.data().margin);
          }
        });
        SetRecentGames(recentArr.slice(0, 5));
        SetAvgMargin(
          (marginArr.reduce((a, b) => a + b, 0) / marginArr.length).toFixed(2)
        );
      });
  }, []);

  useEffect(() => {
    db.collection("stats")
      .doc(`${name}`)
      .onSnapshot((doc) => {
        SetTotalGames(doc.data().wins + doc.data().loses);
        SetWins(doc.data().wins);
        SetLoses(doc.data().loses);
        SetWLRatio(doc.data().ratio.toFixed(2));
      });
  }, []);

  useEffect(() => {
    db.collection("stats")
      .orderBy("ratio", "desc")
      .onSnapshot((snapshot) => {
        let playersArr = snapshot.docs.map((doc) => doc.data());
        setPlayerRank(playersArr.findIndex((x) => x.name === `${name}`) + 1);
      });
  }, []);

  return (
    <div className="flop-stats">
      <div className="flop-stats-top">
        {playerRank === 1 && <p className="first">1st</p>}
        {playerRank === 2 && <p className="second">2nd</p>}
        {playerRank === 3 && <p className="third">3rd</p>}
        <img src={img} alt="" />
      </div>

      <div className="recent-games">
        {recentGames.map((game) => (
          <p
            key={game.key}
            className={game.result === "W" ? "game win" : "game lose"}>
            {game.result === "W" ? "W" : "L"}
          </p>
        ))}
      </div>
      <div className="stats">
        <div className="stats-top">
          <div className="stat">
            <p>Total Games</p>
            <p className="stat-num">{totalGames}</p>
          </div>
          <div className="stat">
            <p>Wins</p>
            <p className="stat-num">{wins}</p>
          </div>
          <div className="stat">
            <p>Loses</p>
            <p className="stat-num">{loses}</p>
          </div>
        </div>
        <div className="stats-bottom">
          <div className="stat">
            <p>W/L Ratio</p>
            <p className="stat-num">{WLRatio}</p>
          </div>
          <div className="stat">
            <p>Avg Margin</p>
            <p className="stat-num">{avgMargin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
