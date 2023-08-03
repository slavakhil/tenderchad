import React from 'react';
import { SelectSingleField } from '../../UI/Select';
import { ButtonIcon, ButtonIconOutline, ButtonPrimary } from '../../UI/Button';
import { SingleValue } from 'react-select';
import { ISelectOption } from '../../../types/models';
import './upload-filter.scss';
import { removeSavedFilterFx } from '../../../store/search-store';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { ReactComponent as RemoveIcon } from '../../../assets/icons/remove.svg';

interface IModalUploadFilter {
  selectedSavedFilter: string | undefined;
  onHandleChange: ((id: SingleValue<ISelectOption>) => void) | undefined;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  options: readonly ISelectOption[] | undefined;
  removeSavedFilter: (selectedSavedFilterSelect: string | undefined) => void;
  setSavedFilter: (selectedSavedFilterSelect: string | undefined) => void;
}

export const ModalUploadFilter: React.FC<IModalUploadFilter> = ({
  selectedSavedFilter,
  removeSavedFilter,
  setSavedFilter,
  onHandleChange,
  setActive,
  options,
}) => {
  const onClickRemove = () => {
    if (selectedSavedFilter !== undefined)
      removeSavedFilter(selectedSavedFilter);
  };
  const onClickSet = () => {
    if (selectedSavedFilter !== undefined) {
      setSavedFilter(selectedSavedFilter);
      setActive(false);
      document.body.style.overflowY = 'auto';
    }
  };
  return (
    <div className="modal-upload-container">
      <div className="modal-header">
        <div className="modal-header__title">Загрузка условий поиска</div>
        <CloseIcon
          className="modal-header__btn-close"
          onClick={() => {
            setActive(false);
            document.body.style.overflowY = 'auto';
          }}
        />
      </div>
      <div className="modal-content">
        <div className="modal-content__label">
          Выбранные сохраненные условия для поиска
        </div>
        <div className="modal-content__input">
          <SelectSingleField
            placeholder="Выберите условия..."
            value={
              selectedSavedFilter !== undefined
                ? selectedSavedFilter
                : undefined
            }
            onChange={onHandleChange}
            options={options}
          />
        </div>
        <div className="modal-content__btns">
          <div className="modal-content__btn-upload">
            <ButtonPrimary
              title="Загрузить условия"
              onHandleClick={() => onClickSet()}
              disabled={selectedSavedFilter === undefined}
            />
          </div>
          <div className="modal-content__btn-remove">
            <ButtonIconOutline
              title="Удалить условия"
              Icon={RemoveIcon}
              onHandleClick={() => onClickRemove()}
              disabled={selectedSavedFilter === undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
