import React from "react";

const GameScorecard = ({
  status,
  homeImage,
  visitorImage,
  homeName,
  visitorsName,
  homeScore,
  visitorsScore,
}) => {
  return (
    <div className="grid grid-rows-2 list-none items-start min-h-[80px] m-2 text-black">
      <div className="flex flex-row items-stretch justify-between px-2 text-sm sm:min-w-[130px] md:min-w-[140px] justify-items-start">
        <div className="flex flex-row">
          <img
            src={homeImage}
            alt={homeName}
            height={5}
            width={20}
            className="mr-2"
          />
          <li>{homeName}</li>
        </div>

        <li>{homeScore}</li>
      </div>
      <div className="flex flex-row items-center justify-between px-2 sm:min-w-[130px] md:min-w-[140px] text-sm ">
        <div className="flex flex-row">
          <img
            src={visitorImage}
            alt={homeName}
            height={5}
            width={20}
            className="mr-2"
          />
          <li>{visitorsName}</li>
        </div>

        <li>{visitorsScore}</li>
      </div>
      <p className="text-xs text-center">{status}</p>
    </div>
  );
};

export default GameScorecard;
