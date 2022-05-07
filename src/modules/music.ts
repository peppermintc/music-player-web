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
  currentMusic: CurrentMusic;
  isLoading: boolean;
  recentMusics: string[];
}

// Action Types
const SET_MUSIC_LIST = "SET_MUSIC_LIST";
const SET_CURRNT_MUSIC = "SET_CURRNT_MUSIC";
const SET_IS_LOADING = "SET_IS_LOADING";
const SET_RECENT_MUSICS = "SET_RECENT_MUSICS";

// Action Creators
export const setMusicList = () => async (dispatch: Dispatch) => {
  try {
    const response = await axiosGetMusicList();
    const newMusicList: Music[] = response.items;

    dispatch({
      type: SET_MUSIC_LIST,
      payload: newMusicList,
    });
  } catch (error) {
    alert("GET music list error");
  }
};

export const setCurrentMusic =
  (musicId: string) =>
  async (dispatch: Dispatch, getState: () => RootState) => {
    dispatch({
      type: SET_IS_LOADING,
      payload: true,
    });

    try {
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

      const { recentMusics } = getState().music;
      let newRecentMusics: string[] = [...recentMusics];

      if (recentMusics.includes(musicId)) {
        const previousIndex = recentMusics.indexOf(musicId);
        newRecentMusics.splice(previousIndex, 1);
        newRecentMusics = [musicId, ...newRecentMusics];
      } else {
        if (recentMusics.length < 5) {
          newRecentMusics = [musicId, ...newRecentMusics];
        } else {
          newRecentMusics.splice(4, 1);
          newRecentMusics = [musicId, ...newRecentMusics];
        }
      }

      dispatch({
        type: SET_RECENT_MUSICS,
        payload: newRecentMusics,
      });
    } catch (error) {
      alert("GET Music URL error");
    } finally {
      dispatch({
        type: SET_IS_LOADING,
        payload: false,
      });
    }
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
  currentMusic: { id: "", url: "", isPlaying: false },
  isLoading: false,
  recentMusics: [],
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
    case SET_RECENT_MUSICS:
      return {
        ...state,
        recentMusics: action.payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
