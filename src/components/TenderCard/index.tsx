import React from 'react';
import './tender-card.scss';
import { ITender } from '../../types/models';
import { makeMoney } from '../../utils/functions';
import { NavLink } from 'react-router-dom';

interface ITenderCard {
  tender: ITender;
  isRelevance: boolean;
}

export const TenderCard: React.FC<ITenderCard> = ({ tender }) => {
  return (
    <div className="tender-card">
      <div
        className={`card-color ${
          tender.relevance !== undefined
            ? tender.relevance > 0.18
              ? 'green'
              : tender.relevance > 0.05
              ? 'yellow'
              : 'red'
            : ''
        }`}
      ></div>
      <div className="card-info">
        <div className="info-main">
          <div className="info-main__first">
            <div className="main-info__federal-and-supplier">
              <div className="info__federal">{tender.federal}</div>
              <div className="info__supplier">{tender.supplier}</div>
            </div>
          </div>
          <div className="info-main__second">
            <NavLink
              className="main-info__number-tender"
              to={`/tender/${tender.number}`}
              state={tender}
            >
              № {tender.number}
            </NavLink>
            <div className="info-main__date">
              <div className="date__label">Размещено</div>
              <div className="date__data">{tender.placement_date}</div>
            </div>
            <div className="info-main__date">
              <div className="date__label">Окончание подачи заявок</div>
              <div className="date__data">{tender.end_date}</div>
            </div>
          </div>
        </div>
        <div className="info-main-extend">
          <div className="info-main-extend__element">
            <div className="info-label">Статус</div>
            <div className="info-data">{tender.stage}</div>
          </div>
          <div className="info-main-extend__element">
            <div className="info-label">Объект закупки</div>
            <div className="info-data">{tender.name}</div>
          </div>
          <div className="info-main-extend__element">
            <div className="info-label">Заказчик</div>
            <div className="info-data">{tender.customer}</div>
          </div>
        </div>
      </div>
      <div className="card-price">
        <div className="price-label">Начальная цена</div>
        <div className="price-data">{makeMoney(tender.price)} RUB</div>
      </div>
    </div>
  );
};
