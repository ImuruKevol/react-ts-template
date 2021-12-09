import { combineReducers } from "redux";
import navReducer from "./navReducer";
import popupReducer from "./popupReducer";
import noticeReducer from "./noticeReducer";

const reducers = combineReducers({
  nav: navReducer,
  popup: popupReducer,
  notice: noticeReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
