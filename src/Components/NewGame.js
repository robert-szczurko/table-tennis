import React, { useEffect, useState } from "react";
import "../css/NewGame.css";
import lemphers from "../imgs/buu.png";
import lemphers2 from "../imgs/buu2.png";
import lemphersbw from "../imgs/buubw.png";
import rob from "../imgs/goku.png";
import rob2 from "../imgs/goku2.png";
import robbw from "../imgs/gokubw.png";
import phil from "../imgs/vegeta.png";
import phil2 from "../imgs/vegeta2.png";
import philbw from "../imgs/vegetabw.png";
import { db } from "../firebase";
import firebase from "firebase";

function NewGame() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [start, setStart] = useState(true);
  const [robP1, setRobP1] = useState(true);
  const [lemphersP1, setLemphersP1] = useState(true);
  const [philP1, setPhilP1] = useState(true);
  const [robP2, setRobP2] = useState(true);
  const [lemphersP2, setLemphersP2] = useState(true);
  const [philP2, setPhilP2] = useState(true);
  const [p1Score, setP1Score] = useState("");
  const [p2Score, setP2Score] = useState("");
  const [finish, setFinish] = useState(false);
  const [winner, setWinner] = useState("");
  const [loser, setLoser] = useState("");
  const [philWins, setPhilWins] = useState(0);
  const [robWins, setRobWins] = useState(0);
  const [lemphersWins, setLemphersWins] = useState(0);
  const [philLose, setPhilLose] = useState(0);
  const [robLose, setRobLose] = useState(0);
  const [lemphersLose, setLemphersLose] = useState(0);
  const [philRatio, setPhilRatio] = useState(0);
  const [robRatio, setRobRatio] = useState(0);
  const [lemphersRatio, setLemphersRatio] = useState(0);

  useEffect(() => {
    db.collection("stats")
      .doc("phil")
      .onSnapshot((doc) => {
        setPhilWins(doc.data().wins);
        setPhilLose(doc.data().loses);
        setPhilRatio(doc.data().ratio);
      });
    db.collection("stats")
      .doc("rob")
      .onSnapshot((doc) => {
        setRobWins(doc.data().wins);
        setRobLose(doc.data().loses);
        setRobRatio(doc.data().ratio);
      });
    db.collection("stats")
      .doc("lemphers")
      .onSnapshot((doc) => {
        setLemphersWins(doc.data().wins);
        setLemphersLose(doc.data().loses);
        setLemphersRatio(doc.data().ratio);
      });
  }, []);

  useEffect(() => {
    if (p1Score < p2Score) {
      setWinner(p2);
      setLoser(p1);
    }
    if (p1Score > p2Score) {
      setWinner(p1);
      setLoser(p2);
    }
  }, [p1Score, p2Score]);

  const today = new Date();

  const finishBtn = () => {
    if (p1Score > 20 || p2Score > 20) {
      setFinish(true);

      if (winner === "phil")
        db.collection("stats")
          .doc("phil")
          .update({
            wins: philWins + 1,
            ratio:
              (philWins + 1) / philLose > 100
                ? philWins + 1
                : (philWins + 1) / philLose,
          });

      if (winner === "rob")
        db.collection("stats")
          .doc("rob")
          .update({
            wins: robWins + 1,
            ratio:
              (robWins + 1) / robLose > 100
                ? robWins + 1
                : (robWins + 1) / robLose,
          });

      if (winner === "lemphers")
        db.collection("stats")
          .doc("lemphers")
          .update({
            wins: lemphersWins + 1,
            ratio:
              (lemphersWins + 1) / lemphersLose > 100
                ? lemphersWins + 1
                : (lemphersWins + 1) / lemphersLose,
          });

      if (loser === "phil")
        db.collection("stats")
          .doc("phil")
          .update({
            loses: philLose + 1,
            ratio: philWins / (philLose + 1),
          });

      if (loser === "rob")
        db.collection("stats")
          .doc("rob")
          .update({
            loses: robLose + 1,
            ratio: robWins / (robLose + 1),
          });

      if (loser === "lemphers")
        db.collection("stats")
          .doc("lemphers")
          .update({
            loses: lemphersLose + 1,
            ratio: lemphersWins / (lemphersLose + 1),
          });

      db.collection("games").add({
        p1Score: p1Score,
        p2Score: p2Score,
        p1: p1,
        p2: p2,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        winner: p1Score > p2Score ? p1 : p2,
        loser: p1Score < p2Score ? p1 : p2,
        margin: p1Score - p2Score < 0 ? p2Score - p1Score : p1Score - p2Score,
        date: `${today.getDate()}/${
          today.getMonth() + 1
        }/${today.getFullYear()}`,
      });
    }
  };

  const newGame = () => {
    setStart(true);
    setFinish(false);
    setP1("");
    setP2("");
    setP1Score("");
    setP2Score("");
    setRobP1(true);
    setRobP2(true);
    setLemphersP1(true);
    setLemphersP2(true);
    setPhilP1(true);
    setPhilP2(true);
  };

  const p1lemphers = () => {
    setP1("lemphers");
    setLemphersP1(true);
    setRobP1(false);
    setPhilP1(false);
    setLemphersP2(false);
    if (!p2) {
      setRobP2(true);
      setPhilP2(true);
    }
  };

  const p1rob = () => {
    setP1("rob");
    setRobP1(true);
    setLemphersP1(false);
    setPhilP1(false);
    setRobP2(false);
    if (!p2) {
      setPhilP2(true);
      setLemphersP2(true);
    }
  };

  const p1phil = () => {
    setP1("phil");
    setPhilP1(true);
    setLemphersP1(false);
    setRobP1(false);
    setPhilP2(false);
    if (!p2) {
      setLemphersP2(true);
      setRobP2(true);
    }
  };

  const p2lemphers = () => {
    setP2("lemphers");
    setLemphersP2(true);
    setRobP2(false);
    setPhilP2(false);
    setLemphersP1(false);
    if (!p1) {
      setRobP1(true);
      setPhilP1(true);
    }
  };

  const p2rob = () => {
    setP2("rob");
    setRobP2(true);
    setLemphersP2(false);
    setPhilP2(false);
    setRobP1(false);
    if (!p1) {
      setPhilP1(true);
      setLemphersP1(true);
    }
  };

  const p2phil = () => {
    setP2("phil");
    setPhilP2(true);
    setLemphersP2(false);
    setRobP2(false);
    setPhilP1(false);
    if (!p1) {
      setLemphersP1(true);
      setRobP1(true);
    }
  };

  return (
    <div className="new-game">
      <div className="new-game-container">
        {start && (
          <div className="player-select">
            <div className="player1">
              <h3>Player 1</h3>
              <div className="players">
                <img
                  src={lemphersP1 ? lemphers : lemphersbw}
                  alt=""
                  onClick={() => p2 !== "lemphers" && p1lemphers()}
                />
                <img
                  src={robP1 ? rob : robbw}
                  alt=""
                  onClick={() => p2 !== "rob" && p1rob()}
                />
                <img
                  src={philP1 ? phil : philbw}
                  alt=""
                  onClick={() => p2 !== "phil" && p1phil()}
                />
              </div>
            </div>
            <div className="player2">
              <h3>Player 2</h3>
              <div className="players">
                <img
                  src={lemphersP2 ? lemphers : lemphersbw}
                  alt=""
                  onClick={() => p1 !== "lemphers" && p2lemphers()}
                />
                <img
                  src={robP2 ? rob : robbw}
                  alt=""
                  onClick={() => p1 !== "rob" && p2rob()}
                />
                <img
                  src={philP2 ? phil : philbw}
                  alt=""
                  onClick={() => p1 !== "phil" && p2phil()}
                />
              </div>
            </div>
          </div>
        )}

        {!start && (
          <div className="score">
            <div className="player-score">
              <h3>Score</h3>
              {!finish && (
                <input
                  type="number"
                  max="99"
                  value={p1Score}
                  onChange={(e) =>
                    e.target.value < 99
                      ? setP1Score(parseInt(e.target.value))
                      : setP1Score(99)
                  }
                />
              )}
              {finish && (
                <p className={p1Score > p2Score ? "finish-win" : "finish-lose"}>
                  {p1Score}
                </p>
              )}
            </div>
            <div className="player-score">
              <h3>Score</h3>
              {!finish && (
                <input
                  type="number"
                  max="99"
                  value={p2Score}
                  onChange={(e) =>
                    e.target.value < 99
                      ? setP2Score(parseInt(e.target.value))
                      : setP2Score(99)
                  }
                />
              )}
              {finish && (
                <p className={p2Score > p1Score ? "finish-win" : "finish-lose"}>
                  {p2Score}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="player-display">
          {p1 === "rob" && <img src={rob} alt="" />}
          {p1 === "phil" && <img src={phil} alt="" />}
          {p1 === "lemphers" && <img src={lemphers} alt="" />}
          {p1 && p2 && <h3>vs</h3>}
          {p2 === "rob" && <img src={rob2} alt="" />}
          {p2 === "phil" && <img src={phil2} alt="" />}
          {p2 === "lemphers" && <img src={lemphers2} alt="" />}
        </div>

        {start && p1 && p2 && (
          <button className="btn start-btn" onClick={() => setStart(!start)}>
            Start
          </button>
        )}
        {!start && !finish && (
          <button className="btn finish-btn" onClick={() => finishBtn()}>
            Finish
          </button>
        )}
        {finish && (
          <button className="btn new-game-btn" onClick={() => newGame()}>
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

export default NewGame;
