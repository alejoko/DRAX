import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

//Custom Component Imports
//import Header from "./Header";
import Home from "./Home";
import SideBar from "./Layout/SideBar";
import Header from "./Layout/Header";
import { NotFound } from "./NotFound";

const App = (): JSX.Element => {
  return (
    <>
      <Router>  
        <Header />
        <SideBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/404" component={NotFound} />

          <Redirect to="/404" />
        </Switch>
      </Router>
    </>
  );
};
//

export default App;