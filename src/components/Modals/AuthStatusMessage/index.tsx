import React from 'react';
import { ButtonIcon } from '../../UI/Button';
import { setAuthStatusMessage } from '../../../store/errors';

import './auth-status-message.scss';

export const ModalAuthStatusMessage: React.FC = () => {
  const onClick = () => {
    setAuthStatusMessage(false);
    window.location.href = '/auth';
  };
  return (
    <div className="modal-auth-status-message-container">
      <div className="modal-header">
        <div className="modal-header__title">Ваша сессия закончилась</div>
      </div>
      <div className="modal-content">
        <div className="modal-content__label">
          Время вашей сессии закончилось, перезайдите в свой аккаунт
        </div>

        <div className="modal-content__btns">
          <div className="btns__auth-button">
            <ButtonIcon title="Войти" onHandleClick={() => onClick()} />
          </div>
        </div>
      </div>
    </div>
  );
};
