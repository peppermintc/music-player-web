import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useActionCreators from "../hooks/useActionCreators";
import { Music } from "../interfaces";
import { RootState } from "../modules";
import getFilteredPlaylist from "../utils/getFilteredPlaylist";
import PlayListItem from "./PlayListItem";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 70%;
  height: calc(100% - 200px);
  overflow-y: scroll;
`;

const PlayList = () => {
  const { musicList } = useSelector((state: RootState) => state.music);
  const { setMusicList } = useActionCreators();

  useLayoutEffect(() => {
    setMusicList();
  }, [setMusicList]);

  return (
    <Container>
      {getFilteredPlaylist(musicList).map((music: Music) => (
        <PlayListItem
          key={music.id}
          id={music.id}
          title={music.title}
          moods={music.moods}
          genre={music.genre}
          date={music.public_date}
        />
      ))}
    </Container>
  );
};

export default PlayList;
