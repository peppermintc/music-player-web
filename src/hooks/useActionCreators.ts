import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as musicActionCreators from "../modules/music";

const useActionCreators = () => {
  const dispatch = useDispatch();

  const { setMusicList, setCurrentMusic, setIsPlaying } = useMemo(
    () => bindActionCreators(musicActionCreators, dispatch),
    [dispatch]
  );

  return {
    setMusicList,
    setCurrentMusic,
    setIsPlaying,
  };
};

export default useActionCreators;
