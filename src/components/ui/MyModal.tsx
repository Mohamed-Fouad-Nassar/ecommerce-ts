import { Modal } from "react-bootstrap";

type MyModalProps = {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  title: string;
  children: React.ReactNode;
};

export default function MyModal({
  title,
  children,
  showModal,
  setShowModal,
}: MyModalProps) {
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      {children}
    </Modal>
  );
}

MyModal.Body = Modal.Body;
MyModal.Footer = Modal.Footer;
