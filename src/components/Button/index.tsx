import { StyledButton } from "./styles";

export function Button({ primary, children, ...props }: any) {
  return (
    <StyledButton primary={primary} {...props}>
      {children}
    </StyledButton>
  );
}
