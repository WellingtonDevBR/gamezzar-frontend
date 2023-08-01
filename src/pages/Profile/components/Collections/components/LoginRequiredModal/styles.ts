import styled from "styled-components";
import Modal from "react-modal";

export const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${(props) => props.theme["--background-color"]};
  padding: 2rem;
  width: 80%;
  max-width: 500px;
  outline: none;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export const ModalTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
`;

export const ModalButton = styled.button`
  background: ${(props) => props.theme["--primary"]};
  color: ${(props) => props.theme.white};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;


export const CancelButton = styled.button`
  margin-top: 1rem;
  background: ${(props) => props.theme['--critical']};
  color: ${(props) => props.theme.white};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    filter: brightness(1.2);
  }
`;