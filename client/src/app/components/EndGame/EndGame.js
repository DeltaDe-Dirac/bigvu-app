import "./EndGame.scss";
import React from "react";
import Button from "react-bootstrap/Button";

export default function EndGame({ headerText, buttonText, handleReset }) {
  return (
    <div className="endGame">
      <h1>{headerText}</h1>
      <Button type="button" onClick={handleReset}>
        {buttonText}
      </Button>
    </div>
  );
}
