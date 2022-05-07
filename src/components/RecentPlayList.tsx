import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../modules";

const Container = styled.div`
  position: relative;
  cursor: pointer;
`;

const RecentMusicList = styled.ol`
  background-color: whitesmoke;
  padding: 20px;
  width: 200px;
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 8px;
  margin: 0;
`;

const RecentMusicListItem = styled.li`
  margin-left: 20px;
  margin-bottom: 10px;
`;

const RecentPlayList = () => {
  const [isRecentMusicListOpen, setIsRecentMusicListOpen] =
    useState<boolean>(false);

  const { recentMusics, musicList } = useSelector(
    (state: RootState) => state.music
  );

  const recentMusicNameLsit = recentMusics.map((musicId) => {
    const title = musicList.find((music) => music.id === musicId)?.title;
    return title;
  });

  const onMouseOver = () => setIsRecentMusicListOpen(true);
  const onMouseLeave = () => setIsRecentMusicListOpen(false);

  return (
    <Container>
      <h4 onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
        최근 재생 목록
      </h4>
      {isRecentMusicListOpen && (
        <RecentMusicList>
          {recentMusicNameLsit.map((title) => (
            <RecentMusicListItem>{title}</RecentMusicListItem>
          ))}
        </RecentMusicList>
      )}
    </Container>
  );
};

export default RecentPlayList;
