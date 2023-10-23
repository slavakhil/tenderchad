import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './input.scss';
import { IInput, IInputDate } from '../../../types/models';

export const Input: React.FC<IInput> = ({
  name,
  value,
  placeholder,
  disabled,
  onHandleChange,
  maxLength,
  type,
  error
}) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const showPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div className="password">
      <input
        className={`input-field ${error ? 'error' : ''}`}
        type={
          type === 'password' ? (isShowPassword ? 'text' : 'password') : type
        }
        maxLength={maxLength}
        value={value === null ? '' : value}
        placeholder={placeholder}
        onChange={(e) => onHandleChange(e.target.value)}
        disabled={disabled}
      />
      {type === 'password' && (
        <div
          onClick={showPassword}
          className={`password-control ${isShowPassword ? 'view' : ''}`}
        ></div>
      )}
    </div>
  );
};

export const InputPrice: React.FC<IInput> = ({
  value,
  placeholder,
  disabled,
  onHandleChange,
}) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <div className={`price-field-container ${isFocus ? 'focus' : ''}`}>
      <input
        className="price-field"
        type="text"
        maxLength={8}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={
          value === null ? '' : Number(value).toString().replace(/[^\d]/g, '')
        }
        placeholder={placeholder}
        onChange={(e) => {
          if (+e.target.value < 0) {
            onHandleChange(0);
            return;
          } else onHandleChange(e.target.value);
        }}
        disabled={disabled}
      />
      <span className="price-field-currency">RUB</span>
    </div>
  );
};

export const InputDate: React.FC<IInputDate> = ({
  placeholder,
  selected,
  isStart,
  startDate,
  endDate,
  onHandleChange,
}) => (
  <DatePicker
    className="date-field__input date-picker__item"
    placeholderText={placeholder}
    selected={selected}
    onChange={(date) => onHandleChange(date)}
    selectsStart={isStart}
    selectsEnd={!isStart}
    startDate={startDate}
    endDate={endDate}
    minDate={!isStart ? startDate : null}
    dateFormat="dd/MM/yyyy"
    showMonthDropdown
    showYearDropdown
    dropdownMode="select"
  />
);

export const InputTechs: React.FC<IInput> = ({
  value,
  placeholder,
  disabled,
  onHandleChange,
}) => (
  <input
    className="input-field techs-field"
    type="text"
    value={value === null ? '' : value}
    placeholder={placeholder}
    onChange={(e) => onHandleChange(e.target.value)}
    disabled={disabled}
  />
);
