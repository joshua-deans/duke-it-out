import React from "react";
import { Route, Switch } from "react-router-dom";
import CreateRoom from "./containers/CreateRoom";
import App from "./containers/App";

export default () =>
  <Switch>
    <Route path="/" exact component={CreateRoom} />
    <Route path="/Room" exact component={App} />
  </Switch>;