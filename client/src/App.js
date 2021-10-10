import React from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Gallery } from "./features/gallery/Gallery";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageNotFound from "./app/components/PageNotFound/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/white">
          <div className="App">
            <Container>
              <Gallery frameColor="white"></Gallery>
            </Container>
          </div>
        </Route>
        <Route exact path="/blue">
          <div className="App">
            <Container>
              <Gallery frameColor="blue"></Gallery>
            </Container>
          </div>
        </Route>
        <Route path="/">
          <PageNotFound errCode="404" errText="page not found" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
