import React from 'react';
import './modal.scss';

interface props {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

export const Modal: React.FC<props> = ({
  active,
  setActive,
  setError,
  children,
}) => {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => {
        if (setError !== undefined) setError('');
        setActive(false);
        document.body.style.overflow = 'auto';
      }}
    >
      <div
        className={active ? 'modal__content active' : 'modal__content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
