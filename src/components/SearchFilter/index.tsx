import React, { useState, useEffect } from 'react';
import { ButtonIcon, ButtonIconOutline, ButtonPrimary } from '../UI/Button';
import './filter.scss';
import { ReactComponent as searchIcon } from '../../assets/icons/search.svg';
import { ReactComponent as analysIcon } from '../../assets/icons/stats.svg';
import { ReactComponent as minusIcon } from '../../assets/icons/minus-show.svg';
import { ReactComponent as plusIcon } from '../../assets/icons/plus-show.svg';
import { ReactComponent as saveFilterIcon } from '../../assets/icons/save-filter.svg';
import { ReactComponent as uploadFilterIcon } from '../../assets/icons/upload-filter.svg';
import { Input, InputDate, InputPrice } from '../UI/Input';
import {
  $filter,
  $savedFilters,
  $techs_suppl,
  addSavedFilterFx,
  clearTenderList,
  getTenderListAnalysysFx,
  getTenderListFx,
  removeSavedFilterFx,
  setFilter,
} from '../../store/search-store';
import {
  convertStringToDate,
  formatDate,
  getOptions,
  setParamsTenderAnalysys,
  setParamsTenderSearch,
} from '../../utils/functions';
import { IFilter, ISelectOption } from '../../types/models';
import { useStore } from 'effector-react';
import { federal, stages } from '../../data';
import { MultiValue, SingleValue } from 'react-select';
import { SelectMultiField, SelectSingleField } from '../UI/Select';
import { CheckboxItems } from '../UI/Checkbox';
import { Modal } from '../UI/Modal';
import { ModalSaveFilter } from '../Modals/SaveFilter';
import { ModalUploadFilter } from '../Modals/UploadFilter';

