import { types } from "../types/types";

const initialState = {
  start: new Date(),
  end: new Date(),
  title: "",
  notes: "",
};

export const settersDate = (state = initialState, action) => {
  switch (action.type) {
    case types.setStartDate:
      return {
        ...state,
        start: action.payload,
      };

    case types.setendDate:
      return {
        ...state,
        end: action.payload,
      };
    case types.setTitle:
      return {
        ...state,
        title: action.payload,
      };

    case types.setNotes:
      return {
        ...state,
        notes: action.payload,
      };

    case types.reset:
      return {
        ...state,
        notes: "",
        title: "",
        start: new Date(),
        end: new Date(),
      };

    default:
      return state;
  }
};
