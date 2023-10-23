import { createStore, createEffect, createEvent } from 'effector';
import {
  IFilter,
  ISavedFilter,
  ITechsAndSuppliers,
  ITendersList,
} from '../types/models';
import localforage from 'localforage';
import { isFiltersEquals, sortByDateAscending } from '../utils/functions';

import { SavedFiltersService, SearchTendersService } from '../api';

// Технологии

export const getTechsAndSuppliersFx = createEffect<void, ITechsAndSuppliers>(
  SearchTendersService.getTechsAndSuppliers,
);

export const $techs_suppl = createStore<ITechsAndSuppliers>({
  techs: [],
  suppliers: [],
}).on(getTechsAndSuppliersFx.doneData, (_, result) => result);

// Фильтры

export const setFilter = createEvent<IFilter>();

export const $filter = createStore<IFilter>({
  searchText: 'разработка сайта',
  purchaseStage: ['Подача заявок', 'Работа комиссии'],
  supplier: [],
  federalLaw: ['44-ФЗ'],
  minPrice: null,
  maxPrice: null,
  placement_date: null,
  end_date: null,
  technologies: [],
  unwantedTechnologies: [],
}).on(setFilter, (_, element) => element);

// Сохранённые фильтры

export const getSavedFiltersFx = createEffect<void, ISavedFilter[] | null>(
  SavedFiltersService.getSavedFilters,
);
export const addSavedFilterFx = createEffect(
  async ({ name, filter }: { name: string; filter: IFilter }) => {
    return await SavedFiltersService.addSavedFilter(name, filter);
  },
);
export const changeNameOfSavedFilterFx = createEffect(
  async ({
    savedFilter,
    newName,
  }: {
    savedFilter: ISavedFilter;
    newName: string;
  }) => {
    return await SavedFiltersService.changeNameOfSavedFilter(
      savedFilter,
      newName,
    );
  },
);
export const removeSavedFilterFx = createEffect(
  SavedFiltersService.removeSavedFilter,
);

export const $savedFilters = createStore<ISavedFilter[] | null>([])
  .on(getSavedFiltersFx.doneData, (state, result) => {
    if (state === null) return [];
    return result;
  })
  .on(addSavedFilterFx.doneData, (state, result) => {
    var newState;
    if (state !== null) {
      if (
        state.filter((el) => isFiltersEquals(el.filter, result.filter))
          .length === 0
      ) {
        newState = [...state, result];
        localforage.setItem('saved-filters', newState);
        return newState;
      }
    }
  })
  .on(changeNameOfSavedFilterFx.doneData, (state, result) => {
    var newState;
    if (state !== null) {
      newState = [...state.filter((el) => el.id !== result.id), result];
      newState = sortByDateAscending(newState);
      localforage.setItem('saved-filters', newState);
      return newState;
    }
  })
  .on(removeSavedFilterFx.doneData, (state, result) => {
    const newState = state?.filter((el) => el.id !== result);
    localforage.setItem('saved-filters', newState);
    return newState;
  });

// Поиск и анализ тендеров
export const clearTenderList = createEvent();

export const getTenderListFx = createEffect<URLSearchParams, ITendersList>(
  SearchTendersService.getTenderList,
);
export const getTenderListAnalysysFx = createEffect<
  URLSearchParams,
  ITendersList,
  Error
>(SearchTendersService.getAnalysysTenderList);

export const $tendersList = createStore<ITendersList>({
  length: 0,
  data: [],
  isRelevance: false,
  status: 'WAITING',
})
  .on(clearTenderList, () => {
    return {
      length: 0,
      data: [],
      isRelevance: false,
      status: 'WAITING',
    };
  })
  .on(getTenderListFx.done, (_, { result }) => {
    return result;
  })
  .on(getTenderListAnalysysFx.done, (_, { result }) => {
    return result;
  });
