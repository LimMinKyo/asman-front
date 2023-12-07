'use client';

import { atom } from 'recoil';

type ModalType = 'alert' | 'confirm';

export interface GlobalModalState {
  isOpen: boolean;
  message: React.ReactNode;
  title?: string;
  type?: ModalType;
  onCancel?: () => void;
  onOk?: () => void;
}

export const globalModalState = atom<GlobalModalState>({
  key: 'modalState',
  default: {
    isOpen: false,
    title: '',
    message: '',
  },
});
