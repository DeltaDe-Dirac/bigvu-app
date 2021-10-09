import "./ImageSelector.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageSource, selectIndex, setSelectedItem, setUserText } from "../../../features/gallery/gallerySlice";
import { InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";

const ImageSelector = ({ itemList }) => {
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState("");
  const selectedItem = useSelector(selectIndex);
  const placeHolder = "Type your text here";

  // --------------- FUNCTOINS ---------------
  const selectItem = (eventKey, e) => {
    const eventKeyNumber = Number(eventKey);
    if (selectedItem !== eventKeyNumber) {
      dispatch(setSelectedItem(eventKeyNumber));

      for (const i in itemList) {
        if (i === eventKey) {
          dispatch(setImageSource(itemList[i].value));
          break;
        }
      }
    }
  };

  const handleUserInput = (e) => {
    const text = e.target.value;
    setTextInput(text);
    dispatch(setUserText(text));
  };
  // --------------- FUNCTOINS ---------------

  // --------------- DOCUMENT ---------------
  return (
    <>
      <InputGroup className="mb-3">
        <DropdownButton
          menuVariant="dark"
          variant="dark"
          title={!itemList[selectedItem] ? "Select" : itemList[selectedItem].name}
          onSelect={(eventKey, e) => selectItem(eventKey, e)}
        >
          {itemList.map((item, index) => (
            <Dropdown.Item
              key={`imageSelectorItem-${index}`}
              eventKey={index}
              className={selectedItem === index ? "active" : ""}
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
        <FormControl onChange={(e) => handleUserInput(e)} value={textInput} placeholder={placeHolder} />
      </InputGroup>
    </>
  );
};
// --------------- DOCUMENT ---------------

export default ImageSelector;
