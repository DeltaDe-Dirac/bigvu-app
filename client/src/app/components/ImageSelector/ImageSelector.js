import "./ImageSelector.scss";
import React, { useCallback } from "react";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setImageSource, selectIndex, setSelectedItem, setUserText } from "../../../features/gallery/gallerySlice";
import { InputGroup, DropdownButton, Dropdown, FormControl } from "react-bootstrap";

const ImageSelector = ({ itemList }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(selectIndex);
  const placeHolder = "Type your text here";

  // --------------- FUNCTIONS ---------------
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
  // --------------- FUNCTIONS ---------------

  // --------------- REACT HOOKS ---------------
  const memoizedCallback = useCallback(
    debounce((e) => {
      dispatch(setUserText(e.target.value));
    }, 300)
  );
  // --------------- REACT HOOKS ---------------

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
        <FormControl onChange={(e) => memoizedCallback(e)} placeholder={placeHolder} />
      </InputGroup>
    </>
  );
};
// --------------- DOCUMENT ---------------

export default ImageSelector;
