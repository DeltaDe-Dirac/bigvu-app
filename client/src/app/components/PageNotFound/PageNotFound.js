import React from "react";
import { useHistory } from "react-router-dom";

import { Nav } from "react-bootstrap/";

import "./PageNotFound.scss";
import { Container } from "react-bootstrap";

export default function PageNotFound({ errCode, errText }) {
  const history = useHistory();
  return (
    <div className="pagenotfound-img">
      <Container>
        <h1>{errCode}</h1>
        <div className="notfound">
          <p className="text-uppercase">{errText}</p>
          <Nav.Link eventKey="back" onSelect={() => history.goBack()}>
            Back
          </Nav.Link>
        </div>
      </Container>
    </div>
  );
}
