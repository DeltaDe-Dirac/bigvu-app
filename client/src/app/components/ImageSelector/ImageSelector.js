import "./ImageSelector.scss";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setImageSource } from "../../../features/gallery/gallerySlice";
import { InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";

const ImageSelector = ({ itemList }) => {
  const dispatch = useDispatch();
  const [listItem, setListItem] = useState(-1);
  const [textInput, setTextInput] = useState("");

  const selectItem = (eventKey, e) => {
    setListItem(Number(eventKey));

    for (const i in itemList) {
      if (i === eventKey) {
        dispatch(setImageSource(itemList[i].value));
        break;
      }
    }
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
          title={!itemList[listItem] ? "Select" : itemList[listItem].name}
          onSelect={(eventKey, e) => selectItem(eventKey, e)}
        >
          {itemList.map((item, index) => (
            <Dropdown.Item
              key={`imageSelectorItem-${index}`}
              eventKey={index}
              className={listItem === index ? "active" : ""}
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <FormControl onChange={(e) => handleUserInput(e)} value={textInput} />
      </InputGroup>
    </>
  );
};

export default ImageSelector;
