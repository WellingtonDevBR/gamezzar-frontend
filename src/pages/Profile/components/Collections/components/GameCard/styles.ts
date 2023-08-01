import styled from "styled-components";

export const GameTitle = styled.div`
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  opacity: 0;
  transition: opacity 0.3s, visibility 0.3s;

  /* Arrow at the bottom of the tooltip */
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

export const StyledGameCard = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  background-size: cover;
  position: relative;
  background-position: center;
  border-radius: 5px;
  overflow: hidden;

  &:hover ${GameTitle} {
    visibility: visible;
    opacity: 1;
  }
`;


export const DispositionIndicator = styled.div<{ disposition: number }>`
  width: 20px;
  height: 20px;
  background-color: ${props => {
    if (props.disposition <= 2) return 'red';
    else if (props.disposition <= 4) return 'yellow';
    else return 'green';
  }};
  border-radius: 50%;
  position: absolute;
  bottom: 10px;
  right: 10px;
`;
