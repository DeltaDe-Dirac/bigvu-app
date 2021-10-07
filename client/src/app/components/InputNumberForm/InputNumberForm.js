import "./InputNumberForm.scss";
import React, { createRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { isValidNumber } from "../../lib/bsMachineSpec";

function InputNumberForm({ setFlowState, flowState, init }) {
  const inputRef = createRef();
  const [validated, setValidated] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const [isValidInput, setIsValidInput] = useState({ class: "", id: "" });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      setValidated(true);
    } else if (!isValidNumber(Number(inputRef.current.value))) {
      setIsValidInput({ class: "invalid is-invalid", id: "validationCustom" });

      setValidated(true);
    } else {
      setIsValidInput({ class: "", id: "" });
      const newState = {
        type: init.eventType,
        num: inputRef.current.value,
      };
      setFlowState(newState);

      inputRef.current.value = "";
      setValidated(false);
      setIsRandom(false);
    }
  };

  function generateNumber(event) {
    setIsRandom(!isRandom);
    inputRef.current.value = event.target.checked
      ? flowState.context.allNums[Math.floor(Math.random() * flowState.context.allNums.length)]
      : "";
    setValidated(false);
    setIsValidInput({ class: "", id: "" });
  }

  return (
    <Col sm={12} md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
      <Form noValidate validated={validated} onSubmit={handleSubmit} className={init.className}>
        <Form.Group controlId={isValidInput.id} className="mb-3">
          <h3>{init.header}</h3>
          <Form.Control
            type="number"
            placeholder={init.placeholder}
            required
            ref={inputRef}
            maxLength="4"
            minLength="4"
            min="1023"
            max="9876"
            className={isValidInput.class}
          />
          <Form.Control.Feedback type="invalid">{init.invalidFeedback}</Form.Control.Feedback>
        </Form.Group>

        <div className="mb-3 form-check">
          <label className="form-check-label">
            <input
              id="testINFcheckbox"
              type="checkbox"
              className="form-check-input"
              onChange={(e) => generateNumber(e)}
              checked={isRandom}
            />
            Generate a random number for me
          </label>
        </div>

        <Button type="submit" id="testINFbtn">
          {init.btnText}
        </Button>
      </Form>
    </Col>
  );
}

export default InputNumberForm;
