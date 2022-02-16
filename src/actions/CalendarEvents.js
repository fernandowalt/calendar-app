import { types } from "../types/types";

export const setActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent,
});

export const eventUpdateActive = (event) => ({
  type: types.eventActiveUpdate,
  payload: event,
});

export const eventDeleted = (event) => ({
  type: types.eventDeleted,
});
