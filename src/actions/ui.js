import { types } from "../types/types";

export const startModal = () => ({
  type: types.uiOpenModal,
});

export const modalClose = () => ({
  type: types.uiCloseModal,
});

