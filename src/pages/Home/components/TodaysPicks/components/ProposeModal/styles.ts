import styled from "styled-components";

const SHAPECOLOR = "#7042f";
const BACKGROUND = "#5142fc";

export const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 1000px;
  height: 61vh;
  background: linear-gradient(
    24deg,
    rgba(12, 7, 27, 1) 0%,
    rgba(21, 6, 69, 1) 19%,
    rgba(3, 1, 9, 1) 54%,
    rgba(6, 3, 47, 1) 100%
  );
  border-radius: 8px;
  z-index: 1000;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${SHAPECOLOR};
  height: 70px;
  padding: 1em;
  color: white;
  border-bottom: 1px solid #5142fc;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
  font-size: 20px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

export const Section = styled.section`
  display: flex;
  width: 90%;
  gap: 4em;
  margin-top: 2.5em;
  padding: 20px;

  img {
    width: 125px;
    height: 150px;
  }
`;

export const UserGameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;
  color: white;
`;
export const VersionRegionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: ${SHAPECOLOR};
  height: 50px;
  border: 1px solid #5142fc;
  padding: 0.5em;

  border-radius: 8px;
  color: white;

  div {
    display: flex;
    gap: 0.5em;
  }
`;

export const UserFeedBackContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: white;

  section {
    display: flex;
    align-items: center;
    gap: 0.5em;
    img {
      display: flex;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
`;

export const ProposeContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  width: 100%;
  background: ${SHAPECOLOR};
  border-radius: 4px;
  padding: 0 20px;
  margin-top: 20px;
  border: 1px solid #5142fc;
  gap: 10px;

  p {
    display: inline-block;
    font-size: 1.2em;
    color: white;
    font-weight: bold;
    width: 120px;
  }

  select {
    width: 500px;
    height: 40px;
    padding: 0 10px;
    border-radius: 2px;
    border: 1px solid #c6c6c6;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 1em;
    width: 150px;
    height: 40px;
    border-radius: 4px;
    border: none;
    background-color: ${(props) => props.theme["--primary"]};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: #685bfc;
    }
  }
`;

export const MainContainer = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  background-color: ${SHAPECOLOR};
  margin-top: 20px;
  color: white;
  border-radius: 4px;
  border: 1px solid #5142fc;

  section {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.8rem;
      img {
        width: 50px;
        height: 50px;
        filter: brightness(0) invert(1);
      }
    }
  }
`;

interface DispositionSpanProps {
  disposition: number;
}

const colorMapping = [
  "red",
  "lightyellow",
  "yellow",
  "lightblue",
  "blue",
  "lightgreen",
  "green",
]; // colors for scores 0-6

export const DispositionSpan = styled.span<DispositionSpanProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  background-color: ${(props) => colorMapping[props.disposition]};
  margin-top: 2rem;
  border-radius: 20px;
`;
