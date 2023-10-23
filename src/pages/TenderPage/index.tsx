import React, { useEffect, useState } from 'react';
import { ReactComponent as downloadDocumentIcon } from '../../assets/icons/download-document.svg';
import { ButtonIconOutline } from '../../components/UI/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $tenderInfo, getTenderInfoFx } from '../../store/tender-store';
import { makeMoney, openLinkInNewTab } from '../../utils/functions';
import { ReactComponent as backIcon } from '../../assets/icons/back.svg';

import './tender-page.scss';
import { PageLoader } from '../../components/UI/Loader';

const TenderPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const tenderInfo = useStore($tenderInfo);
  const history = useLocation();
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    if (history.state !== null) {
      getTenderInfoFx(history.state.number);
    }
    if (history.state === null) {
      if (id) getTenderInfoFx(id.toString());
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : tenderInfo !== null ? (
        <div className="tender-page">
          {history.state !== null && (
            <div className="tender-page__back">
              <div className="tender-page__back-btn">
                <ButtonIconOutline
                  Icon={backIcon}
                  title="Вернуться назад"
                  onHandleClick={() => navigate(-1)}
                />
              </div>
            </div>
          )}

          <div className="tender-page-card">
            <div className="card-info">
              <div className="info-main">
                <div className="info-main__first">
                  <div className="main-info__federal">{tenderInfo.federal}</div>
                </div>
                <div className="info-main__second">
                  <div className="main-info__number-tender">
                    № {tenderInfo.number}
                  </div>
                  <div className="info-main__date">
                    <div className="date__label">Размещено</div>
                    <div className="date__data">
                      {tenderInfo.placement_date}
                    </div>
                  </div>
                  <div className="info-main__date">
                    <div className="date__label">Окончание подачи заявок</div>
                    <div className="date__data">{tenderInfo.end_date}</div>
                  </div>
                </div>
              </div>
              <div className="info-main-extend">
                <div className="info-main-extend__element">
                  <div className="info-label">Статус</div>
                  <div className="info-data">{tenderInfo.stage}</div>
                </div>
                <div className="info-main-extend__element">
                  <div className="info-label">
                    Способ определения поставщика
                  </div>
                  <div className="info-data">{tenderInfo.supplier}</div>
                </div>
                <div className="info-main-extend__element">
                  <div className="info-label">Объект закупки</div>
                  <div className="info-data">{tenderInfo.name}</div>
                </div>
                <div className="info-main-extend__element">
                  <div className="info-label">Заказчик</div>
                  <div className="info-data">{tenderInfo.customer}</div>
                </div>
              </div>
            </div>
            <div className="card-price">
              <div className="price-label">Начальная цена</div>
              <div className="price-data">
                {makeMoney(tenderInfo.price)} RUB
              </div>
            </div>
          </div>
          <div className="tender-page-container-documents">
            <div className="container-documents-header">Документы</div>
            <div className="container-documents-list">
              {tenderInfo.documents?.map((document) => (
                <div key={document.title} className="document__element">
                  <div className="document-name">{document.title}</div>
                  <div className="document-download-btn">
                    <ButtonIconOutline
                      title="Скачать документ"
                      Icon={downloadDocumentIcon}
                      onHandleClick={(id) => {
                        openLinkInNewTab(`${document.document}`);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Ошибка</div>
      )}
      {}
    </>
  );
};

export default TenderPage;
