import React from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
// import { Counter } from "./features/counter/Counter";
import { Gallery } from "./features/gallery/Gallery";
import { HashRouter, Switch, Route } from "react-router-dom";
import PageNotFound from "./app/components/PageNotFound/PageNotFound";

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/white">
          <div className="App">
            <Container>
              <Gallery></Gallery>
            </Container>
          </div>
        </Route>
        <Route path="/">
          <PageNotFound errCode="404" errText="page not found" />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
