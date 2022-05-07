import { useEffect, useRef, useState } from "react";
import { Music } from "../interfaces";
import { RootState } from "../modules";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ProgressiveBar from "./ProgressiveBar";
import PlayPauseButton from "./PlayPauseButton";
import formatString from "../utils/stringFormat";
import useActionCreators from "../hooks/useActionCreators";

const Container = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  background-color: #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  @media all and (max-width: 768px) {
    width: 100%;
    height: 50px;
  }
`;

const Title = styled.h4`
  width: 200px;
  margin-left: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 0 0 50px;
`;

const Time = styled.h4`
  width: 100px;
  display: flex;
  justify-content: center;

  @media all and (max-width: 768px) {
    font-size: 12px;
  }
`;

const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [duration, setDuration] = useState<string>("00:00");
  const [currentTime, setCurrentTime] = useState<string>("00:00");
  const [percent, setPercent] = useState<string>("0%");

  const musicList = useSelector((state: RootState) => state.music.musicList);
  const currentMusic = useSelector(
    (state: RootState) => state.music.currentMusic
  );

  const currentMusicTitle = musicList.find(
    (music: Music) => music.id === currentMusic.id
  )?.title;

  const { setIsPlaying } = useActionCreators();

  const updatePercent = (newPercent: string): void => {
    const setAudioCurrentTime = () => {
      if (audioRef.current === null) return;
      const durationInSeconds = audioRef.current.duration;
      const newCurrentTime =
        (Number(newPercent.slice(0, -1)) * durationInSeconds) / 100;
      audioRef.current.currentTime = newCurrentTime;
    };

    setAudioCurrentTime();
    setPercent(newPercent);
  };

  const playAudio = () => {
    if (audioRef.current === null) return;
    audioRef.current.play();
  };

  const pauseAudio = () => {
    if (audioRef.current === null) return;
    audioRef.current.pause();
  };

  const onButtonClick = () => {
    if (currentMusic.isPlaying === true) return setIsPlaying(false);
    if (currentMusic.isPlaying === false) return setIsPlaying(true);
  };

  const onLoadedMetaData = () => {
    if (audioRef.current === null) return;
    setDuration(formatString.time(audioRef.current.duration));
  };

  const onCanPlay = () => setIsPlaying(true);

  const onEnded = () => setIsPlaying(false);

  const onTimeUpdate = () => {
    if (audioRef.current === null) return;

    const durationInSeconds = audioRef.current.duration;
    const currentTimeInSeconds = audioRef.current.currentTime;

    setCurrentTime(formatString.time(currentTimeInSeconds));
    setPercent(`${(currentTimeInSeconds / durationInSeconds) * 100}%`);
  };

  useEffect(() => {
    if (currentMusic.isPlaying === true) return playAudio();
    if (currentMusic.isPlaying === false) return pauseAudio();
  }, [currentMusic]);

  return (
    <Container>
      <Section>
        <PlayPauseButton
          isPlaying={currentMusic.isPlaying}
          onButtonClick={onButtonClick}
        />
        <Title>{currentMusicTitle}</Title>
      </Section>
      <Section>
        <Time>{currentTime}</Time>
        <ProgressiveBar percent={percent} updatePercent={updatePercent} />
        <Time>{duration}</Time>
      </Section>

      <audio
        ref={audioRef}
        src={currentMusic.url}
        style={{ display: "none" }}
        onLoadedMetadata={onLoadedMetaData}
        onCanPlay={onCanPlay}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
    </Container>
  );
};

export default MusicPlayer;
