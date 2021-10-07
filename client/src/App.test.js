import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

test("Enter your secret number", () => {
  render(<App />, container);
  expect(screen.getByText(/Enter your secret number/i)).toBeInTheDocument();
});

test("Generate a random number for me", () => {
  render(<App />, container);
  expect(screen.getByText(/Generate a random number for me/i)).toBeInTheDocument();
});

test("Next button", () => {
  render(<App />, container);
  expect(screen.getByText(/Next/i)).toBeInTheDocument();
});
