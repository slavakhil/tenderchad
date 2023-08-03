import { createStore, createEffect } from 'effector';

import { ITender } from '../types/models';
import { TenderInfoService } from '../api';

export const getTenderInfoFx = createEffect<string, ITender>(
  TenderInfoService.getTenderInfoAndDocs,
);

export const $tenderInfo = createStore<ITender | null>(null).on(
  getTenderInfoFx.doneData,
  (_, result) => result,
);
