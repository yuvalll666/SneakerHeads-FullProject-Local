import React from "react";
import { Switch, Route } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <React.Fragment>
      <header>
        <Navbar />
      </header>
      <main className="container-fluid flex-fill">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </main>
      <footer></footer>
    </React.Fragment>
  );
}

export default App;
