import React from 'react';
import { ButtonPrimary } from '../../components/UI/Button';
import errorImage from '../../assets/error404.svg';
import './not-found-page.scss';
import { NavLink } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="page-code">
        <img className="code-img" src={errorImage} />
      </div>
      <div className="title-text">Страница не найдена</div>
      <div className="page-description">
        Возможно она была удалена или перенесена на другой адрес
        <br /> Попробуйте вернуться на главную страницу
      </div>
      <NavLink className="page-btn" to={'/'}>
        <ButtonPrimary title="Перейти на главную" onHandleClick={() => {}} />
      </NavLink>
    </div>
  );
};
