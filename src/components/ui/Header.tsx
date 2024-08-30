import {
  // Link,
  NavLink,
} from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";

import HeaderBasket from "@components/eCommerce/HeaderBasket";

import styles from "./header.module.css";
const { headerContainer, headerLogo } = styles;

const navOne = [
  { title: "Home", path: "/" },
  // { title: "Products", path: "/products/men" },
  { title: "Categories", path: "/categories" },
  { title: "About", path: "/about-us" },
];

const navTwo = [
  { title: "Login", path: "/login" },
  { title: "Register", path: "/register" },
];

export default function Header() {
  return (
    <header>
      <div>
        <Container className={headerContainer}>
          <h1 className={headerLogo}>
            <span>our</span> <Badge bg="info">Ecom</Badge>
          </h1>

          {/* <Link className="align-self-md-end" to="/cart"> */}
          <HeaderBasket />
          {/* </Link> */}
        </Container>
      </div>

      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navOne.map(({ title, path }) => (
                <Nav.Link key={title} as={NavLink} to={path}>
                  {title}
                </Nav.Link>
              ))}
            </Nav>
            <Nav>
              {navTwo.map(({ title, path }) => (
                <Nav.Link key={title} as={NavLink} to={path}>
                  {title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
