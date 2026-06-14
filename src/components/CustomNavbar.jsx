import { useState } from "react";
import { NavLink as ReactLink } from "react-router-dom";
import {
    Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar,
    NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink, UncontrolledDropdown
} from "reactstrap";

const CustomNavbar = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar {...props} color='dark' dark expand="md" fixed='' className='px-5'>
                <NavbarBrand tag={ReactLink} to="/">My Blog Logo</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/feeds">New Feed</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/services">Services</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem tag={ReactLink} to="/contactus">Contact Us</DropdownItem>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>LinkedIn</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <Nav>
                        <NavItem>
                            <NavLink tag={ReactLink} to="/signup">Sign Up</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;