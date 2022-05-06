import styled from "styled-components";
import PlayIcon from "../assets/images/ic-small-fill-play-gray.png";
import PauseIcon from "../assets/images/ic-small-line-stop-gray.png";

interface PlayPauseButtonProps {
  isPlaying: boolean;
  onButtonClick: () => void;
}

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const Image = styled.img`
  width: 18px;
`;

const PlayPauseButton = ({
  isPlaying = false,
  onButtonClick,
}: PlayPauseButtonProps) => {
  return (
    <Button onClick={onButtonClick}>
      <Image src={isPlaying ? PauseIcon : PlayIcon} alt="play/pause" />
    </Button>
  );
};

export default PlayPauseButton;
