import React from 'react';
import './loader.scss';

export const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div></div>
    </div>
  );
};

export const PageLoader: React.FC = () => {
  return (
    <div className="page-loading">
      <div className="loading-block">
        <Loader />
      </div>
    </div>
  );
};

export const AppLoader: React.FC = () => {
  return (
    <div className="app-loading">
      <div className="loading-block">
        <Loader />
      </div>
    </div>
  );
};
