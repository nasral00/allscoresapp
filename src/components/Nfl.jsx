import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import GameScorecard from "./GameScorecard";
import nfl from "../images/nfl.png";
import { AppContext } from "../context/context";

const Nfl = () => {
  const date = useContext(AppContext);
  console.log(date?.date);
  const options = {
    method: "GET",
    url: `https://api.sportsdata.io/v3/nfl/scores/json/ScoresByDate/${date?.date}?key=${process.env.REACT_APP_NFL_KEY}`,
  };
  const [games, setGames] = useState([]);
  useEffect(() => {
    axios(options).then((response) => {
      console.log(response.data);
      setGames(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-3 max-w-1/2  min-w-[300px] sm:min-w-[400px] min-h-[200px] md:min-h-[400px]  rounded-2xl ">
      <div className="p-5">
        <h1>NFL</h1>
        <img src={nfl} alt="nfl" width={30} height={30} />
      </div>
      <div
        className={`grid grid-flow-row ${
          games.length > 0 ? "grid-cols-2" : "grid-cols-1"
        }  `}
      >
        {games.length > 0 ? (
          games.map((game) => {
            console.log(Object.values(game.AwayTeam).join(""), "game");
            console.log(Object.values(game)[7], "score");
            return (
              <GameScorecard
                homeName={Object.values(game.HomeTeam).join("")}
                homeScore={Object.values(game)[7]}
                visitorsName={Object.values(game.AwayTeam).join("")}
                visitorsScore={Object.values(game)[8]}
              />
            );
          })
        ) : (
          <div className="items-center justify-center w-full">
            <p className="text-center">no games today</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nfl;
