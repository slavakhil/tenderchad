import React from 'react';
import { NavBar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import AuthPage from '../pages/AuthPage';
import { Modal } from '../components/UI/Modal';
import { ErrorMessage } from '../components/Modals/ErrorMessage';
import { useStore } from 'effector-react';
import { $errorServerMessage } from '../store/errors';

export const PublicApp: React.FC = () => {
  const errorMessage = useStore($errorServerMessage);

  return (
    <>
      <Modal active={errorMessage} setActive={() => {}}>
        <ErrorMessage />
      </Modal>
      <div>
        <NavBar />
      </div>
      <AuthPage />
      <div className="footer-block">
        <Footer />
      </div>
    </>
  );
};
