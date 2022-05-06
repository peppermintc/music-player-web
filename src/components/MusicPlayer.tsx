import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useActionCreators from "../hooks/useActionCreators";
import { Music } from "../interfaces";
import { RootState } from "../modules";
import PlayPauseButton from "./PlayPauseButton";
import formatString from "../utils/stringFormat";
import ProgressiveBar from "./ProgressiveBar";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  width: 180px;
  margin-left: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.h4`
  width: 100px;
  display: flex;
  justify-content: center;
`;

const MusicPlayer = () => {
  const [duration, setDuration] = useState<string>("00:00");
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [percent, setPercent] = useState<string>("0%");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const musicList = useSelector((state: RootState) => state.music.musicList);
  const currentMusicId = useSelector(
    (state: RootState) => state.music.currentMusic?.id
  );
  const currentMusicURL = useSelector(
    (state: RootState) => state.music.currentMusic?.url
  );
  const currentMusicTitle = musicList.find(
    (music: Music) => music.id === currentMusicId
  )?.title;
  const isPlaying = useSelector(
    (state: RootState) => !!state.music.currentMusic?.isPlaying
  );

  const { setIsPlaying } = useActionCreators();

  const updatePercent = (newPercent: string): void => {
    if (audioRef.current === null) return;

    const durationInSeconds = audioRef.current.duration;
    const newCurrentTime =
      (Number(newPercent.slice(0, -1)) * durationInSeconds) / 100;

    setPercent(newPercent);
    audioRef.current.currentTime = newCurrentTime;
  };

  const playAudio = () => {
    if (audioRef.current === null) return;
    audioRef.current.play();
  };

  const pauseAudio = () => {
    if (audioRef.current === null) return;
    audioRef.current.pause();
  };

  const onAudioLoadedData = () => {
    setIsPlaying(true);
    playAudio();
  };

  const onButtonClick = () => {
    if (isPlaying === true) return setIsPlaying(false);
    if (isPlaying === false) return setIsPlaying(true);
  };

  const onLoadedMetaData = () => {
    if (audioRef.current === null) return;
    setDuration(formatString.time(audioRef.current.duration));
  };

  const onTimeUpdate = () => {
    if (audioRef.current === null) return;

    const durationInSeconds = audioRef.current.duration;
    const currentTimeInSeconds = audioRef.current.currentTime;

    setCurrentTime(formatString.time(currentTimeInSeconds));
    setPercent(`${(currentTimeInSeconds / durationInSeconds) * 100}%`);
  };

  useEffect(() => {
    if (isPlaying === true) return playAudio();
    if (isPlaying === false) return pauseAudio();
  }, [isPlaying]);

  return (
    <Container>
      <PlayPauseButton isPlaying={isPlaying} onButtonClick={onButtonClick} />
      <Title>{currentMusicTitle}</Title>
      <Time>{currentTime}</Time>
      <ProgressiveBar percent={percent} updatePercent={updatePercent} />
      <Time>{duration}</Time>

      <audio
        ref={audioRef}
        onLoadedData={onAudioLoadedData}
        onLoadedMetadata={onLoadedMetaData}
        onTimeUpdate={onTimeUpdate}
        controls
        src={currentMusicURL}
        style={{ display: "none" }}
      />
    </Container>
  );
};

export default MusicPlayer;
