import React from "react";
import { Switch, Route } from "react-router-dom";
import Cities from "../components/Cities";
import Api from "../components/Api";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact render={() => <>home page</>} />
      <Route path="/cities" component={Cities} />
      <Route path="/api" component={Api} />
    </Switch>
  );
};

export default Routes;
