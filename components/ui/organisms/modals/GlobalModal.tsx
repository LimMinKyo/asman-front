'use client';

import ModalLayout from 'components/ui/templates/ModalLayout';
import useModal from 'hooks/useModal';
import { Button } from 'react-daisyui';
import { useRecoilValue } from 'recoil';
import { globalModalState } from 'states/modal.state';

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
    <ModalLayout
      isOpen={isOpen}
      title={title}
      actions={
        <>
          {type === 'confirm' && <Button onClick={onClickCancel}>취소</Button>}
          <Button onClick={onClickOk}>확인</Button>
        </>
      }
    >
      {message}
    </ModalLayout>
  );
}
