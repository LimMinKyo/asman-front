'use client';

import ModalLayout from 'src/components/ui/templates/ModalLayout';
import useModal from 'src/hooks/useModal';
import { Button, Modal } from 'react-daisyui';
import { useRecoilValue } from 'recoil';
import { globalModalState } from 'src/states/modal.state';

export default function GlobalModal() {
  const { isOpen, title, message, type, onOk, onCancel } =
    useRecoilValue(globalModalState);
  const { closeModal } = useModal();

  const onClickCancel = async () => {
    onCancel?.();
    closeModal();
  };

  const onClickOk = async () => {
    onOk?.();
    closeModal();
  };

  return (
    <ModalLayout isOpen={isOpen} title={title}>
      <Modal.Body className="text-center">{message}</Modal.Body>
      <Modal.Actions>
        {type === 'confirm' && <Button onClick={onClickCancel}>취소</Button>}
        <Button onClick={onClickOk}>확인</Button>
      </Modal.Actions>
    </ModalLayout>
  );
}
