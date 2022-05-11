import React, { useState } from "react";
import { IoMdFunnel } from "react-icons/io";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const toggleNav = () => {
    setNav((prev) => !prev);
    console.log(nav);
  };
  const buttonToggleNav = () => {
    setNav((prev) => !prev);
  };
  return (
    <div className="flex justify-center items-center py-4 w-full h-[60px] bg-[#B02109] text-white z-10 shadow-lg">
      <div className="flex justify-between w-3/4">
        <h1>
          <Link to="/">AllScores</Link>{" "}
        </h1>
        <ul className="hidden md:flex">
          <li className="mx-3">
            <Link to="/nba">NBA </Link>
          </li>

          <li className="mx-3">
            <Link to="/nfl">NFL</Link>
          </li>
          <div className="mx-3">
            <Link to="/nhl">NHL</Link>
          </div>
          <div className="mx-3">
            <Link to="mlb">MLB</Link>
          </div>
        </ul>
      </div>

      {!nav ? (
        <IoMdFunnel
          size={20}
          color="white"
          className="flex self-center duration-150 cursor-pointer md:hidden"
          onClick={toggleNav}
        />
      ) : (
        <AiOutlineCloseSquare
          size={20}
          color="white"
          className="flex self-center duration-150 cursor-pointer md:hidden"
          onClick={toggleNav}
        />
      )}
      {nav && (
        <div
          className={`w-full h-[60px] absolute bg-[#17408B] top-[60px] right-0 list-none md:hidden flex flex-row justify-center items-center `}
        >
          <li className="mx-3">
            <Link to="/nba" onClick={toggleNav}>
              NBA
            </Link>
          </li>

          <li className="mx-3">
            <Link to="/nfl" onClick={toggleNav}>
              NFL
            </Link>
          </li>

          <li className="mx-3">
            <Link to="/nhl" onClick={toggleNav}>
              NHL
            </Link>
          </li>
          <li className="mx-3">
            <Link to="/mlb" onClick={toggleNav}>
              MLB
            </Link>
          </li>
        </div>
      )}
    </div>
  );
};

export default Navbar;
