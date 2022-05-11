import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import GameScorecard from "./GameScorecard";
import nba from "../images/nba.png";
import { AppContext } from "../context/context";

const Nba = () => {
  const date = useContext(AppContext);
  const options = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/games",
    params: {
      date: date?.date,
      season: "2021" /*date.toISOString().slice(0, 10)*/,
    },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_NBA_KEY,
    },
  };
  const liveOptions = {
    method: "GET",
    url: "https://api-nba-v1.p.rapidapi.com/games",
    params: {
      live: "all",
    },
    headers: {
      "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.REACT_APP_NBA_KEY,
    },
  };
  const [liveGames, setLiveGames] = useState([]);
  const [games, setGames] = useState([]);
  useEffect(() => {
    axios(liveOptions).then((res) => {
      setLiveGames(res.data.response);
    });
    axios(options).then((response) => {
      setGames(response.data.response);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start p-3  min-w-[300px] sm:min-w-[400px] max-w-1/2 min-h-[200px] md:min-h-[400px]">
      <div className="flex flex-col items-center justify-between w-full gap-2 p-2">
        <h1 className="font-bold">NBA</h1>
        <img className="" src={nba} alt="nba" width={30} height={30} />
      </div>
      <div className="w-full p-2">
        <h1 className="w-full font-bold text-center bg-red-600 animate-pulse">
          <p className="text-[#FCE205]">Live</p>
        </h1>
        <div
          className={`grid items-center justify-center grid-cols-1 p-2 ${
            liveGames.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
          }  `}
        >
          {liveGames.length > 0 ? (
            liveGames.map((game) => {
              try {
                return (
                  <div className="w-full">
                    <GameScorecard
                      homeImage={game.teams.home.logo}
                      visitorImage={game.teams.visitors.logo}
                      key={game.teams.home.code}
                      homeName={game.teams.home.code}
                      homeScore={game.scores.home.points}
                      visitorsName={game.teams.visitors.code}
                      visitorsScore={game.scores.visitors.points}
                      status={game.status.long}
                    />
                    <hr className="w-full" />
                  </div>
                );
              } catch (e) {
                console.log(e);
              }
            })
          ) : (
            <div className="items-center justify-center w-full grid-cols-1 p-2">
              <p className="font-semibold text-center">No Games Live</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-full p-2 rounded-2xl">
        <h1 className="text-center">Finished</h1>
        <div
          className={`grid items-center justify-center grid-cols-1 p-2 ${
            games.length > 1 ? "grid-cols-2" : "grid-cols-1"
          }  `}
        >
          {games.length > 0 ? (
            games.map((game) => {
              if (game.status.long !== "Scheduled") {
                try {
                  return (
                    <div className="w-full">
                      <GameScorecard
                        homeImage={game.teams.home.logo}
                        visitorImage={game.teams.visitors.logo}
                        key={game.teams.home.code}
                        homeName={game.teams.home.code}
                        homeScore={game.scores.home.points}
                        visitorsName={game.teams.visitors.code}
                        visitorsScore={game.scores.visitors.points}
                      />
                      <hr className="w-full" />
                    </div>
                  );
                } catch (e) {
                  console.log(e);
                }
              }
            })
          ) : (
            <div className="items-center justify-center w-full grid-cols-1 p-2">
              <p className="text-center">no games today</p>
            </div>
          )}
        </div>
        <div className="w-full p-2 rounded-2xl">
          <h1 className="text-center">Scheduled</h1>
          <div
            className={`grid w-full items-center justify-center grid-cols-1 p-2${
              games.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
            }  `}
          >
            {games.length > 0 ? (
              games.map((game) => {
                if (game.status.long == "Scheduled") {
                  try {
                    return (
                      <div className="w-full">
                        <GameScorecard
                          homeImage={game.teams.home.logo}
                          visitorImage={game.teams.visitors.logo}
                          key={game.teams.home.code}
                          homeName={game.teams.home.code}
                          homeScore={game.scores.home.points}
                          visitorsName={game.teams.visitors.code}
                          visitorsScore={game.scores.visitors.points}
                        />
                        <hr className="w-full" />
                      </div>
                    );
                  } catch (e) {
                    console.log(e);
                  }
                }
              })
            ) : (
              <div className="items-center justify-center w-full grid-cols-1 p-2">
                <p className="text-center">No Games Scheduled today</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nba;
