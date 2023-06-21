import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export function ModalManager({ children }) {
  const [modal, setModal] = useState(null);

  function openModal(ModalComponent, modalProps) {
    setModal({ Component: ModalComponent, props: modalProps });
  }

  function closeModal() {
    setModal(null);
  }

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modal && <modal.Component {...modal.props} onClose={closeModal} />}
    </ModalContext.Provider>
  );
}
