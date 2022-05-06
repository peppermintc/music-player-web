import styled from "styled-components";
import LoadingSpinner from "../assets/images/loadingSpinner.gif";

const Container = styled.div`
  background-color: #00000030;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingScreen = () => {
  return (
    <Container>
      <img src={LoadingSpinner} alt="spinner" />
    </Container>
  );
};

export default LoadingScreen;
