import localforage from 'localforage';
import { IFilter, ISavedFilter } from '../../types/models';
import { UUID } from 'uuid-generator-ts';

export default class SavedFiltersService {
  static async getSavedFilters() {
    var res = await localforage.getItem<ISavedFilter[]>('saved-filters');
    if (res === null) localforage.setItem<ISavedFilter[]>('saved-filters', []);
    return res;
  }

  static async addSavedFilter(name: string, filter: IFilter) {
    const uuid = new UUID();
    return {
      id: uuid.getDashFreeUUID(),
      name: name,
      date: new Date(Date.now()),
      filter: filter,
    };
  }

  static async changeNameOfSavedFilter(
    savedFilter: ISavedFilter,
    newName: string,
  ) {
    return {
      ...savedFilter,
      name: newName,
    };
  }

  static async removeSavedFilter(id: string) {
    return id;
  }
}
