import React from "react";
import { NavLink, Nav, NavDropdown } from "react-bootstrap";

const SubMenu = (props) => {
  const subMenu =
    props.children.length > 0 ? (
      <NavDropdown title={props.title}>
        {props.children.map((child, index) => {
          return <NavDropdown.Item key={index}>{child.title}</NavDropdown.Item>;
        })}
      </NavDropdown>
    ) : (
      <NavLink>{props.title}</NavLink>
    );

  return (
    <div>
      <Nav className="Navbar ps-5 px-2" id={props.id}>
        {subMenu}
      </Nav>
    </div>
  );
};

export default SubMenu;
