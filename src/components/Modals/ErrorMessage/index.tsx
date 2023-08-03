import React from 'react';
import {
  setErrorServerMessage,
} from '../../../store/errors';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

import './error-message.scss';

export const ErrorMessage: React.FC = () => {
  return (
    <div className="modal-error-container">
      <div className="modal-header">
        <div className="modal-header__title">Что-то пошло не так...</div>
        <CloseIcon
          className="modal-header__btn-close"
          onClick={() => {
            setErrorServerMessage(false);
            document.body.style.overflowY = 'auto';
          }}
        />
      </div>
      <div className="modal-content">
        <div className="modal-content__label">
          Технические неполадки, попробуйте позже
        </div>
      </div>
    </div>
  );
};
