import { Link, NavLink } from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";

import HeaderBasket from "@components/eCommerce/common/HeaderBasket";
import HeaderWishlist from "@components/eCommerce/common/HeaderWishlist";

import styles from "./header.module.css";
const { headerContainer, headerLogo } = styles;

const navOne = [
  { title: "Home", path: "/" },
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

          <div className="d-flex justify-content-end align-items-center gap-3 align-self-md-end">
            <Link className="text-decoration-none" to="/wishlist">
              <HeaderWishlist />
            </Link>
            <Link className="text-decoration-none" to="/cart">
              <HeaderBasket />
            </Link>
          </div>
        </Container>
      </div>

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
