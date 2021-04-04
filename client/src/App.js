import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Routes/Home/home";
import Search from "./Routes/Search/search";
import SignIn from "./Routes/SignIn/signIn";
import DailyItinerary from "./Routes/Daily_Itinerary/daily_itinerary.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/daily_itinerary">
              <DailyItinerary />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;
