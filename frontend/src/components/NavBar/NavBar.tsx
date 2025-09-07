import { Avatar } from "primereact/avatar"
import Text from "../Text/Text"
import "./NavBar.css";
import { navbarItems } from "./navbarItems";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar-wrapper">
      <Text className="typography-heading-1">WebKöltség</Text>
      <div className="navbar-avatar-and-items-wrapper">
        <div className="navbar-items-wrapper">
          {navbarItems.map(item => (
            <div key={`nav-item-${item.label.toLowerCase()}`} className="navbar-item">
              {item.icon}
              <Link to={item.link}>{item.label}</Link>
            </div>
          ))}
        </div>
        <Avatar icon="pi pi-user" shape="square" className="navbar-avatar" size="normal" />
      </div>
    </div>
  );
};

export default NavBar