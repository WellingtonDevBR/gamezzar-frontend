import { StyledModal, ModalTitle, ModalButton, CancelButton, ButtonContainer } from "./styles";

export function LoginRequiredModal({
  isOpen,
  onRequestClose,
  onLoginRedirect,
}) {
  return (
    <StyledModal isOpen={isOpen} onRequestClose={onRequestClose}>
      <ModalTitle>You need to be logged in to view game details</ModalTitle>
      <ButtonContainer>
        <ModalButton onClick={onLoginRedirect}>Go to login</ModalButton>
        <CancelButton onClick={onRequestClose}>Cancel</CancelButton>
      </ButtonContainer>
    </StyledModal>
  );
}
