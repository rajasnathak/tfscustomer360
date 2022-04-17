import React from 'react';
import Index from 'views/Index';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
describe("Index", () => {
  it("should render the Index component", () => {
    const wrapper = shallow(<Index />);
  });
});


