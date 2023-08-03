import { createEvent, createStore } from 'effector';

export const setAuthStatusMessage = createEvent<boolean>();

export const $authStatusMessage = createStore(false).on(
  setAuthStatusMessage,
  (_, res) => res,
);

export const setErrorServerMessage = createEvent<boolean>();

export const $errorServerMessage = createStore(false).on(
  setErrorServerMessage,
  (_, res) => res,
);
