import React from "react";
import "./App.scss";
import Container from "react-bootstrap/Container";
import { Counter } from "./features/counter/Counter";
import { Gallery } from "./features/gallery/Gallery";

function App() {
  return (
    <div className="App">
      {/* <Container>{myComponent(flowState)}</Container> */}
      <Container>
        <Gallery></Gallery>
        <Counter></Counter>
      </Container>
    </div>
  );
}

export default App;
