import "./ImageSelector.scss";
import React, { useState } from "react";
import { InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";

const ImageSelector = ({ itemList }) => {
  const [listItem, setListItem] = useState(0);
  const [textInput, setTextInput] = useState("");

  const selectItem = (eventKey, e) => {
    // console.log(eventKey, e);
    setListItem(Number(eventKey));
  };

  const handleUserInput = (e) => {
    // console.log(e.target.value);
    setTextInput(e.target.value);
  };

  return (
    <>
      <InputGroup className="mb-3">
        <DropdownButton
          menuVariant="dark"
          variant="dark"
          title="Dropdown"
          onSelect={(eventKey, e) => selectItem(eventKey, e)}
        >
          {itemList.map((item, index) => (
            <Dropdown.Item
              key={`imageSelectorItem-${index}`}
              eventKey={index}
              className={listItem === index ? "active" : ""}
            >
              {item}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <FormControl onChange={(e) => handleUserInput(e)} value={textInput} />
      </InputGroup>
    </>
  );
};

export default ImageSelector;
