import "./App.css";
import Navbar from "./components/Navbar";
import Nba from "./components/Nba";
import Nfl from "./components/Nfl";
import Nhl from "./components/Nhl";
import Mlb from "./components/Mlb";
import Footer from "./components/Footer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";

function App() {
  return (
    <div className="relative flex flex-col justify-between w-screen">
      <Router>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <div className="grid items-start justify-center w-screen h-auto grid-rows-1 gap-8 p-4 m-auto md:grid-cols-2 md:h-auto">
                <Nba />
                <Nfl />
                <Nhl />
                <Mlb className="mt-3 " />
              </div>
            }
          />
          <Route path="/nba" element={<Nba className="h-full" />} />
          <Route path="/nfl" element={<Nfl />} />
          <Route path="/nhl" element={<Nhl />} />
          <Route path="/mlb" element={<Mlb />} />
        </Routes>

        {/* <Footer /> */}
      </Router>
    </div>
  );
}

export default App;
