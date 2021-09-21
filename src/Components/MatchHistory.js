import React, { useEffect, useState } from "react";
import "../css/MatchHistory.css";
import MatchCard from "./MatchCard";
import { db } from "../firebase";

function MatchHistory() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    db.collection("games")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setGames(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div className="match-history">
      <div className="match-history-container">
        {games.map((game) => (
          <MatchCard
            p1={game.p1}
            p2={game.p2}
            p1Score={game.p1Score}
            p2Score={game.p2Score}
            date={game.date}
            key={game.timestamp}
          />
        ))}
      </div>
    </div>
  );
}

export default MatchHistory;
