import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Grommet } from "grommet";
import { customTheme } from "./theme";
import { NavHeader } from "./components/landing";

import Landing from "./views/landing";
import Query1 from "./views/query1";
import Query2 from "./views/query2";
import Query3 from "./views/query3";
import Query4 from "./views/query4";
import Query5 from "./views/query5";

function App() {
  return (
    <Grommet theme={customTheme} full>
      <NavHeader />
      <Router>
        <Switch>
          <Route path="/query1">
            <Query1 />
          </Route>
          <Route path="/query2">
            <Query2 />
          </Route>
          <Route path="/query3">
            <Query3 />
          </Route>
          <Route path="/query4">
            <Query4 />
          </Route>
          <Route path="/query5">
            <Query5 />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </Grommet>
  );
}

export default App;
