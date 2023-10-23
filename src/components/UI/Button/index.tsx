import React from 'react';
import { IButton, IButtonIcon } from '../../../types/models';
import './buttons.scss';
import { ReactSVG } from 'react-svg';

export const ButtonIcon: React.FC<IButtonIcon> = ({
  onHandleClick,
  type,
  title,
  disabled,
  Icon,
}) => {
  return (
    <button
      className="button-general button-icon"
      onClick={() => onHandleClick()}
      disabled={disabled}
    >
      {
        Icon && <Icon className="button-icon__icon" />
      }
      
      <div className="button-icon__title">{title}</div>
    </button>
  );
};

export const ButtonPrimary: React.FC<IButton> = ({
  onHandleClick,
  type,
  title,
  disabled,
}) => {
  return (
    <button
      className="button-general button-primary"
      onClick={(params) => onHandleClick(params)}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export const ButtonIconOutline: React.FC<IButtonIcon> = ({
  onHandleClick,
  type,
  title,
  disabled,
  Icon,
}) => {
  return (
    <button
      className="button-general button-icon-outline"
      onClick={() => onHandleClick()}
      disabled={disabled}
    >
      {
        Icon && <Icon className="button-icon-outline__img" />
      }
      
      <div className={type === undefined ? 'button-icon-outline__title' : type}>
        {title}
      </div>
    </button>
  );
};
