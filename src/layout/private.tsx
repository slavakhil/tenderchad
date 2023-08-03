import React, { Suspense } from 'react';
import { Modal } from '../components/UI/Modal';
import { ModalAuthStatusMessage } from '../components/Modals/AuthStatusMessage';
import { ErrorMessage } from '../components/Modals/ErrorMessage';
import { NavBar } from '../components/Navbar';
import { AppRouter } from '../components/AppRouter/AppRouter';
import { PageLoader } from '../components/UI/Loader';
import { Footer } from '../components/Footer';
import { useStore } from 'effector-react';
import { $authStatusMessage, $errorServerMessage } from '../store/errors';

export const PrivateApp: React.FC = () => {
  const authStatusMessage = useStore($authStatusMessage);
  const errorMessage = useStore($errorServerMessage);
  return (
    <>
      <Modal active={authStatusMessage} setActive={() => {}}>
        <ModalAuthStatusMessage />
      </Modal>
      <Modal active={errorMessage} setActive={() => {}}>
        <ErrorMessage />
      </Modal>
      <div>
        <NavBar />
        <Suspense fallback={<PageLoader />}>
          <AppRouter />
        </Suspense>
      </div>
      <div className="footer-block">
        <Footer />
      </div>
    </>
  );
};
