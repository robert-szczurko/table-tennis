import React, { useState } from "react";
import "../css/MatchCard.css";
import lemphers from "../imgs/buu.png";
import rob from "../imgs/goku.png";
import phil from "../imgs/vegeta.png";
import phil2 from "../imgs/vegeta2.png";
import rob2 from "../imgs/goku2.png";
import lemphers2 from "../imgs/buu2.png";

function MatchCard({ p1, p2, p1Score, p2Score, date }) {
  let img1 = "";
  let img2 = "";

  if (p1 === "phil") {
    img1 = phil;
  }
  if (p1 === "rob") {
    img1 = rob;
  }
  if (p1 === "lemphers") {
    img1 = lemphers;
  }

  if (p2 === "phil") {
    img2 = phil2;
  }
  if (p2 === "rob") {
    img2 = rob2;
  }
  if (p2 === "lemphers") {
    img2 = lemphers2;
  }
  return (
    <div className="match-card">
      <div className="match-card-player">
        <img src={img1} alt="" />
        <p
          className={
            p1Score > p2Score ? "match-card-winner" : "match-card-loser"
          }>
          {p1Score}
        </p>
      </div>
      <div className="match-card-middle">
        <p>{date}</p>
        <p>
          {p1} vs {p2}
        </p>
      </div>
      <div className="match-card-player">
        <p
          className={
            p2Score > p1Score ? "match-card-winner" : "match-card-loser"
          }>
          {p2Score}
        </p>
        <img src={img2} alt="" />
      </div>
    </div>
  );
}

export default MatchCard;
