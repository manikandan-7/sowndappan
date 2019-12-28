import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import state from "./store/store";
//pages
import DashBoard from "./page/dashboard.page";
import Login from "./page/login.page";
import Register from "./page/register.page";
import Private from "./HOC/private.hoc";
import Book from "./page/book.page";
import Nav from "./components/nav.component";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <div className="text-center">
          <Route exact path="/" component={DashBoard} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Switch>
            <Private exact path="/book" component={Book} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
