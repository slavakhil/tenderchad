import { MultiValue } from 'react-select';
import { IFilter, ISavedFilter, ISelectOption } from '../types/models';

// Функция для форматирования даты к виду dd.mm.yyyy
export const formatDate = (date: Date) => {
  if (date !== null) {
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }
  return null;
};

export const removeSigns = (str: string | number | undefined) => {
  if (str !== undefined)
    return parseInt(str.toString().replace('+', '').replace('-', ''));
};

// Функция для форматирования числа в денежный вид типа 9 999 999...
export const makeMoney = (money: string) => {
  return parseFloat(money)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, '$1 ');
};

// Функция для форматирования текстовой даты к виду dd.mm.yyyy
export const makeDate = (date: string) => {
  const dates = date.split('-');
  return `${dates[2]}.${dates[1]}.${dates[0]}`;
};

export const convertStringToDate = (str: string | null) => {
  if (str !== null) {
    const [day, month, year] = str.split('.');
    return new Date(+year, +month - 1, +day);
  } else return null;
};

// Функция для открытия ссылки в новой вкладке
export const openLinkInNewTab = (url: string) => {
  const newTab = window.open(url, '_blank', 'noopener,noreferrer');
  if (newTab) newTab.opener = null;
};

// Парамс для поиска
export const setParamsTenderSearch = (filter: IFilter) => {
  var params = new URLSearchParams();
  params.append('search', filter.searchText);

  if (filter.purchaseStage.length !== 0)
    filter.purchaseStage.map((el) => params.append('purchaseStage', el));
  if (filter.federalLaw.length !== 0)
    filter.federalLaw.map((el) => params.append('federalLaw', el));
  if (filter.supplier.length !== 0)
    filter.supplier.map((el) =>
      el === 'Конкурс'
        ? params.append('supplier', 'Открытый конкурс')
        : el === 'Аукцион'
        ? params.append('supplier', 'Электронный аукцион')
        : el === 'Запрос котировок'
        ? params.append('supplier', 'Запрос котировок')
        : '',
    );
  if (filter.minPrice !== null)
    params.append('minPrice', filter.minPrice.toString());
  if (filter.maxPrice !== null)
    params.append('maxPrice', filter.maxPrice.toString());
  if (filter.placement_date !== null)
    params.append('minDate', filter.placement_date);
  if (filter.end_date !== null) params.append('maxDate', filter.end_date);
  return params;
};
// Парамс для анализа
export const setParamsTenderAnalysys = (filter: IFilter) => {
  var params = new URLSearchParams();
  params.append('search', filter.searchText);
  if (filter.purchaseStage.length !== 0)
    filter.purchaseStage.map((el) => params.append('purchaseStage', el));
  if (filter.federalLaw.length !== 0)
    filter.federalLaw.map((el) => params.append('federalLaw', el));
  if (filter.supplier.length !== 0)
    filter.supplier.map((el) =>
      el === 'Конкурс'
        ? params.append('supplier', 'Открытый конкурс')
        : el === 'Аукцион'
        ? params.append('supplier', 'Электронный аукцион')
        : el === 'Запрос котировок'
        ? params.append('supplier', 'Запрос котировок')
        : '',
    );
  if (filter.minPrice !== null)
    params.append('minPrice', filter.minPrice.toString());
  if (filter.maxPrice !== null)
    params.append('maxPrice', filter.maxPrice.toString());
  if (filter.placement_date !== null)
    params.append('minDate', filter.placement_date);
  if (filter.end_date !== null) params.append('maxDate', filter.end_date);
  if (filter.technologies !== undefined && filter.technologies?.length !== 0) {
    filter.technologies.map((el) => params.append('technologies', el));
  }
  if (
    filter.unwantedTechnologies !== undefined &&
    filter.unwantedTechnologies?.length !== 0
  )
    filter.unwantedTechnologies.map((el) =>
      params.append('unwantedTechnologies', el),
    );
  return params;
};

export const sortByDateAscending = (
  arr: { id: string; name: string; date: Date; filter: IFilter }[],
): { id: string; name: string; date: Date; filter: IFilter }[] => {
  arr.sort((a, b) => a.date.getTime() - b.date.getTime());
  return arr;
};

export function isNameUnique(name: string, state: ISavedFilter[]): boolean {
  return state.every((el) => el.name !== name);
}

export const isElementHere = (
  massive: MultiValue<ISelectOption>,
  tags: ISelectOption[],
) => {
  let evTags: ISelectOption[] = [...tags];
  if (massive.length > 0) {
    for (let i = 0; i < massive.length; i++) {
      for (let j = 0; j < evTags.length; j++) {
        if (evTags[j].value === massive[i].value) evTags.splice(j, 1);
      }
    }
    return evTags;
  }
  return evTags;
};

export const dataToMultiValue = (data: string[]) => {
  return data.map((el) => {
    return { value: el, label: el };
  });
};

export const getOptions = (
  filterElements: string[] | undefined,
  elements: string[],
) => {
  return isElementHere(
    filterElements !== undefined ? dataToMultiValue(filterElements) : [],
    elements.map((el) => {
      return { value: el, label: el };
    }),
  );
};

export const isFiltersEquals = (filter1: IFilter, filter2: IFilter) => {
  if (filter1.searchText !== filter2.searchText) return false;
  if (filter1.minPrice !== filter2.minPrice) return false;
  if (filter1.maxPrice !== filter2.maxPrice) return false;
  if (filter1.placement_date !== filter2.placement_date) return false;
  if (filter1.end_date !== filter2.end_date) return false;
  if (
    filter1.technologies?.sort().toString() !==
    filter2.technologies?.sort().toString()
  )
    return false;
  if (
    filter1.unwantedTechnologies?.sort().toString() !==
    filter2.unwantedTechnologies?.sort().toString()
  )
    return false;
  if (
    filter1.purchaseStage.sort().toString() !==
    filter2.purchaseStage.sort().toString()
  )
    return false;
  if (
    filter1.federalLaw.sort().toString() !==
    filter2.federalLaw.sort().toString()
  )
    return false;
  if (filter1.supplier.sort().toString() !== filter2.supplier.sort().toString())
    return false;
  return true;
};
