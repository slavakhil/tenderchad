import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from '../../router';
import { NotFoundPage } from '../../pages/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {routes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
