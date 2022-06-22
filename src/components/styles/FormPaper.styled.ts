import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

export const FormPaper = styled(Paper)`
  max-width: 80%;
  margin: 4rem 0;
  padding: 3rem;

  @media (min-width: 700px) {
    padding: 7rem;
    margin: 2rem 0;
  }
`;
