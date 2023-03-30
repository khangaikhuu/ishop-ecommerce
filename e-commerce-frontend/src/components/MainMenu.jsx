import SubMenu from "./SubMenu";
import { useState, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { fetchMenu } from "../services/fetchData";

export default function MainMenu() {
  const URL = "http://localhost:8181/menu/all";

  const [menus, setMenus] = useState([]);

  useEffect(() => {
    fetchMenu(URL, setMenus);
  }, []);

  const subMenus = menus.map((subMenu, idx) => {
    return (
      <SubMenu
        key={idx}
        id={subMenu._id}
        title={subMenu.title}
        position={subMenu.position}
        children={subMenu.children}
      />
    );
  });

  return (
    <div>
      <Navbar bg="light" id="mainMenu-container" className="px-5">
        {subMenus}
      </Navbar>
    </div>
  );
}
