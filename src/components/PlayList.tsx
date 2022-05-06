import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import useActionCreators from "../hooks/useActionCreators";
import { Music } from "../interfaces";
import { RootState } from "../modules";
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
  const playList = useSelector((state: RootState) => state.music.musicList);
  const filteredPlayList = playList.sort((a, b) => {
    const aDate = new Date(a.public_date);
    const bDate = new Date(b.public_date);

    if (aDate < bDate) return 1;
    else if (aDate > bDate) return -1;
    else return 0;
  });

  const { setMusicList } = useActionCreators();

  useLayoutEffect(() => {
    setMusicList();
  }, [setMusicList]);

  return (
    <Container>
      {filteredPlayList.map((music: Music) => (
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
