// import { Spinner } from "@radix-ui/themes";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  background-color: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  border: 0.5rem solid var(--accent-9);
  border-top: 0.5rem solid var(--color-background);
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const PageLoading: React.FC = () => {
  return (
    <Wrapper>
      <Spinner />
    </Wrapper>
  );
};
