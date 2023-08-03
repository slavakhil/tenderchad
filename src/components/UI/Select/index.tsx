import React, { useState } from 'react';
import Select, { MultiValue, SingleValue } from 'react-select';
import { ISelectOption } from '../../../types/models';
import cross from '../../../assets/icons/Cross.svg';
import { ReactComponent as CloseIcon } from '../../../assets/icons/Cross.svg';
import './select.scss';

interface ISelectMultiField {
  values: string[] | undefined;
  placeholder: string;
  options: ISelectOption[];
  onChange: (stages: MultiValue<ISelectOption>) => void;
  handleRemoveElement: (option: string) => void;
  isLoading?: boolean;
}

interface ISelectSingleField {
  value?: string | undefined;
  placeholder: string;
  options?: readonly ISelectOption[];
  onChange?: (id: SingleValue<ISelectOption>) => void;
}

export const SelectMultiField: React.FC<ISelectMultiField> = ({
  values,
  placeholder,
  options,
  onChange,
  handleRemoveElement,
  isLoading,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      boxShadow: `0 0 0 1px 'orange'`,
    }),
  };
  return (
    <div>
      <Select
        isLoading={isLoading}
        loadingMessage={() => 'Загрузка...'}
        placeholder={placeholder}
        options={options}
        styles={customStyles}
        isClearable={false}
        className={`react-select-container ${isOpenMenu ? 'is-open' : ''}`}
        classNamePrefix="react-select"
        value={
          values !== undefined
            ? values.map((el) => {
                return { value: el, label: el };
              })
            : []
        }
        isMulti
        onMenuOpen={() => setIsOpenMenu(true)}
        onMenuClose={() => setIsOpenMenu(false)}
        onChange={onChange}
        controlShouldRenderValue={false}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? 'Нет вариантов' : 'No results found'
        }
      />
      <div className="select-elements">
        {values?.map((el) => (
          <div
            className="select-element"
            key={el}
            onClick={() => handleRemoveElement(el)}
          >
            <div className="select-element__name">{el}</div>
            <CloseIcon className="select-element__btn-remove" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const SelectSingleField: React.FC<ISelectSingleField> = ({
  value,
  placeholder,
  options,
  onChange,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      boxShadow: `0 0 0 1px 'orange'`,
    }),
  };
  return (
    <div>
      <Select
        placeholder={placeholder}
        options={options}
        styles={customStyles}
        className={`react-select-container ${isOpenMenu ? 'is-open' : ''}`}
        classNamePrefix="react-select"
        value={value !== undefined ? { value: value, label: value } : undefined}
        onMenuOpen={() => setIsOpenMenu(true)}
        onMenuClose={() => setIsOpenMenu(false)}
        onChange={onChange}
        noOptionsMessage={({ inputValue }) =>
          !inputValue ? 'Нет вариантов' : 'No results found'
        }
        controlShouldRenderValue={value === undefined ? false : true}
      />
    </div>
  );
};
