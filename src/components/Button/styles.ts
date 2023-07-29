// shared/components/Button.js
import styled from "styled-components";

const PRIMARY_COLOR = "#5142fc";
const SECONDARY_COLOR = "#8a8aa0";
const WHITE_COLOR = "#ffffff";

export const StyledButton = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 30px;
  font-weight: 700;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.theme["--primary"]
      ? `
        border: 1px solid ${PRIMARY_COLOR};
        background-color: transparent;
        color: ${WHITE_COLOR};

        &:hover {
          background-color: ${PRIMARY_COLOR};
        }
        `
      : `
        background-color: transparent;
        color: ${SECONDARY_COLOR};
    `}
`;
