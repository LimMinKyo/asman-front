'use client';

import { Modal } from 'react-daisyui';

interface Props {
  children: React.ReactNode | string;
  isOpen: boolean;
  title?: string;
  actions: React.ReactNode;
}

export default function ModalLayout({
  children,
  isOpen,
  title,
  actions,
}: Props) {
  return (
    <Modal open={isOpen}>
      <Modal.Header className="font-bold">{title || '알림'}</Modal.Header>
      <Modal.Body className="text-center">{children}</Modal.Body>
      <Modal.Actions>{actions}</Modal.Actions>
    </Modal>
  );
}
