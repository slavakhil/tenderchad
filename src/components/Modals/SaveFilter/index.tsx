import React, { useState } from 'react';
import { ButtonPrimary } from '../../UI/Button';
import { Input } from '../../UI/Input';
import './save-filter.scss';
import { IFilter, ISavedFilter } from '../../../types/models';
import { isFiltersEquals, isNameUnique } from '../../../utils/functions';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

interface IModalUploadFilter {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  addSavedFilter: (filter: IFilter, name: string) => void;
  filter: IFilter;
  savedFilters: ISavedFilter[] | null;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export const ModalSaveFilter: React.FC<IModalUploadFilter> = ({
  setActive,
  addSavedFilter,
  filter,
  savedFilters,
  error,
  setError,
}) => {
  const [nameFilter, setNameFilter] = useState<string>('');

  const onHandleChange = (name: string) => {
    setNameFilter(name);
  };
  const onClick = () => {
    if (nameFilter !== '' && savedFilters !== null) {
      if (
        savedFilters.filter((el) => isFiltersEquals(el.filter, filter))
          .length === 0
      ) {
        if (isNameUnique(nameFilter, savedFilters)) {
          setError('');
          addSavedFilter(filter, nameFilter);
          setActive(false);
          document.body.style.overflowY = 'auto';
          setNameFilter('');
        } else setError('Такое название уже занято');
      } else setError('Такой фильтр уже существует');
    }
  };
  return (
    <div className="modal-save-container">
      <div className="modal-header">
        <div className="modal-header__title">Сохранение условий поиска</div>
        <CloseIcon
          className="modal-header__btn-close"
          onClick={() => {
            setError('');
            setActive(false);
            document.body.style.overflowY = 'auto';
          }}
        />
      </div>
      <div className="modal-content">
        <div className="modal-content__label">
          Придумайте название для сохраняемых условий
        </div>
        <div className="modal-content__input">
          <Input
            maxLength={30}
            value={nameFilter}
            placeholder="Название сохраненных условий"
            onHandleChange={onHandleChange}
          />
          {error !== '' && <div>{error}</div>}
        </div>
        <div className="modal-content__btns">
          <div className="btns__save-button">
            <ButtonPrimary
              title="Сохранить условия"
              onHandleClick={() => onClick()}
              disabled={nameFilter === ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
