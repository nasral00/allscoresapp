import React, { useState, useEffect, useContext } from "react";
import GameScorecard from "./GameScorecard";
import axios from "axios";
import nhl from "../images/nhl.png";
import { AppContext } from "../context/context";

const Nhl = () => {
  const date = useContext(AppContext);
  const [games, setGames] = useState([]);
  const [liveGames, setLiveGames] = useState([]);

  const options = {
    method: "GET",
    url: "https://api-hockey.p.rapidapi.com/games/",
    params: {
      date: date?.date,
      league: "57",
      season: "2021",
      timezone: "America/Detroit",
    },
    headers: {
      "X-RapidAPI-Host": "api-hockey.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_NHL_KEY,
    },
  };
  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }
  useEffect(() => {
    axios(options).then((response) => {
      setGames(response.data.response);
    });
  }, []);

  return (
    <div className="flex flex-col items-center  min-w-[300px] sm:min-w-[400px] justify-start p-3 max-w-1/2 min-h-[200px] md:min-h-[400px] text-black rounded-2xl">
      <div className="flex flex-col items-center justify-between w-full gap-2 p-2">
        <h1 className="font-bold">NHL</h1>
        <img className="" src={nhl} alt="nba" width={30} height={30} />
      </div>
      <div className="w-full p-2">
        <h1 className="w-full font-bold text-center bg-red-600 animate-pulse">
          <p className="text-[#FCE205]">Live</p>
        </h1>
        <div
          className={`grid items-center justify-center grid-cols-1 ${
            liveGames.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
          }  `}
        >
          {games.length > 0 ? (
            games.map((game) => {
              if (
                game.status.long != "Finished" &&
                game.status.long != "Not Started"
              ) {
                return (
                  <div>
                    <GameScorecard
                      homeImage={game.teams.home.logo}
                      visitorImage={game.teams.away.logo}
                      homeName={game.teams.home.name.split(" ")[1]}
                      homeScore={game.scores.home}
                      visitorsName={game.teams.away.name.split(" ")[1]}
                      visitorsScore={game.scores.away}
                      status={game.status.long}
                    />

                    <hr className="w-full" />
                  </div>
                );
              }
            })
          ) : (
            <div className="items-center justify-center w-full grid-cols-1">
              <p className="text-center">No Live Games</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-2">
        <h1 className="text-center">Finished</h1>
        <div
          className={`grid items-center justify-center  grid-cols-1 ${
            games.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
          }  `}
        >
          {games.length > 0 ? (
            games.map((game) => {
              if (
                game.status.long !== "Scheduled" &&
                game.status.long == "Finished"
              ) {
                return (
                  <div>
                    <GameScorecard
                      homeImage={game.teams.home.logo}
                      visitorImage={game.teams.away.logo}
                      homeName={game.teams.home.name.split(" ")[1]}
                      homeScore={game.scores.home}
                      visitorsName={game.teams.away.name.split(" ")[1]}
                      visitorsScore={game.scores.away}
                    />
                    <hr className="w-full" />
                  </div>
                );
              }
            })
          ) : (
            <div className="items-center justify-center w-full grid-cols-1">
              <p className="text-center">No Games today</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-2">
        <h1 className="text-center">Scheduled</h1>
        <div
          className={`grid items-center justify-center  grid-cols-1 ${
            games.length > 1 ? "sm:grid-cols-2" : "grid-cols-1"
          }  `}
        >
          {games.length > 0 ? (
            games.map((game) => {
              if (game.status.long == "Not Started") {
                return (
                  <div>
                    <GameScorecard
                      homeImage={game.teams.home.logo}
                      visitorImage={game.teams.away.logo}
                      homeName={game.teams.home.name.split(" ")[1]}
                      homeScore={game.scores.home}
                      visitorsName={game.teams.away.name.split(" ")[1]}
                      visitorsScore={game.scores.away}
                    />
                    <p className="p-1 mt-0 text-xs text-center">
                      {tConvert(game.time)}
                    </p>
                    <hr className="w-full" />
                  </div>
                );
              }
            })
          ) : (
            <div className="items-center justify-center w-full grid-cols-1">
              <p className="text-center">No Games today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nhl;
