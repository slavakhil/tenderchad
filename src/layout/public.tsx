import React from 'react';
import { NavBar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import AuthPage from '../pages/AuthPage';

export const PublicApp: React.FC = () => {
  return (
    <>
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
