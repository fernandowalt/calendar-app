import { types } from "../types/types";

export const setStartDate = (start) => ({
  type: types.setStartDate,
  payload: start,
});

export const setendDate = (end) => ({
  type: types.setendDate,
  payload: end,
});

export const setTitle = (title) => ({
  type: types.setTitle,
  payload: title,
});

export const setNotes = (notes) => ({
  type: types.setNotes,
  payload: notes,
});
export const reset = () => ({
  type: types.reset,
});
