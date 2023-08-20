import { styled } from "styled-components";
import Header from "./header/header.js";


export default function TemplatePage({children }) {
  return (
    <>
      <Header />
      <PaddingContainer>
        {children}
      </PaddingContainer>
    </>
  );
}

const PaddingContainer = styled.div`
  padding-top: 20px;
`