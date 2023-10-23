import { createStore, createEffect, createEvent } from 'effector';

import { ITender } from '../types/models';
import { TenderInfoService } from '../api';

export const getTenderInfoFx = createEffect<string, ITender>(
  TenderInfoService.getTenderInfoAndDocs,
);

export const clearTenderInfo = createEvent();

export const $tenderInfo = createStore<ITender | null>(null).on(
  getTenderInfoFx.doneData,
  (_, result) => result
)
.on(clearTenderInfo, () => null)
