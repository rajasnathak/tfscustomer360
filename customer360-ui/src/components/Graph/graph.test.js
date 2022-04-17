import React from 'react';
import { runForceGraph } from './GraphGenerator';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
describe("runForceGraph", () => {
  it("should render the Force Graph component", () => {
    const wrapper = shallow(<runForceGraph />);
  });
});


