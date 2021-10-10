import React, { useState } from "react";
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

import { Nav } from "react-bootstrap/";

import "./PageNotFound.scss";
import { Container } from "react-bootstrap";

export default function PageNotFound({ errCode, errText }) {
  const history = useHistory();
  // const [redirectTo, setRedirectTo] = useState(null);

  // if (redirectTo !== null) {
  //   return <Redirect to={redirectTo}></Redirect>;
  // }

  // const img = process.env.PUBLIC_URL.concat(imgPath);

  return (
    <div className="pagenotfound-img">
      <Container>
        <h1>{errCode}</h1>
        <div className="notfound">
          <p className="text-uppercase">{errText}</p>
          {/* <Nav.Link eventKey="/white" onSelect={(selectedKey) => setRedirectTo(selectedKey)}>
            Home
          </Nav.Link> */}
          <Nav.Link eventKey="back" onSelect={() => history.goBack()}>
            Back
          </Nav.Link>
        </div>
      </Container>
    </div>
  );
}
