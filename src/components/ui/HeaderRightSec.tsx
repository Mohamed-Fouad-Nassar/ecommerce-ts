import { NavLink, useNavigate } from "react-router-dom";
import { DropdownButton, Nav, NavDropdown } from "react-bootstrap";

import { logout } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import styles from "./headerRightSec.module.css";
const { dropDown } = styles;

const nav = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

export default function HeaderRightSec() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.auth);

  if (accessToken)
    return (
      <DropdownButton
        className={dropDown}
        align={{ lg: "end" }}
        title={`${user?.firstName} ${user?.lastName}`}
      >
        <NavDropdown.Item as={NavLink} to="/profile" end>
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/profile/orders">
          Orders
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item
          onClick={async () => {
            await dispatch(logout());
            navigate("/");
          }}
        >
          Log out
        </NavDropdown.Item>
      </DropdownButton>
    );

  return (
    <Nav>
      {nav.map(({ title, path }) => (
        <Nav.Link key={title} as={NavLink} to={path}>
          {title}
        </Nav.Link>
      ))}
    </Nav>
  );
}
