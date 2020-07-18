import React from "react";
import { Switch, Route, BrowserRouter, Link } from "react-router-dom";
import Cities from "../components/city/Cities";
import Details from "../components/details/Details";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact render={() => <>home page</>} />
          <Route path="/cities" component={Cities} />
          <Route path="/details/:cityId" component={Details} />

    </Switch>
  );
};

export default Routes;
