import React, { useEffect, useState } from 'react';
import { TitlePage } from '../../components/UI/TitlePage';
import './search-page.scss';
import { useStore } from 'effector-react';
import {
  $techs_suppl,
  $tendersList,
  getSavedFiltersFx,
  getTechsAndSuppliersFx,
} from '../../store/search-store';
import { SearchFilter } from '../../components/SearchFilter';
import { ButtonPrimary } from '../../components/UI/Button';
import { TenderList } from '../../components/TenderList';
import { openLinkInNewTab } from '../../utils/functions';
import { Loader, PageLoader } from '../../components/UI/Loader';

const SearchPage: React.FC = () => {
  const tendersList = useStore($tendersList);
  const techs_suppl = useStore($techs_suppl);
  const [isTechsAndSuppliersLoading, setIsTechsAndSuppliersLoading] =
    useState<boolean>(true);

  useEffect(() => {
    if (techs_suppl.techs.length === 0 || techs_suppl.suppliers.length === 0)
      getTechsAndSuppliersFx().finally(() =>
        setIsTechsAndSuppliersLoading(false),
      );
    else setIsTechsAndSuppliersLoading(false);
    getSavedFiltersFx();
  }, []);

  const [isSearching, setIsSearching] = useState<boolean>(false);
  return isTechsAndSuppliersLoading ? (
    <PageLoader />
  ) : (
    <div className="search-page">
      <div>{process.env.API_URL}</div>
      <div className="search-page-container-header">
        <div className="container-header">
          <TitlePage title="Поиск тендерных заявок" />
          <SearchFilter setIsSearchingTenders={setIsSearching} />
        </div>
      </div>
      <div className="search-page-container-results">
        <div className="container-results">
          <div className="results-header">
            {tendersList.status !== 'WAITING' && (
              <div className="results-header__title">
                <span className="header-title__text">Результаты поиска</span>
                <span className="header-title__count">
                  Найдено тендеров:{' '}
                  {tendersList.length === undefined ? 0 : tendersList.length}
                </span>
              </div>
            )}

            {tendersList.isRelevance && (
              <div className="results-header__download-button">
                <ButtonPrimary
                  onHandleClick={() => {
                    tendersList.link !== undefined &&
                      openLinkInNewTab(`${tendersList.link}`);
                  }}
                  title="Скачать отчёт"
                />
              </div>
            )}
          </div>
          {isSearching ? (
            <div className="results-loading">
              <div className="results-loading-block">
                <Loader />
              </div>
            </div>
          ) : (
            <div className="results-list">
              {tendersList !== undefined && (
                <TenderList tenders={tendersList} />
              )}
              {tendersList.status === 'WAITING' && <div></div>}
              {tendersList.status === 'NOCONTENT' && (
                <div>Тендеров не было найдено</div>
              )}
              {tendersList.status === 'LIMITATION' && (
                <div>Вы уже сделали запрос. Подождите минуту.</div>
              )}
              {tendersList.status === 'FAILURE' && <div>Ошибка на сервере</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
