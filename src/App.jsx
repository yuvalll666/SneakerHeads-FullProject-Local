import React from "react";
import { Switch, Route } from "react-router-dom";

//Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Result from "./components/Result";
import Signin from "./components/Signin";

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
          <Route path="/step1" component={Step1} />
          <Route path="/step2" component={Step2} />
          <Route path="/result" component={Result} />
          <Route path="/Signin" component={Signin} />
        </Switch>
      </main>
      <footer></footer>
    </React.Fragment>
  );
}

export default App;
