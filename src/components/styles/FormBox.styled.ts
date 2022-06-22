import Box from "@mui/material/Box";
import styled from "@emotion/styled";

export const FormBox = styled(Box)`
  margin-top: 2rem 0;
  display: flex;
  justify-content: center;

  @media (min-width: 700px) {
    margin: 2rem 2rem;
  }

  & div input,
  select {
    min-width: 13rem;
  }
`;
