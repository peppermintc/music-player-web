import { Dispatch } from "redux";
import { RootState } from ".";
import { axiosGetMusic, axiosGetMusicList } from "../api";
import { CurrentMusic, Music } from "../interfaces";

// Interfaces
interface Action {
  type: string;
  payload: [];
}

export interface MusicState {
  musicList: Music[];
  currentMusic: CurrentMusic | null;
  isLoading: boolean;
}

// Action Types
const SET_MUSIC_LIST = "SET_MUSIC_LIST";
const SET_CURRNT_MUSIC = "SET_CURRNT_MUSIC";
const SET_IS_LOADING = "SET_IS_LOADING";

// Action Creators
export const setMusicList = () => async (dispatch: Dispatch) => {
  const response = await axiosGetMusicList();
  const newMusicList: Music[] = response.items;

  dispatch({
    type: SET_MUSIC_LIST,
    payload: newMusicList,
  });
};

export const setCurrentMusic =
  (musicId: string) => async (dispatch: Dispatch) => {
    dispatch({
      type: SET_IS_LOADING,
      payload: true,
    });

    const response = await axiosGetMusic(musicId);
    const newMusicURL: string = response.url;

    dispatch({
      type: SET_CURRNT_MUSIC,
      payload: {
        id: musicId,
        url: newMusicURL,
        isPlaying: true,
      },
    });

    dispatch({
      type: SET_IS_LOADING,
      payload: false,
    });
  };

export const setIsPlaying =
  (newIsPlaying: boolean) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    const { currentMusic } = getState().music;

    dispatch({
      type: SET_CURRNT_MUSIC,
      payload: { ...currentMusic, isPlaying: newIsPlaying },
    });
  };

// Initial State
const initialState: MusicState = {
  musicList: [],
  currentMusic: null,
  isLoading: false,
};

// Reducer
const musicReducer = (state: MusicState = initialState, action: Action) => {
  switch (action.type) {
    case SET_MUSIC_LIST:
      return {
        ...state,
        musicList: action.payload,
      };
    case SET_CURRNT_MUSIC:
      return {
        ...state,
        currentMusic: action.payload,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
