import { ReactNode, createContext, useContext, useState } from 'react';

interface AuthModalContextType {
  openSignIn: () => void;
  openSignUp: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
  currentMode: 'signin' | 'signup';
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined
);

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const AuthModalProvider: React.FC<Props> = ({ children }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [currentMode, setCurrentMode] = useState<'signin' | 'signup'>('signin');

  const openSignIn = () => {
    setCurrentMode('signin');
    setIsAuthModalOpen(true);
  };

  const openSignUp = () => {
    setCurrentMode('signup');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const value = {
    openSignIn,
    openSignUp,
    closeAuthModal,
    isAuthModalOpen,
    currentMode,
  };

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};
