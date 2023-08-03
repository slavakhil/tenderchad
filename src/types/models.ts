import { Effect } from 'effector';
import { FocusEventHandler, FunctionComponent, SVGProps } from 'react';
import {
  ActionMeta,
  DropdownIndicatorProps,
  GroupBase,
  MultiValue,
  MultiValueRemoveProps,
  OnChangeValue,
  SingleValue,
  StylesConfig,
} from 'react-select';

// Типы для UI
export interface IInput {
  value?: string | number | null;
  name?: string;
  type?: string;
  placeholder: string;
  disabled?: boolean;
  onHandleChange: (newFilter: any) => void;
  maxLength?: number;
}

export interface IInputDate extends IInput {
  selected: Date | null;
  isStart: boolean;
  startDate: Date | null;
  endDate: Date | null;
  minDate?: Date | null;
}
export interface ICheckbox {
  title: string;
  id: string;
  value: boolean;
  onHandleClick: (isTrue: boolean) => void;
}
export interface ICheckboxItems {
  elements: string[];
  filterElements: string[];
  onHandleClick: (newFilter: string) => void;
}
export interface IButton {
  onHandleClick: (
    params?: any,
  ) =>
    | void
    | Effect<URLSearchParams, ITendersList, Error>
    | Promise<ISavedFilter[] | null>;
  type?: string;
  title: string;
  disabled?: boolean;
}
export interface IButtonIcon extends IButton {
  Icon?: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
}

//
export interface IDocument {
  title: string;
  document: string;
}

//

export interface ISuppliers {
  name: string;
  alt_name: string;
}

export interface ITechsAndSuppliers {
  techs: string[];
  suppliers: ISuppliers[];
}

//
export interface ITender {
  id: string; //
  number: string; // номер заказа
  name: string; // объект закупки
  stage: string; // этап
  federal: string; // закон
  supplier: string; // поставщик
  customer: string; // заказчик
  price: string; // цена
  placement_date: string; // размещено
  end_date: string; // окончание подачи заявок

  relevance?: number;
  documents?: IDocument[];
}

export interface ITendersList {
  data: ITender[];
  length: number;
  link?: string;
  isRelevance: boolean;
  status?: string;
}

export interface IFilter {
  searchText: string;
  purchaseStage: string[];
  supplier: string[];
  federalLaw: string[];
  minPrice: number | null;
  maxPrice: number | null;
  placement_date: string | null;
  end_date: string | null;
  technologies?: string[];
  unwantedTechnologies?: string[];
}

export interface ISavedFilter {
  id: string;
  name: string;
  date: Date;
  filter: IFilter;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface ILogin {
  username: string;
  password: string;
  remember_me: boolean;
}

export interface IUser {
  isAuth: boolean;
  username: string;
}

export interface AuthResponse {
  access_token: any;
  access: any;
  result: any;
  refresh: string;
  username: string;
}

export type isMultiType = true | false;
export type DropdownIndicatorType = React.ComponentType<
  DropdownIndicatorProps<any, any, GroupBase<any>>
>;
export type MultiValueRemoveType = React.ComponentType<
  MultiValueRemoveProps<any, isMultiType, GroupBase<any>>
>;

export interface ISelectProps {
  className?: string;
  DropdownIndicator?: DropdownIndicatorType;
  isMulti?: isMultiType;
  MultiValueRemove?: MultiValueRemoveType;
  options: ISelectOption[];
  styles?: StylesConfig<ISelectOption, isMultiType, GroupBase<ISelectOption>>;
  placeholder?: string;
  value: SingleValue<ISelectOption> | MultiValue<ISelectOption>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: (
    value: OnChangeValue<ISelectOption, isMultiType>,
    action: ActionMeta<ISelectOption>,
  ) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
}

// export type IPriceField = {
//   minPrice: number | '';
//   maxPrice: number | '';
//   onChangeMinPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   onChangeMaxPrice: (e: React.ChangeEvent<HTMLInputElement>) => void;
// };

// export type IFederalLawField = {
//   firstLaw: boolean;
//   secondLaw: boolean;
//   setFirstLaw: React.Dispatch<React.SetStateAction<boolean>>;
//   setSecondLaw: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export type ISupplierField = {
//   firstSupplier: boolean;
//   secondSupplier: boolean;
//   thirdSupplier: boolean;
//   setFirstSupplier: React.Dispatch<React.SetStateAction<boolean>>;
//   setSecondSupplier: React.Dispatch<React.SetStateAction<boolean>>;
//   setThirdSupplier: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export type IDateField = {
//   startDate: Date | null;
//   endDate: Date | null;
//   setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
//   setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
// };
