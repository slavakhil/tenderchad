import React from 'react';
import { ButtonPrimary } from '../../components/UI/Button';
import tenderchadImage from '../../assets/tenderchad-image.svg';
import './main-page.scss';
import { NavLink } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <div className="page-image">
        <img className="image-img" src={tenderchadImage} />
      </div>
      <div className="page-info">
        <div className="title-text">TenderChad</div>
        <div className="page-description">
          Аналитическая система, позволяющая оптимизировать процесс поиска и
          анализ тендеров для вашей компании.
        </div>
        <NavLink
          target="_blank"
          className="page-btn"
          to={'https://tenderchad.ru/'}
        >
          <ButtonPrimary title="Узнать больше" onHandleClick={() => {}} />
        </NavLink>
      </div>
    </div>
  );
};

export default MainPage;
