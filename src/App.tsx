import styled from "@emotion/styled";
import FormMain from "./components/FormMain";

export const AppDiv = styled.div`
  text-align: center;
`;

export default function App() {
  return (
    <AppDiv>
      <FormMain />
    </AppDiv>
  );
}
