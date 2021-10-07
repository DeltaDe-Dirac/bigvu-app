import React from "react";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import App from "../../../App";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});
/*------------------------------------------------------------------*/

test("pass from secret to guess", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const checkbox = container.querySelector("#testINFcheckbox");

  act(() => {
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(screen.getByText(/Enter your guess number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block from secret to guess", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block more than 4 uique digits", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const inputSecret = container.querySelector(".form-control");

  inputSecret.value = 12345;
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block more than 4 digits but only 4 unique", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const inputSecret = container.querySelector(".form-control");

  inputSecret.value = 1234231;
  console.log(inputSecret.value);
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block more than 4 digits but only 3 unique", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const inputSecret = container.querySelector(".form-control");

  inputSecret.value = 1312113231;
  console.log(inputSecret.value);
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block less than 4 uique digits", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const inputSecret = container.querySelector(".form-control");

  inputSecret.value = 123;
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block on 4 non-unique digits", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const inputSecret = container.querySelector(".form-control");

  inputSecret.value = 1233;
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block on checkbox pressed twice", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const checkbox = container.querySelector("#testINFcheckbox");

  act(() => {
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
/*------------------------------------------------------------------*/

test("block on checkbox active and manually added digit", () => {
  act(() => {
    ReactDOM.render(<App />, container);
  });

  const button = container.querySelector("#testINFbtn");
  const inputSecret = container.querySelector(".form-control");
  const checkbox = container.querySelector("#testINFcheckbox");

  act(() => {
    checkbox.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  inputSecret.value += 1;
  console.log(inputSecret.value);
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});