export const SearchFilter: React.FC<{
  setIsSearchingTenders: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsSearchingTenders }) => {
  const filter = useStore($filter);
  const savedFilters = useStore($savedFilters);
  const techs_suppl = useStore($techs_suppl);

  const [isShowMoreFilters, setIsShowMoreFilters] = useState(false);
  const [selectedSavedFilter, setSelectedSavedFilter] = useState<
    string | undefined
  >(undefined);
  const [isModalUploadFilterOpen, setIsModalUploadFilterOpen] =
    useState<boolean>(false);
  const [isModalSaveFilterOpen, setIsModalSaveFilterOpen] =
    useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const changeIsShowMoreFilters = () =>
    setIsShowMoreFilters(!isShowMoreFilters);

  const getTenders = () => {
    if (
      filter.minPrice !== null &&
      filter.maxPrice !== null &&
      filter.minPrice > filter.maxPrice
    ) {
      setFilter({
        ...filter,
        minPrice: filter.maxPrice,
        maxPrice: filter.minPrice,
      });
    }
    if (filter.searchText !== '') {
      clearTenderList();
      setIsSearchingTenders(true);
      setIsButtonDisabled(true);
      const paramsSearch = setParamsTenderSearch(filter);
      getTenderListFx(paramsSearch).finally(() => {
        setIsButtonDisabled(false);
        setIsSearchingTenders(false);
      });
    }
  };

  const getAnalysysTenders = () => {
    if (
      filter.minPrice !== null &&
      filter.maxPrice !== null &&
      filter.minPrice > filter.maxPrice
    ) {
      setFilter({
        ...filter,
        minPrice: filter.maxPrice,
        maxPrice: filter.minPrice,
      });
    }
    if (
      filter.searchText !== '' &&
      (filter.technologies?.length !== 0 ||
        filter.unwantedTechnologies?.length !== 0)
    ) {
      clearTenderList();
      setIsButtonDisabled(true);
      setIsSearchingTenders(true);
      const paramsAnalysys = setParamsTenderAnalysys(filter);
      getTenderListAnalysysFx(paramsAnalysys).finally(() => {
        setIsSearchingTenders(false);
        setIsButtonDisabled(false);
      });
    }
  };

  const addFilterSearchText = (newFilter: string) => {
    setFilter({
      ...filter,
      searchText: newFilter,
    });
  };
  const addFilterMinPrice = (newFilter: string) => {
    setFilter({
      ...filter,
      minPrice: Number.isNaN(parseInt(newFilter)) ? null : parseInt(newFilter),
    });
  };
  const addFilterMaxPrice = (newFilter: string) => {
    setFilter({
      ...filter,
      maxPrice: Number.isNaN(parseInt(newFilter)) ? null : parseInt(newFilter),
    });
  };
  const addFilterTechs = (technologies: MultiValue<ISelectOption>) => {
    const newFilter = technologies.map((tech) => tech.value);
    setFilter({
      ...filter,
      technologies: newFilter,
    });
  };
  const addFilterUnwantedTechs = (unwantedTechs: MultiValue<ISelectOption>) => {
    const newFilter = unwantedTechs.map((tech) => tech.value);
    setFilter({
      ...filter,
      unwantedTechnologies: newFilter,
    });
  };

  const handleRemoveTech = (option: string) => {
    setFilter({
      ...filter,
      technologies: filter.technologies?.filter((el) => el !== option),
    });
  };

  const handleRemoveUnwantedTech = (option: string) => {
    setFilter({
      ...filter,
      unwantedTechnologies: filter.unwantedTechnologies?.filter(
        (el) => el !== option,
      ),
    });
  };

  const addFilterStage = (stages: MultiValue<ISelectOption>) => {
    const newFilter = stages.map((stage) => stage.value);
    setFilter({
      ...filter,
      purchaseStage: newFilter,
    });
  };

  const handleRemoveStage = (option: string) => {
    setFilter({
      ...filter,
      purchaseStage: filter.purchaseStage.filter((el) => el !== option),
    });
  };

  const addFilterPlacementDate = (newFilter: Date) => {
    setFilter({
      ...filter,
      placement_date: formatDate(newFilter),
    });
  };

  const addFilterEndDate = (newFilter: Date) => {
    setFilter({
      ...filter,
      end_date: formatDate(newFilter),
    });
  };

  const changeFilterSuppliers = (newFilter: string) => {
    if (filter.supplier.includes(newFilter)) {
      setFilter({
        ...filter,
        supplier: [...filter.supplier.filter((el) => el !== newFilter)],
      });
    } else
      setFilter({
        ...filter,
        supplier: [...filter.supplier, newFilter],
      });
  };

  const changeFilterFederalLaws = (newFilter: string) => {
    if (filter.federalLaw.includes(newFilter)) {
      setFilter({
        ...filter,
        federalLaw: [...filter.federalLaw.filter((el) => el !== newFilter)],
      });
    } else
      setFilter({
        ...filter,
        federalLaw: [...filter.federalLaw, newFilter],
      });
  };

  // фильтры
  const getFilters = () => {
    return savedFilters?.map((el) => {
      return { value: el.name, label: el.name };
    });
  };

  const addSavedFilter = (filter: IFilter, name: string) => {
    addSavedFilterFx({ name: name, filter: filter });
  };

  const selectSavedFilter = (
    selectedSavedFilterSelect: SingleValue<ISelectOption>,
  ) => {
    const newSelectedSavedFilter = savedFilters?.find(
      (el) => el.name === selectedSavedFilterSelect?.value,
    );
    if (newSelectedSavedFilter)
      setSelectedSavedFilter(newSelectedSavedFilter.name);
  };
  const setSavedFilter = (selectedSavedFilterSelect: string | undefined) => {
    const id = savedFilters?.find(
      (el) => el.name === selectedSavedFilterSelect,
    );
    if (id) setFilter(id.filter);
  };
  const removeSavedFilter = (selectedSavedFilterSelect: string | undefined) => {
    const id = savedFilters?.find(
      (el) => el.name === selectedSavedFilterSelect,
    );
    if (id) {
      setSelectedSavedFilter(undefined);
      removeSavedFilterFx(id.id);
    }
  };

  return (
    <div className="search-filter-container">
      <Modal
        active={isModalSaveFilterOpen}
        setActive={setIsModalSaveFilterOpen}
        setError={setError}
        children={
          <ModalSaveFilter
            savedFilters={savedFilters}
            setActive={setIsModalSaveFilterOpen}
            addSavedFilter={addSavedFilter}
            filter={filter}
            error={error}
            setError={setError}
          />
        }
      />
      <Modal
        active={isModalUploadFilterOpen}
        setActive={setIsModalUploadFilterOpen}
        children={
          <ModalUploadFilter
            selectedSavedFilter={selectedSavedFilter}
            setSavedFilter={setSavedFilter}
            removeSavedFilter={removeSavedFilter}
            onHandleChange={selectSavedFilter}
            setActive={setIsModalUploadFilterOpen}
            options={getFilters()}
          />
        }
      />
      <div className="search-main-filter">
        <div className="main-filter__search-field">
          <Input
            value={filter.searchText}
            placeholder="Поиск..."
            onHandleChange={addFilterSearchText}
          />
        </div>
        <div className="main-filter__price-field">
          <InputPrice
            value={filter.minPrice}
            placeholder="Цена от"
            onHandleChange={addFilterMinPrice}
          />
        </div>
        <div className="main-filter__price-field">
          <InputPrice
            value={filter.maxPrice}
            placeholder="Цена до"
            onHandleChange={addFilterMaxPrice}
          />
        </div>
        <div className="main-filter__button">
          <ButtonIcon
            onHandleClick={getTenders}
            title="Поиск"
            Icon={searchIcon}
            disabled={isButtonDisabled}
          />
        </div>
        <div className="main-filter__button">
          <ButtonIcon
            onHandleClick={getAnalysysTenders}
            title="Анализ"
            Icon={analysIcon}
            disabled={isButtonDisabled}
          />
        </div>
      </div>
      <div className="search-btn-filters">
        <div className="btn-filters__search-show-filters">
          {!isShowMoreFilters ? (
            <ButtonIconOutline
              Icon={plusIcon}
              title="Больше условий"
              onHandleClick={changeIsShowMoreFilters}
            />
          ) : (
            <ButtonIconOutline
              Icon={minusIcon}
              title="Меньше условий"
              onHandleClick={changeIsShowMoreFilters}
            />
          )}
        </div>
        <div className="btn-filters__saved-filters">
          <div className="saved-filters__button-open">
            <ButtonIconOutline
              Icon={saveFilterIcon}
              title="Сохранить условия"
              onHandleClick={() => {
                setIsModalSaveFilterOpen(true);
                document.body.style.overflowY = 'hidden';
              }}
              type="icon-only"
            />
          </div>
          <div className="saved-filters__button-open">
            <ButtonIconOutline
              Icon={uploadFilterIcon}
              title="Загрузить условия"
              onHandleClick={() => {
                setIsModalUploadFilterOpen(true);
                document.body.style.overflowY = 'hidden';
              }}
              type="icon-only"
            />
          </div>
        </div>
      </div>

      {isShowMoreFilters && (
        <div
          className={
            isShowMoreFilters ? 'filters-extend active' : 'filters-extend'
          }
        >
          <div className="filters-extend__techs">
            <SelectMultiField
              values={filter.technologies}
              placeholder="Выберите желательные технологии..."
              options={getOptions(
                filter.unwantedTechnologies,
                techs_suppl.techs,
              )}
              onChange={addFilterTechs}
              handleRemoveElement={handleRemoveTech}
            />
          </div>
          <div className="filters-extend__techs">
            <SelectMultiField
              values={filter.unwantedTechnologies}
              placeholder="Выберите нежелательные технологии..."
              options={getOptions(filter.technologies, techs_suppl.techs)}
              onChange={addFilterUnwantedTechs}
              handleRemoveElement={handleRemoveUnwantedTech}
            />
          </div>
          <div className="filters-extend__stages">
            <SelectMultiField
              values={filter.purchaseStage}
              placeholder="Выберите этап закупки..."
              options={getOptions(filter.purchaseStage, stages)}
              onChange={addFilterStage}
              handleRemoveElement={handleRemoveStage}
            />
          </div>
          <div className="filters-extend__date">
            <InputDate
              placeholder="Дата размещения от"
              selected={convertStringToDate(filter.placement_date)}
              isStart={true}
              startDate={convertStringToDate(filter.placement_date)}
              endDate={convertStringToDate(filter.end_date)}
              onHandleChange={addFilterPlacementDate}
            />
          </div>
          <div className="filters-extend__break-date"></div>
          <div className="filters-extend__date">
            <InputDate
              placeholder="Дата окончания от"
              selected={convertStringToDate(filter.end_date)}
              isStart={false}
              startDate={convertStringToDate(filter.placement_date)}
              endDate={convertStringToDate(filter.end_date)}
              onHandleChange={addFilterEndDate}
            />
          </div>
          <div className="filters-extend__suppliers">
            <CheckboxItems
              onHandleClick={changeFilterSuppliers}
              elements={techs_suppl.suppliers.map((el) => el.alt_name)}
              filterElements={filter.supplier}
            />
          </div>
          <div className="filters-extend__federal-laws">
            <CheckboxItems
              onHandleClick={changeFilterFederalLaws}
              elements={federal}
              filterElements={filter.federalLaw}
            />
          </div>
        </div>
      )}
      <div className="mobile__button">
        <ButtonIcon
          onHandleClick={getTenders}
          title="Поиск"
          Icon={searchIcon}
          disabled={isButtonDisabled}
        />
      </div>
      <div className="mobile__button">
        <ButtonIcon
          onHandleClick={getAnalysysTenders}
          title="Анализ"
          Icon={analysIcon}
          disabled={isButtonDisabled}
        />
      </div>
    </div>
  );
};
