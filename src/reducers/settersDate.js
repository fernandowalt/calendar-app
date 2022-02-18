import { types } from "../types/types";

const initialState = {
  init: {
    start: new Date(),
    end: new Date(),
    title: "",
    notes: "",
    id: 0,
  },
};

export const settersDate = (state = initialState, action) => {
  switch (action.type) {
    case types.setStartDate:
      return {
        ...state,
        init: { ...state.init, start: action.payload },
      };

    case types.setendDate:
      return {
        ...state,
        init: { ...state.init, end: action.payload },
      };
    case types.setTitle:
      return {
        ...state,
        init: { ...state.init, title: action.payload },
      };

    case types.setNotes:
      return {
        ...state,
        init: { ...state.init, notes: action.payload },
      };

    case types.reset:
      return {
        ...state,
        init: { notes: "", title: "", start: new Date(), end: new Date() },
      };

    case types.userSelected:
      return {
        ...state,
        init: action.payload,
      };

      

    default:
      return state;
  }
};
