import { useSelector } from "react-redux";
import styled from "styled-components";
import LoadingScreen from "../components/LoadingScreen";
import MusicPlayer from "../components/MusicPlayer";
import PlayList from "../components/PlayList";
import RecentPlayList from "../components/RecentPlayList";
import { RootState } from "../modules";

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PlayListPage = () => {
  const { currentMusic, isLoading } = useSelector(
    (state: RootState) => state.music
  );

  const isCurrentMusicEmpty = currentMusic.id !== "";

  return (
    <Page>
      <Header>
        <h2>플레이리스트</h2>
        <RecentPlayList />
      </Header>
      <PlayList />
      {isCurrentMusicEmpty && <MusicPlayer />}
      {isLoading && <LoadingScreen />}
    </Page>
  );
};

export default PlayListPage;
