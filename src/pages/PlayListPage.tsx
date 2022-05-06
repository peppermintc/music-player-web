import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import MusicPlayer from "../components/MusicPlayer";
import PlayList from "../components/PlayList";
import { RootState } from "../modules";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  width: 70%;
`;

const PlayListPage = () => {
  const currentMusic = useSelector(
    (state: RootState) => state.music.currentMusic
  );

  const isLoading = useSelector((state: RootState) => state.music.isLoading);
  const hasCurrentMusic = currentMusic.id !== "";

  return (
    <Page>
      <Title>플레이리스트</Title>
      <PlayList />
      {hasCurrentMusic && <MusicPlayer />}
      {isLoading && <LoadingScreen />}
    </Page>
  );
};

export default PlayListPage;
