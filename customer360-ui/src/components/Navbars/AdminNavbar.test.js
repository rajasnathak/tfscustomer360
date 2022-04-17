import React from 'react';
import AdminNavbar from './AdminNavbar';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
describe("AdminNavbar", () => {
  it("should render the Admin Navbar component", () => {
    const wrapper = shallow(<AdminNavbar />);
  });
});


