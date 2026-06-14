import { useState } from "react";
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
                <NavbarBrand href="/">My Blog Logo</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="">New Feed</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="">Services</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                More
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem href="">Contact Us</DropdownItem>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Youtube</DropdownItem>
                                <DropdownItem>Instagram</DropdownItem>
                                <DropdownItem>LinkedIn</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;