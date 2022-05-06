import { useSelector } from "react-redux";
import styled from "styled-components";
import useActionCreators from "../hooks/useActionCreators";
import { RootState } from "../modules";
import format from "../utils/stringFormat";
import PlayPauseButton from "./PlayPauseButton";

interface PlayListItemProps {
  id: string;
  title: string;
  moods: string[];
  genre: string;
  date: string;
}

const Container = styled.div`
  border: 1px solid lightgray;
  border-radius: 8px;
  min-height: 70px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  gap: 60px;
  font-weight: 700;
`;

const Title = styled.div`
  flex: 1;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Moods = styled.div`
  width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Genre = styled.div`
  width: 90px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Date = styled.div`
  width: 90px;
`;

const PlayListItem = ({ id, title, moods, genre, date }: PlayListItemProps) => {
  const { setCurrentMusic, setIsPlaying } = useActionCreators();

  const currentMusicId = useSelector(
    (state: RootState) => state.music.currentMusic?.id
  );
  const isPlaying = useSelector(
    (state: RootState) => !!state.music.currentMusic?.isPlaying
  );

  const isCurrentMusic = id === currentMusicId;

  const onButtonClick = () => {
    if (id === currentMusicId) {
      if (isPlaying === true) return setIsPlaying(false);
      if (isPlaying === false) return setIsPlaying(true);
    }

    if (id !== currentMusicId) {
      setCurrentMusic(id);
    }
  };

  return (
    <Container>
      <PlayPauseButton
        isPlaying={isCurrentMusic && isPlaying}
        onButtonClick={onButtonClick}
      />
      <Title>{title}</Title>
      <Moods>{format.moods(moods)}</Moods>
      <Genre>{format.genre(genre)}</Genre>
      <Date>{format.date(date)}</Date>
    </Container>
  );
};

export default PlayListItem;
