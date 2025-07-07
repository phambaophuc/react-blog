import { useAuthModal } from '@/libs/context';

import SignInModal from './signin';
import SignUpModal from './signup';

const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    currentMode,
    closeAuthModal,
    openSignUp,
    openSignIn,
  } = useAuthModal();

  return (
    <>
      <SignInModal
        open={isAuthModalOpen && currentMode === 'signin'}
        onClose={closeAuthModal}
        switchToSignUp={openSignUp}
      />
      <SignUpModal
        open={isAuthModalOpen && currentMode === 'signup'}
        onClose={closeAuthModal}
        switchToSignIn={openSignIn}
      />
    </>
  );
};

export default AuthModal;
