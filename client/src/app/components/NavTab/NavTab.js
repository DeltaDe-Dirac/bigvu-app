import "./NavTab.scss";
import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";

const NavTab = () => {
  const [frameColor, setFrameColor] = useState("white");
  const handleSelect = (eventKey) => setFrameColor(eventKey);
  return (
    <Nav variant="tabs" activeKey={frameColor} onSelect={handleSelect}>
      <Nav.Item>
        <Nav.Link eventKey="white">White</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="blue">Blue</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default NavTab;
