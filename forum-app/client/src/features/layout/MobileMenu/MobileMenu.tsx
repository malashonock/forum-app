import ReactModal from 'react-modal';

import { Menu } from 'features/layout';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
      appElement={document.querySelector('#root') as HTMLElement}
    >
      <Menu />
    </ReactModal>
  );
};