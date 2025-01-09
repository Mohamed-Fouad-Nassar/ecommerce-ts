import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import Footer from "@components/ui/Footer";
import Header from "@components/ui/Header";
import ToastList from "@components/feedback/toast/ToastList";

import styles from "./mainLayout.module.css";
const { container, wrapper } = styles;

export default function MainLayout() {
  return (
    <div className={container}>
      <Header />

      <Container className={wrapper}>
        <Outlet />
        <ToastList />
      </Container>

      <Footer />
    </div>
  );
}
