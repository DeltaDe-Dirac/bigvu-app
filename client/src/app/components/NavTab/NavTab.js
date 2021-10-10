import "./NavTab.scss";
import React from "react";
import Nav from "react-bootstrap/Nav";

const NavTab = ({ frameColor }) => {
  return (
    <Nav variant="tabs" activeKey={`/${frameColor}`}>
      <Nav.Item>
        <Nav.Link href="/white">White</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/blue">Blue</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavTab;
