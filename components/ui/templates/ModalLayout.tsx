'use client';

import { Modal } from 'react-daisyui';

interface Props {
  children: React.ReactNode | string;
  isOpen: boolean;
  title?: string;
}

export default function ModalLayout({ children, isOpen, title }: Props) {
  return (
    <Modal open={isOpen}>
      <Modal.Header className="font-bold">{title || '알림'}</Modal.Header>
      {children}
    </Modal>
  );
}
