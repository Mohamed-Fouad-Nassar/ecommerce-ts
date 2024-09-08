import { NavLink } from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";

import HeaderDataSec from "@components/eCommerce/common/HeaderDataSec";

import styles from "./header.module.css";
import HeaderRightSec from "./HeaderRightSec";
const { headerContainer, headerLogo } = styles;

const nav = [
  { title: "Home", path: "/" },
  { title: "Categories", path: "/categories" },
  { title: "About", path: "/about-us" },
];

export default function Header() {
  return (
    <header>
      <Container className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge bg="info">eCom</Badge>
        </h1>

        <HeaderDataSec />
      </Container>

      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container className="justify-content-end">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {nav.map(({ title, path }) => (
                <Nav.Link key={title} as={NavLink} to={path}>
                  {title}
                </Nav.Link>
              ))}
            </Nav>

            <HeaderRightSec />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
