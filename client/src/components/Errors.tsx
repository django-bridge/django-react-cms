import { ReactElement } from "react";
import styled from "styled-components";
import WarningIcon from "@mui/icons-material/Warning";

const ErrorsWrapper = styled.ul`
  margin-top: 5px;
  font-size: 13px;
  color: #d9303e;

  > li {
    display: flex;
    flex-flow: row;
    align-items: center;
    padding-top: 5px;

    svg {
      display: inline;
      width: 14px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
`;

export interface ErrorsProps {
  errors: string[];
}

function Errors({ errors }: ErrorsProps): ReactElement {
  return (
    <ErrorsWrapper>
      {errors.map((error) => (
        <li key={error}>
          <WarningIcon />
          {error}
        </li>
      ))}
    </ErrorsWrapper>
  );
}

export default Errors;
