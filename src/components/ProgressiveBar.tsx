import React, { useRef } from "react";
import styled from "styled-components";

interface ProgressiveBarProps {
  percent: string;
  updatePercent: (newPercent: string) => void;
}

const Container = styled.div`
  background-color: whitesmoke;
  width: 600px;
  height: 24px;
  border: 1px solid lightgray;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
`;

const Inner = styled.div<{ percent: string }>`
  background-color: lightcoral;
  height: 100%;
  transition: width 0.5s;
  width: ${({ percent }) => percent};
`;

const ProgressiveBar = ({ percent, updatePercent }: ProgressiveBarProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onProgressiveBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current === null) return;
    const clickedLeft = e.pageX - containerRef.current.offsetLeft;
    const continaerWidth = containerRef.current.offsetWidth;
    const newPercent = `${(clickedLeft / continaerWidth) * 100}%`;
    updatePercent(newPercent);
  };

  return (
    <Container ref={containerRef} onClick={onProgressiveBarClick}>
      <Inner percent={percent} />
    </Container>
  );
};

export default ProgressiveBar;
