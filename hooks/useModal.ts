import { useSetRecoilState } from 'recoil';
import { GlobalModalState, globalModalState } from 'states/modal.state';

export default function useModal() {
  const setModal = useSetRecoilState(globalModalState);

  const openModal = (options: Omit<GlobalModalState, 'isOpen'>) => {
    setModal({ isOpen: true, ...options });
  };

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    openModal,
    closeModal,
  };
}
