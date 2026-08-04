import React, { useEffect, useState } from "react";
import { NavLink as ReactLink, useNavigate } from "react-router-dom";
import {
    Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar,
    NavbarBrand, NavbarText, NavbarToggler, NavItem, NavLink, UncontrolledDropdown
} from "reactstrap";
import { doLogout, getCurrentUser, isLoggedIn } from "../auth";

const CustomNavbar = (props) => {

    let navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        setLogin(isLoggedIn());
        setUser(getCurrentUser());
    }, [login]);

    const logout = () => {
        doLogout(() => {
            //logged out
            setLogin(false);
            navigate("/");
        });
    }

    return (
        <div>
            <Navbar {...props} color='dark' dark expand="md" fixed='' className='px-5'>
                <NavbarBrand tag={ReactLink} to="/">My Blog Logo</NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
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

                    <Nav navbar>
                        {
                            login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/profile-info">Profile Info</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/user/dashboard">{user?.name}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={logout}>Logout</NavLink>
                                    </NavItem>
                                </>
                            )
                        }
                        {
                            !login && (
                                <>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/login">Sign In</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={ReactLink} to="/signup">Sign Up</NavLink>
                                    </NavItem>
                                </>
                            )
                        }

                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
};

export default CustomNavbar;