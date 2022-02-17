import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";
import { settersDate } from "./settersDate";
import { uiReducer } from "./uiReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  setting: settersDate,
});
