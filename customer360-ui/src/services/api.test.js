import APIForm from "./apicall";
import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { BrowserRouter } from "react-router-dom";

Enzyme.configure({ adapter: new Adapter() });

const apiCallProps = {
  passToHeader: jest.fn(),
};
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

const setup = (props = {}) => {
  const p = { ...props, ...apiCallProps };
  return shallow(
    <BrowserRouter>
      <APIForm {...p} />
    </BrowserRouter>
  );
};

test("Form should exist", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "form");
  expect(component).toBeTruthy();
});

test("Search bar should exist", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "search_param");
  expect(component).toBeTruthy();
});

test("There should be search label", () => {
  const wrapper = setup();
  const component = findByTestAttr(
    wrapper,
    "demo-simple-select-required-label"
  );
  expect(component).toBeTruthy();
});

test("input box for customer search", () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, "input");
  expect(component).toBeTruthy();
});

