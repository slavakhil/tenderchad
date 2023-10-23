import React from 'react';
import { ICheckbox, ICheckboxItems } from '../../../types/models';
import './checkbox.scss';

export const CheckboxItems: React.FC<ICheckboxItems> = ({
  elements,
  onHandleClick,
  filterElements,
}) => (
  <div className="checkbox-items-container">
    {elements.map((el) =>
      el === '223-ФЗ' ? (
        <div
          key={el}
          onClick={() => {}}
          className={`checkbox-element disabled`}
        >
          {el}
        </div>
      ) : (
        <div
          key={el}
          onClick={() => onHandleClick(el)}
          className={`checkbox-element ${
            filterElements.includes(el) ? 'active' : ''
          }`}
        >
          {el}
        </div>
      ),
    )}
  </div>
);

export const Checkbox: React.FC<ICheckbox> = ({
  id,
  title,
  value,
  onHandleClick,
}) => (
  <div className="checkbox-container">
    <input
      checked={value}
      className="checkbox-container__checkbox"
      id={id}
      type="checkbox"
      onChange={() => onHandleClick(!value)}
    />
    <label htmlFor={id} >
      {title}
    </label>
  </div>
);
