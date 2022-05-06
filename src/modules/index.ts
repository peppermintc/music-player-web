import { combineReducers } from "redux";
import musicReducer, { MusicState } from "./music";

export interface RootState {
  music: MusicState;
}

const rootReducer = combineReducers({
  music: musicReducer,
});

export default rootReducer;
